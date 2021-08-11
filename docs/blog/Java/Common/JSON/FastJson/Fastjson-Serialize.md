# fastjson - 自定义序列化



## 场景

​	序列化时需要进行特殊处理的**类型**，可以进行特殊配置。

## 自定义反序列化解析器 - ObjectSerializer

```java
package com.ivan.json.converter;

import java.io.IOException;
import java.lang.reflect.Type;

import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.ObjectSerializer;

public class SexSerializer implements ObjectSerializer {

    public void write(JSONSerializer serializer,
                      Object object,
                      Object fieldName,
                      Type fieldType,
                      int features)
            throws IOException {
        /**
        	* 处理过程
        	*/
        // text为处理结果
        serializer.write(text);
    }

}
```

## 使用解析器

有三种方法，按情况决定使用哪种。

1. 定义的字段上加解析器注解

```java
@Setter
@Getter
private static class ResultData {
		@JSONField(serializeUsing = SexSerializer.class)
    private Sex sex;
}
```

2. **框架统一配置**，序列化时会根据类型进行匹配。

   在WebAppConfigurer#configureMessageConverters中加入。

```java
SerializeConfig.getGlobalInstance().put(AlarmString.class,AlarmStringSerializer.instance);
```

3. 系列化时使用。

```java
SerializeConfig config = new SerializeConfig();
config.put(AlarmString.class,AlarmStringSerializer.instance);
String jsonStr = JSON.toJsonString(alarm, config);
```

## 序列化相关的概念

- SerializeConfig：内部是个map容器主要功能是配置并记录每种Java类型对应的序列化类。

- SerializeWriter 继承自Java的Writer，其实就是个转为FastJSON而生的StringBuilder，完成高性能的字符串拼接。

- SerializeFilter: 用于对对象的序列化实现各种定制化的需求。

- SerializerFeature：对于对输出的json做各种格式化的需求。

- JSONSerializer：相当于一个序列化组合器，集成了SerializeConfig， SerializeWriter ， SerializeFilter与SerializerFeature。

  

  序列化的入口代码如下，上面提到的各种概念都包含了

```java
    public static String toJSONString(Object object, // 
                                      SerializeConfig config, // 
                                      SerializeFilter[] filters, // 
                                      String dateFormat, //
                                      int defaultFeatures, // 
                                      SerializerFeature... features) {
        SerializeWriter out = new SerializeWriter(null, defaultFeatures, features);

        try {
            JSONSerializer serializer = new JSONSerializer(out, config);
            
            if (dateFormat != null && dateFormat.length() != 0) {
                serializer.setDateFormat(dateFormat);
                serializer.config(SerializerFeature.WriteDateUseDateFormat, true);
            }

            if (filters != null) {
                for (SerializeFilter filter : filters) {
                    serializer.addFilter(filter);
                }
            }

            serializer.write(object);

            return out.toString();
        } finally {
            out.close();
        }
    }
```
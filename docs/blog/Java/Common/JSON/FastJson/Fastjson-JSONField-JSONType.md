# JSONField与JSONType注解的使用

## @JSONField

​		fastjson提供了JSONField对序列化与反序列化进行定制，比如可以指定字段的名称，序列化的顺序。JSONField用于属性，方法方法参数上。JSONField的源码如下：

```java
package com.alibaba.fastjson.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.serializer.SerializerFeature;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER })
public @interface JSONField {
// 配置序列化和反序列化的顺序
    int ordinal() default 0;
// 指定字段的名称
    String name() default "";
// 指定字段的格式，对日期格式有用
    String format() default "";
 // 是否序列化
    boolean serialize() default true;
// 是否反序列化
    boolean deserialize() default true;
//字段级别的SerializerFeature
    SerializerFeature[] serialzeFeatures() default {};
//
    Feature[] parseFeatures() default {};
   //给属性打上标签， 相当于给属性进行了分组
    String label() default "";
    
    boolean jsonDirect() default false;
    
//制定属性的序列化类
    Class<?> serializeUsing() default Void.class;
 //制定属性的反序列化类
    Class<?> deserializeUsing() default Void.class;

    String[] alternateNames() default {};

    boolean unwrapped() default false;
}
```

## @JSONType

​		fastjosn提供了JSONType用于类级别的定制化, JSONType的源码如下：

```java
package com.alibaba.fastjson.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.alibaba.fastjson.PropertyNamingStrategy;
import com.alibaba.fastjson.parser.Feature;
import com.alibaba.fastjson.serializer.SerializeFilter;
import com.alibaba.fastjson.serializer.SerializerFeature;

@Retention(RetentionPolicy.RUNTIME)
//需要标注在类上
@Target({ ElementType.TYPE })
public @interface JSONType {

    boolean asm() default true;
//这里可以定义输出json的字段顺序
    String[] orders() default {};
//包含的字段
    String[] includes() default {};
//不包含的字段
    String[] ignores() default {};
//类级别的序列化特性定义
    SerializerFeature[] serialzeFeatures() default {};
    Feature[] parseFeatures() default {};
    //按字母顺序进行输出
    boolean alphabetic() default true;
    
    Class<?> mappingTo() default Void.class;
    
    Class<?> builder() default Void.class;
    
    String typeName() default "";

    String typeKey() default "";
    
    Class<?>[] seeAlso() default{};
    //序列化类
    Class<?> serializer() default Void.class;
    //反序列化类
    Class<?> deserializer() default Void.class;

    boolean serializeEnumAsJavaBean() default false;

    PropertyNamingStrategy naming() default PropertyNamingStrategy.CamelCase;

    Class<? extends SerializeFilter>[] serialzeFilters() default {};
}
```


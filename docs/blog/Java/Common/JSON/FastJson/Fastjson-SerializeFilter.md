# SerializeFilter
​	fastjson通过SerializeFilter编程扩展的方式定制序列化fastjson支持以下SerializeFilter用于不同常景的定制序列化：

- PropertyFilter 根据PropertyName和PropertyValue来判断是否序列化,接口定义如下：
```
package com.alibaba.fastjson.serializer;

/**
 * @author wenshao[szujobs@hotmail.com]
 */
public interface PropertyFilter extends SerializeFilter {

    /**
     * @param object the owner of the property
     * @param name the name of the property
     * @param value the value of the property
     * @return true if the property will be included, false if to be filtered out
    * 根据 属性的name与value判断是否进行序列化
     */
    boolean apply(Object object, String name, Object value);
}
```
- PropertyPreFilter根据PropertyName判断是否序列化
```
package com.alibaba.fastjson.serializer;

public interface PropertyPreFilter extends SerializeFilter {

//根据 object与name判断是否进行序列化
    boolean apply(JSONSerializer serializer, Object object, String name);
}
```
- NameFilter 序列化时修改Key
```
package com.alibaba.fastjson.serializer;

public interface NameFilter extends SerializeFilter {
//根据 name与value的值，返回json字段key的值
    String process(Object object, String name, Object value);
}
```
- ValueFilter 序列化时修改Value
```
package com.alibaba.fastjson.serializer;

public interface ValueFilter extends SerializeFilter {
  //根据name与value定制输出json的value
    Object process(Object object, String name, Object value);
}
```
- BeforeFilter 在序列化对象的所有属性之前执行某些操作
```
package com.alibaba.fastjson.serializer;

public abstract class BeforeFilter implements SerializeFilter {

    private static final ThreadLocal<JSONSerializer> serializerLocal = new ThreadLocal<JSONSerializer>();
    private static final ThreadLocal<Character>      seperatorLocal  = new ThreadLocal<Character>();

    private final static Character                   COMMA           = Character.valueOf(',');

    final char writeBefore(JSONSerializer serializer, Object object, char seperator) {
        serializerLocal.set(serializer);
        seperatorLocal.set(seperator);
        writeBefore(object);
        serializerLocal.set(null);
        return seperatorLocal.get();
    }

    protected final void writeKeyValue(String key, Object value) {
        JSONSerializer serializer = serializerLocal.get();
        char seperator = seperatorLocal.get();
        serializer.writeKeyValue(seperator, key, value);
        if (seperator != ',') {
            seperatorLocal.set(COMMA);
        }
    }
//需要实现的方法，在实际实现中可以调用writeKeyValue增加json的内容
    public abstract void writeBefore(Object object);
}
```
- AfterFilter 在序列化对象的所有属性之后执行某些操作
```
package com.alibaba.fastjson.serializer;

/**
 * @since 1.1.35
 */
public abstract class AfterFilter implements SerializeFilter {

    private static final ThreadLocal<JSONSerializer> serializerLocal = new ThreadLocal<JSONSerializer>();
    private static final ThreadLocal<Character>      seperatorLocal  = new ThreadLocal<Character>();

    private final static Character                   COMMA           = Character.valueOf(',');

    final char writeAfter(JSONSerializer serializer, Object object, char seperator) {
        serializerLocal.set(serializer);
        seperatorLocal.set(seperator);
        writeAfter(object);
        serializerLocal.set(null);
        return seperatorLocal.get();
    }

    protected final void writeKeyValue(String key, Object value) {
        JSONSerializer serializer = serializerLocal.get();
        char seperator = seperatorLocal.get();
        serializer.writeKeyValue(seperator, key, value);
        if (seperator != ',') {
            seperatorLocal.set(COMMA);
        }
    }
//子类需要实现的方法，实际使用的时候可以调用writeKeyValue增加内容
    public abstract void writeAfter(Object object);
}
```
- LabelFilter根据 JsonField配置的label来判断是否进行输出
```
package com.alibaba.fastjson.serializer;

//根据 JsonField配置的label来判断是否进行输出
public interface LabelFilter extends SerializeFilter {
    boolean apply(String label);
}
```

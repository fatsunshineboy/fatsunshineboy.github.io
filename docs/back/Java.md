# Java

### 多态

调用成员时的特点：

调用成员变量的特点：编译看左边，运行看左边

调用成员方法的特点：编译看左边，运行看右边

### 正则表达式

```java
String str = "hello12af34";
Pattern p =  Pattern.compile("\\d{1,2}");
Matcher m = p.matcher(str);
while (m.find()){
    String s1 = m.group();
    System.out.println(s1);
}
```

java(?=8|11|17)
表示在java后面拼接8或者11或者17，获取只有Java
java(?!8|11|17)
表示在java后面不拼接8或者11或者17，获取只有Java

```java
String regex = "(.).+\\1"
// 分组只以左括号为基础
// 把第x组的内容再拿出来用一次
// 正则表达式内部引用组用 "\\" , 外部用"$"
String result = str.replaceAll("(.)\\1+","$1");
// 替换字符串中重复出现的字符
```
![正则表达式分组](../.vuepress/publ ic/imgs/back/java/fenzu.png)

## 集合体系结构

单列集合    `collection`

双列集合    `map`

![单列集合结构](../.vuepress/public/imgs/back/java/jihe_collection.png)

`list` 系列集合：添加的元素是有序的，可重复，有索引

`set`系列集合：添加的元素是无序，不重复，无索引
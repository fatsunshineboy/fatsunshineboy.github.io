
1. 基本数据类型在匹配方法时，匹配不到时,可以在数值不变的情况下，扩大数据的精度

2. 对象类型在匹配方法时，匹配不到时,会匹配父级

```
byte => 8
char => 16
short=> 16
int=> 32
```

### 编码和解码

```
Java中编码的方法
String类中的方法							 说明
public byte[] getBytes()				使用默认方式进行编码
public byte[] getBytes(string charsetName) 使用指定方式进行编码

Java中解码的方法
String类中的方法							 说明
string(byte[]bytes)						使用默认方式进行解码
string(byte[]bytes，string charsetName)	 使用指定方式进行解码
```



### 导包

```
①在项目中创建一个文件夹：lib
②将jar包复制粘贴到lib文件夹
③右键点击jar包，选择Add as Library->点击OK
④在类中导包使用
```



### `StringBuilder`

```java
StringBuilder s = new StringBuilder();
s.append("abc");
System.out.println(s.toString());
System.out.println(s.length());
System.out.println(s.reverse());
System.out.println(s.insert(1,"d");
```



### 包装类

```java
Byte b = null; 
Short s = null; 
Integer i = null;
Long lon = null;
Float f = null;
Double d = null;
Character c = null;
Boolean bln = null;

Integer i1 = Integer.valueOf(10);
Integer i2 = 10;
int i3 = i1.intValue();
```



### `SimpleDateFormat`

```java
y(Y)-> 年->yyyy 
m(M)-> MM：月份，mm：分钟
d(0)-> dd：一个月中的日期，D：一年中的日期
h(H)-> h：12进制。HH：24进制
s(S)-> s：秒，S：毫砂

Date d = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
string dateFormatString = sdf.format(d);

String dateString = "2022-06-01";
Date pareseDate = sdf.parse(dateString)
```



### `Calender`

 ```java
//日历类
Calendar instance = Calendar.getInstance()；
//system.out.printin(instance)；

System.out.printin(instance.get(]Calendar.YEAR))；System.out.printin(instance.get(Calendar.MONTH))；System.out.println(instance.get(Calendar.DATE))；
//System.out.printin(instance.get(Calendar.DAY))；

instance.setTime(new Date())
instance.add(Calender,YEAR,-1)
 ```

 

### 转换字符串

```java
Strign transform(String source, String encodeForm,String encodeTo) throws Exception{
    byte[] bytes = source.getBytes(encodeForm);
    return new String(bytes,encodeTo);
}
```



### 文件转化编码

```java
FileReader fr = new FileReader("myio\\gbkfile.txt"，Charset.forName()"GBK"))；
//2.读取数据
int ch；
while(( ch=fr.read() ) != -1){
	System.out.print((char)ch)；
}
//3.释放资源
fr.close()；
```



### 爬虫

```
//1.定义StringBuilder拼接爬取到的数据
StringBuilder sb = new StringBuilder()；
//2.创建一个URL对象
URL ur1=new URL(net)；
//3.链接上这个网址
/细节：保证网络是畅通的，而且这个网址是可以链接上的。
URLConnection conn=url.openConnection()；
//4.读取数据
InputStreamReader isr = new InputstreamReader(conn.getInputStream())；
int ch；
while((ch=isr.read()) != -1){
	sb.append((char)ch)；
}	
//5.释放资源
isr.close()；
//6.把读取到的数据返回
return sb.tostring();
```





### char

```
char是Java中的保留字，与别的语言不同的是，char在Java中是16位的，因为Java用的是Unicode。不过8位的ASCLL码包含在Unicode中，是从0~127的。

Java中使用Unicode的原因是，Java的Applet允许全世界范围内运行，那它就需要一种可以表述人类所有语言的字符编码。Unicode。但是English，Spanish，German，French根本不需要这么表示，所以它们其实采用ASCII码会更高效。这中间就存在一个权衡问题。

因为char是16位的，采取的Unicode的编码方式，所以char就有以下的初始化方式：
charc='c；//字符;	 可以是汉字，因为是Unicode编码
char c= 十进制数;   八进制数，十六进制数等等；∥可以用整数赋值
char c='\u数字'；	 用字符的编码值来初始化，如：char='\0'，表示结束符，它的ascll码是0，这句话的意思和char c = 0是一个意思。

byte 是字节数据类型 ，是有符号型的，占1 个字节；大小范围为-128—127 。char 是字符数据类型 ，是无符号型的，占2字节(Unicode码 )；大小范围 是0—65535 ；char是一个16位二进制的Unicode字符，JAVA用char来表示一个字符 

Char是无符号型的，可以表示一个整数，不能表示负数；而byte是有符号型的，可以表示-128—127 的数
```



### byte类型范围

[Java中byte类型的范围](https://blog.csdn.net/yuyonbbo/article/details/88696494)

```
Java中为什么byte的范围是 -128~127
在java中byte类型占8位 表示的范围是0000 0000 ~ 1111 1111 总共256个数，
java中byte类型有正负，最高位表示正负，0为正，1为负。
我们先看正数：
0000 0000 ~ 0111 1111(原码)( 0 ~ 127，共128个数)
我们知道在计算机系统中，数值一律用补码来表示和存储。正数的原码，反码，补码均相同，所以在计算机补码中，表示的范围还是0~127
再看负数：
1000 0000 ~ 1111 1111(原码)(-0 ~ -127 也是128个数)
我们先不看-0，我们先看1000 0001 ~ 1111 1111
1000 0001 ~ 1111 1111(原码)(-1 ~ -127)
1111 1110 ~ 1000 0000(反码)(反码是在原码的值上符号位不变，其余位取反)
1111 1111 ~ 1000 0001(补码)(补码是在反码的值上最后一位加1)所以在计算机中1111 1111 ~ 1000 0001(补码)表示的范围是也是 -1 ~ -127
再回头来看-0 ( 1000 0000 )(原码) -> (1111 1111)(反码) -> ( [1]0000 0000 )(补码) 
我们看出-0的补码最后也是0000 0000 ，
+0和-0的补码相同，由于零只有一种表达方式就行了，-0没什么意义，所以在相同位下补码可以比别的方式多表示一个数。
以至于我们用-0来表示-128，所以-128的补码为1000 0000，没有对应的原码和反码。(这里说没有对应的原码和反码是相对于8个bit的情况下，可以求出原码和反码但超出8个bit所能表达范围)

在计算机系统中，数值一律用补码来表示和存储。
为什么使用补码：
使用原码时，要设计硬件区分符号位，比较绝对值大小。使用反码时，无需设计硬件比较大小，但零存在两种表示方法。
使用补码，可以将符号位和数值域统一处理，很好的解决了原码和反码的问题。
同时，加法和减法也可以统一处理。
此外，补码与原码相互转换，其运算过程是相同的，不需要额外的硬件电路。
————————————————
版权声明：本文为CSDN博主「IndigoDream」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yuyonbbo/article/details/88696494
```


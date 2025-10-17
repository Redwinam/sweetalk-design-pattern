# 原型模式

## 模式引入

### 问题描述

设想我们需要给不同时间点的自己写三份简历，此时姓名和性别等信息是不变的，只有年龄和工作经历（工作经历包含时间区间和公司名称的属性）有稍许变化。

进行多次实例化，会降低性能。如果能在克隆基础上，做少许更改就好了！

### 模式定义

`原型模式（Prototype）`是创建型模式的一种。它用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。
- 通过**复制**一个已存在的实例，返回新的实例（没有新建实例），**原型**指被复制的实例；
- 实现克隆操作，必须实现 Cloneable接口。

### 问题分析

- 客户端代码，在生成三份简历时，应当避免多次执行初始化操作。
    > 一般在初始化信息不发生变化的情况下，克隆是较好的方法。它既隐藏了对象创建的细节，又提升了性能。

- 浅复制和深复制：

    (1) 浅复制：可以复制值类型；但对于引用类型，只复制引用，不复制引用的对象。
    > 例如：简历类中有"设置工作经历"的方法，通常"工作经历"类有"时间区间"和"公司名称"等属性。如果简单Clone简历类，那么"工作经历"中的属性不会被复制。

    (2) 深复制：对于引用类型，也会复制一份新对象，而不是只复制引用。
    > 例如："工作经历"类的"时间区间"和"公司名称等属性"，也可以被复制。

## 模式介绍

### 解决方案
- 客户端只需调用Clone方法，就可以实现新简历的生成，并且可以再修改简历的细节；
- 工作经历类实现Clone方法；
- 在简历类中，引用"工作经历"对象：
    - 在实例化简历类时，同时实例化"工作经历"；
    - 在简历类中提供私有构造方法，Clone"工作经历"的数据。

### 代码实现
工作经验类：
```java
public class 工作经验 implements Cloneable {
    private String 工作日期;
    private String 公司名称;

    public String 获取工作日期() {
        return 工作日期;
    }

    public void 设置工作日期(String 工作日期) {
        this.工作日期 = 工作日期;
    }

    public String 获取公司名称() {
        return 公司名称;
    }

    public void 设置公司名称(String 公司名称) {
        this.公司名称 = 公司名称;
    }

    public Object 克隆() {
        try{
            return (Object)clone();
        }catch (CloneNotSupportedException ex) {
            ex.printStackTrace();
        }
        return null;
    }
}
```

简历类
```java
public class 简历 implements Cloneable {
    private String 姓名;
    private String 性别;
    private String 年龄;
    private 工作经验 工作;

    public 简历(String 姓名) {
        this.姓名 = 姓名;
        this.工作 = new 工作经验();
    }

    private 简历(工作经验 工作) {
        this.工作 = (工作经验)工作.克隆();
    }

    public void 设置个人信息(String 性别, String 年龄) {
        this.性别 = 性别;
        this.年龄 = 年龄;
    }

    public void 设置工作经验(String 工作日期, String 公司) {
        工作.设置工作日期(工作日期);
        工作.设置公司名称(公司);
    }

    public void 展示() {
        System.out.println(this.获取姓名() + " " + this.获取性别() + " " + this.获取年龄());
        System.out.println("Work experience: " + 工作.获取工作日期() + " " + 工作.获取公司名称());
    }

    public Object 克隆() {
        简历 对象 = new 简历(this.工作);
        对象.姓名 = this.姓名;
        对象.性别 = this.性别;
        对象.年龄 = this.年龄;
        return 对象;
    }

    public String 获取姓名() {
        return this.姓名;
    }
    public String 获取性别() {
        return this.性别;
    }
    public String 获取年龄() {
        return this.年龄;
    }
}
```

客户端调用的代码：
```java
public class 简历客户端 {
    public static void main(String[] args) {
        简历 a = new 简历("Big bird");
        a.设置个人信息("Female", "29");
        a.设置工作经验("1998-2000", "Datawhale");
        a.展示();
    } 
}
```

执行结果：

```bash
Big bird Female 29
Work experience: 1998-2000 Datawhale
```

### 结构组成

原型模式其实就是从一个对象再创建另一个可定制的对象，并且不需知道任何创建细节。

![原型模式UML](img/prototype/PrototypeUML.png)

- Prototype：原型类，是一个抽象类，有Clone方法；
- ConcretePrototype：具体原型类，创建当前对象的浅表副本；
- Client：克隆ConcretePrototype的对象，就能得到新的实例。


## 模式评价

### 适用场景

> 实际项目中，原型模式很少单独出现。一般和工厂方法模式一起出现，通过Clone创建对象，然后由工厂方法提供给调用者。

- 直接创建对象的代价较大时，常采用原型模式，可提升性能；
- new一个对象需要非常繁琐的数据准备或访问权限；
- 一个对象多个修改者的场景。

### 优点缺点

优点：
- 提高性能；
- 逃避构造函数的约束。

缺点：
- 需要对类的功能进行通盘考虑，对于已有的类不一定很容易。特别当一个类引用不支持串行化的间接对象，或者引用含有循环结构的时候；
- 必须实现Cloneable接口。
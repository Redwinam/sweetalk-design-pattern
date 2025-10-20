# 工厂方法模式

<div class="side-by-side-container">
<div class="side-by-side-panel">
<div class="side-by-side-header">📖 原文</div>
<div class="side-by-side-content">

## 问题引入

### 问题描述

大学生薛磊风在过去三年里一直在帮助孤寡老人，每周都去老人家里，为老人洗衣扫地、买米买油。有一次，他不幸受了伤，便委托他的两个同学继续去帮助老人，且不必提及任何人的名字，只需说是学雷锋做好事即可。

帮助老人是长期工作，三名“学雷锋的大学生”毕业后，也依然会以“社区志愿者”的名义继续学雷锋做好事。而老人其实不需要知道是谁来做好事，只需要知道是学雷锋的人来帮助就可以了。

上述过程在程序实现时，我们如果使用“学雷锋的大学生”封装学雷锋者并调用，当他们毕业时，我们需要以“社区志愿者”重新封装，重新调用，要想使代码变更量少，可以用`工厂方法模式`来实现。

### 模式定义

`工厂方法模式（Factory Method Pattern）`是指定义一个用于创建对象的结构，让子类决定实例化哪个类。工厂方法使类的实例化过程延迟到其子类。

`工厂方法模式`实现时，客户端需要决定实例化哪一个工厂来实现功能类，即将简单工厂内部的逻辑判断已到了客户端进行。

### 问题分析

这一程序可以先用`简单工厂模式`实现，但由于学雷锋的学生毕业后，会转变身份成为社区志愿者，此时若使用简单工厂模式会涉及到工厂类的修改，违背开放封闭原则。当我们使用`工厂方法模式`时，可以对学雷锋的学生和社区志愿者分别建立工厂类，让客户端决定实例化哪一个工厂类。

## 模式实现

### 解决方案

此时可以考虑使用`工厂方法模式`来解决问题。

1. 创建抽象类`LetFeng`，同时定义公共接口，即三种好事：
   - 定义方法`Sweep()`，`Wash()`，`BuyRice()`。
2. 创建具体的做好事的类：学雷锋的大学生`Undergraduate`，及社区志愿者`Volunteer`，继承于抽象类`LetFeng`；
3. 创建雷锋工厂类`IFactory`，再定义学雷锋的大学生工厂`UndergraduateFactory`和社区志愿者工厂`VolunteerFactory`继承于雷锋工厂，用于创建具体的对象。

### 代码实现

_此处我们使用 Java 语言来实现这一方案，C#语言实现可见原书原版，本项目的所有语言实现可见本项目 Github 仓库，其中包括：[C++](https://github.com/datawhalechina/sweetalk-design-pattern/tree/main/src/design_patterns/cpp/factory_method/)，[Java](https://github.com/datawhalechina/sweetalk-design-pattern/tree/main/src/design_patterns/java/factory_method/example)，[python](https://github.com/datawhalechina/sweetalk-design-pattern/tree/main/src/design_patterns/python/factory_method/LeiFengFactory.py)，读者可按需参阅。_

首先创建抽象类`雷锋`。

```Java
public class 雷锋 {
    public void 扫地() {
        System.out.println("Sweep");
    }

    public void 洗衣() {
        System.out.println("Wash");
    }

    public void 买米() {
        System.out.println("Buy rice");
    }
}
```

创建做好事的类，学雷锋的大学生`大学生类`，及社区志愿者`志愿者类`。

```Java
public class 大学生类 extends 雷锋 {

}

public class 志愿者类 extends 雷锋 {

}
```

创建雷锋工厂类`工厂接口`，再定义学雷锋的大学生工厂`大学生工厂`和社区志愿者工厂`志愿者工厂`

```Java
public interface 工厂接口 {
    public 雷锋 创建雷锋();
}

public class 大学生工厂 implements 工厂接口 {
    @Override
    public 雷锋 创建雷锋() {
        return new 大学生类();
    }
}

public class 志愿者工厂 implements 工厂接口 {
    @Override
    public 雷锋 创建雷锋() {
        return new 志愿者类();
    }
}
```

客户端如下。

```java
public class 工厂方法客户端 {
    public static void main(String[] args) {
        工厂接口 工厂 = new 大学生工厂();
        雷锋 学生 = 工厂.创建雷锋();
        学生.买米();
        学生.扫地();
        学生.洗衣();

        雷锋 志愿者 = new 志愿者工厂().创建雷锋();
        志愿者.买米();
        志愿者.扫地();
        志愿者.洗衣();
      }
}
```

运行结果如下。

```
买米
扫地
洗衣
买米
扫地
洗衣
```

### 结构组成

工厂方法模式由三个主要角色组成：

1.  访问接口：在这个例子中具体为雷锋类；
2.  实体类：在这个例子中具体为做好事的类；
3.  工厂类：在这个例子中具体为各类工厂。

工厂方法模式的通用结构示意图如下。

![装饰模式UML](img/factory_method/factoryUML.png)

## 模式实现

### 适用场景

有明确的根据不同条件创造实例的计划时。将类类比为产品，产品具有系列/组合的形式，则使用者可以在不清楚类生产的具体过程及一个系列/组合的类包含的具体内容的情况下，使用一个系列的产品。

有以下几类适合场景

- 无法预知对象确切类别及其依赖关系时，工厂方法能将创建产品的代码与实际使用产品的代码分离，从而能在不影响其他代码的情况下扩展产品创建的部分。
- 希望用户能扩展软件库/框架的内部组件。

### 实际应用

- 向一个已有多种运输方式（如卡车等）的物流应用新增一种运输方式：轮船。

### 优点缺点

工厂方法模式的优点包括

- 可以避免创建者和具体产品之间的紧密耦合；
- 扩展性高，如果想增加一个新的产品，只需要扩展一个工厂类就可以；
- 符合“开放封闭原则”，无需更改现有工厂类代码，就可以引入新的功能；
- 符合“单一职责原则”，可以将产品创建代码放在程序的单一位置，从而使得代码更容易维护。

工厂方法模式的缺点包括

- 代码可能变得复杂，因为需要引入许多类。

## 参考资料

1. 《深入设计模式》

</div>
</div>
  
<div class="side-by-side-panel">
<div class="side-by-side-header">💡 解读</div>
<div class="side-by-side-content">

想象你是一家快餐连锁店的总部架构师。最初只有一种"大学生套餐"（就像学雷锋的大学生），但随着业务扩展，现在要推出"社区志愿者套餐"（新角色）。如果每次出新套餐都要修改总部中央厨房的所有设备（相当于简单工厂模式），这显然不高效。

工厂方法模式就像让每个套餐类型有自己的专属厨房（工厂）：

- 总部只规定"套餐必须包含汉堡、薯条、饮料"（抽象接口）
- 大学生厨房专门生产大学生套餐
- 志愿者厨房专门生产志愿者套餐
- 顾客（客户端）只需选择去哪个厨房点餐

### 技术本质解析

1. **延迟实例化**：将对象创建的责任从父类转移到子类

   - 普通创建：`雷锋 lf = new 大学生类()`
   - 工厂方法：通过`大学生工厂.创建雷锋()`间接创建

2. **开闭原则实践**：

   - 扩展新类型时（如新增"企业员工"学雷锋），只需：
     1. 创建新类`企业员工类 extends 雷锋`
     2. 创建新工厂`企业员工工厂 implements 工厂接口`
   - 无需修改任何现有工厂和产品类

3. **架构价值**：
   - 解耦：客户端代码只需知道`雷锋`接口，不依赖具体实现类
   - 可扩展性：新增产品类型不影响现有系统
   - 可维护性：创建逻辑集中管理

### 架构师视角的深度思考

1. **与简单工厂对比**：

   ```java
   // 简单工厂（不符合开闭原则）
   public class 简单工厂 {
       public static 雷锋 创建(String type) {
           if(type.equals("大学生")) return new 大学生类();
           else if(type.equals("志愿者")) return new 志愿者类();
           // 新增类型需要修改这里
       }
   }

   // 工厂方法（符合开闭原则）
   public interface 工厂接口 {
       雷锋 创建雷锋(); // 各子工厂自行实现
   }
   ```

2. **IoC 容器中的应用**：

   - Spring 框架的 BeanFactory 本质是工厂方法的升级版
   - 配置`@Bean`相当于定义具体工厂

3. **性能考量**：
   - 工厂方法可能增加少量内存开销（每个产品对应一个工厂类）
   - 但避免了复杂的条件判断，更符合单一职责原则

### 实际架构中的应用场景

1. **数据库访问**：

   - 抽象工厂：`IDBFactory`
   - 具体工厂：`MySQLFactory`、`OracleFactory`
   - 产品：`Connection`、`Command`

2. **跨平台 UI 开发**：
   - 抽象产品：`Button`
   - 具体产品：`WindowsButton`、`MacButton`
   - 通过平台专属工厂创建

### 面试常见问题解答

Q：为什么不用简单工厂而要用工厂方法？
A：当产品类型可能频繁扩展，且希望符合开闭原则时。比如我们的学雷锋案例中，未来可能新增"公务员"、"医生"等学雷锋群体，工厂方法只需新增类，而简单工厂需要修改核心逻辑。

Q：工厂方法和抽象工厂的区别？
A：工厂方法针对单个产品等级结构（如学雷锋者），抽象工厂针对多个关联产品族（如学雷锋者+被帮助者+记录系统等组合）。

### 代码优化建议

```java
// 更符合架构设计的实现
public interface LeiFeng {
    void sweep();
    void wash();
    void buyRice();
}

// 具体产品
@Repository // 可结合Spring注解
public class Undergraduate implements LeiFeng {...}

// 工厂接口
public interface LeiFengFactory {
    @Bean // 可声明为Spring Bean
    LeiFeng create();
}

// 配置类
@Configuration
public class AppConfig {
    @Bean
    public LeiFengFactory undergraduateFactory() {
        return Undergraduate::new; // 使用方法引用
    }
}
```

### 架构设计启示

1. **识别变化点**：本例中"学雷锋者身份"是可能变化的维度
2. **封装变化**：通过工厂接口隔离变化
3. **依赖倒置**：高层模块（客户端）依赖抽象（雷锋接口），不依赖具体实现

建议在架构设计中，当遇到以下特征时考虑工厂方法：

- 系统需要支持不同"变体"（如不同学雷锋身份）
- 这些变体会独立演化
- 需要避免修改已有代码的情况下扩展新变体

</div>
</div>
</div>

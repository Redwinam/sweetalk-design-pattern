# 中介者模式

<div class="side-by-side-container">
<div class="side-by-side-panel">
<div class="side-by-side-header">📖 原文</div>
<div class="side-by-side-content">

## 模式引入

### 问题描述

刚进公司的新人需求其他部门同事帮忙是有困难的，但是通过主管协调就会简单许多。

### **模式定义**

用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们的交互。

### 问题分析

将系统分割成许多对象通常可以增加其复用性，但是对象之间大量的连接又使得对象之间的耦合性更强，导致对系统的行为进行较大的改动就比较困难。

## 模式实现

### 解决方案

通过中介者对象，可以将系统的网状结构变成以中介者为中心的星型结构，使得对象之间的耦合度变低、扩展性增强，系统的结构不会因为新对象的引入造成大量的修改工作。

Mediator（抽象中介者类）：定义了同事对象到中介者对象的接口。

ConcreteMediator（具体中介者对象）：实现抽象类的方法，知道所有具体同事类，并从具体同事接受消息，向其他具体同事发送命令。

Colleague（抽象同事类）：用于定义抽象的同事对象，

ConcreteColleague（具体同事类）：每个具体同事只知道自己的行为，而不了解其他同事类的情况，但是他们认识终结者对象。

### 代码实现

`中介者` 类：

```java
abstract class 中介者 {
    //定义一个抽象的发送消息方法，得到同事对象和发送消息
    public abstract void 发送消息(String 消息内容,同事 同事对象);
}
```

`具体中介者` 类：

```java
public class 具体中介者 extends 中介者{
    public 具体同事1 具体同事1;
    public 具体同事2 具体同事2;

    public void 设置同事1(具体同事1 同事对象){
        this.具体同事1 = 同事对象;
    }
    public void 设置同事2(具体同事2 同事对象){
        this.具体同事2 = 同事对象;
    }
    @Override
    public void 发送消息(String 消息内容, 同事 同事对象) {
        if(同事对象 == 具体同事1){
            具体同事2.通知(消息内容);
        }else{
            具体同事1.通知(消息内容);
        }
    }
}
```

`同事` 类：

```java
public class 同事 {
    protected 中介者 中介者对象;
    // 构建方法，得到中介者对象
    public 同事(中介者 中介者对象){
        this.中介者对象 = 中介者对象;
    }
}
```

`具体同事` 类：

```java
public class 具体同事1 extends 同事 {
    public 具体同事1(中介者 中介者对象) {
        super(中介者对象);
    }
    public void 发送消息(String 消息内容){
        this.中介者对象.发送消息(消息内容,this);
    }
    public void 通知(String 消息内容){
        System.out.println("同事1得到信息:"+消息内容);
    }
}

public class 具体同事2 extends 同事 {
    public 具体同事2(中介者 中介者对象)
    {
        super(中介者对象);
    }
    public void 发送消息(String 消息内容)
    {
        this.中介者对象.发送消息(消息内容,this);
    }
    public void 通知(String 消息内容)
    {
        System.out.println("同事2得到信息:"+消息内容);
    }
}
```

`主类` 方法：

```java
public class 主类 {
    public static void main(String[] args){
        具体中介者 中介者对象 =new 具体中介者();
        具体同事1 同事对象1 = new 具体同事1(中介者对象);
        具体同事2 同事对象2 = new 具体同事2(中介者对象);
        中介者对象.设置同事1(同事对象1);
        中介者对象.设置同事2(同事对象2);
        同事对象1.发送消息("吃过饭了吗？");
        同事对象2.发送消息("没有呢，你打算请客？");
    }
}
```

执行结果：

```bash
同事2得到信息:吃过饭了吗？
同事1得到信息:没有呢，你打算请客？
```

### 结构组成

![image-20221017164911912](img/mediator/mediator.JPG)

## 模式评价

### 适合场景

中介者模式一般应用于一组对象以定义良好但是复杂的方式进行通信的场合。以及想定制一个分布在多个类中的行为，而又不想生成太多的子类的场合。

### 实际应用

nginx_http_upstream_module 里定义的 upstream 框架就是中介者模式（同时也应用了模板模式），它协调 load-balance 模块和 upstream 模块共同工作，获取上游服务器的地址，然后转发下游的请求和上游的响应数据。

### 优点缺点

模式优点：

- 中介者减少了各个业务类的耦合，使得可以独立的改变和复用各个业务类和中介者类。
- 中介者的实现类控制了集中化，把对象群交互的复杂性变为中介者的复杂性。
- 当系统出现多对多交互复杂的对象群，可以考虑使用中介这模式。

模式缺点：

- 中介者对象会较为复杂。
</div>
</div>

<div class="side-by-side-panel">
<div class="side-by-side-header">💡 解读</div>
<div class="side-by-side-content">

### 1. 现实世界类比（买票场景）

想象你在火车站售票窗口排队买票：

- **队伍（聚集对象）**：排队的人群就是一个聚集对象
- **售票员（迭代器）**：售票员不需要知道队伍是怎么组织的（是排成直线还是蛇形），只需要按顺序处理每个人
- **你（客户端）**：只需要告诉售票员"下一个"，不用关心队伍内部结构

### 2. 技术本质

迭代器模式的核心是**解耦遍历逻辑与数据结构**，就像把"怎么遍历"和"数据怎么存"分开管理。

### 3. 架构师视角的深入理解

#### 3.1 为什么需要迭代器？

- **隐藏复杂性**：比如 Java 的 ArrayList 底层是数组，LinkedList 是链表，但都用 iterator()获取迭代器
- **统一访问接口**：不管底层是树、图还是列表，都可以用 hasNext()/next()遍历
- **支持多种遍历**：可以同时有正向、反向、跳跃遍历等不同迭代器

#### 3.2 模式实现关键点

```java
// 抽象聚集（类似Java的Iterable接口）
public interface Aggregate<T> {
    Iterator<T> createIterator();
}

// 具体聚集（类似ArrayList）
public class ConcreteAggregate implements Aggregate<String> {
    private String[] items = new String[10];

    @Override
    public Iterator<String> createIterator() {
        return new ConcreteIterator(this);
    }
    //...其他方法
}

// 迭代器接口（类似Java的Iterator）
public interface Iterator<T> {
    boolean hasNext();
    T next();
}

// 具体迭代器
public class ConcreteIterator implements Iterator<String> {
    private ConcreteAggregate aggregate;
    private int index = 0;

    public ConcreteIterator(ConcreteAggregate aggregate) {
        this.aggregate = aggregate;
    }

    @Override
    public boolean hasNext() {
        return index < aggregate.size();
    }

    @Override
    public String next() {
        return aggregate.get(index++);
    }
}
```

#### 3.3 架构设计中的应用

1. **跨集合统一操作**：数据库查询结果、文件目录树、内存集合都可以用迭代器
2. **延迟加载**：大数据集可以分批加载（如分页查询）
3. **线程安全**：可以设计线程安全的迭代器（如 CopyOnWriteArrayList）

### 4. 实际案例

**场景**：电商平台商品搜索系统

- 商品可能存储在：MySQL、ElasticSearch、Redis 等不同存储中
- 使用迭代器模式：

```java
// 统一商品迭代器接口
public interface ProductIterator {
    boolean hasNext();
    Product next();
}

// 不同数据源的实现
public class ESProductIterator implements ProductIterator {
    // 实现ElasticSearch的游标遍历
}

public class MySQLProductIterator implements ProductIterator {
    // 实现数据库结果集遍历
}

// 客户端统一调用
while(iterator.hasNext()) {
    Product p = iterator.next();
    // 处理商品...
}
```

### 5. 系统架构中的价值

1. **可扩展性**：新增数据源只需新增迭代器实现
2. **可维护性**：遍历逻辑集中管理
3. **接口标准化**：符合开闭原则（对扩展开放，对修改关闭）

### 6. 常见面试问题

Q：迭代器模式和直接访问集合有什么区别？
A：就像用遥控器换台（迭代器）vs 直接操作电视机内部零件（直接访问集合），前者更安全、更灵活。

Q：为什么 Java 的 foreach 循环需要 Iterable？
A：这就是迭代器模式的应用，编译器会把 foreach 转换为 iterator()调用。

### 7. 备考建议

记住这个口诀：
"遍历不用管底层，迭代器中定标准，
聚集创建迭代器，hasNext 加 next 行"

建议画 UML 图时重点标注：

- 聚集（Aggregate）和迭代器（Iterator）的关联关系
- 具体迭代器持有对具体聚集的引用
- 客户端只依赖抽象接口

希望这个解释能帮你从架构师角度深入理解迭代器模式！在实际系统设计中，这个模式经常和组合模式（Composite）一起使用来处理树形结构。

</div>
</div>
</div>

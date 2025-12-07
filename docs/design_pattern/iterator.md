# 迭代器模式

<AppTabs>

<AppTab label="📖 原文">


## 模式引入

### 问题描述

实际生活中，我们经常遇到需要遍历一系列聚集对象的情况，比如排队买票，音乐播放列表等。当我们遍历这些对象时，由于它们本来是一个对象，导致我们不得不直接访问其内部列表。而且，如果我们要遍历另一个的对象时，同样的遍历方法又得重写一遍。

### 模式定义

像这种想要别人访问它的元素，但又不想暴露内部结构的情况，就可以使用迭代器模式。

迭代器模式（Iterator）是提供一种方法顺序访问一个聚集对象中各个元素，而又不暴露该对象的内部表示。

### 问题分析

将对列表的访问和遍历放到一个迭代器对象，迭代器定义访问元素的接口。此时，同样的遍历逻辑只需要实现一次。事实上，由于迭代器模式使用太普遍，大部分高级语言都已经对它进行了封装。

## 模式实现

### 解决方案

- 首先定义抽象聚集对象：`聚集` 类，定义 `创建迭代器` 方法，用于创建一个迭代器。
- 然后定义一个具体聚集对象：`具体聚集` 类，除了重写抽象方法外，还需定义简单的 `获取`、`设置`、`计数` 等方法。
- 定义抽象迭代器对象：`迭代器` 类，一般包括：`第一个`、`下一个`、`是否完成` 和 `当前项目` 几个抽象方法。
- 定义具体迭代器对象：`具体迭代器` 类，重写抽象方法，实现对对象的迭代。

### 代码实现

`聚集` 类：

```java
public abstract class 聚集 {
    public abstract 迭代器 创建迭代器();
}
```

`具体聚集` 类：

```java
public class 具体聚集 extends 聚集 {
    private List<Object> 项目列表 = new ArrayList<>();

    @Override
    public 迭代器 创建迭代器() {
        return new 具体迭代器(this);
    }

    public int 计数() {
        return 项目列表.size();
    }

    public Object 获取(int 索引) {
        return 项目列表.get(索引);
    }

    public void 设置(int 索引, String 值) {
        项目列表.add(索引, 值);
    }
}
```

`迭代器` 类：

```java
public abstract class 迭代器 {
    public abstract Object 第一个();
    public abstract Object 下一个();
    public abstract boolean 是否完成();
    public abstract Object 当前项目();
}
```

`具体迭代器` 类：

```java
public class 具体迭代器 extends 迭代器 {
    private 具体聚集 聚集对象;
    private int 当前位置 = 0;

    public 具体迭代器(具体聚集 聚集对象) {
        this.聚集对象 = 聚集对象;
    }

    @Override
    public Object 第一个() {
        return 聚集对象.获取(0);
    }

    @Override
    public Object 下一个() {
        Object 结果 = null;
        当前位置++;
        if(当前位置 < 聚集对象.计数()) {
            结果 = 聚集对象.获取(当前位置);
        }
        return 结果;
    }

    @Override
    public boolean 是否完成() {
        return 当前位置 >= 聚集对象.计数();
    }

    @Override
    public Object 当前项目() {
        return 聚集对象.获取(当前位置);
    }
}
```

`主类` 方法：

```java
public class 主类 {
    public static void main(String[] args) {
        具体聚集 聚集对象 = new 具体聚集();
        聚集对象.设置(0, "大鸟");
        聚集对象.设置(1,"小菜");
        聚集对象.设置(2,"行李");
        聚集对象.设置(3,"老外");
        聚集对象.设置(4,"公交内部员工");
        聚集对象.设置(5,"小偷");

        迭代器 迭代器对象 = new 具体迭代器(聚集对象);

        while (!迭代器对象.是否完成()){
            System.out.println(迭代器对象.当前项目() + " 请买车票");
            迭代器对象.下一个();
        }
    }
}
```

执行结果：

```bash
大鸟 请买车票
小菜 请买车票
行李 请买车票
老外 请买车票
公交内部员工 请买车票
小偷 请买车票
```

### 结构组成

![](img/iterator/iterator.jpg)

- 聚集抽象类（聚集）。
- 具体聚集类（具体聚集）。
- 迭代抽象类（迭代器）：用于定义各种行为的抽象方法，统一接口。
- 具体迭代器类（具体迭代器）：继承 迭代器，实现具体行为的方法。

## 模式评价

### 适用场景

- 当需要遍历访问一个聚集对象，而且不管这些对象是什么。
- 内部结构复杂，只提供精简的访问方式。
- 对聚集对象支持多种方式遍历。

### 实际应用

- 列表、队列等容器。
- 字符串序列。

### 优点缺点

迭代器模式优点包括：

- 减少重复遍历代码。
- 存储与遍历分离。
- 简化数据访问方式。

迭代器模式缺点包括：

- 过于简单的集合会增加复杂性。
- 增加新的聚集类时可能需要新的迭代器。

</AppTab>
<AppTab label="💡 解读">


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

</AppTab>
</AppTabs>
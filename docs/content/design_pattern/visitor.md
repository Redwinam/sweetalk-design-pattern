# 访问者模式

<div class="side-by-side-container">
<div class="side-by-side-panel">
<div class="side-by-side-header">📖 原文</div>
<div class="side-by-side-content">

## 问题引入

### 问题描述

男人和女人是完全不同的两类人，在对待各种问题上会有完全不同的态度，如何实现男人和女人各方面的对比。

### **模式定义**

访问者模式：表示一个作用于某对象结构中的各元素操作。可以再不改变元素的类的前提下定义于这些元素的新操作。

### 问题分析

男人和女人应该是两个不同类，应该继承一个抽象类。成功、失败等都是人的状态应该作为属性存在。成功会如何、失败会如何应该作为一种反应存在。需要注意的是需要对类的不同对象执行不同操作，但是又不希望增加操作的时候改变这些类。

## 模式介绍

### 解决方案

访问者模式可以把处理从数据结构中分离出来，从而降低数据结构和作用于结构上的操作之间的耦合，使得操作集合可以相对自由变化。

### 代码实现

```java
public abstract class 人 {
    public abstract void 接受(行为 访问者);
}

public class 男人 extends 人 {
    protected String 名称 = "男人";

    @Override
    public void 接受(行为 访问者) {
        访问者.获取男人结论(this);
    }
}

public class 女人 extends 人 {
    protected String 名称 = "女人";

    @Override
    public void 接受(行为 访问者) {
        访问者.获取女人结论(this);
    }
}

public abstract class 行为 {
    public abstract void 获取男人结论(男人 男人对象);
    public abstract void 获取女人结论(女人 女人对象);
}


public class 恋爱 extends 行为 {
    private String 行为名称 = "恋爱";

    @Override
    public void 获取男人结论(男人 男人对象) {
        System.out.println(男人对象.名称 + this.行为名称 + "时，凡事不懂也要装懂。");
    }

    @Override
    public void 获取女人结论(女人 女人对象) {
        System.out.println(女人对象.名称 + this.行为名称 + "时，遇事懂也装作不懂。");
    }
}

public class 失败 extends 行为 {
    private String 行为名称 = "失败";

    @Override
    public void 获取男人结论(男人 男人对象) {
        System.out.println(男人对象.名称 + this.行为名称 + "时，闷头喝酒，谁也不用劝。");
    }

    @Override
    public void 获取女人结论(女人 女人对象) {
        System.out.println(女人对象.名称 + this.行为名称 + "时，眼泪汪汪，谁也劝不了。");
    }
}

public class 成功 extends 行为 {
    private String 行为名称 = "成功";

    @Override
    public void 获取男人结论(男人 男人对象) {
        System.out.println(男人对象.名称 + this.行为名称 + "时，背后多半有一个伟大的女人。");
    }

    @Override
    public void 获取女人结论(女人 女人对象) {
        System.out.println(女人对象.名称 + this.行为名称 + "时，背后大多有一个不成功的男人。");
    }
}

public class 结婚 extends 行为 {
    private String 行为名称 = "结婚";

    @Override
    public void 获取男人结论(男人 男人对象) {
        System.out.println(男人对象.名称 + this.行为名称 + "时，感慨到：恋爱游戏终结时，'有妻徒刑'遥无期。" );
    }

    @Override
    public void 获取女人结论(女人 女人对象) {
        System.out.println(女人对象.名称 + this.行为名称 + "时，欣慰曰：爱情长跑路漫漫，婚姻保险保平安。");
    }
}

public class 对象结构 {
    private List<人> 元素列表 = new ArrayList<>();

    public void 附加(人 元素) {
        元素列表.add(元素);
    }

    public void 移除(人 元素) {
        元素列表.remove(元素);
    }

    public void 显示(行为 访问者) {
        for(人 元素 : 元素列表){
            元素.接受(访问者);
        }
    }
}

public class 主类 {
    public static void main(String[] args) {
        对象结构 结构对象 = new 对象结构();

        结构对象.附加(new 男人());
        结构对象.附加(new 女人());

        成功 访问者1 = new 成功();
        结构对象.显示(访问者1);

        失败 访问者2 = new 失败();
        结构对象.显示(访问者2);

        恋爱 访问者3 = new 恋爱();
        结构对象.显示(访问者3);

        结婚 访问者4 = new 结婚();
        结构对象.显示(访问者4);
    }
}

```

### **结构**组成

![image-20221017164911912](img/visitor/visitor.JPG)

## 模式评价

**适合场景**

系统中对象对应的类很少改变，即有较稳定的数据结构，但是经常会定义新的操作。

**实际应用**

1.Spring 在 beans 配置中实现了访问者设计模式

2.JSP 的解析器,Jasper 框架利用的访问模式来解析 HTML 和 XML 格式

3.ShardingSphere 在 SQL 解析中使用了大量的访问者模式

**模式优点**

增加新的操作很容易。访问者模式将有关的行为集中到一个访问者对象中。

**模式缺点**

增加新的数据结构变得困难。因为一般数据结构都会变化，所以使用访问者模式的机会不太多。

</div>
</div>
  
<div class="side-by-side-panel">
<div class="side-by-side-header">💡 解读</div>
<div class="side-by-side-content">
# 深入理解访问者模式

## 从系统架构师的角度看访问者模式

访问者模式是一种行为设计模式，它允许你在不修改现有类的情况下为这些类添加新的操作。作为系统架构分析师，理解这种模式的关键在于把握"数据结构和操作分离"这一核心思想。

## 技术深入解析

### 1. 模式的核心思想

访问者模式通过"双重分派"机制实现操作与数据结构的解耦：

- 第一次分派：客户端调用元素对象的 accept 方法，传入访问者
- 第二次分派：元素对象回调访问者的 visit 方法，将自身(this)传递回去

这种机制使得访问者可以根据具体元素类型执行不同的操作。

### 2. 代码实现分析

让我们分解示例代码的关键部分：

```java
// 抽象元素类
public abstract class 人 {
    public abstract void 接受(行为 访问者);
}

// 具体元素类 - 男人
public class 男人 extends 人 {
    @Override
    public void 接受(行为 访问者) {
        访问者.获取男人结论(this); // 关键点：将自身传递给访问者
    }
}

// 抽象访问者
public abstract class 行为 {
    public abstract void 获取男人结论(男人 男人对象);
    public abstract void 获取女人结论(女人 女人对象);
}

// 具体访问者 - 成功
public class 成功 extends 行为 {
    @Override
    public void 获取男人结论(男人 男人对象) {
        System.out.println(男人对象.名称 + this.行为名称 + "时，背后多半有一个伟大的女人。");
    }
    // 省略女人部分...
}
```

### 3. 工作流程

1. 客户端创建对象结构并添加元素(男人/女人)
2. 客户端创建具体访问者(如"成功"访问者)
3. 客户端调用对象结构的显示方法，传入访问者
4. 对象结构遍历所有元素，调用每个元素的接受方法
5. 每个元素回调访问者的对应方法，完成特定操作

## 实际应用场景

### 1. Spring 框架中的应用

在 Spring 的 Bean 配置解析中，访问者模式用于处理不同类型的 Bean 定义。例如：

- 解析 XML 配置时，不同类型的 Bean 元素(如<bean>, <property>)对应不同的访问者实现
- 新增一种 Bean 配置方式时，只需添加新的访问者而不修改原有解析逻辑

### 2. SQL 解析中的应用

ShardingSphere 等中间件使用访问者模式解析 SQL：

- SQL 语句被解析为抽象语法树(AST)
- 不同类型的 SQL 节点(Select, Insert, Where 等)对应不同的元素类
- 访问者模式用于实现 SQL 改写、路由计算等操作

## 架构设计考量

### 适合使用访问者模式的情况

1. **数据结构稳定但操作多变**：当系统有稳定的类层次结构，但需要频繁添加新操作时
2. **需要对同一组对象执行多种不相关操作**：如报表生成、格式转换等
3. **操作需要访问对象的内部状态**：访问者可以封装复杂的对象状态访问逻辑

### 不适合使用的情况

1. **数据结构频繁变化**：每增加一个新元素类都需要修改所有访问者
2. **元素类接口不稳定**：如果元素接口经常变化，访问者模式会难以维护
3. **性能敏感场景**：双重分派机制会带来一定的性能开销

## 模式优缺点分析

### 优点

1. **开闭原则**：可以新增访问者而不修改现有元素类
2. **单一职责原则**：将相关行为集中在一个访问者中
3. **灵活性**：可以在运行时选择不同的访问者实现不同行为

### 缺点

1. **破坏封装**：访问者需要访问元素的内部状态，可能破坏封装性
2. **依赖具体类**：访问者需要知道所有具体元素类
3. **难以维护**：当元素类层次变化时，需要更新所有访问者

## 备考建议

1. **理解双重分派机制**：这是访问者模式的核心，务必掌握其工作原理
2. **记住典型应用场景**：如编译器设计、文档处理、复杂对象结构操作等
3. **对比其他模式**：与策略模式、装饰器模式等进行对比，理解各自适用场景
4. **掌握 UML 表示**：能够绘制访问者模式的类图，理解各角色关系

访问者模式在系统架构设计中是一种强大的工具，特别是在需要处理复杂对象结构且操作多变的场景中。理解其核心思想和适用条件，将有助于你在系统架构设计中做出更合理的选择。

</div>
</div>
</div>

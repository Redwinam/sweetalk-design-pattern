# 命令模式

<div class="side-by-side-container">
<div class="side-by-side-panel">
<div class="side-by-side-header">📖 原文</div>
<div class="side-by-side-content">

## 问题引入

### 问题描述

对于烧烤摊场景，由于客户和烤肉串老板的紧耦合所以容易出错，也容易挑剔。可以通过引入服务员完成点菜等请求排队以及退单等可撤销的操作之类的行为，实现客户和烤肉串老板的关系解耦。

### **模式定义**

将请求封装为命令对象，通过数据驱动的方式将命令对象用构造函数的方式传递给调用者，调用者再根据具体的实现执行相应的命令。顺序：调用者 → 命令 → 接受者。

### 问题分析

在系统中行为请求请求者和行为实现者通常是紧耦合的，对于请求排队或记录请求日志，以及支持可撤销的操作等行为，这种紧耦合不合适。

## 模式介绍

### 解决方案

将调用操作的请求对象与实现操作的接受对象解耦，顺序为调用者->命令->接受者。

抽象命令类（抽象命令类），用来声明执行操作的接口。

具体命令类（具体命令类），命令的具体实现，将接收者对象与动作绑定，从而调用接收者相应的操作完成命令。

调用者（调用者），调用命令实现某个请求。

接收者（接收者），实施与执行与请求相关的操作。

### 代码实现

```java
public abstract class 命令 {
    protected 烧烤者 接收者;

    public 命令(烧烤者 接收者) {
        this.接收者 = 接收者;
    }

    public abstract void 执行命令();
}

public class 烤鸡翅命令 extends 命令 {
    public 烤鸡翅命令(烧烤者 接收者) {
        super(接收者);
    }

    @Override
    public void 执行命令() {
        接收者.烤鸡翅();
    }
}

public class 烤羊肉串命令 extends 命令 {
    public 烤羊肉串命令(烧烤者 接收者) {
        super(接收者);
    }

    @Override
    public void 执行命令() {
        接收者.烤羊肉串();
    }
}

public class 服务员 {
    private List<命令> 订单列表 = new ArrayList<>();

    public void 设置订单(命令 命令对象) {
        if (命令对象.getClass().toString().equals("class design_patterns.java.command.烤鸡翅命令")) {
            System.out.println("服务员：鸡翅没有了，请点别的烧烤。");
        }else {
            订单列表.add(命令对象);
            System.out.print("增加订单：" + 命令对象.getClass().toString());
            System.out.println(" 时间：" + new Date());
        }
    }

    public void 取消订单(命令 命令对象) {
        订单列表.remove(命令对象);
        System.out.print("取消订单：" + 命令对象.getClass().toString());
        System.out.println(" 时间：" + new Date());
    }

    public void 执行订单() {
        for(命令 命令对象 : 订单列表){
            命令对象.执行命令();
        }
    }
}

public class 烧烤者 {
    public void 烤羊肉串() {
        System.out.println("烤羊肉串！");
    }

    public void 烤鸡翅() {
        System.out.println("烤鸡翅！");
    }
}

public class 主类 {
    public static void main(String[] args) {
        // 开店前的准备
        烧烤者 烧烤师傅 = new 烧烤者();
        命令 烤羊肉串命令1 = new 烤羊肉串命令(烧烤师傅);
        命令 烤羊肉串命令2 = new 烤羊肉串命令(烧烤师傅);
        命令 烤鸡翅命令1 = new 烤鸡翅命令(烧烤师傅);
        服务员 女服务员 = new 服务员();

        // 开门营业
        女服务员.设置订单(烤羊肉串命令1);
        女服务员.设置订单(烤羊肉串命令2);
        女服务员.设置订单(烤鸡翅命令1);
        女服务员.执行订单();
    }
}


```

### **结构**组成

![image-20221017164911912](img/command/command.JPG)

## 模式评价

**适合场景**

所有能当作命令的场景下都可以考虑使用命令模式

**实际应用**

1.Spring 框架的 JdbcTemplate

2.JDK 中的 Runnable 接口的运用

**模式优点**

通过分离调用者和请求者降低系统的耦合度，可扩展性强。

**模式缺点**

导致出现过多的命令类。

</div>
</div>
  
<div class="side-by-side-panel">
<div class="side-by-side-header">💡 解读</div>
<div class="side-by-side-content">

想象一个烧烤摊的场景：顾客直接向烧烤师傅点单，师傅边听边烤。这种方式有几个问题：

1. 高峰期时师傅容易记错或漏单
2. 顾客想取消订单时难以操作
3. 无法记录订单历史

命令模式的解决方案是引入"服务员"角色：

- 顾客向服务员点单（创建命令对象）
- 服务员记录订单（存储命令）
- 服务员按顺序通知师傅（执行命令）
- 可以随时取消订单（撤销命令）

## 技术实现解析

### 核心角色

1. **抽象命令类**：定义执行接口（如`命令`类）
2. **具体命令类**：实现具体操作（如`烤鸡翅命令`）
3. **调用者**：管理命令（如`服务员`）
4. **接收者**：实际执行者（如`烧烤者`）

### 代码关键点

```java
// 命令抽象
public abstract class 命令 {
    protected 烧烤者 接收者; // 绑定接收者
    public abstract void 执行命令(); // 统一执行接口
}

// 具体命令
public class 烤鸡翅命令 extends 命令 {
    @Override
    public void 执行命令() {
        接收者.烤鸡翅(); // 委托给接收者执行
    }
}

// 调用者（服务员）
public class 服务员 {
    private List<命令> 订单列表 = new ArrayList<>(); // 命令队列

    public void 设置订单(命令 命令对象) {
        订单列表.add(命令对象); // 存储命令
    }

    public void 执行订单() {
        for(命令 cmd : 订单列表){
            cmd.执行命令(); // 批量执行
        }
    }
}
```

## 架构师视角的价值

### 解耦优势

1. **调用者与接收者解耦**：服务员不需要知道烧烤具体实现
2. **支持扩展**：新增烧烤种类只需添加新命令类
3. **支持复杂操作**：命令组合、撤销、重做等

### 实际应用场景

1. **数据库操作**：每个 SQL 语句可封装为命令对象
2. **事务管理**：命令模式天然支持事务的提交/回滚
3. **GUI 操作**：每个按钮点击对应一个命令对象
4. **任务调度**：将任务封装为命令放入队列

### 性能考量

虽然会增加一些命令类，但带来的灵活性在复杂系统中是值得的。特别适合：

- 需要支持撤销/重做的系统
- 需要记录操作历史的系统
- 需要将操作排队执行的系统

## 面试可能的问题

Q：命令模式与策略模式的区别？
A：策略模式关注算法替换，命令模式关注请求封装和执行时机控制。

Q：命令模式如何支持撤销操作？
A：可以在命令类中添加 undo()方法，存储执行前的状态。

Q：命令队列有什么好处？
A：可以实现异步处理、请求排队、延迟执行等高级功能。

</div>
</div>
</div>

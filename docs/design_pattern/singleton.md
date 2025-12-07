# 单例模式

<div class="side-by-side-container">
<div class="side-by-side-panel">
<div class="side-by-side-header">📖 原文</div>
<div class="side-by-side-content">

## 模式引入

### 问题描述

一个类只能有一个实例在生活中是很常见的，比如打印机程序，政府部门。当我们创建这些类的实例时，我们希望每次创建后得到的都是同一个实例。很直观地，我们知道需要在构造函数上下功夫，当我们需要创建一个新的实例时，如果已经有了该类的实例，就直接返回，而不是新建一个。

### 模式定义

此时，我们可以使用单例模式，它可以保证客户只能访问一个唯一的实例，而且还能保证没有其他实例可以被创建。

单例模式（Singleton）是保证一个类仅有一个实例，并提供一个访问它的全局访问点。通常我们可以让一个全局变量使得一个对象被访问，但它不能防止你实例化多个对象。一个最好的办法就是，让类自身负责保存它的唯一实例。这个类可以保证没有其他实例可以被创建，并且它可以提供一个访问该实例的方法。

### 问题分析

对一些只需要一个全局实例的情况，推荐使用单例模式。

## 模式实现

### 解决方案

**多线程时的单例模式**

- 使用锁控制线程的访问：`lock` 确保当一个线程位于代码的临界区时，另一个线程不进入临界区。如果其他线程试图进入锁定的代码，则它将一直等待（即被阻止），直到该对象被释放。

**改善性能的双重锁定**

- 先判断实例是否存在，不存在再加锁处理，避免线程每次都加锁，也能保证多线程的安全，该做法被称为 `Double-Check Locking`。

**简单的静态初始化**

- 使用静态初始化方法，不需要开发人员显式地编写线程安全代码，即可解决多线程环境下不安全的问题（书中介绍的是 C# 与公共语言运行库的做法，其他语言也有相同的方法）。

两种方式对比：

- 饿汉式单例类：静态初始化方法在自己被加载时，将自己实例化。
- 懒汉式单例类：在第一次被引用时，才会将自己实例化。

### 代码实现

双重锁定：

```java
public class 单例 {
    private volatile static 单例 实例;

    private 单例() {}

    public static 单例 获取实例() {
        if(实例 == null){
            synchronized (单例.class) {
                if(实例 == null){
                    实例 = new 单例();
                }
            }
        }
        return 实例;
    }
}
```

静态初始化：

```java
public class 静态单例 {
    private static 静态单例 实例 = new 静态单例();
    private 静态单例() {
    }
    public static 静态单例 获取实例() {
        return 实例;
    }
}
```

`主类` 方法：

```java
public class 主类 {
    public static void main(String[] args) {
        单例 实例1 = 单例.获取实例();
        单例 实例2 = 单例.获取实例();

        if(实例1 == 实例2) {
            System.out.println("两个对象是相同的实例。");
        }

        // 多线程
        Set<String> 实例集合 = Collections.synchronizedSet(new HashSet<>());
        for (int i = 0; i < 100; i++) {
            new Thread(() -> {
                实例集合.add(单例.获取实例().toString());
            }).start();
        }
        for (String 实例 : 实例集合) {
            System.out.println(实例);
        }
    }
}
```

执行结果：

```bash
两个对象是相同的实例。
```

### 结构组成

![](img/singleton/singleton.jpg)

- 单例模式包括一个 单例 类，主要是定义创建实例的方法，允许访问它的唯一实例，该方法是一个静态方法，主要负责创建自己的唯一实例。
- 单例模式因为 单例 类封装它的唯一实例，可以严格控制客户怎样访问它以及何时访问它。简单地说，就是对唯一实例的受控访问。

## 模式评价

### 适用场景

- 当希望类只能有一个实例时。
- 需要维护某种全局状态时。
- 控制对共享资源的并发访问。

### 实际应用

- 数据库连接。
- 日志系统。
- 打印机后台程序。

### 优点缺点

单例模式优点包括：

- 保证一个类只有一个实例。
- 对唯一实例的受控访问。

单例模式缺点包括：

- 全局变量可能已经被修改，但其他位置并不知道。
- 可能会对同一个对象创建多个引用。
- 与所有依赖该类的类耦合比较紧密。

</div>
</div>
  
<div class="side-by-side-panel">
<div class="side-by-side-header">💡 解读</div>
<div class="side-by-side-content">

单例模式就像是一个公司的 CEO 职位 - 无论你什么时候问"谁是 CEO"，得到的都是同一个人（实例）。在技术层面，它确保一个类只有一个实例，并提供一个全局访问点。

## 为什么需要单例模式？

### 现实场景类比

想象一个打印机后台程序：如果允许多个实例同时运行，可能会导致打印任务冲突或资源竞争。单例模式确保所有打印请求都通过同一个后台程序处理。

### 技术必要性

1. **资源控制**：如数据库连接池，多个连接池实例会导致资源浪费
2. **状态一致性**：如系统配置管理，需要保证全局唯一配置来源
3. **性能优化**：避免重复创建昂贵对象

## 实现方式详解

### 1. 双重检查锁定（DCL）

```java
public class Singleton {
    private volatile static Singleton instance; // volatile保证可见性

    private Singleton() {} // 私有构造器

    public static Singleton getInstance() {
        if(instance == null) { // 第一次检查
            synchronized (Singleton.class) { // 加锁
                if(instance == null) { // 第二次检查
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**架构师视角分析**：

- **volatile**：防止指令重排序，确保其他线程看到完全初始化的实例
- **双重检查**：减少同步开销，只有第一次创建时需要同步
- **适用场景**：延迟初始化，资源敏感型应用

### 2. 静态初始化（饿汉式）

```java
public class Singleton {
    private static final Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

**架构师视角分析**：

- **类加载时初始化**：JVM 保证线程安全
- **简单可靠**：没有同步开销
- **缺点**：即使不使用也会创建实例，可能浪费资源

## 多线程环境下的考量

### 线程安全问题

1. **竞态条件**：多个线程同时检查 instance==null 可能导致创建多个实例
2. **可见性问题**：一个线程创建的实例可能对其他线程不可见

### 解决方案对比

| 方案         | 线程安全 | 性能 | 初始化时机 | 适用场景                   |
| ------------ | -------- | ---- | ---------- | -------------------------- |
| 双重检查锁定 | 安全     | 高   | 首次访问   | 需要延迟初始化             |
| 静态初始化   | 安全     | 最高 | 类加载时   | 简单场景，不介意提前初始化 |
| 同步方法     | 安全     | 低   | 首次访问   | 不推荐，性能差             |

## 架构设计中的应用

### 典型应用场景

1. **配置管理**：全局配置对象
2. **日志系统**：统一的日志记录器
3. **连接池**：数据库/网络连接管理
4. **缓存系统**：全局缓存实例

### 设计考量

1. **测试困难**：单例可能导致测试难以隔离
2. **依赖注入**：考虑使用 IoC 容器管理单例
3. **序列化**：实现 Serializable 时需要特殊处理
4. **反射攻击**：防止通过反射创建新实例

## 高级话题：破坏单例模式的方式及防御

1. **反射攻击**：

   ```java
   Constructor<Singleton> constructor = Singleton.class.getDeclaredConstructor();
   constructor.setAccessible(true);
   Singleton newInstance = constructor.newInstance();
   ```

   **防御**：在构造器中检查实例是否已存在

2. **序列化攻击**：
   ```java
   // 序列化后再反序列化可能得到新实例
   ```
   **防御**：实现 readResolve()方法返回已有实例

## 架构师决策点

1. **是否真的需要单例**：考虑依赖注入替代方案
2. **初始化时机选择**：根据资源敏感度选择饿汉或懒汉
3. **线程安全保证**：评估并发访问需求
4. **测试友好性**：考虑引入接口便于 mock

## 实际案例：数据库连接池

```java
public class DatabasePool {
    private static volatile DatabasePool instance;
    private Connection[] pool;

    private DatabasePool() {
        // 初始化连接池
    }

    public static DatabasePool getInstance() {
        if(instance == null) {
            synchronized(DatabasePool.class) {
                if(instance == null) {
                    instance = new DatabasePool();
                }
            }
        }
        return instance;
    }

    public Connection getConnection() {
        // 从池中获取连接
    }

    public void releaseConnection(Connection conn) {
        // 释放连接回池
    }
}
```

**架构价值**：

- 统一管理数据库连接资源
- 控制最大连接数，防止资源耗尽
- 复用连接提升性能

单例模式是系统架构中基础而重要的设计模式，理解其实现细节和适用场景对于构建健壮、高效的软件系统至关重要。作为架构师，不仅要掌握实现技术，更要能够在架构层面权衡其利弊，做出合理的设计决策。

</div>
</div>
</div>

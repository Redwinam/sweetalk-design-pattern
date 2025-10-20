# 建造者模式

<div class="side-by-side-container">
<div class="side-by-side-panel">
<div class="side-by-side-header">📖 原文</div>
<div class="side-by-side-content">
## 模式引入

### 问题描述

设想我们要用程序画一个小人，要求小人有头、身体、两手和两脚。我们可以简单地用画笔，指定小人的坐标。如果增加需求，画一个身体比较胖的小人，我们可以重新调整坐标实现。上面这种简单的画法，很容易缺胳膊少腿。

我们仔细思考一下，可以发现：建造小人的**过程是稳定**的（都需要头身手脚），而具体建造的**细节是不同**的，有高矮胖瘦。

### 模式定义

当我们需要将一个复杂对象的构建与它的表现分离，使得同样的构建过程可以创建不同的表示时，就可以用到`建造者模式(Builder)`。

建造者模式又叫生成器模式，属于创建型模式。当我们使用建造者模式时，用户只需指定需要建造的类型即可得到它们，而无需知道具体建造的过程和细节。

- 建造者：创建和提供实例；
- 导演：管理建造出来的实例间的依赖关系。

> 与工厂模式的区别：建造者模式更关注与零件装配的顺序

### 问题分析

- 构造小人的过程是稳定的，都需要头身手脚；

- 具体建造的"细节"不同，有高矮胖瘦。

## 模式介绍

### 解决方案

1. 先定义一个抽象的**建造人**的类，把这个过程稳定住，里面有构建头身手脚的抽象方法；
2. 然后建造具体的小人，去继承上面的抽象类；
3. 创建一个**指挥者**，用它来控制构建过程，隔离用户与构造过程的关联。

下面是一些注意事项：

- 继承抽象类时，记得重写抽象方法

### 代码实现

`建造者` 抽象类：

```java
import java.awt.*;

public abstract class 建造者 {
    protected Graphics2D g;
    protected 画笔 p;

    public 建造者(Graphics2D g, 画笔 p) {
        g.setStroke(new BasicStroke(p.getLine宽度()));
        g.setColor(p.get颜色());
        this.g = g;
        this.p = p;
    }

    public abstract void 建造头();
    public abstract void 建造身体();
    public abstract void 建造左手();
    public abstract void 建造右手();
    public abstract void 建造左腿();
    public abstract void 建造右腿();
}
```

`胖人建造者` 具体类：

```java
import java.awt.*;

public class 胖人建造者 extends 建造者 {
    public 胖人建造者(Graphics2D g, 画笔 p) {
        super(g, p);
    }

    @Override
    public void 建造头() {
        g.drawOval(200, 70, 30, 30);
    }

    @Override
    public void 建造身体() {
        g.drawRect(185, 100, 60, 30);
    }

    @Override
    public void 建造左手() {
        g.drawLine(205, 100, 175, 110);
    }

    @Override
    public void 建造右手() {
        g.drawLine(225, 100, 250, 110);
    }

    @Override
    public void 建造左腿() {
        g.drawLine(205, 130, 175, 150);
    }

    @Override
    public void 建造右腿() {
        g.drawLine(225, 130, 250, 150);
    }
}
```

`瘦人建造者` 具体类：

```java
import java.awt.*;

public class 瘦人建造者 extends 建造者 {
    public 瘦人建造者(Graphics2D g, 画笔 p) {
        super(g, p);
    }

    @Override
    public void 建造头() {
        g.drawOval(50, 20, 30, 30);
    }

    @Override
    public void 建造身体() {
        g.drawRect(60, 50, 10, 50);
    }

    @Override
    public void 建造左手() {
        g.drawLine(60, 50, 40, 100);
    }

    @Override
    public void 建造右手() {
        g.drawLine(70, 50, 90, 100);
    }

    @Override
    public void 建造左腿() {
        g.drawLine(60, 100, 45, 150);
    }

    @Override
    public void 建造右腿() {
        g.drawLine(70, 100, 85, 150);
    }
}
```

`人指挥者` 类：

```java
public class 人指挥者 {

    private 建造者 pb;

    public 人指挥者(建造者 pb) {
        this.pb = pb;
    }

    public void 创建人() {
        pb.建造头();
        pb.建造身体();
        pb.建造左手();
        pb.建造右手();
        pb.建造左腿();
        pb.建造右腿();
    }
}
```

`画笔` 类：

```java
import java.awt.*;

public class 画笔 {
    private int 线宽;
    private Color 颜色;

    public 画笔(int 线宽, Color 颜色) {
        this.线宽 = 线宽;
        this.颜色 = 颜色;
    }

    public int getLine宽度(){
        return 线宽;
    }

    public Color get颜色(){
        return 颜色;
    }
}
```

`建造者主类` 方法：

```java
import javax.swing.*;
import java.awt.*;

public class 建造者主类 {
    public static void main(String[] args) {
        JFrame jFrame = new JFrame();

        JPanel jpanel = new JPanel() {
            @Override
            public void paint(Graphics graphics) {
                super.paint(graphics);
                建造者 ptb = new 瘦人建造者((Graphics2D) graphics, new 画笔(2, Color.BLUE));
                人指挥者 pd = new 人指挥者(ptb);
                pd.创建人();
                建造者 pfb = new 胖人建造者((Graphics2D) graphics, new 画笔(3, Color.YELLOW));
                pd = new 人指挥者(pfb);
                pd.创建人();
            }
        };

        jFrame.add(jpanel);
        jFrame.setSize(300, 300);
        jFrame.setVisible(true);
        jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }
}
```

执行结果：

![Java code输出](img/builder/JavaCodeOutPut.png)

### 结构组成

![建造者模式UML](img/builder/BuilderUML.png)

- Director：指挥者，根据用户需求构建小人对象；
- Builder：构造小人各个部分的抽象类；
- ConcreteBuilder：具体的小人，具体实现如何画出小人的头身手脚各个部分；
- Product：具体的产品小人。

## 模式评价

### 适用场景

- 创建一些复杂的对象，这些对象内部构建间的建造顺序通常是稳定的，但对象内部的构建通常面临着复杂的变化；
- 一些基础部件不变，而其组合经常变化。

### 实际应用

- JAVA 中的 StringBuilder
- 去肯德基，汉堡、可乐、薯条、炸鸡翅等是不变的，而其组合是经常变化的，生成出所谓的"套餐"；

### 优点缺点

优点：

- 使得建造代码与表示代码分离，易扩展
- 便于控制细节风险

缺点：

- 产品必须有共同点，范围有限制
- 如内部变化复杂，会有很多的建造类
</div>
</div>

<div class="side-by-side-panel">
<div class="side-by-side-header">💡 解读</div>
<div class="side-by-side-content">

想象你要组装一台电脑：

1. **稳定的构建过程**：无论什么配置，组装步骤都是固定的（选 CPU→ 选主板 → 选内存 → 选硬盘 → 装机箱）
2. **变化的细节**：不同配置的具体零件不同（i7 还是 i9 处理器，16G 还是 32G 内存）

建造者模式就是把"组装步骤"和"具体零件选择"分离的设计方法。

### 技术本质（架构师视角）

1. **构建与表现分离**：

   - 构建过程（指挥者）：固定流程（先头后身体）
   - 具体实现（建造者）：不同实现（胖/瘦人的坐标）

2. **与工厂模式对比**：
   - 工厂模式：直接生产完整对象（给你一台现成电脑）
   - 建造者模式：分步组装对象（让你自定义每个部件）

### 实际开发案例（StringBuilder）

```java
// 这就是建造者模式的典型应用
StringBuilder builder = new StringBuilder();
builder.append("头");  // 建造头部
builder.append("身体"); // 建造身体
String 小人 = builder.toString(); // 最终组装
```

### 架构设计价值

1. **解耦**：将对象构造算法（指挥者）与部件实现（建造者）解耦
2. **精细控制**：可以分步控制构造过程（比如先校验部件再组装）
3. **扩展性**：新增产品类型只需新增建造者类（如新增"高个子建造者"）

### 高级应用场景

1. **复杂对象构造**：如 XML 文档生成器
2. **多形态对象**：游戏中的角色创建系统
3. **参数过多构造**：替代伸缩构造函数模式（telescoping constructor）

### 考试注意要点

1. **UML 图记忆要点**：

   - 指挥者依赖抽象建造者
   - 具体建造者继承抽象建造者
   - 产品类独立存在

2. **与抽象工厂的区别**：
   | 维度 | 建造者模式 | 抽象工厂模式 |
   |------------|----------------------|--------------------|
   | 目的 | 分步构造复杂对象 | 创建产品族 |
   | 重点 | 构造过程控制 | 产品类型扩展 |
   | 产品复杂度 | 通常构造复杂单个对象 | 创建多个相关对象 |

3. **典型考题陷阱**：
   - 当题目出现"分步骤构建"、"相同过程不同表现"时优先考虑建造者模式
   - 注意与模板方法模式的区别（后者是算法步骤抽象，前者是对象构造抽象）

### 代码示例优化（架构师风格）

```java
// 更符合企业级实现的写法
public interface PersonBuilder {
    void buildHead();
    void buildBody();
    Person getResult(); // 明确返回产品对象
}

public class Director {
    public Person construct(PersonBuilder builder) {
        builder.buildHead();
        builder.buildBody();
        return builder.getResult(); // 返回完整产品
    }
}
```

建议在复习时重点理解：

1. 构建过程与产品表示的分离思想
2. 与工厂模式、原型模式等其他创建型模式的对比
3. 在复杂对象构造场景下的优势体现
</div>
</div>
</div>

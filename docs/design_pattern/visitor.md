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

![image-20221017164911912](img/visitor/visitor.jpg)

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

你可以把访问者模式想象成：**你是一个领域的专家（比如税务稽查员），要去巡视一个结构复杂的公司（比如一个拥有不同部门的对象结构）。你的任务是针对公司里不同类型的部门（比如财务部、技术部、行政部），执行各自特定的稽查动作。**

这个模式的核心，就是为了解决一个常见的架构难题：**如何在尽量不修改现有对象结构的情况下，为这些对象增加新的操作功能。**

---

### 1. 一个生动的场景：文档导出功能

假设你正在设计一个文档系统，这个系统里有很多不同类型的元素（对象结构）：

- `TextElement`（文本元素）
- `ImageElement`（图片元素）
- `VideoElement`（视频元素）

现在，产品经理提出了一个需求：**需要支持将文档导出为多种格式**，比如 HTML、Markdown、PDF 等。

**如果没有访问者模式，你会怎么做？**

一种简单粗暴的方法是在每个元素类里添加各种导出方法：

```java
// 文本元素类
class TextElement {
    public String toHtml() { ... } // 负责文本的HTML导出逻辑
    public String toMarkdown() { ... } // 负责文本的Markdown导出逻辑
    public byte[] toPdf() { ... } // 负责文本的PDF导出逻辑
}

// 图片元素类
class ImageElement {
    public String toHtml() { ... } // 负责图片的HTML导出逻辑
    public String toMarkdown() { ... } // 负责图片的Markdown导出逻辑
    public byte[] toPdf() { ... } // 负责图片的PDF导出逻辑
}

// ... 其他元素类也一样
```

**这种方法的问题（从架构师角度看）：**

1.  **违反开闭原则（OCP）**：每次要增加一种新的导出格式（比如 `toWord()`），你就必须去修改每一个元素类！这对于一个稳定的大型系统来说是灾难性的，容易引入错误，且测试工作量巨大。
2.  **职责混乱**：`TextElement` 类的核心职责是管理文本内容，现在它却要承担各种导出格式的复杂逻辑。这违反了“单一职责原则”，导致类变得臃肿，难以维护。
3.  **难以扩展**：如果导出逻辑非常复杂，甚至需要依赖外部库，把这些逻辑都塞进元素类里是非常糟糕的设计。

---

### 2. 访问者模式如何优雅地解决这个问题？

访问者模式的哲学是：**“操作”不应该分散在各个元素里，而应该被封装到一个独立的“访问者”对象中。然后，让元素“接受”这个访问者，并把自身作为参数传给它，说：“嘿，访问者，这是我的类型，请对我执行你的操作吧！”**

这就实现了 **数据结构和操作它的算法** 的分离。

让我们用上面的例子来重构：

**第一步：定义元素接口（Element）**
所有元素都必须声明一个 `accept(Visitor visitor)` 方法。

```java
// 元素接口
public interface DocumentElement {
    void accept(Visitor visitor); // 核心：接受一个访问者
}

// 具体元素：文本
public class TextElement implements DocumentElement {
    private String content;
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this); // “我把自己（this，一个TextElement）交给你处理”
    }
    // ... getter for content
}

// 具体元素：图片
public class ImageElement implements DocumentElement {
    private String srcPath;
    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this); // “我把自己（this，一个ImageElement）交给你处理”
    }
    // ... getter for srcPath
}
```

**第二步：定义访问者接口（Visitor）**
访问者接口为每一种类型的元素都声明一个 `visit` 方法。这就是著名的 **“双分派”（Double Dispatch）** 技术的体现。

```java
// 访问者接口
public interface Visitor {
    void visit(TextElement textElement); // 如何处理文本元素
    void visit(ImageElement imageElement); // 如何处理图片元素
    void visit(VideoElement videoElement); // 如何处理视频元素
}
```

**第三步：实现具体的访问者（Concrete Visitor）**
**每个具体的访问者，代表一种新的操作（导出格式）**。

```java
// 具体访问者：HTML导出器
public class HtmlExportVisitor implements Visitor {
    @Override
    public void visit(TextElement textElement) {
        // 这里集中实现：如何将一个TextElement转换成HTML片段
        System.out.println("<p>" + textElement.getContent() + "</p>");
    }

    @Override
    public void visit(ImageElement imageElement) {
        // 这里集中实现：如何将一个ImageElement转换成HTML片段
        System.out.println("<img src='" + imageElement.getSrcPath() + "'/>");
    }

    @Override
    public void visit(VideoElement videoElement) { ... }
}

// 具体访问者：Markdown导出器
public class MarkdownExportVisitor implements Visitor {
    @Override
    public void visit(TextElement textElement) {
        // 集中实现TextElement到Markdown的转换
        System.out.println(textElement.getContent() + "\n");
    }

    @Override
    public void visit(ImageElement imageElement) {
        // 集中实现ImageElement到Markdown的转换
        System.out.println("!" + imageElement.getSrcPath( + ")");
    }

    @Override
    public void visit(VideoElement videoElement) { ... }
}
```

**第四步：客户端如何使用**

```java
public class Client {
    public static void main(String[] args) {
        // 1. 构建文档对象结构（比如一个列表）
        List<DocumentElement> document = Arrays.asList(
            new TextElement("这是一段文字"),
            new ImageElement("/images/photo.jpg"),
            new TextElement("这是另一段文字")
        );

        // 2. 创建一个具体的访问者（比如HTML导出器）
        Visitor htmlExporter = new HtmlExportVisitor();

        // 3. 遍历结构，让每个元素“接受”这个访问者
        for (DocumentElement element : document) {
            element.accept(htmlExporter); // 关键调用！
        }

        // 输出：
        // <p>这是一段文字</p>
        // <img src='/images/photo.jpg'/>
        // <p>这是另一段文字</p>

        // 想要支持Markdown？易如反掌，完全不用修改任何Element类！
        Visitor markdownExporter = new MarkdownExportVisitor();
        for (DocumentElement element : document) {
            element.accept(markdownExporter);
        }
    }
}
```

---

### 3. 架构师视角的深度总结

**访问者模式的精髓：**

- **开闭原则的典范**：

  - **对扩展开放**：你需要增加新操作（如 `WordExportVisitor`）吗？没问题，直接实现一个新的 `Visitor` 接口即可。**现有的元素类和对象结构一行代码都不用改**。
  - **对修改关闭**：元素类一旦稳定，就几乎不需要再变动。

- **单一职责原则的体现**：

  - 元素类（如 `TextElement`）只负责管理自己的核心数据。
  - 访问者类（如 `HtmlExportVisitor`）只负责实现一种特定的操作逻辑。职责清晰，边界明确。

- **双分派（Double Dispatch）**：这是实现访问者模式的技术核心。一次方法调用（`element.accept(visitor)`）的实际行为，取决于两个对象的实际类型（`element` 的具体类型和 `visitor` 的具体类型）。这在不支持双分派的语言（如 Java）中，是模拟实现多态的一种强大技巧。

**访问者模式的缺点与适用场景：**

- **缺点**：

  1.  **破坏封装性**：访问者需要访问元素的内部细节，所以通常需要元素提供足够的 `public` 方法（如 getter），这可能会暴露不应暴露的内部状态。
  2.  **元素结构必须稳定**：如果在 `Visitor` 接口中声明了 `visit(TextElement)`，后来你想增加一种新的元素类型 `CodeElement`，那就必须修改 `Visitor` 接口以及所有已有的具体访问者类！这是它最大的代价。因此，**访问者模式适用于元素类层次结构稳定，但需要频繁增加新操作的场景**。

- **经典应用场景**：
  1.  **编译器设计**：抽象语法树（AST）的节点类型（如赋值语句、循环语句）是稳定的，但针对 AST 的操作（如类型检查、代码优化、代码生成、格式化打印）会经常增加。访问者模式在这里是绝对的主角。
  2.  **复杂 UI 工具包**：UI 组件（按钮、文本框）是稳定的，但操作（渲染、布局计算、有效性检查）是多变的。
  3.  **文件系统遍历**：文件类型（文件、文件夹）是稳定的，但操作（计算大小、查找病毒、压缩）是多样的。

### 结论

作为系统架构师，当你在评审设计时，如果遇到“一个相对稳定的对象结构，需要定义许多繁杂且可能不断扩展的操作”这类需求时，访问者模式就应该立刻出现在你的脑海里。它是一个典型的**行为模式**，其价值在于优雅地解决了算法和对象结构的耦合问题，是构建高扩展性、高维护性系统的一件利器，但使用时必须权衡其“破坏封装”和“要求结构稳定”的代价。

</div>
</div>
</div>

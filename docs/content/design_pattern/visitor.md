# 访问者模式

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

1.Spring在beans配置中实现了访问者设计模式

2.JSP的解析器,Jasper框架利用的访问模式来解析HTML和XML格式

3.ShardingSphere在SQL解析中使用了大量的访问者模式

**模式优点**

增加新的操作很容易。访问者模式将有关的行为集中到一个访问者对象中。

**模式缺点**

增加新的数据结构变得困难。因为一般数据结构都会变化，所以使用访问者模式的机会不太多。
# 解释器模式

<AppTabs>

<AppTab label="📖 原文">


## 问题引入

### 问题描述

音乐解释器程序，根据自定义规则将音乐解释成简谱。

### **模式定义**

解释器模式，给定一个语言，定义它的文法的一种表示，并定义一个解释器，解释器使用该表示来解释语言中的句子。

### 问题分析

一种特定类型的问题发生的频率足够高，就值得将该问题的各个实例表述为一个简单语言中的句子。就可以考虑构建解释器解释这些句子。

## 模式介绍

### 解决方案

采用解释器模式，通过构建语法树，定义终结符与非终结符。

AbstractExpression(抽象表达式)：用于声明一个抽象的解释操作。

TerminalExpression(终结符表达式)：实现与文法的终结符相关联的解释操作。

NonterminalExpression(非终结符表达式)：为文法中的非终结符实现解释操作。

Context(上下文）：包含解释器之外的全局信息。

### 代码实现

```java
public abstract class 表达式 {
    public void 解释(演奏上下文 上下文) {
        if(上下文.获取文本().length() == 0) {
            return;
        }else {
            String 演奏键 = 上下文.获取文本().substring(0, 1);
            上下文.设置文本(上下文.获取文本().substring(2));
            double 演奏值 = Double.parseDouble(上下文.获取文本().substring(0, 上下文.获取文本().indexOf(" ")));
            上下文.设置文本(上下文.获取文本().substring(上下文.获取文本().indexOf(" ") + 1));

            执行(演奏键,演奏值);
        }
    }

    public abstract void 执行(String 键,double 值);
}


public class 音符 extends 表达式 {
  @Override
    public void 执行(String 键, double 值) {
      String 音符值 = "";
      switch (键){
          case "C":
              音符值 = "1";
              break;
          case "D":
              音符值 = "2";
              break;
          case "E":
              音符值 = "3";
              break;
          case "F":
              音符值 = "4";
              break;
          case "G":
              音符值 = "5";
              break;
          case "A":
              音符值 = "6";
              break;
          case "B":
              音符值 = "7";
              break;
      }
      System.out.print(音符值 + " ");
    }
}

public class 音阶 extends 表达式 {
    @Override
    public void 执行(String 键, double 值) {
        String 音阶值 = "";
        switch ((int)值){
            case 1:
                音阶值 = "低音";
                break;
            case 2:
                音阶值 = "中音";
                break;
            case 3:
                音阶值 = "高音";
                break;
        }
        System.out.print(音阶值 + " ");
    }
}

public class 速度 extends 表达式 {
    @Override
    public void 执行(String 键, double 值) {
        String 速度值;
        if(值 < 500) {
            速度值 = "快速";
        }else if (值 >= 1000) {
            速度值 = "慢速";
        }else {
            速度值 = "中速";
        }
        System.out.print(速度值 + " ");
    }
}

public class 演奏上下文 {
    private String 文本内容;

    public String 获取文本() {
        return 文本内容;
    }
    public void 设置文本(String 文本内容) {
        this.文本内容 = 文本内容;
    }
}

public class 主类 {
    public static void main(String[] args) {
        演奏上下文 上下文 = new 演奏上下文();
        System.out.println("上海滩：");
        上下文.设置文本("O 2 E 0.5 G 0.5 A 3 E 0.5 G 0.5 D 3 E 0.5 G 0.5 A 0.5 O 3 C 1 O 2 A 0.5 G 1 C 0.5 E 0.5 D 3 ");

        表达式 表达式对象 = null;
        try {
            while (上下文.获取文本().length() > 0) {
                String 字符 = 上下文.获取文本().substring(0, 1);
                switch (字符){
                    case "O":
                        表达式对象 = new 音阶();
                        break;
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "A":
                    case "B":
                    case "P":
                        表达式对象 = new 音符();
                        break;
                }
                表达式对象.解释(上下文);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("\r\n上海滩：");
        上下文.设置文本("T 500 O 2 E 0.5 G 0.5 A 3 E 0.5 G 0.5 D 3 E 0.5 G 0.5 A 0.5 O 3 C 1 O 2 A 0.5 G 1 C 0.5 E 0.5 D 3 ");
        try {
            while (上下文.获取文本().length() > 0) {
                String 字符 = 上下文.获取文本().substring(0, 1);
                switch (字符){
                    case "O":
                        表达式对象 = new 音阶();
                        break;
                    case "T":
                        表达式对象 = new 速度();
                        break;
                    case "C":
                    case "D":
                    case "E":
                    case "F":
                    case "G":
                    case "A":
                    case "B":
                    case "P":
                        表达式对象 = new 音符();
                        break;
                }
                表达式对象.解释(上下文);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### **结构**组成

![image-20221017164911912](img/interpreter/interpreter.jpg)

## 模式评价

**适合场景**

重复出现的操作可以考虑使用简单的语言进行表达。

**实际应用**

Spring 框架中 SpelExpressionParser 就使用解释器模式

**模式优点**

解释器模式可以容易地改变和扩展文法。

**模式缺点**

解释器模式为文法中的每条规则至少定义了一个类，导致包含许多规则的文法可能难以管理和维护。

</AppTab>
<AppTab label="💡 解读">


好的，我来帮你理解解释器模式，我会尽量用通俗易懂的方式结合这个音乐解释器的例子来说明。

### 1. 问题引入：音乐解释器

想象你有一个需求：把一段特殊的音乐代码（比如"O 2 E 0.5 G 0.5"）转换成简谱（比如"中音 3 5"）。这种转换需要遵循一定的规则：

- "O 2"表示中音
- "E"对应简谱的 3
- "G"对应简谱的 5

### 2. 解释器模式是什么？

解释器模式就像是一个"语言翻译器"。它定义了一套规则（文法），然后按照这套规则来解释输入的句子。

类比：就像英语翻译器，你输入英文句子，它按照英语语法规则翻译成中文。

### 3. 关键概念（结合音乐例子）

- **文法规则**：音乐代码的书写规则（如"O 数字"表示音阶，"字母"表示音符）
- **抽象表达式(Expression)**：所有解释器的父类（代码中的`表达式`类）
- **终结符表达式(TerminalExpression)**：对应文法中最基本的元素（代码中的`音符`类）
- **非终结符表达式(NonterminalExpression)**：由多个终结符组成的复杂表达式（代码中的`音阶`和`速度`类）
- **上下文(Context)**：保存解释过程中需要的信息（代码中的`演奏上下文`，存储待解析的字符串）

### 4. 代码解析（重点看执行过程）

1. **输入字符串**："O 2 E 0.5 G 0.5"
2. **解析过程**：
   - 遇到"O"：创建`音阶`解释器，解释"2"→ 输出"中音"
   - 遇到"E"：创建`音符`解释器，解释"0.5"→ 输出"3"
   - 遇到"G"：创建`音符`解释器，解释"0.5"→ 输出"5"

### 5. 为什么用解释器模式？

- **优势**：当你有大量类似的解析需求时（比如音乐、数学表达式等），用解释器模式可以：
  - 灵活扩展：新增规则只需加新的解释器类（如新增`升降调`解释器）
  - 结构清晰：每种解析规则独立封装
- **劣势**：
  - 每个规则都要一个类，规则多时代码量大
  - 不适合复杂文法（像编程语言这种）

### 6. 实际应用场景

- **编译器/解释器**：如 SQL 解析、正则表达式
- **业务规则引擎**：如折扣规则"满 300 减 50"的解释
- **配置文件解析**：如 Spring 的 SpEL 表达式

### 7. 备考注意点（软考高级）

- **UML 类图**：要能画出解释器模式的类图（抽象表达式、终结符/非终结符表达式、上下文的关系）
- **适用性分析**：题目出现"需要解释特定语法/规则"时考虑该模式
- **对比其他模式**：
  - 与组合模式相似（都有树形结构），但目的不同
  - 与访问者模式的区别（访问者侧重操作，解释器侧重解析）

### 8. 举个新例子（帮你理解扩展性）

假设要新增"音量"解析规则：

1. 新增`音量`类继承`表达式`
2. 在`执行`方法中实现"V 0.8"→"强"的转换
3. 在主类 switch-case 中增加对"V"的判断

这样不需要修改现有代码就扩展了新功能，体现了开闭原则。

希望这个解释对你有帮助！备考时可以多画几次这个模式的 UML 图，理解各个类的关系。

</AppTab>
</AppTabs>
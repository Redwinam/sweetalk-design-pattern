---
layout: home

hero:
  name: "大话设计模式"
  text: "Design Patterns Notes"
  tagline: 深入浅出设计模式与设计原则，掌握面向对象设计的精髓。
  actions:
    - theme: brand
      text: 开始阅读
      link: /introduction
    - theme: alt
      text: 浏览设计模式
      link: /design_pattern/simple_factory
    - theme: alt
      text: 查看设计原则
      link: /design_principles/single_responsiblity_principle

features:
  - title: 💡 设计原则 (Design Principles)
    details: SOLID 五大原则与其他核心设计理念，构建高质量代码的基石。
    link: /design_principles/single_responsiblity_principle
  - title: 🏭 创建型模式 (Creational)
    details: 关注对象的创建过程，解耦对象的创建与使用。
    link: /design_pattern/simple_factory
  - title: 🏗️ 结构型模式 (Structural)
    details: 关注类和对象的组合，简化系统的结构设计。
    link: /design_pattern/adapter
  - title: 🔄 行为型模式 (Behavioral)
    details: 关注对象之间的通信与职责分配，提升系统的灵活性。
    link: /design_pattern/strategy
---

<style>
.pattern-index {
  margin-top: 40px;
}

.pattern-group {
  margin-bottom: 30px;
}

.pattern-group h2 {
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.pattern-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.pattern-item {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
}

.pattern-item:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-mute);
}

.pattern-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  display: block;
}

.pattern-en {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
}
</style>

<div class="pattern-index">

<div class="pattern-group">
  <h2>📐 设计原则 (Design Principles)</h2>
  <div class="pattern-list">
    <a href="./design_principles/single_responsiblity_principle" class="pattern-item">
      <span class="pattern-name">单一职责原则</span>
      <span class="pattern-en">Single Responsibility Principle</span>
    </a>
    <a href="./design_principles/open_closed_principle" class="pattern-item">
      <span class="pattern-name">开闭原则</span>
      <span class="pattern-en">Open Closed Principle</span>
    </a>
    <a href="./design_principles/dependence_inversion_principle" class="pattern-item">
      <span class="pattern-name">依赖倒置原则</span>
      <span class="pattern-en">Dependence Inversion Principle</span>
    </a>
    <a href="./design_principles/liskov_substituion_principle" class="pattern-item">
      <span class="pattern-name">里氏替换原则</span>
      <span class="pattern-en">Liskov Substitution Principle</span>
    </a>
    <a href="./design_principles/law_of_demeter" class="pattern-item">
      <span class="pattern-name">迪米特法则</span>
      <span class="pattern-en">Law of Demeter</span>
    </a>
  </div>
</div>

<div class="pattern-group">
  <h2>🏭 创建型模式 (Creational Patterns)</h2>
  <div class="pattern-list">
    <a href="./design_pattern/simple_factory" class="pattern-item">
      <span class="pattern-name">简单工厂模式</span>
      <span class="pattern-en">Simple Factory</span>
    </a>
    <a href="./design_pattern/factory_method" class="pattern-item">
      <span class="pattern-name">工厂方法模式</span>
      <span class="pattern-en">Factory Method</span>
    </a>
    <a href="./design_pattern/abstract_factory" class="pattern-item">
      <span class="pattern-name">抽象工厂模式</span>
      <span class="pattern-en">Abstract Factory</span>
    </a>
    <a href="./design_pattern/builder" class="pattern-item">
      <span class="pattern-name">建造者模式</span>
      <span class="pattern-en">Builder</span>
    </a>
    <a href="./design_pattern/prototype" class="pattern-item">
      <span class="pattern-name">原型模式</span>
      <span class="pattern-en">Prototype</span>
    </a>
    <a href="./design_pattern/singleton" class="pattern-item">
      <span class="pattern-name">单例模式</span>
      <span class="pattern-en">Singleton</span>
    </a>
  </div>
</div>

<div class="pattern-group">
  <h2>🏗️ 结构型模式 (Structural Patterns)</h2>
  <div class="pattern-list">
    <a href="./design_pattern/adapter" class="pattern-item">
      <span class="pattern-name">适配器模式</span>
      <span class="pattern-en">Adapter</span>
    </a>
    <a href="./design_pattern/bridge" class="pattern-item">
      <span class="pattern-name">桥接模式</span>
      <span class="pattern-en">Bridge</span>
    </a>
    <a href="./design_pattern/composite" class="pattern-item">
      <span class="pattern-name">组合模式</span>
      <span class="pattern-en">Composite</span>
    </a>
    <a href="./design_pattern/decorator" class="pattern-item">
      <span class="pattern-name">装饰模式</span>
      <span class="pattern-en">Decorator</span>
    </a>
    <a href="./design_pattern/facade" class="pattern-item">
      <span class="pattern-name">外观模式</span>
      <span class="pattern-en">Facade</span>
    </a>
    <a href="./design_pattern/flyweight" class="pattern-item">
      <span class="pattern-name">享元模式</span>
      <span class="pattern-en">Flyweight</span>
    </a>
    <a href="./design_pattern/proxy" class="pattern-item">
      <span class="pattern-name">代理模式</span>
      <span class="pattern-en">Proxy</span>
    </a>
  </div>
</div>

<div class="pattern-group">
  <h2>🔄 行为型模式 (Behavioral Patterns)</h2>
  <div class="pattern-list">
    <a href="./design_pattern/chain_of_responsibility" class="pattern-item">
      <span class="pattern-name">职责链模式</span>
      <span class="pattern-en">Chain of Responsibility</span>
    </a>
    <a href="./design_pattern/command" class="pattern-item">
      <span class="pattern-name">命令模式</span>
      <span class="pattern-en">Command</span>
    </a>
    <a href="./design_pattern/interpreter" class="pattern-item">
      <span class="pattern-name">解释器模式</span>
      <span class="pattern-en">Interpreter</span>
    </a>
    <a href="./design_pattern/iterator" class="pattern-item">
      <span class="pattern-name">迭代器模式</span>
      <span class="pattern-en">Iterator</span>
    </a>
    <a href="./design_pattern/mediator" class="pattern-item">
      <span class="pattern-name">中介者模式</span>
      <span class="pattern-en">Mediator</span>
    </a>
    <a href="./design_pattern/memento" class="pattern-item">
      <span class="pattern-name">备忘录模式</span>
      <span class="pattern-en">Memento</span>
    </a>
    <a href="./design_pattern/observer" class="pattern-item">
      <span class="pattern-name">观察者模式</span>
      <span class="pattern-en">Observer</span>
    </a>
    <a href="./design_pattern/state" class="pattern-item">
      <span class="pattern-name">状态模式</span>
      <span class="pattern-en">State</span>
    </a>
    <a href="./design_pattern/strategy" class="pattern-item">
      <span class="pattern-name">策略模式</span>
      <span class="pattern-en">Strategy</span>
    </a>
    <a href="./design_pattern/template_method" class="pattern-item">
      <span class="pattern-name">模板方法模式</span>
      <span class="pattern-en">Template Method</span>
    </a>
    <a href="./design_pattern/visitor" class="pattern-item">
      <span class="pattern-name">访问者模式</span>
      <span class="pattern-en">Visitor</span>
    </a>
  </div>
</div>

</div>

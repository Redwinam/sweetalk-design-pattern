import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "大话设计模式",
  description: "设计模式学习笔记",
  base: '/sweetalk-design-pattern/',
  themeConfig: {
    nav: [
      { text: '首页 (Home)', link: '/' },
      { text: '简介 (Introduction)', link: '/introduction' },
      { text: '设计原则 (Design Principles)', link: '/design_principles/single_responsiblity_principle' },
      { text: '设计模式 (Design Patterns)', link: '/design_pattern/simple_factory' }
    ],

    sidebar: [
      {
        text: '简介 (Introduction)',
        items: [
          { text: '简介 (Introduction)', link: '/introduction' }
        ]
      },
      {
        text: '设计原则 (Design Principles)',
        items: [
          { text: '单一职责原则 (Single Responsibility Principle)', link: '/design_principles/single_responsiblity_principle' },
          { text: '开闭原则 (Open Closed Principle)', link: '/design_principles/open_closed_principle' },
          { text: '依赖倒置原则 (Dependence Inversion Principle)', link: '/design_principles/dependence_inversion_principle' },
          { text: '里氏替换原则 (Liskov Substitution Principle)', link: '/design_principles/liskov_substituion_principle' },
          { text: '迪米特法则 (Law of Demeter)', link: '/design_principles/law_of_demeter' }
        ]
      },
      {
        text: '设计模式 (Design Patterns)',
        items: [
          { text: '简单工厂模式 (Simple Factory)', link: '/design_pattern/simple_factory' },
          { text: '策略模式 (Strategy)', link: '/design_pattern/strategy' },
          { text: '装饰模式 (Decorator)', link: '/design_pattern/decorator' },
          { text: '代理模式 (Proxy)', link: '/design_pattern/proxy' },
          { text: '工厂方法模式 (Factory Method)', link: '/design_pattern/factory_method' },
          { text: '原型模式 (Prototype)', link: '/design_pattern/prototype' },
          { text: '模板方法模式 (Template Method)', link: '/design_pattern/template_method' },
          { text: '外观模式 (Facade)', link: '/design_pattern/facade' },
          { text: '建造者模式 (Builder)', link: '/design_pattern/builder' },
          { text: '观察者模式 (Observer)', link: '/design_pattern/observer' },
          { text: '抽象工厂模式 (Abstract Factory)', link: '/design_pattern/abstract_factory' },
          { text: '状态模式 (State)', link: '/design_pattern/state' },
          { text: '适配器模式 (Adapter)', link: '/design_pattern/adapter' },
          { text: '备忘录模式 (Memento)', link: '/design_pattern/memento' },
          { text: '组合模式 (Composite)', link: '/design_pattern/composite' },
          { text: '迭代器模式 (Iterator)', link: '/design_pattern/iterator' },
          { text: '单例模式 (Singleton)', link: '/design_pattern/singleton' },
          { text: '桥接模式 (Bridge)', link: '/design_pattern/bridge' },
          { text: '命令模式 (Command)', link: '/design_pattern/command' },
          { text: '职责链模式 (Chain of Responsibility)', link: '/design_pattern/chain_of_responsibility' },
          { text: '中介者模式 (Mediator)', link: '/design_pattern/mediator' },
          { text: '享元模式 (Flyweight)', link: '/design_pattern/flyweight' },
          { text: '解释器模式 (Interpreter)', link: '/design_pattern/interpreter' },
          { text: '访问者模式 (Visitor)', link: '/design_pattern/visitor' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "大话设计模式",
  description: "设计模式学习笔记",
  base: '/sweetalk-design-pattern/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '简介', link: '/introduction' },
      {
        text: '设计原则',
        items: [
          { text: '单一职责原则', link: '/design_principles/single_responsiblity_principle' },
          { text: '开闭原则', link: '/design_principles/open_closed_principle' },
          { text: '依赖倒置原则', link: '/design_principles/dependence_inversion_principle' },
          { text: '里氏替换原则', link: '/design_principles/liskov_substituion_principle' },
          { text: '迪米特法则', link: '/design_principles/law_of_demeter' }
        ]
      },
      {
        text: '设计模式',
        items: [
          {
            text: '创建型模式',
            items: [
              { text: '简单工厂模式', link: '/design_pattern/simple_factory' },
              { text: '工厂方法模式', link: '/design_pattern/factory_method' },
              { text: '抽象工厂模式', link: '/design_pattern/abstract_factory' },
              { text: '建造者模式', link: '/design_pattern/builder' },
              { text: '原型模式', link: '/design_pattern/prototype' },
              { text: '单例模式', link: '/design_pattern/singleton' }
            ]
          },
          {
            text: '结构型模式',
            items: [
              { text: '适配器模式', link: '/design_pattern/adapter' },
              { text: '桥接模式', link: '/design_pattern/bridge' },
              { text: '组合模式', link: '/design_pattern/composite' },
              { text: '装饰模式', link: '/design_pattern/decorator' },
              { text: '外观模式', link: '/design_pattern/facade' },
              { text: '享元模式', link: '/design_pattern/flyweight' },
              { text: '代理模式', link: '/design_pattern/proxy' }
            ]
          },
          {
            text: '行为型模式',
            items: [
              { text: '职责链模式', link: '/design_pattern/chain_of_responsibility' },
              { text: '命令模式', link: '/design_pattern/command' },
              { text: '解释器模式', link: '/design_pattern/interpreter' },
              { text: '迭代器模式', link: '/design_pattern/iterator' },
              { text: '中介者模式', link: '/design_pattern/mediator' },
              { text: '备忘录模式', link: '/design_pattern/memento' },
              { text: '观察者模式', link: '/design_pattern/observer' },
              { text: '状态模式', link: '/design_pattern/state' },
              { text: '策略模式', link: '/design_pattern/strategy' },
              { text: '模板方法模式', link: '/design_pattern/template_method' },
              { text: '访问者模式', link: '/design_pattern/visitor' }
            ]
          }
        ]
      }
    ],

    sidebar: [
      {
        text: '前言',
        items: [
          { text: '<div class="sb-item"><span class="sb-cn">简介</span><span class="sb-en">Introduction</span></div>', link: '/introduction' }
        ]
      },
      {
        text: '设计原则',
        items: [
          { text: '<div class="sb-item"><span class="sb-cn">单一职责原则</span><span class="sb-en">Single Responsibility Principle</span></div>', link: '/design_principles/single_responsiblity_principle' },
          { text: '<div class="sb-item"><span class="sb-cn">开闭原则</span><span class="sb-en">Open Closed Principle</span></div>', link: '/design_principles/open_closed_principle' },
          { text: '<div class="sb-item"><span class="sb-cn">依赖倒置原则</span><span class="sb-en">Dependence Inversion Principle</span></div>', link: '/design_principles/dependence_inversion_principle' },
          { text: '<div class="sb-item"><span class="sb-cn">里氏替换原则</span><span class="sb-en">Liskov Substitution Principle</span></div>', link: '/design_principles/liskov_substituion_principle' },
          { text: '<div class="sb-item"><span class="sb-cn">迪米特法则</span><span class="sb-en">Law of Demeter</span></div>', link: '/design_principles/law_of_demeter' }
        ]
      },
      {
        text: '设计模式',
        items: [
          { text: '<div class="sb-item"><span class="sb-cn">简单工厂模式</span><span class="sb-en">Simple Factory</span></div>', link: '/design_pattern/simple_factory' },
          { text: '<div class="sb-item"><span class="sb-cn">策略模式</span><span class="sb-en">Strategy</span></div>', link: '/design_pattern/strategy' },
          { text: '<div class="sb-item"><span class="sb-cn">装饰模式</span><span class="sb-en">Decorator</span></div>', link: '/design_pattern/decorator' },
          { text: '<div class="sb-item"><span class="sb-cn">代理模式</span><span class="sb-en">Proxy</span></div>', link: '/design_pattern/proxy' },
          { text: '<div class="sb-item"><span class="sb-cn">工厂方法模式</span><span class="sb-en">Factory Method</span></div>', link: '/design_pattern/factory_method' },
          { text: '<div class="sb-item"><span class="sb-cn">原型模式</span><span class="sb-en">Prototype</span></div>', link: '/design_pattern/prototype' },
          { text: '<div class="sb-item"><span class="sb-cn">模板方法模式</span><span class="sb-en">Template Method</span></div>', link: '/design_pattern/template_method' },
          { text: '<div class="sb-item"><span class="sb-cn">外观模式</span><span class="sb-en">Facade</span></div>', link: '/design_pattern/facade' },
          { text: '<div class="sb-item"><span class="sb-cn">建造者模式</span><span class="sb-en">Builder</span></div>', link: '/design_pattern/builder' },
          { text: '<div class="sb-item"><span class="sb-cn">观察者模式</span><span class="sb-en">Observer</span></div>', link: '/design_pattern/observer' },
          { text: '<div class="sb-item"><span class="sb-cn">抽象工厂模式</span><span class="sb-en">Abstract Factory</span></div>', link: '/design_pattern/abstract_factory' },
          { text: '<div class="sb-item"><span class="sb-cn">状态模式</span><span class="sb-en">State</span></div>', link: '/design_pattern/state' },
          { text: '<div class="sb-item"><span class="sb-cn">适配器模式</span><span class="sb-en">Adapter</span></div>', link: '/design_pattern/adapter' },
          { text: '<div class="sb-item"><span class="sb-cn">备忘录模式</span><span class="sb-en">Memento</span></div>', link: '/design_pattern/memento' },
          { text: '<div class="sb-item"><span class="sb-cn">组合模式</span><span class="sb-en">Composite</span></div>', link: '/design_pattern/composite' },
          { text: '<div class="sb-item"><span class="sb-cn">迭代器模式</span><span class="sb-en">Iterator</span></div>', link: '/design_pattern/iterator' },
          { text: '<div class="sb-item"><span class="sb-cn">单例模式</span><span class="sb-en">Singleton</span></div>', link: '/design_pattern/singleton' },
          { text: '<div class="sb-item"><span class="sb-cn">桥接模式</span><span class="sb-en">Bridge</span></div>', link: '/design_pattern/bridge' },
          { text: '<div class="sb-item"><span class="sb-cn">命令模式</span><span class="sb-en">Command</span></div>', link: '/design_pattern/command' },
          { text: '<div class="sb-item"><span class="sb-cn">职责链模式</span><span class="sb-en">Chain of Responsibility</span></div>', link: '/design_pattern/chain_of_responsibility' },
          { text: '<div class="sb-item"><span class="sb-cn">中介者模式</span><span class="sb-en">Mediator</span></div>', link: '/design_pattern/mediator' },
          { text: '<div class="sb-item"><span class="sb-cn">享元模式</span><span class="sb-en">Flyweight</span></div>', link: '/design_pattern/flyweight' },
          { text: '<div class="sb-item"><span class="sb-cn">解释器模式</span><span class="sb-en">Interpreter</span></div>', link: '/design_pattern/interpreter' },
          { text: '<div class="sb-item"><span class="sb-cn">访问者模式</span><span class="sb-en">Visitor</span></div>', link: '/design_pattern/visitor' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Redwinam/sweetalk-design-pattern' }
    ]
  }
})

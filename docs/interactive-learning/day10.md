# Day10 ETF 轮动与组合思维

## Today Goal
从单一策略走向组合，理解宽基、行业、相关性、权重和调仓周期。

## Why This Matters
量化不只是买卖一个标的，更重要的是在多个选择之间制定规则。

## Core Concepts
- 轮动：在多个标的中按规则切换；边界是轮动会增加成本和误判。
- 权重：每个入选标的分配多少资金；边界是等权不一定最优，但简单可解释。
- 调仓周期：组合多久更新一次；常见错误是忽略交易成本。

## Underlying Architecture
```text
标的池 -> 打分 -> 选择 -> 权重 -> 调仓 -> 组合评估
```

## Data And Logic Flow
输入 ETF 标的池，计算每个标的得分，按规则选择标的，分配权重，按周期调仓并评估。

## Key Technical Points
- 标的池要事前固定。
- 打分规则要可解释。
- 调仓周期影响成本。
- 组合要看整体回撤和相关性。

## Upstream Dependencies And Downstream Applications
上游依赖风控规则；下游进入完整策略报告。

## Production Example
每月从 5 个宽基 ETF 中选择过去 60 日涨幅最高且在 20 日均线上的前 2 个，等权持有。

## Counterexample
看到哪个 ETF 涨就手动加入标的池，回测时只保留表现好的品种。

## Hands-On Practice
填写 ETF 轮动计划：标的池、打分指标、过滤条件、选择数量、权重方式、调仓周期、成本假设、失败场景。

## Exploration Prompt
选择 3 个宽基 ETF，判断它们是否真的提供了不同风险暴露。

## Quiz
1. 轮动策略在做什么？
2. 为什么排序后还要考虑权重？
3. 调仓越频繁一定越好吗？
4. 标的池为什么要事前固定？

## Review And Reinforcement
频繁切换时复习调仓周期；只排序不配权时复习权重；事后改标的池时复习轮动边界。

## References
- 上交所股票投资服务：https://one.sse.com.cn/onething/gptz/
- SEC Diversification：https://www.sec.gov/investor/pubs/assetallocation.htm


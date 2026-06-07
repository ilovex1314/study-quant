# Day12 模拟跟踪与学习闭环

## Today Goal
建立策略日志，记录信号、执行偏差、市场环境和每周复盘。

## Why This Matters
从回测到现实之间有巨大差距。模拟跟踪能让学习者在不承担实盘压力时发现问题。

## Core Concepts
- 模拟跟踪：不用实盘资金记录策略实时表现；边界是不能完全复制实盘心理和成交。
- 策略日志：记录信号、原因、执行和复盘；常见错误是只在赚钱时记录。
- 学习闭环：用复盘结果决定下一步学习和研究；边界是修改策略要回到研究流程。

## Underlying Architecture
```text
记录信号 -> 模拟执行 -> 偏差比较 -> 每周复盘 -> 迭代决策
```

## Data And Logic Flow
输入每日或每周信号，记录模拟交易，更新收益和回撤，写复盘日志，输出下一步决策。

## Key Technical Points
- 模拟规则必须和回测规则一致。
- 记录未执行原因和心理偏差。
- 每周固定复盘。
- 策略修改必须重新回测。

## Upstream Dependencies And Downstream Applications
上游依赖策略报告；下游可以进入长期模拟、复盘和第二阶段编程实战。

## Production Example
每周五记录 ETF 轮动策略的入选标的、模拟仓位、与基准差异和下周观察点。

## Counterexample
看到模拟亏损就临时改规则，后续再也无法判断原策略是否有效。

## Hands-On Practice
填写模拟跟踪表：日期、策略信号、模拟动作、仓位、当前收益、当前回撤、和基准差异、市场环境、复盘结论、下一步。

## Exploration Prompt
设计一个你愿意每周填写 10 分钟的复盘表，而不是复杂到无法坚持的表。

## Quiz
1. 模拟跟踪的核心价值是什么？
2. 策略日志应该记录什么？
3. 修改策略前应该做什么？
4. 模拟跟踪不能完全替代什么？

## Review And Reinforcement
模拟也随意改规则时复习模拟跟踪；只记盈利时复习策略日志；凭感受改策略时复习学习闭环。

## References
- SEC 投资入门：https://www.investor.gov/introduction-investing
- SEC Risk and Return：https://www.investor.gov/introduction-investing/investing-basics/risk-and-return

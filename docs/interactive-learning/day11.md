# Day11 策略研究报告

## Today Goal
把代码结果整理成假设、数据、规则、表现、风险和下一步，完成策略报告大纲。

## Why This Matters
没有报告，策略研究很快会变成零散图表和记忆偏差。

## Core Concepts
- 报告结构：用固定结构记录研究；边界是报告不是投资承诺。
- 证据链：结论必须能追溯到数据和规则；常见错误是结论没有来源。
- 下一步决策：决定放弃、修改或进入模拟；边界是模拟不是实盘。

## Underlying Architecture
```text
假设 -> 数据 -> 规则 -> 结果 -> 风险 -> 结论 -> 下一步
```

## Data And Logic Flow
输入回测结果，关联假设和规则，解释指标和失败阶段，输出研究结论，决定下一步。

## Key Technical Points
- 每个结论都要有数据支持。
- 要写失败条件和不适用环境。
- 报告要保留参数和版本。
- 建议和执行要分开。

## Upstream Dependencies And Downstream Applications
上游依赖组合策略和风控；下游进入模拟跟踪。

## Production Example
均线策略报告结论：趋势市改善回撤，但震荡市频繁亏损，建议进入 8 周模拟观察而不是直接执行。

## Counterexample
只写策略收益超过基准，不写数据区间、成本假设和失败阶段。

## Hands-On Practice
填写策略报告大纲：研究假设、数据来源、策略规则、回测设置、收益指标、风险指标、失败阶段、结论、下一步。

## Exploration Prompt
把一个漂亮的回测截图改写成完整报告问题清单。

## Quiz
1. 策略报告最重要的作用是什么？
2. 证据链要求什么？
3. 回测结果好之后合理下一步是什么？
4. 报告中为什么要写失败条件？

## Review And Reinforcement
只有图表时复习报告结构；结论无来源时复习证据链；回测好就想执行时复习下一步决策。

## References
- CFA 课程概览：https://www.cfainstitute.org/programs/cfa-program/curriculum
- SEC 投资入门：https://www.investor.gov/introduction-investing


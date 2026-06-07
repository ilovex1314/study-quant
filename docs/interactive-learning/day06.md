# Day06 第一张收益曲线

## Today Goal
从价格序列计算累计收益、年化收益、波动率和最大回撤，并解释收益曲线背后的风险。

## Why This Matters
策略研究不能只看最终赚了多少，还要知道过程里怎么波动、怎么亏、亏多久。

## Core Concepts
- 累计收益曲线：展示收益随时间变化的路径；边界是曲线漂亮不代表未来可靠。
- 最大回撤：从历史峰值到低点的最大跌幅；边界是历史最大回撤不等于未来最大损失。
- 指标解释：把数字翻译成可理解结论；常见错误是只报高收益指标。

## Underlying Architecture
```text
复权价格 -> 日收益 -> 累计收益 -> 回撤 -> 指标表 -> 风险解释
```

## Data And Logic Flow
输入复权收盘价，计算日收益率，生成累计收益曲线，计算波动率和最大回撤，输出指标解释。

## Key Technical Points
- 累计收益通常使用连乘。
- 最大回撤需要记录历史高点。
- 年化指标要说明交易日假设。
- 指标必须和基准比较。

## Upstream Dependencies And Downstream Applications
上游依赖 Day05 的时间序列数据；下游用于策略回测报告。

## Production Example
比较一个宽基 ETF 与基准指数的累计收益曲线，并解释它的回撤阶段。

## Counterexample
只输出年化收益 20%，不说明最大回撤 35%，会严重误导判断。

## Hands-On Practice
填写收益曲线报告：标的、数据区间、累计收益、年化收益、年化波动、最大回撤、基准比较、一句话结论。

## Exploration Prompt
找一条资产曲线，指出最难持有的时间段在哪里。

## Quiz
1. 累计收益曲线展示什么？
2. 最大回撤衡量什么？
3. 为什么指标要和基准比较？
4. 只看最终收益的问题是什么？

## Review And Reinforcement
只看终点时复习累计收益曲线；忽略亏损时复习最大回撤；指标没有解释时复习策略报告。

## References
- SEC Risk and Return：https://www.investor.gov/introduction-investing/investing-basics/risk-and-return
- pandas rolling：https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html


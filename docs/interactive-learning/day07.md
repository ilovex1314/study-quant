# Day07 第一个均线策略

## Today Goal
用均线把趋势想法转成明确买卖规则，并理解信号和执行的时间差。

## Why This Matters
均线策略简单，但它包含策略开发的核心：假设、参数、信号、执行、失败场景。

## Core Concepts
- 均线：过去一段时间价格的平均值；边界是均线滞后，不会预测拐点。
- 信号生成：把均线条件转成买卖信号；边界是信号不是成交。
- 参数选择：均线窗口是策略参数；边界是不能事后挑最优。

## Underlying Architecture
```text
价格序列 -> 计算均线 -> 生成信号 -> 下一期执行 -> 评估失败
```

## Data And Logic Flow
输入价格序列，计算 N 日均线，比较价格和均线，生成下一交易日信号，记录震荡期表现。

## Key Technical Points
- 信号和执行至少错开一期。
- 均线窗口要事前设定。
- 震荡市场要重点分析。
- 和买入持有基准比较。

## Upstream Dependencies And Downstream Applications
上游依赖收益曲线和时间序列；下游进入回测陷阱检查。

## Production Example
当 ETF 收盘价站上 20 日均线，下一交易日买入；跌破 20 日均线，下一交易日卖出。

## Counterexample
当天收盘发现站上均线，又假设当天收盘买入，这是未来函数。

## Hands-On Practice
填写均线策略规则卡：标的、均线窗口、买入信号、卖出信号、执行价格假设、调仓频率、失败场景、基准。

## Exploration Prompt
比较 10 日、20 日、60 日均线分别更像短期、中期还是长期趋势。

## Quiz
1. 均线主要描述什么？
2. 为什么信号和执行要错开？
3. 参数选择最常见风险是什么？
4. 均线策略在哪种环境容易失败？

## Review And Reinforcement
认为均线能预测拐点时复习均线边界；同日成交时复习信号层；追求最优参数时复习反馈循环。

## References
- pandas rolling：https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html
- statsmodels 时间序列：https://www.statsmodels.org/stable/tsa


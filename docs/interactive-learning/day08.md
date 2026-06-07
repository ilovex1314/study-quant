# Day08 回测陷阱

## Today Goal
识别未来函数、过拟合、幸存者偏差、忽略成本等常见问题。

## Why This Matters
量化新手最容易被漂亮回测误导。会找错，比会调参数更重要。

## Core Concepts
- 未来函数：使用当时无法知道的信息；常见错误是用收盘后信号按同一收盘价成交。
- 过拟合：规则过度适配历史噪声；常见错误是只报告最优参数组合。
- 成本与约束：费用、滑点、停牌、涨跌停等执行条件；边界是日线仍是近似模拟。

## Underlying Architecture
```text
回测结果 -> 时间检查 -> 样本检查 -> 成本检查 -> 参数检查 -> 压力阶段
```

## Data And Logic Flow
输入回测结果，检查时间对齐、样本范围、交易成本、参数选择过程，输出可信度结论。

## Key Technical Points
- 任何用未来价格生成当前信号的逻辑都要拒绝。
- 调参过程要记录。
- 交易成本不是可选项。
- 失败阶段要单独分析。

## Upstream Dependencies And Downstream Applications
上游依赖均线策略；下游进入仓位和风险控制。

## Production Example
均线策略报告中明确说明：信号在收盘后生成，下一交易日执行，并加入费用假设。

## Counterexample
只展示最优参数收益，不展示其他参数和失败区间。

## Hands-On Practice
填写回测审查清单：时间对齐、样本范围、手续费、滑点、停牌处理、涨跌停处理、参数选择、失败阶段。

## Exploration Prompt
找一个策略截图，推测它可能漏掉了哪些回测设定。

## Quiz
1. 未来函数是什么？
2. 过拟合的典型表现是什么？
3. 为什么不能假设零成本频繁交易？
4. 回测报告为什么要写失败阶段？

## Review And Reinforcement
收益异常好时先查未来函数；只有最优参数时复习过拟合；没有费用时复习成本与约束。

## References
- 上交所交易规则：https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20260424_10816492.shtml
- pandas shift：https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.shift.html


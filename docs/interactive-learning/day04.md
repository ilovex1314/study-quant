# Day04 编程落地的最小架构

## Today Goal

理解量化编程不是一上来写自动交易，而是先把研究流程拆成可维护的代码模块：数据、规则、信号、回测、指标、报告。

今天结束后，你应该能设计一个最小量化研究项目的目录结构和数据流。

## Why This Matters

如果没有架构，量化代码很容易变成一个巨大的脚本：下载数据、算指标、买卖判断、画图、输出结论全混在一起。这样的代码难以检查未来函数，也难以复用。

工程化的量化学习应该从最小可测试架构开始。

## Core Concepts

### 数据层

数据层负责读取、清洗和对齐行情数据。

它解决的问题是让策略使用可信输入。边界是：数据层不应该包含买卖逻辑。常见错误是在策略里临时处理缺失值，导致行为不一致。

### 信号层

信号层负责把规则转成买入、卖出或持有信号。

它解决的问题是让策略逻辑可读、可测试。边界是：信号层不负责资金曲线。常见错误是信号计算时偷看未来数据。

### 回测层

回测层负责把信号转换成模拟交易和资金曲线。

它解决的问题是评估规则过去表现。边界是：回测不是未来保证。常见错误是忽略成本、滑点和市场约束。

### 报告层

报告层负责把结果变成可复盘结论。

它解决的问题是避免只看图不看原因。边界是：报告不能替代持续模拟跟踪。常见错误是只输出最终收益率。

## Underlying Architecture

建议画一张“最小量化代码架构”：

```text
data/
  -> load_prices()
  -> clean_prices()

strategy/
  -> generate_signal()

backtest/
  -> simulate_trades()
  -> apply_costs()

metrics/
  -> annual_return()
  -> max_drawdown()
  -> volatility()

reports/
  -> render_report()
```

模块边界要清楚：数据层只产出干净数据，策略层只产出信号，回测层只模拟执行，指标层只计算评价，报告层只组织结论。

## Data And Logic Flow

输入：原始日线数据。

处理：

```text
原始数据
  -> 清洗和复权
  -> 计算特征
  -> 生成信号
  -> 模拟成交
  -> 计算资金曲线
  -> 计算指标
  -> 输出报告
```

状态：每一步都要能单独保存或检查中间结果。

输出：策略报告、交易记录、资金曲线和指标表。

反馈：如果指标异常，先检查数据和信号，再检查回测逻辑，不要直接改策略参数。

## Key Technical Points

- 用函数边界防止所有逻辑混在一个脚本里。
- 每个函数都要有明确输入和输出。
- 回测中信号生成和交易执行要错开时间，避免未来函数。
- 指标计算要独立，便于不同策略复用。
- 报告要包含失败阶段，不只展示成功结果。

## Upstream Dependencies And Downstream Applications

上游依赖：Day01 的策略假设、Day02 的研究流程、Day03 的市场约束。

下游应用：后续可以用 Python 和 pandas 实现第一张收益曲线、均线策略、ETF 轮动和策略报告自动生成。

## Production Example

最小项目目录：

```text
quant-research/
  data/
    prices.csv
  src/
    data_loader.py
    signals.py
    backtest.py
    metrics.py
    report.py
  reports/
    ma_strategy_report.md
```

这个结构比一个 `main.py` 更容易测试和复盘。

## Counterexample

错误做法：在一个脚本里下载数据、补缺失值、计算均线、生成买卖点、计算收益、画图，最后手动改参数直到收益好看。

问题：无法判断收益来自策略逻辑还是代码错误，也很难发现未来函数和过拟合。

## Hands-On Practice

为 Day02 的策略研究计划设计代码模块：

```text
数据输入：
需要清洗的问题：
信号函数输入：
信号函数输出：
回测函数输入：
回测函数输出：
需要计算的指标：
报告要包含的结论：
```

验收：每个模块只做一类事情，且能说清楚输入和输出。

## Exploration Prompt

找一个你写过的脚本，尝试把它拆成“数据、逻辑、输出、报告”四层。

## Quiz

1. 为什么量化代码不应该一开始就写成一个大脚本？
2. 数据层和信号层的职责有什么区别？
3. 为什么信号生成和交易执行要错开时间？
4. 指标层为什么应该独立？
5. 报告层除了收益率还应该输出什么？

## Review And Reinforcement

- 如果你的函数既读数据又交易，复习“数据层”和“回测层”。
- 如果你无法检查中间结果，复习“Data And Logic Flow”。
- 如果你只输出收益率，复习“报告层”。
- 用一句话复盘：这个代码结构能否帮助我发现策略错误？

## References

- pandas 时间序列文档：https://pandas.pydata.org/docs/user_guide/timeseries.html
- statsmodels 时间序列文档：https://www.statsmodels.org/stable/tsa
- 上海证券交易所交易规则：https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20260424_10816492.shtml

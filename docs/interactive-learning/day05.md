# Day05 Python 时间序列入门

## Today Goal
理解日线行情数据进入代码后的基本处理方式：日期索引、排序、复权价格、收益率和滚动窗口。

## Why This Matters
量化策略的所有判断都建立在数据上。数据层没弄清楚，后面的信号和回测都会失真。

## Core Concepts
- 时间序列：按时间顺序排列的数据，解决交易日计算问题；边界是它不是普通无序表格；常见错误是不排序就算涨跌幅。
- pandas 数据入口：用 Python 把 CSV 或接口结果变成 DataFrame，解决行情数据进入可计算状态的问题；边界是 pandas 只负责处理数据，不替你判断策略是否有效。
- 复权价格：让价格序列更适合历史比较；边界是复权方式必须在报告里说明；常见错误是混用复权和不复权数据。
- 收益率：价格变化的比例表达，解决跨资产比较问题；边界是收益率不等于确定收益。

## Underlying Architecture
```text
原始行情 -> Python 读取 -> 日期索引 -> 复权处理 -> 收益率 -> 滚动窗口 -> 数据检查报告
```

## Data And Logic Flow
用 pandas 读取 CSV 或数据接口，把交易日期转成 datetime，按交易日排序并检查缺失，选择复权价格，计算日收益率和滚动指标。

## Key Technical Points
- 日期列要用 `pandas.to_datetime` 转成时间类型。
- 读取后先 `sort_values` 再 `set_index`。
- 收益率用 `pct_change` 计算，并避免首行空值污染。
- 滚动窗口用 `rolling`，只使用当前和过去数据。
- 数据质量检查要早于策略计算。

## Upstream Dependencies And Downstream Applications
上游依赖 Day04 的数据层概念；下游用于收益曲线、均线策略和回测。

## Production Example
读取一个宽基 ETF 日线，计算日收益率、20 日涨跌幅和 20 日波动率。

```python
import pandas as pd

df = pd.read_csv("prices.csv")
df["trade_date"] = pd.to_datetime(df["trade_date"])
df = df.sort_values("trade_date").set_index("trade_date")
df["ret"] = df["close"].pct_change()
df["ma20"] = df["close"].rolling(20).mean()
df["vol20"] = df["ret"].rolling(20).std()
```

## Counterexample
拿未排序数据直接 `pct_change`，得到的收益率看似有值但顺序错了。

## Hands-On Practice
填写 Python 行情数据检查清单：数据来源、pandas 读取方式、日期字段转换代码、价格字段、是否复权、缺失值处理、排序方式、收益率公式、rolling 窗口代码。

## Exploration Prompt
找一份日线表格，指出哪些列适合做输入，哪些列需要清洗后再用。

## Quiz
1. 时间序列数据最先要确认什么？
2. 复权价格主要解决什么问题？
3. 为什么常用收益率而不是价格点位比较资产？
4. 滚动窗口应该使用哪些数据？

## Review And Reinforcement
收益率异常时先检查日期排序；价格跳变很大时检查复权方式；指标过好时检查滚动窗口是否偷看未来。

## References
- pandas 时间序列：https://pandas.pydata.org/docs/user_guide/timeseries.html
- pandas 缺失值：https://pandas.pydata.org/docs/user_guide/missing_data.html

# Day09 仓位与风险控制

## Today Goal
学习仓位上限、分散、止损、回撤观察和再平衡，为策略设计基本风险控制规则。

## Why This Matters
策略会错，风控负责让错误不至于毁掉整个研究和执行过程。

## Core Concepts
- 仓位管理：决定每个信号投入多少资金；边界是仓位不能把坏策略变好。
- 回撤控制：观察资金曲线从高点回落的程度；边界是不能保证不亏。
- 分散：不要把风险集中在单一标的或单一逻辑；常见错误是买很多高度相关标的。

## Underlying Architecture
```text
策略信号 -> 仓位规则 -> 风险限制 -> 亏损处理 -> 再平衡
```

## Data And Logic Flow
输入策略信号，应用仓位规则，检查风险限制，模拟亏损场景，输出仓位和风险记录。

## Key Technical Points
- 仓位规则要写在回测前。
- 单一标的上限要明确。
- 高度相关资产不能假装分散。
- 风险触发后的动作要提前定义。

## Upstream Dependencies And Downstream Applications
上游依赖回测可信度检查；下游用于 ETF 轮动和策略报告。

## Production Example
ETF 轮动策略每次最多持有 3 个标的，单标的不超过 40%，保留至少 10% 现金。

## Counterexample
信号越强仓位越大，但没有上限，连续错误后回撤不可控。

## Hands-On Practice
填写风险控制规则：单标的上限、总仓位上限、现金比例、止损或观察规则、再平衡周期、最大可接受回撤、暂停条件、复盘动作。

## Exploration Prompt
比较两个收益相近但回撤不同的策略，判断哪个更容易长期执行。

## Quiz
1. 仓位管理主要解决什么？
2. 回撤控制不能做到什么？
3. 买很多高度相关资产的问题是什么？
4. 仓位规则应该什么时候确定？

## Review And Reinforcement
总想满仓时复习仓位管理；无视亏损阶段时复习回撤控制；相关资产太多时复习分散。

## References
- SEC Asset Allocation：https://www.sec.gov/investor/pubs/assetallocation.htm
- SEC Risk and Return：https://www.investor.gov/introduction-investing/investing-basics/risk-and-return


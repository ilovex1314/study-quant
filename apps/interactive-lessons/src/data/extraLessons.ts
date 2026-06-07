import type { LessonPage } from "./types";

const q = (id: string, label: string, correct = false) => ({ id, label, correct });

export const extraLessons: LessonPage[] = [
  {
    id: "day05",
    path: "/day05",
    title: "Day05 Python 时间序列入门",
    phase: "数据",
    summary: "用表格思维理解行情数据，学会日期索引、复权价格、收益率和滚动窗口。",
    goal: "知道一份日线行情数据进入代码后应该如何被读取、清洗和检查。",
    why: "量化策略的所有判断都建立在数据上。数据层没弄清楚，后面的信号和回测都会失真。",
    diagramTitle: "行情数据处理流",
    flow: [
      { id: "raw", label: "原始行情", detail: "日期、开高低收、成交量、成交额。" },
      { id: "index", label: "日期索引", detail: "按交易日排序并去重。" },
      { id: "python", label: "Python 读取", detail: "用 pandas read_csv、to_datetime 和 sort_values 建立数据表。" },
      { id: "adjust", label: "复权处理", detail: "处理分红、拆分等价格连续性问题。" },
      { id: "return", label: "收益率", detail: "把价格变化转成可比较的比例。" },
      { id: "window", label: "滚动窗口", detail: "计算均线、波动和阶段涨跌幅。" }
    ],
    concepts: [
      { id: "c1", concept: "python-timeseries", title: "时间序列", summary: "按时间顺序排列的数据。", solves: "让行情数据能按交易日计算。", boundary: "时间序列不是普通无序表格。", commonMistake: "不排序就直接计算涨跌幅。" },
      { id: "c0", concept: "python-implementation", title: "pandas 数据入口", summary: "用 Python 把 CSV 或接口结果变成 DataFrame。", solves: "让行情数据进入可计算状态。", boundary: "pandas 只负责处理数据，不替你判断策略是否有效。", commonMistake: "读入数据后不检查日期类型、排序和空值。" },
      { id: "c2", concept: "data-layer", title: "复权价格", summary: "让价格序列更适合做历史比较。", solves: "减少分红拆分对收益计算的扭曲。", boundary: "复权方式要在报告中说明。", commonMistake: "混用不复权和复权数据。" },
      { id: "c3", concept: "return-curve", title: "收益率", summary: "价格变化的比例表达。", solves: "让不同价格水平的资产可比较。", boundary: "收益率不等于确定收益。", commonMistake: "直接比较价格点位。" }
    ],
    dataFlow: ["用 pandas 读取 CSV 或数据接口。", "把 trade_date 转成 datetime 并排序。", "检查重复交易日、缺失价格和异常成交量。", "选择复权价格。", "用 pct_change 计算日收益率，用 rolling 计算滚动指标。"],
    technicalPoints: ["日期列要用 pandas.to_datetime 转成时间类型。", "读取后先 sort_values 再 set_index。", "收益率计算要避免首行空值污染。", "rolling 窗口只使用当前和过去数据。", "数据质量检查要早于策略计算。"],
    productionExample: "Python 最小片段：df = pd.read_csv('prices.csv'); df['trade_date'] = pd.to_datetime(df['trade_date']); df = df.sort_values('trade_date'); df['ret'] = df['close'].pct_change(); df['ma20'] = df['close'].rolling(20).mean()。",
    counterexample: "拿未排序数据直接 pct_change，得到的收益率看似有值但实际顺序错了。",
    practice: { title: "Python 行情数据检查清单", fields: ["数据来源", "pandas 读取方式", "日期字段转换代码", "价格字段", "是否复权", "缺失值处理", "排序方式", "收益率公式", "rolling 窗口代码"], acceptance: "能写出一段最小 pandas 代码，并说明每个字段为什么会影响后续策略。" },
    explorationPrompt: "找一份日线表格，指出哪些列适合做输入，哪些列需要清洗后再用。",
    questions: [
      { id: "d5q1", concept: "python-timeseries", prompt: "时间序列数据最先要确认什么？", options: [q("a", "日期顺序和唯一性", true), q("b", "字体大小"), q("c", "文件名长度"), q("d", "图表颜色")], explanation: "顺序错了，收益率和滚动窗口都会错。" },
      { id: "d5q2", concept: "data-layer", prompt: "复权价格主要解决什么问题？", options: [q("a", "价格连续性", true), q("b", "自动预测涨跌"), q("c", "删除风险"), q("d", "减少代码文件")], explanation: "复权让历史价格更适合比较。" },
      { id: "d5q3", concept: "return-curve", prompt: "为什么常用收益率而不是价格点位比较资产？", options: [q("a", "收益率更适合跨资产比较", true), q("b", "价格没有意义"), q("c", "收益率一定为正"), q("d", "价格不能画图")], explanation: "不同资产价格水平不同，比例变化更可比。" },
      { id: "d5q4", concept: "python-timeseries", prompt: "滚动窗口应该使用哪些数据？", options: [q("a", "当前和过去数据", true), q("b", "未来数据"), q("c", "随机数据"), q("d", "报告标题")], explanation: "使用未来数据会造成未来函数。" }
    ],
    reviewPrompts: ["如果收益率异常，先检查日期排序。", "如果价格跳变很大，检查复权方式。", "如果指标过好，检查滚动窗口是否偷看未来。"],
    references: [
      { label: "pandas 时间序列", url: "https://pandas.pydata.org/docs/user_guide/timeseries.html" },
      { label: "pandas 缺失值", url: "https://pandas.pydata.org/docs/user_guide/missing_data.html" }
    ]
  },
  {
    id: "day06",
    path: "/day06",
    title: "Day06 第一张收益曲线",
    phase: "分析",
    summary: "从价格序列计算累计收益、年化收益、波动率和最大回撤。",
    goal: "能够解释一条资金曲线背后的收益和风险。",
    why: "策略研究不能只看最终赚了多少，还要知道过程里怎么波动、怎么亏、亏多久。",
    diagramTitle: "价格到指标",
    flow: [
      { id: "price", label: "价格", detail: "复权收盘价。" },
      { id: "ret", label: "日收益", detail: "相邻交易日变化比例。" },
      { id: "curve", label: "累计收益", detail: "把每日收益连乘成曲线。" },
      { id: "drawdown", label: "回撤", detail: "从历史高点回落的幅度。" },
      { id: "metrics", label: "指标表", detail: "收益、波动、回撤一起看。" }
    ],
    concepts: [
      { id: "c1", concept: "return-curve", title: "累计收益曲线", summary: "把连续收益连接成资产净值路径。", solves: "展示收益过程。", boundary: "曲线漂亮不代表未来可靠。", commonMistake: "只看终点不看过程。" },
      { id: "c0", concept: "metric-calculation", title: "指标计算", summary: "用公式把收益、波动和回撤转成可复核数字。", solves: "让图形结论能被检查。", boundary: "指标只描述历史样本。", commonMistake: "只画曲线，不保留计算公式。" },
      { id: "c2", concept: "risk-control", title: "最大回撤", summary: "从历史峰值到低点的最大跌幅。", solves: "衡量策略最难熬的阶段。", boundary: "历史最大回撤不等于未来最大损失。", commonMistake: "忽略亏损过程。" },
      { id: "c3", concept: "strategy-report", title: "指标解释", summary: "把数字翻译成可理解的结论。", solves: "避免指标堆砌。", boundary: "指标不是实盘承诺。", commonMistake: "只报高收益指标。" }
    ],
    dataFlow: ["输入复权收盘价。", "计算日收益率。", "生成累计收益曲线。", "计算波动率和最大回撤。", "输出指标解释。"],
    technicalPoints: ["累计收益通常使用连乘。", "最大回撤需要记录历史高点。", "年化指标要说明交易日假设。", "指标必须和基准比较。"],
    productionExample: "比较一个宽基 ETF 与基准指数的累计收益曲线，解释它的回撤阶段。",
    counterexample: "只输出年化收益 20%，不说明最大回撤 35%，会严重误导判断。",
    practice: { title: "收益曲线报告", fields: ["标的", "数据区间", "累计收益", "年化收益", "年化波动", "最大回撤", "基准比较", "一句话结论"], acceptance: "能同时解释收益和风险。" },
    explorationPrompt: "找一条资产曲线，指出最难持有的时间段在哪里。",
    questions: [
      { id: "d6q1", concept: "return-curve", prompt: "累计收益曲线展示什么？", options: [q("a", "收益随时间变化的路径", true), q("b", "一定未来收益"), q("c", "交易所规则"), q("d", "股票名称")], explanation: "曲线展示过程，不保证未来。" },
      { id: "d6q2", concept: "risk-control", prompt: "最大回撤衡量什么？", options: [q("a", "从峰值到低点的损失幅度", true), q("b", "最高收益", false), q("c", "成交量", false), q("d", "代码复杂度", false)], explanation: "回撤是风险承受的核心指标。" },
      { id: "d6q3", concept: "strategy-report", prompt: "为什么指标要和基准比较？", options: [q("a", "判断表现是否有相对意义", true), q("b", "减少数据", false), q("c", "替代回测", false), q("d", "隐藏风险", false)], explanation: "没有基准，很难判断收益来自策略还是市场。" },
      { id: "d6q4", concept: "risk-control", prompt: "只看最终收益的问题是什么？", options: [q("a", "忽略波动和亏损过程", true), q("b", "太保守", false), q("c", "不需要数据", false), q("d", "不能画图", false)], explanation: "过程风险决定能否坚持策略。" }
    ],
    reviewPrompts: ["如果只看终点，复习累计收益曲线。", "如果忽略亏损，复习最大回撤。", "如果指标没有解释，复习策略报告。"],
    references: [
      { label: "SEC 风险与收益", url: "https://www.investor.gov/introduction-investing/investing-basics/risk-and-return" },
      { label: "pandas rolling", url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html" }
    ]
  },
  {
    id: "day07",
    path: "/day07",
    title: "Day07 第一个均线策略",
    phase: "策略",
    summary: "用均线把趋势想法转成明确买卖规则，并理解信号和执行的时间差。",
    goal: "写出一个均线策略的完整规则说明。",
    why: "均线策略简单，但它包含策略开发的核心：假设、参数、信号、执行、失败场景。",
    diagramTitle: "均线信号生成",
    flow: [
      { id: "price", label: "价格序列", detail: "复权收盘价。" },
      { id: "ma", label: "计算均线", detail: "短期或长期平均价格。" },
      { id: "signal", label: "生成信号", detail: "站上/跌破均线。" },
      { id: "execute", label: "下一期执行", detail: "避免同收盘价未来函数。" },
      { id: "review", label: "评估失败", detail: "震荡市容易反复亏损。" }
    ],
    concepts: [
      { id: "c1", concept: "moving-average", title: "均线", summary: "过去一段时间价格的平均值。", solves: "用简单规则描述趋势。", boundary: "均线滞后，不会预测拐点。", commonMistake: "以为金叉一定赚钱。" },
      { id: "c0", concept: "signal-execution-gap", title: "信号与执行错位", summary: "信号生成时间和成交模拟时间必须分开。", solves: "防止未来函数进入策略。", boundary: "错位会让回测更保守，但更可信。", commonMistake: "收盘生成信号后按同一收盘价成交。" },
      { id: "c2", concept: "signal-layer", title: "信号生成", summary: "把均线条件转成买卖信号。", solves: "让策略可执行。", boundary: "信号不是成交。", commonMistake: "用当天收盘信号当天成交。" },
      { id: "c3", concept: "feedback-loop", title: "参数选择", summary: "均线窗口是策略参数。", solves: "让规则可调但可控。", boundary: "不能事后挑最优。", commonMistake: "无限调参直到收益好看。" }
    ],
    dataFlow: ["输入价格序列。", "计算 N 日均线。", "比较价格和均线。", "生成下一交易日信号。", "记录震荡期表现。"],
    technicalPoints: ["信号和执行至少错开一期。", "均线窗口要事前设定。", "震荡市场要重点分析。", "和买入持有基准比较。"],
    productionExample: "当 ETF 收盘价站上 20 日均线，下一交易日买入；跌破 20 日均线，下一交易日卖出。",
    counterexample: "当天收盘发现站上均线，又假设当天收盘买入，这是未来函数。",
    practice: { title: "均线策略规则卡", fields: ["标的", "均线窗口", "买入信号", "卖出信号", "执行价格假设", "调仓频率", "失败场景", "基准"], acceptance: "规则能被直接翻译成代码。" },
    explorationPrompt: "比较 10 日、20 日、60 日均线分别更像短期、中期还是长期趋势。",
    questions: [
      { id: "d7q1", concept: "moving-average", prompt: "均线主要描述什么？", options: [q("a", "过去一段时间的平均价格趋势", true), q("b", "未来确定涨幅"), q("c", "企业利润", false), q("d", "交易费用", false)], explanation: "均线是趋势描述工具，不是预言。" },
      { id: "d7q2", concept: "signal-layer", prompt: "为什么信号和执行要错开？", options: [q("a", "避免用已知收盘价完成同日交易", true), q("b", "为了少写代码"), q("c", "为了隐藏亏损"), q("d", "因为均线不需要价格")], explanation: "这是避免未来函数的基本做法。" },
      { id: "d7q3", concept: "feedback-loop", prompt: "参数选择最常见风险是什么？", options: [q("a", "过拟合历史数据", true), q("b", "无法计算", false), q("c", "不影响结果", false), q("d", "一定稳定", false)], explanation: "参数越多，越容易贴合历史噪声。" },
      { id: "d7q4", concept: "moving-average", prompt: "均线策略在哪种环境容易失败？", options: [q("a", "震荡反复的市场", true), q("b", "有日期的数据", false), q("c", "有基准的数据", false), q("d", "能计算收益率的数据", false)], explanation: "震荡市会让趋势信号反复切换。" }
    ],
    reviewPrompts: ["如果认为均线能预测拐点，复习均线边界。", "如果同日成交，复习信号层。", "如果追求最优参数，复习反馈循环。"],
    references: [
      { label: "pandas rolling", url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.rolling.html" },
      { label: "statsmodels 时间序列", url: "https://www.statsmodels.org/stable/tsa" }
    ]
  },
  {
    id: "day08",
    path: "/day08",
    title: "Day08 回测陷阱",
    phase: "验证",
    summary: "识别未来函数、过拟合、幸存者偏差、忽略成本等常见问题。",
    goal: "能看出一个回测结果为什么可能不可信。",
    why: "量化新手最容易被漂亮回测误导。会找错，比会调参数更重要。",
    diagramTitle: "回测可信度检查",
    flow: [
      { id: "time", label: "时间检查", detail: "信号是否偷看未来。" },
      { id: "universe", label: "样本检查", detail: "是否只保留幸存标的。" },
      { id: "cost", label: "成本检查", detail: "是否加入费用和滑点。" },
      { id: "param", label: "参数检查", detail: "是否过度贴合历史。" },
      { id: "stress", label: "压力阶段", detail: "是否分析失败区间。" }
    ],
    concepts: [
      { id: "c1", concept: "backtest-traps", title: "未来函数", summary: "使用当时无法知道的信息。", solves: "解释虚假高收益来源。", boundary: "时间对齐必须逐列检查。", commonMistake: "用收盘后信号按同一收盘价成交。" },
      { id: "c0", concept: "survivorship-bias", title: "幸存者偏差", summary: "只使用当前仍存在或表现较好的标的样本。", solves: "提醒样本池会影响回测可信度。", boundary: "不是所有样本缺失都能轻易修复，但必须说明。", commonMistake: "用今天的成分股回测过去多年。" },
      { id: "c2", concept: "feedback-loop", title: "过拟合", summary: "规则过度适配历史噪声。", solves: "提醒不要迷信最优参数。", boundary: "不是所有优化都是过拟合。", commonMistake: "只报告最优组合。" },
      { id: "c3", concept: "market-rules", title: "成本与约束", summary: "费用、滑点、停牌、涨跌停等执行条件。", solves: "让回测更接近真实。", boundary: "日线仍是近似模拟。", commonMistake: "零成本无限调仓。" }
    ],
    dataFlow: ["输入回测结果。", "检查时间对齐。", "检查样本和成本。", "检查参数选择过程。", "输出可信度结论。"],
    technicalPoints: ["任何用未来价格生成当前信号的逻辑都要拒绝。", "调参过程要记录。", "交易成本不是可选项。", "失败阶段要单独分析。"],
    productionExample: "均线策略报告中明确说明：信号在收盘后生成，下一交易日执行，并加入费用假设。",
    counterexample: "只展示最优参数收益，不展示其他参数和失败区间。",
    practice: { title: "回测审查清单", fields: ["时间对齐", "样本范围", "手续费", "滑点", "停牌处理", "涨跌停处理", "参数选择", "失败阶段"], acceptance: "能指出一个回测至少 3 个可信度风险。" },
    explorationPrompt: "找一个策略截图，推测它可能漏掉了哪些回测设定。",
    questions: [
      { id: "d8q1", concept: "backtest-traps", prompt: "未来函数是什么？", options: [q("a", "使用当时无法知道的信息", true), q("b", "未来一定赚钱的函数"), q("c", "画图函数"), q("d", "数据源名称")], explanation: "未来函数会显著夸大回测表现。" },
      { id: "d8q2", concept: "feedback-loop", prompt: "过拟合的典型表现是什么？", options: [q("a", "只在历史最优参数上表现很好", true), q("b", "记录失败原因", false), q("c", "加入成本", false), q("d", "说明基准", false)], explanation: "过拟合常来自对历史噪声的贴合。" },
      { id: "d8q3", concept: "market-rules", prompt: "为什么不能假设零成本频繁交易？", options: [q("a", "真实交易有费用、滑点和约束", true), q("b", "因为收益率不能算", false), q("c", "因为指数不存在", false), q("d", "因为 Python 不支持", false)], explanation: "成本会吞掉很多纸面优势。" },
      { id: "d8q4", concept: "backtest-traps", prompt: "回测报告为什么要写失败阶段？", options: [q("a", "判断策略何时不适用", true), q("b", "让报告更长", false), q("c", "隐藏亏损", false), q("d", "替代数据清洗", false)], explanation: "失败阶段决定策略边界。" }
    ],
    reviewPrompts: ["如果收益异常好，先查未来函数。", "如果只有最优参数，复习过拟合。", "如果没有费用，复习成本与约束。"],
    references: [
      { label: "上交所交易规则", url: "https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20260424_10816492.shtml" },
      { label: "pandas shift", url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.shift.html" }
    ]
  },
  {
    id: "day09",
    path: "/day09",
    title: "Day09 仓位与风险控制",
    phase: "风控",
    summary: "学习仓位上限、分散、止损、回撤观察和再平衡。",
    goal: "为一个策略设计基本风险控制规则。",
    why: "策略会错，风控负责让错误不至于毁掉整个研究和执行过程。",
    diagramTitle: "风险控制闭环",
    flow: [
      { id: "signal", label: "信号", detail: "策略想买什么。" },
      { id: "size", label: "仓位", detail: "决定买多少。" },
      { id: "limit", label: "限制", detail: "单标的、行业、现金比例。" },
      { id: "loss", label: "亏损处理", detail: "止损或观察规则。" },
      { id: "rebalance", label: "再平衡", detail: "定期恢复风险暴露。" }
    ],
    concepts: [
      { id: "c1", concept: "position-sizing", title: "仓位管理", summary: "决定每个信号投入多少资金。", solves: "限制单次错误影响。", boundary: "仓位不能把坏策略变好。", commonMistake: "满仓押单一规则。" },
      { id: "c0", concept: "rebalance-rule", title: "再平衡规则", summary: "按固定周期或触发条件恢复目标仓位。", solves: "让组合风险暴露不随行情漂移失控。", boundary: "再平衡会带来成本。", commonMistake: "上涨后任由单一资产占比过高。" },
      { id: "c2", concept: "risk-control", title: "回撤控制", summary: "观察资金曲线从高点回落的程度。", solves: "帮助判断是否超出承受范围。", boundary: "不能保证不亏。", commonMistake: "回撤超预期还继续加仓。" },
      { id: "c3", concept: "portfolio-rotation", title: "分散", summary: "不要把风险集中在单一标的或单一逻辑。", solves: "降低单点失败。", boundary: "分散不等于没有风险。", commonMistake: "买很多高度相关标的，以为已经分散。" }
    ],
    dataFlow: ["输入策略信号。", "应用仓位规则。", "检查风险限制。", "模拟亏损场景。", "输出仓位和风险记录。"],
    technicalPoints: ["仓位规则要写在回测前。", "单一标的上限要明确。", "高度相关资产不能假装分散。", "风险触发后的动作要提前定义。"],
    productionExample: "ETF 轮动策略每次最多持有 3 个标的，单标的不超过 40%，保留至少 10% 现金。",
    counterexample: "信号越强仓位越大，但没有上限，连续错误后回撤不可控。",
    practice: { title: "风险控制规则", fields: ["单标的上限", "总仓位上限", "现金比例", "止损或观察规则", "再平衡周期", "最大可接受回撤", "暂停条件", "复盘动作"], acceptance: "每个风险触发条件都有对应动作。" },
    explorationPrompt: "比较两个收益相近但回撤不同的策略，判断哪个更容易长期执行。",
    questions: [
      { id: "d9q1", concept: "position-sizing", prompt: "仓位管理主要解决什么？", options: [q("a", "限制单次错误影响", true), q("b", "保证收益最大", false), q("c", "删除手续费", false), q("d", "替代数据源", false)], explanation: "仓位是风险暴露的开关。" },
      { id: "d9q2", concept: "risk-control", prompt: "回撤控制不能做到什么？", options: [q("a", "保证永远不亏", true), q("b", "观察风险", false), q("c", "定义暂停条件", false), q("d", "辅助复盘", false)], explanation: "风控只能约束风险，不能消灭风险。" },
      { id: "d9q3", concept: "portfolio-rotation", prompt: "买很多高度相关资产的问题是什么？", options: [q("a", "看似分散，实际风险仍集中", true), q("b", "无法计算价格", false), q("c", "没有日期", false), q("d", "一定无风险", false)], explanation: "相关性会让多个标的一起涨跌。" },
      { id: "d9q4", concept: "position-sizing", prompt: "仓位规则应该什么时候确定？", options: [q("a", "回测前", true), q("b", "看到收益后", false), q("c", "亏损后随意改", false), q("d", "不需要确定", false)], explanation: "事前规则才能避免回测偏差。" }
    ],
    reviewPrompts: ["如果总想满仓，复习仓位管理。", "如果无视亏损阶段，复习回撤控制。", "如果相关资产太多，复习分散。"],
    references: [
      { label: "SEC Asset Allocation", url: "https://www.sec.gov/investor/pubs/assetallocation.htm" },
      { label: "SEC Risk and Return", url: "https://www.investor.gov/introduction-investing/investing-basics/risk-and-return" }
    ]
  },
  {
    id: "day10",
    path: "/day10",
    title: "Day10 ETF 轮动与组合思维",
    phase: "组合",
    summary: "从单一策略走向组合，理解宽基、行业、相关性和调仓周期。",
    goal: "设计一个简单 ETF 轮动策略的研究计划。",
    why: "量化不只是买卖一个标的，更重要的是在多个选择之间制定规则。",
    diagramTitle: "ETF 轮动流程",
    flow: [
      { id: "pool", label: "标的池", detail: "宽基或行业 ETF。" },
      { id: "score", label: "打分", detail: "动量、波动、趋势过滤。" },
      { id: "select", label: "选择", detail: "选前 N 个标的。" },
      { id: "weight", label: "权重", detail: "等权或风险约束。" },
      { id: "rebalance", label: "调仓", detail: "按周期更新组合。" }
    ],
    concepts: [
      { id: "c1", concept: "portfolio-rotation", title: "轮动", summary: "在多个标的中按规则切换。", solves: "让资金流向相对更强或更合适的资产。", boundary: "轮动会增加成本和误判。", commonMistake: "每天切换追涨杀跌。" },
      { id: "c0", concept: "correlation", title: "相关性", summary: "不同 ETF 收益同涨同跌的程度。", solves: "判断组合是否真的分散。", boundary: "相关性会随市场环境变化。", commonMistake: "名称不同就以为风险不同。" },
      { id: "c2", concept: "position-sizing", title: "权重", summary: "每个入选标的分配多少资金。", solves: "控制组合风险。", boundary: "等权不一定最优，但简单可解释。", commonMistake: "只排序不考虑仓位。" },
      { id: "c3", concept: "market-rules", title: "调仓周期", summary: "组合多久更新一次。", solves: "平衡响应速度和交易成本。", boundary: "越频繁不一定越好。", commonMistake: "忽略交易成本。" }
    ],
    dataFlow: ["输入 ETF 标的池。", "计算每个标的的得分。", "按规则选择标的。", "分配权重。", "按周期调仓并评估。"],
    technicalPoints: ["标的池要事前固定。", "打分规则要可解释。", "调仓周期影响成本。", "组合要看整体回撤和相关性。"],
    productionExample: "每月从 5 个宽基 ETF 中选择过去 60 日涨幅最高且在 20 日均线上的前 2 个，等权持有。",
    counterexample: "看到哪个 ETF 涨就手动加入标的池，回测时只保留表现好的品种。",
    practice: { title: "ETF 轮动计划", fields: ["标的池", "打分指标", "过滤条件", "选择数量", "权重方式", "调仓周期", "成本假设", "失败场景"], acceptance: "规则不会因为历史表现好坏临时改变标的池。" },
    explorationPrompt: "选择 3 个宽基 ETF，判断它们是否真的提供了不同风险暴露。",
    questions: [
      { id: "d10q1", concept: "portfolio-rotation", prompt: "轮动策略在做什么？", options: [q("a", "按规则在多个标的间切换", true), q("b", "保证每天赚钱", false), q("c", "删除回撤", false), q("d", "只买一个标的", false)], explanation: "轮动是组合层面的选择规则。" },
      { id: "d10q2", concept: "position-sizing", prompt: "为什么排序后还要考虑权重？", options: [q("a", "权重决定风险暴露大小", true), q("b", "权重只影响页面", false), q("c", "排序已经等于成交", false), q("d", "权重不能计算", false)], explanation: "买多少和买什么同样重要。" },
      { id: "d10q3", concept: "market-rules", prompt: "调仓越频繁一定越好吗？", options: [q("a", "不一定，会增加成本和噪声", true), q("b", "一定更好", false), q("c", "一定无成本", false), q("d", "和策略无关", false)], explanation: "频率要和策略假设匹配。" },
      { id: "d10q4", concept: "portfolio-rotation", prompt: "标的池为什么要事前固定？", options: [q("a", "避免事后挑赢家", true), q("b", "为了少写字", false), q("c", "因为 ETF 不能交易", false), q("d", "为了隐藏风险", false)], explanation: "标的池事后调整会引入偏差。" }
    ],
    reviewPrompts: ["如果频繁切换，复习调仓周期。", "如果只排序不配权，复习权重。", "如果事后改标的池，复习轮动边界。"],
    references: [
      { label: "上交所 ETF", url: "https://one.sse.com.cn/onething/gptz/" },
      { label: "SEC Diversification", url: "https://www.sec.gov/investor/pubs/assetallocation.htm" }
    ]
  },
  {
    id: "day11",
    path: "/day11",
    title: "Day11 策略研究报告",
    phase: "报告",
    summary: "把代码结果整理成假设、数据、规则、表现、风险和下一步。",
    goal: "完成一份能指导后续模拟跟踪的策略报告大纲。",
    why: "没有报告，策略研究很快会变成零散图表和记忆偏差。",
    diagramTitle: "策略报告结构",
    flow: [
      { id: "hypothesis", label: "假设", detail: "为什么可能有效。" },
      { id: "data", label: "数据", detail: "来源、区间、字段、清洗。" },
      { id: "rules", label: "规则", detail: "信号、仓位、调仓、成本。" },
      { id: "result", label: "结果", detail: "收益、风险、基准比较。" },
      { id: "decision", label: "结论", detail: "放弃、修改或模拟跟踪。" }
    ],
    concepts: [
      { id: "c1", concept: "strategy-report", title: "报告结构", summary: "用固定结构记录研究。", solves: "防止只留下图表。", boundary: "报告不是投资承诺。", commonMistake: "没有失败条件。" },
      { id: "c0", concept: "decision-record", title: "决策记录", summary: "把放弃、修改、模拟跟踪等下一步写清楚。", solves: "让研究结论能推动下一步行动。", boundary: "决策记录不是实盘指令。", commonMistake: "报告最后没有明确下一步。" },
      { id: "c2", concept: "data-validation", title: "证据链", summary: "结论必须能追溯到数据和规则。", solves: "减少拍脑袋结论。", boundary: "证据可能过期。", commonMistake: "结论没有来源。" },
      { id: "c3", concept: "simulation-tracking", title: "下一步决策", summary: "决定放弃、修改或进入模拟。", solves: "把研究变成行动闭环。", boundary: "模拟不是实盘。", commonMistake: "回测好就直接执行。" }
    ],
    dataFlow: ["输入回测结果。", "关联假设和规则。", "解释指标和失败阶段。", "输出研究结论。", "决定下一步。"],
    technicalPoints: ["每个结论都要有数据支持。", "要写失败条件和不适用环境。", "报告要保留参数和版本。", "建议和执行要分开。"],
    productionExample: "均线策略报告结论：趋势市改善回撤，但震荡市频繁亏损，建议进入 8 周模拟观察而不是直接执行。",
    counterexample: "只写策略收益超过基准，不写数据区间、成本假设和失败阶段。",
    practice: { title: "策略报告大纲", fields: ["研究假设", "数据来源", "策略规则", "回测设置", "收益指标", "风险指标", "失败阶段", "结论", "下一步"], acceptance: "读者能判断这个策略是否值得继续模拟。" },
    explorationPrompt: "把一个漂亮的回测截图改写成完整报告问题清单。",
    questions: [
      { id: "d11q1", concept: "strategy-report", prompt: "策略报告最重要的作用是什么？", options: [q("a", "让研究可复盘", true), q("b", "保证实盘赚钱", false), q("c", "替代数据", false), q("d", "隐藏失败", false)], explanation: "报告让判断有上下文。" },
      { id: "d11q2", concept: "data-validation", prompt: "证据链要求什么？", options: [q("a", "结论能追溯到数据和规则", true), q("b", "只要口头说清楚", false), q("c", "不需要来源", false), q("d", "只看最终净值", false)], explanation: "没有证据链就无法复盘。" },
      { id: "d11q3", concept: "simulation-tracking", prompt: "回测结果好之后合理下一步是什么？", options: [q("a", "模拟跟踪并继续观察", true), q("b", "直接满仓", false), q("c", "删除失败阶段", false), q("d", "停止记录", false)], explanation: "模拟能暴露实时执行和心理偏差。" },
      { id: "d11q4", concept: "strategy-report", prompt: "报告中为什么要写失败条件？", options: [q("a", "明确策略边界", true), q("b", "让报告悲观", false), q("c", "减少数据", false), q("d", "替代风控", false)], explanation: "失败条件帮助判断何时不适用。" }
    ],
    reviewPrompts: ["如果只有图表，复习报告结构。", "如果结论无来源，复习证据链。", "如果回测好就想执行，复习下一步决策。"],
    references: [
      { label: "CFA 课程概览", url: "https://www.cfainstitute.org/programs/cfa-program/curriculum" },
      { label: "SEC 投资入门", url: "https://www.investor.gov/introduction-investing" }
    ]
  },
  {
    id: "day12",
    path: "/day12",
    title: "Day12 模拟跟踪与学习闭环",
    phase: "迭代",
    summary: "建立策略日志，记录信号、执行偏差、市场环境和每周复盘。",
    goal: "设计一个可持续的策略模拟跟踪表。",
    why: "从回测到现实之间有巨大差距。模拟跟踪能让学习者在不承担实盘压力时发现问题。",
    diagramTitle: "模拟跟踪闭环",
    flow: [
      { id: "signal", label: "记录信号", detail: "每次策略发出什么动作。" },
      { id: "paper", label: "模拟执行", detail: "按规则记录买卖和仓位。" },
      { id: "compare", label: "偏差比较", detail: "对比回测预期与实时表现。" },
      { id: "review", label: "每周复盘", detail: "总结市场环境和错误。" },
      { id: "iterate", label: "迭代决策", detail: "继续、暂停、修改或放弃。" }
    ],
    concepts: [
      { id: "c1", concept: "simulation-tracking", title: "模拟跟踪", summary: "不用实盘资金记录策略实时表现。", solves: "检验规则在当前市场的行为。", boundary: "模拟不能完全复制实盘心理和成交。", commonMistake: "模拟阶段也随意改规则。" },
      { id: "c0", concept: "paper-trading-gap", title: "模拟与实盘差距", summary: "模拟环境缺少真实成交压力、资金压力和情绪压力。", solves: "提醒模拟结果不能直接等同实盘能力。", boundary: "它仍然是进入实盘前有价值的低风险观察。", commonMistake: "模拟几次顺利就认为策略成熟。" },
      { id: "c2", concept: "strategy-journal", title: "策略日志", summary: "记录信号、原因、执行和复盘。", solves: "减少记忆偏差。", boundary: "日志要简洁可持续。", commonMistake: "只在赚钱时记录。" },
      { id: "c3", concept: "feedback-loop", title: "学习闭环", summary: "用复盘结果决定下一步学习和研究。", solves: "让学习持续改进。", boundary: "修改策略要回到研究流程。", commonMistake: "实盘感受直接覆盖规则。" }
    ],
    dataFlow: ["输入每日或每周信号。", "记录模拟交易。", "更新收益和回撤。", "写复盘日志。", "输出下一步决策。"],
    technicalPoints: ["模拟规则必须和回测规则一致。", "记录未执行原因和心理偏差。", "每周固定复盘。", "策略修改必须重新回测。"],
    productionExample: "每周五记录 ETF 轮动策略的入选标的、模拟仓位、与基准差异和下周观察点。",
    counterexample: "看到模拟亏损就临时改规则，后续再也无法判断原策略是否有效。",
    practice: { title: "模拟跟踪表", fields: ["日期", "策略信号", "模拟动作", "仓位", "当前收益", "当前回撤", "和基准差异", "市场环境", "复盘结论", "下一步"], acceptance: "连续 4 周后能看出策略行为和自己的执行偏差。" },
    explorationPrompt: "设计一个你愿意每周填写 10 分钟的复盘表，而不是复杂到无法坚持的表。",
    questions: [
      { id: "d12q1", concept: "simulation-tracking", prompt: "模拟跟踪的核心价值是什么？", options: [q("a", "在低压力环境中观察策略实时行为", true), q("b", "保证实盘赚钱", false), q("c", "替代所有回测", false), q("d", "删除风险", false)], explanation: "模拟是从研究走向执行前的观察阶段。" },
      { id: "d12q2", concept: "strategy-journal", prompt: "策略日志应该记录什么？", options: [q("a", "信号、动作、偏差和复盘", true), q("b", "只记录盈利", false), q("c", "只记录新闻", false), q("d", "只记录代码行数", false)], explanation: "日志是减少记忆偏差的工具。" },
      { id: "d12q3", concept: "feedback-loop", prompt: "修改策略前应该做什么？", options: [q("a", "回到研究流程重新验证", true), q("b", "直接覆盖规则", false), q("c", "删除旧记录", false), q("d", "停止看数据", false)], explanation: "规则修改必须可追溯。" },
      { id: "d12q4", concept: "simulation-tracking", prompt: "模拟跟踪不能完全替代什么？", options: [q("a", "真实成交和实盘心理压力", true), q("b", "记录信号", false), q("c", "周复盘", false), q("d", "策略日志", false)], explanation: "模拟和实盘仍有差距。" }
    ],
    reviewPrompts: ["如果模拟也随意改规则，复习模拟跟踪。", "如果只记盈利，复习策略日志。", "如果凭感受改策略，复习学习闭环。"],
    references: [
      { label: "SEC 投资入门", url: "https://www.investor.gov/introduction-investing" },
      { label: "SEC Risk and Return", url: "https://www.investor.gov/introduction-investing/investing-basics/risk-and-return" }
    ]
  }
];

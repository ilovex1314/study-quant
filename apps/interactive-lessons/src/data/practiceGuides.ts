import type { LessonPage } from "./types";

type PracticeGuide = NonNullable<LessonPage["practice"]["guide"]>;
type FieldGuide = PracticeGuide["fieldGuides"][string];
type GuideDraft = Omit<PracticeGuide, "fieldGuides"> & {
  fieldHints?: Record<string, Partial<FieldGuide>>;
};

const defaultFieldGuide = (field: string): FieldGuide => ({
  purpose: `把「${field}」写清楚，避免练习只停留在口头理解。`,
  howToDerive: "先回到本课的流程图，找到这个字段对应的输入、判断或输出，再用一句可被别人复述的话写下来。",
  example: `示例：为「${field}」写一个可检查、可复盘的具体答案。`,
  commonMistake: "只写结论，不写来源、条件或边界，导致未来无法验证。"
});

function buildFieldGuides(fields: string[], hints: GuideDraft["fieldHints"] = {}) {
  return Object.fromEntries(
    fields.map((field) => {
      const base = defaultFieldGuide(field);
      return [field, { ...base, ...hints[field] }];
    })
  );
}

const guides: Record<string, GuideDraft> = {
  day01: {
    outcome: "把一个模糊投资观点改写成能被数据验证的策略雏形。",
    methodSteps: [
      { title: "先分清观点和规则", detail: "观点可以模糊，规则必须能让另一个人照着做出同样判断。" },
      { title: "把直觉翻译成假设", detail: "写清楚你认为市场为什么会出现这个现象，而不是直接写买卖动作。" },
      { title: "补上验证边界", detail: "提前写出需要哪些数据、什么时候退出、什么情况说明想法失效。" }
    ],
    workedExample: {
      title: "超跌反弹雏形",
      context: "原始想法是“跌多了可能会反弹”。",
      steps: [
        "假设：短期快速下跌后，如果价格重新站上短期均线，可能出现技术性反弹。",
        "规则：近 20 个交易日跌幅超过 8%，重新站上 5 日均线后买入。",
        "边界：如果继续跌破买入价 5% 或持有 20 个交易日仍无改善，就退出观察。"
      ]
    },
    fieldHints: {
      原始想法: { howToDerive: "用自然语言写下最初听到或想到的市场现象，暂时不要急着写买卖规则。", example: "市场连续下跌后，短期可能出现反弹。" },
      量化假设: { howToDerive: "回答“为什么这个现象可能重复发生”，并把它变成可验证判断。", example: "短期恐慌卖出后，价格重新站上短期均线可能代表情绪修复。" },
      买入条件: { howToDerive: "把“什么时候认为假设开始成立”写成价格、时间或指标条件。", example: "近 20 日跌幅超过 8%，且收盘价重新站上 5 日均线。" },
      可能失效的情况: { howToDerive: "写出什么市场环境会让这个假设不再成立。", example: "单边下跌或流动性明显恶化时，反弹信号可能频繁失败。" }
    },
    checklist: ["是否每条规则都能被代码判断", "是否说明需要的数据字段", "是否写出了退出和失效条件"]
  },
  day02: {
    outcome: "学会定制自己的策略研究流程，而不是直接填写一张流程表。",
    methodSteps: [
      { title: "不要先想买卖点", detail: "先把投资想法改写成研究问题：你到底想验证哪个市场现象是否存在。" },
      { title: "把问题拆成流水线", detail: "按假设、标的、基准、规则、数据、成本、指标、失败条件的顺序逐步补齐。" },
      { title: "每一步都要能交给代码", detail: "字段不是作文题，最终要能变成数据需求、函数输入、回测设定或报告结论。" },
      { title: "失败也要进入流程", detail: "提前定义什么结果说明策略不值得继续，避免回测后为了好看不断改规则。" }
    ],
    workedExample: {
      title: "宽基 ETF 动量研究流程",
      context: "想法：过去一段时间更强的宽基 ETF，未来一段时间可能继续相对更强。",
      steps: [
        "研究问题：在沪深 300、中证 500、创业板等宽基 ETF 中，过去 60 日涨幅靠前者是否有延续性。",
        "规则草案：每月末计算 60 日收益，选择排名前 1-2 个 ETF，下月等权持有。",
        "验证设置：使用复权价格，加入交易成本，与买入并持有宽基指数或现金基准比较。",
        "失败条件：如果收益主要来自少数阶段，或最大回撤明显高于基准，就暂停进入模拟。"
      ]
    },
    fieldHints: {
      研究问题: { purpose: "把投资想法变成可以验证的问题。", howToDerive: "用“在什么标的、什么时间尺度、验证什么现象”的句式写。", example: "宽基 ETF 的 60 日相对强弱是否能在下月延续？", commonMistake: "写成“我要找一个赚钱策略”，没有可验证对象。" },
      策略假设: { purpose: "说明为什么这个规则可能有效。", howToDerive: "回答市场参与者行为、趋势延续、风险补偿或制度约束中哪个机制支持它。", example: "资金可能持续流向近期表现更强的宽基方向。", commonMistake: "把历史涨得好直接当成未来会涨。" },
      交易标的: { howToDerive: "选择能真实交易、流动性足够、数据容易获得的标的。", example: "沪深 300 ETF、中证 500 ETF、创业板 ETF。", commonMistake: "用指数回测，却忘了指数不能直接交易。" },
      基准: { howToDerive: "选择能回答“这个策略是否比简单持有更有意义”的参照。", example: "沪深 300 指数、等权宽基 ETF 组合或现金收益。", commonMistake: "没有基准，只看策略自己的收益曲线。" },
      买入规则: { howToDerive: "写清楚触发时点、排序指标、选择数量和执行假设。", example: "每月最后一个交易日收盘后计算 60 日收益，下一交易日买入排名前 2。", commonMistake: "写“强的就买”，但没有强弱定义。" },
      卖出规则: { howToDerive: "说明何时退出、换仓或保持不变。", example: "下次月度调仓时不再位于前 2，则卖出。", commonMistake: "只写买入，不写退出。" },
      调仓频率: { howToDerive: "让频率和假设周期匹配，并考虑成本。", example: "每月调仓一次。", commonMistake: "为了追求收益随意提高调仓频率。" },
      需要数据: { howToDerive: "列出回测最小字段。", example: "交易日、复权收盘价、成交额、停牌或不可交易状态。", commonMistake: "只写“行情数据”，没有字段。" },
      费用假设: { howToDerive: "把佣金、滑点、税费或 ETF 交易成本写成可计算规则。", example: "单边成本按 0.05% 估计，换仓时扣除。", commonMistake: "默认零成本频繁交易。" },
      评价指标: { howToDerive: "同时覆盖收益、风险和相对基准。", example: "累计收益、年化收益、最大回撤、相对基准超额收益。", commonMistake: "只看最终收益。" },
      失败条件: { howToDerive: "提前定义不继续研究的证据。", example: "扣除成本后长期跑输基准，或最大回撤高于基准且收益无明显补偿。", commonMistake: "结果不好就临时改参数。" }
    },
    checklist: ["是否能从字段直接写出代码需求", "是否有基准和成本假设", "是否提前定义了失败条件", "是否避免回测后临时改规则"]
  },
  day03: {
    outcome: "学会把 A 股市场规则翻译成回测和执行约束。",
    methodSteps: [
      { title: "先找制度约束", detail: "确认交易时间、T+1、涨跌停、停牌等会不会让信号无法成交。" },
      { title: "再找标的约束", detail: "区分指数、股票和 ETF，只有可交易标的才能进入执行假设。" },
      { title: "最后写回测处理", detail: "每条约束都要落到数据清洗、信号过滤、成交模拟或报告说明里。" }
    ],
    workedExample: {
      title: "指数信号转 ETF 执行",
      context: "想用沪深 300 指数趋势做入场判断。",
      steps: ["指数只适合产生观察信号，实际执行要选择跟踪 ETF。", "如果收盘后产生信号，应在下一交易日按执行价假设成交。", "如果 ETF 停牌、涨跌停或成交额过低，回测要记录无法成交或滑点。"]
    },
    fieldHints: {
      "指数和 ETF 的区别": { howToDerive: "先问这个对象是否能真实买卖，再决定它是信号来源还是交易标的。", example: "沪深 300 指数用于观察，沪深 300 ETF 才能用于交易模拟。", commonMistake: "用指数收益当成实际可交易收益。" },
      回测中如何处理: { howToDerive: "把每条市场限制放进成交模拟规则。", example: "涨停无法买入、跌停无法卖出，停牌期间保持持仓。", commonMistake: "信号出现就假设一定成交。" }
    },
    checklist: ["是否区分信号来源和可交易标的", "是否说明无法成交的处理", "是否把规则落到代码模块"]
  },
  day04: {
    outcome: "学会把一个量化研究项目拆成可实现、可测试的代码模块。",
    methodSteps: [
      { title: "先拆输入输出", detail: "每个模块先写输入和输出，再决定函数内部做什么。" },
      { title: "让信号和回测分离", detail: "信号层只回答买卖意图，回测层才处理成交、仓位和资金曲线。" },
      { title: "报告层只解释结果", detail: "报告不重新计算策略逻辑，只组织指标、风险和结论。" }
    ],
    workedExample: {
      title: "均线研究最小模块",
      context: "想实现 20 日均线策略。",
      steps: ["data_loader 读取并清洗复权价格。", "signals 根据价格和均线生成下一期信号。", "backtest 把信号变成持仓和收益曲线。", "report 输出收益、回撤、失败阶段和下一步。"]
    },
    checklist: ["每个模块是否只有一类职责", "信号和成交是否错开", "报告是否能追溯到数据和规则"]
  },
  day05: {
    outcome: "学会用 Python/pandas 把行情数据整理成策略可用的时间序列。",
    methodSteps: [
      { title: "先读入并确认日期", detail: "使用 read_csv 和 to_datetime，让交易日成为可排序的时间字段。" },
      { title: "再做质量检查", detail: "检查排序、重复日期、缺失价格、复权字段和异常成交量。" },
      { title: "最后计算派生列", detail: "在干净数据上计算收益率、均线、波动率等后续策略输入。" }
    ],
    workedExample: {
      title: "pandas 日线处理",
      context: "从 prices.csv 得到 close、volume、trade_date。",
      steps: ["df = pd.read_csv('prices.csv') 读取数据。", "trade_date 转 datetime 后按日期排序并去重。", "用 pct_change 计算收益率，用 rolling(20).mean() 计算均线。"]
    },
    checklist: ["是否包含最小 pandas 代码", "是否检查日期排序和缺失值", "是否说明复权字段"]
  },
  day06: {
    outcome: "学会从价格序列推导收益曲线和风险指标。",
    methodSteps: [
      { title: "先从价格到收益率", detail: "价格点位不可直接跨资产比较，先转成每日收益率。" },
      { title: "再从收益率到曲线", detail: "用连续收益累积得到净值路径，而不是只看最终收益。" },
      { title: "最后解释风险", detail: "最大回撤和波动率告诉你最难坚持的阶段在哪里。" }
    ],
    workedExample: {
      title: "ETF 收益报告",
      context: "用复权收盘价评估一个宽基 ETF。",
      steps: ["计算每日收益率 ret = close.pct_change()。", "用 (1 + ret).cumprod() 得到累计净值。", "用历史峰值和当前净值计算回撤，并和基准比较。"]
    },
    checklist: ["是否同时写收益和风险", "是否有基准比较", "是否解释最难持有的阶段"]
  },
  day07: {
    outcome: "学会把均线想法写成可编码的策略规则。",
    methodSteps: [
      { title: "先定义趋势信号", detail: "明确使用哪个价格、哪个均线窗口、什么条件算站上或跌破。" },
      { title: "再定义执行假设", detail: "收盘后产生信号，通常下一交易日才模拟成交。" },
      { title: "最后定义失败环境", detail: "均线策略常在震荡市反复亏损，要提前写进报告。" }
    ],
    workedExample: {
      title: "20 日均线策略",
      context: "使用 ETF 复权收盘价和 20 日均线。",
      steps: ["收盘价上穿 20 日均线，下一交易日买入。", "收盘价跌破 20 日均线，下一交易日卖出。", "记录震荡阶段的交易次数、亏损和成本。"]
    },
    checklist: ["是否定义均线窗口", "是否写明下一期执行", "是否说明震荡失败场景"]
  },
  day08: {
    outcome: "学会审查一个回测是否可信。",
    methodSteps: [
      { title: "先查时间顺序", detail: "确认信号没有使用当时无法知道的信息。" },
      { title: "再查样本和成本", detail: "确认没有只保留幸存标的，也没有忽略费用、滑点和停牌。" },
      { title: "最后查参数和失败阶段", detail: "看结果是否只来自最优参数或少数特殊阶段。" }
    ],
    workedExample: {
      title: "漂亮回测的审查",
      context: "一个策略年化很高，但没有说明成本和参数选择。",
      steps: ["检查信号是否 shift 到下一期执行。", "检查标的池是否事前固定。", "加入成本后重新观察收益和最大回撤。"]
    },
    checklist: ["是否检查未来函数", "是否加入成本和市场约束", "是否写出至少 3 个可信度风险"]
  },
  day09: {
    outcome: "学会把风险控制写成触发条件和动作。",
    methodSteps: [
      { title: "先定义风险暴露", detail: "写清单标的、总仓位、现金比例和相关资产集中度。" },
      { title: "再定义触发条件", detail: "回撤、亏损、波动或偏离预期达到什么程度需要动作。" },
      { title: "最后定义动作", detail: "每个触发条件都对应减仓、暂停、观察或复盘。" }
    ],
    workedExample: {
      title: "ETF 策略风控",
      context: "一个月度轮动策略出现连续亏损。",
      steps: ["单一 ETF 最高 50%，总仓位最高 80%。", "策略最大回撤超过 12% 时暂停新增信号。", "连续 4 周跑输基准时回到研究阶段复盘。"]
    },
    checklist: ["是否每个触发条件都有动作", "是否避免事后改仓位", "是否同时考虑集中度和回撤"]
  },
  day10: {
    outcome: "学会设计一个事前固定、可回测的 ETF 轮动规则。",
    methodSteps: [
      { title: "先固定标的池", detail: "标的池不能根据历史表现事后增删，否则会引入偏差。" },
      { title: "再定义打分和过滤", detail: "说明用动量、趋势、波动或其他指标如何排序。" },
      { title: "最后定义权重和调仓", detail: "买什么之外，还要写买多少、多久换一次、成本怎么扣。" }
    ],
    workedExample: {
      title: "宽基 ETF 月度轮动",
      context: "在几个宽基 ETF 中选择相对强者。",
      steps: ["标的池事前固定为 4 个流动性较好的宽基 ETF。", "每月末按过去 60 日收益排序，过滤掉低于 20 日均线者。", "选择前 2 个等权持有，下月再平衡。"]
    },
    checklist: ["标的池是否事前固定", "打分规则是否可解释", "是否写清权重、频率和成本"]
  },
  day11: {
    outcome: "学会把策略研究结果写成可复盘的报告。",
    methodSteps: [
      { title: "先写研究上下文", detail: "报告开头必须让读者知道假设、数据和规则是什么。" },
      { title: "再写证据链", detail: "每个结论都要能追溯到指标、图表、参数或失败阶段。" },
      { title: "最后写决策记录", detail: "明确下一步是放弃、修改、继续回测还是进入模拟。" }
    ],
    workedExample: {
      title: "均线策略报告结论",
      context: "20 日均线策略在趋势市表现较好。",
      steps: ["说明数据区间、复权方式、成本和执行假设。", "展示收益、最大回撤、基准比较和震荡失败阶段。", "结论写为进入 8 周模拟观察，而不是直接实盘。"]
    },
    checklist: ["是否有假设、数据、规则和指标", "是否写出失败阶段", "是否明确下一步决策"]
  },
  day12: {
    outcome: "学会用模拟跟踪把研究变成持续学习闭环。",
    methodSteps: [
      { title: "先固定跟踪频率", detail: "选择你能坚持的每日或每周记录节奏。" },
      { title: "再记录信号和偏差", detail: "不仅记录策略信号，也记录自己是否按规则执行。" },
      { title: "最后回到研究流程", detail: "如果想改规则，必须回到假设、数据和回测重新验证。" }
    ],
    workedExample: {
      title: "4 周模拟跟踪",
      context: "ETF 轮动策略进入低风险观察期。",
      steps: ["每周记录入选 ETF、模拟仓位、收益和回撤。", "写下市场环境和与回测预期不一致的地方。", "4 周后决定继续、暂停或回到 Day02 流程重写假设。"]
    },
    checklist: ["表格是否能坚持填写", "是否记录信号、动作和偏差", "是否规定修改策略前重新验证"]
  }
};

export function attachPracticeGuides(lessons: LessonPage[]): LessonPage[] {
  return lessons.map((lesson) => {
    const guide = guides[lesson.id];

    if (!guide) {
      return lesson;
    }

    return {
      ...lesson,
      practice: {
        ...lesson.practice,
        guide: {
          outcome: guide.outcome,
          methodSteps: guide.methodSteps,
          workedExample: guide.workedExample,
          checklist: guide.checklist,
          fieldGuides: buildFieldGuides(lesson.practice.fields, guide.fieldHints)
        }
      }
    };
  });
}

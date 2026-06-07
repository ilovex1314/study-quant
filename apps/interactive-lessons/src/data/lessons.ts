import { extraLessons } from "./extraLessons";
import { attachPracticeGuides } from "./practiceGuides";
import type { LessonPage } from "./types";

const q = (id: string, label: string, correct = false) => ({ id, label, correct });

const coreLessons: LessonPage[] = [
  {
    id: "day01",
    path: "/day01",
    title: "Day01 量化到底是什么",
    phase: "概论",
    summary: "建立量化的第一性理解：假设、规则、数据验证、风险约束和纪律执行。",
    goal: "把一个模糊投资想法改写成可验证的策略雏形。",
    why: "如果不知道量化在验证什么，代码只会变成复杂版的猜涨跌。Day01 先建立心智模型，后续再进入流程和编程。",
    diagramTitle: "量化研究漏斗",
    flow: [
      { id: "idea", label: "模糊想法", detail: "自然语言里的市场直觉。" },
      { id: "hypothesis", label: "投资假设", detail: "把直觉变成可讨论判断。" },
      { id: "rule", label: "明确规则", detail: "写清买入、卖出、周期和数据。" },
      { id: "test", label: "数据验证", detail: "检查历史表现和失败阶段。" },
      { id: "risk", label: "风险评估", detail: "估计回撤、误判和承受边界。" },
      { id: "track", label: "模拟跟踪", detail: "先观察，再决定是否继续。" }
    ],
    concepts: [
      {
        id: "c0",
        concept: "quant-definition",
        title: "量化定义",
        summary: "把投资假设变成规则系统，并用数据和风险约束验证它。",
        solves: "把量化从预测股价纠正为研究流程。",
        boundary: "量化不能消除不确定性。",
        commonMistake: "以为会写代码就等于会量化。"
      },
      {
        id: "c1",
        concept: "hypothesis",
        title: "投资假设",
        summary: "你对市场规律的一个可讨论判断。",
        solves: "把直觉变成研究对象。",
        boundary: "假设不是结论，也不是买卖建议。",
        commonMistake: "把感觉当事实。"
      },
      {
        id: "c2",
        concept: "rules",
        title: "规则化",
        summary: "把模糊语言变成明确条件。",
        solves: "让策略可验证、可复现。",
        boundary: "规则必须在看结果前确定。",
        commonMistake: "看到结果不好就临时改规则。"
      },
      {
        id: "c3",
        concept: "data-validation",
        title: "数据验证",
        summary: "用历史数据检查规则过去表现。",
        solves: "让策略不只停留在观点层。",
        boundary: "历史有效不代表未来一定有效。",
        commonMistake: "只看收益，不看风险。"
      },
      {
        id: "c4",
        concept: "risk-control",
        title: "风险约束",
        summary: "限制错误带来的损失。",
        solves: "让策略在不确定世界中可承受。",
        boundary: "不能消灭风险，只能控制风险暴露。",
        commonMistake: "逻辑讲得通，但仓位太重。"
      }
    ],
    dataFlow: ["输入一个自然语言投资想法。", "抽取市场判断。", "改写成条件、周期、数据需求和退出规则。", "输出策略雏形卡片。"],
    technicalPoints: ["不要从预测开始，要从可验证假设开始。", "规则要在看结果前确定。", "数据字段要提前列清楚。", "风险描述必须出现。"],
    productionExample: "市场跌多了以后可能反弹，可以改写为：最近 20 个交易日跌幅超过 8%，并重新站上 5 日均线时买入；持有 20 个交易日或跌破买入价 5% 时退出。",
    counterexample: "我感觉最近市场差不多到底了，所以应该买。它没有数据范围、买入条件、退出规则和风险边界。",
    practice: {
      title: "策略雏形卡片",
      fields: ["策略名称", "原始想法", "量化假设", "买入条件", "卖出条件", "持有周期", "需要的数据", "可能失效的情况", "我最担心的风险"],
      acceptance: "别人只看你的模板，不问你本人，也能知道这个规则如何被验证。"
    },
    explorationPrompt: "找一个你听过的投资观点，判断它属于观点、假设、规则、数据结论中的哪一类。",
    questions: [
      {
        id: "d1q1",
        concept: "quant-definition",
        prompt: "为什么量化不是简单预测股价？",
        options: [q("a", "因为它更关注规则验证、风险约束和复盘", true), q("b", "因为它不需要数据"), q("c", "因为它只看新闻"), q("d", "因为它一定能赚钱")],
        explanation: "量化的重点是把不确定性变得可测量、可复盘、可约束。"
      },
      {
        id: "d1q2",
        concept: "hypothesis",
        prompt: "投资假设和投资结论的关系是什么？",
        options: [q("a", "假设需要被数据验证，不能直接当结论", true), q("b", "假设就是结论"), q("c", "假设不需要写出来"), q("d", "结论一定来自直觉")],
        explanation: "假设只是研究起点，不是最终判断。"
      },
      {
        id: "d1q3",
        concept: "rules",
        prompt: "为什么“跌多了买”不是合格规则？",
        options: [q("a", "它缺少明确阈值、时间窗口和退出条件", true), q("b", "它太短"), q("c", "它不能用于股票"), q("d", "它没有英文名")],
        explanation: "规则必须能被别人复现。"
      },
      {
        id: "d1q4",
        concept: "risk-control",
        prompt: "为什么只看历史收益不够？",
        options: [q("a", "还要看波动、回撤和失败阶段", true), q("b", "收益率没有意义"), q("c", "风险不会发生"), q("d", "图越好看越可靠")],
        explanation: "策略是否可承受，取决于收益和风险一起看。"
      }
    ],
    reviewPrompts: ["如果说不清买入条件，复习规则化。", "如果只关注收益，复习风险约束。", "如果把观点当结论，复习投资假设。"],
    references: [
      { label: "SEC 投资入门", url: "https://www.investor.gov/introduction-investing" },
      { label: "SEC 资产配置与分散化", url: "https://www.sec.gov/investor/pubs/assetallocation.htm" },
      { label: "上交所股票投资服务", url: "https://one.sse.com.cn/onething/gptz/" }
    ]
  },
  {
    id: "day02",
    path: "/day02",
    title: "Day02 从想法到策略报告",
    phase: "流程",
    summary: "把策略雏形扩展成研究流水线，理解每一步的输入、输出和反馈。",
    goal: "画出一条策略研究流水线，并知道每一步的输入和输出。",
    why: "真正的顺序是先研究，再验证，再模拟，再考虑执行；不是直接写自动交易程序。",
    diagramTitle: "策略研究流水线",
    flow: [
      { id: "idea", label: "想法输入", detail: "来自市场观察或投资观点。" },
      { id: "card", label: "假设卡片", detail: "写出为什么可能有效。" },
      { id: "rules", label: "规则说明", detail: "定义买卖、周期和基准。" },
      { id: "data", label: "数据清单", detail: "列出字段、来源和质量检查。" },
      { id: "engine", label: "回测验证", detail: "模拟信号变成交易。" },
      { id: "report", label: "策略报告", detail: "输出结论、风险和下一步。" }
    ],
    concepts: [
      {
        id: "c0",
        concept: "research-canvas",
        title: "量化流程画布",
        summary: "把研究问题、假设、规则、数据、验证和结论放在同一张结构化卡片里。",
        solves: "帮助初学者看清一个量化项目要经过哪些步骤。",
        boundary: "它是学习和研究整理工具，不是额外的投资计划，也不是实盘指令。",
        commonMistake: "把流程画布误解成必须执行的投资计划。"
      },
      {
        id: "c1",
        concept: "research-pipeline",
        title: "策略研究流水线",
        summary: "把想法变成报告的一组步骤。",
        solves: "避免凭感觉跳步骤。",
        boundary: "它保证过程可复盘，不保证赚钱。",
        commonMistake: "直接从想法跳到买卖。"
      },
      {
        id: "c2",
        concept: "strategy-report",
        title: "策略报告",
        summary: "策略研究的最终产物。",
        solves: "让未来的你看懂当时为什么这样判断。",
        boundary: "报告不是实盘指令。",
        commonMistake: "只保留收益截图。"
      },
      {
        id: "c3",
        concept: "feedback-loop",
        title: "反馈循环",
        summary: "根据验证结果回到上游修改假设或规则。",
        solves: "支持策略迭代。",
        boundary: "不能变成过拟合。",
        commonMistake: "为了历史收益不断改参数。"
      }
    ],
    dataFlow: ["输入 Day01 的策略雏形。", "补齐研究问题、交易规则、数据字段和评价指标。", "输出量化流程画布和报告目录。", "根据数据可得性和回测结果反馈到上游。"],
    technicalPoints: ["每个策略都要有基准。", "流程画布只用于学习整理，不代表执行计划。", "回测要说明数据区间、调仓频率、手续费和滑点。", "失败策略也要记录。", "策略报告是后续代码落地的需求文档。"],
    productionExample: "宽基指数超跌后是否存在短期反弹优势？报告应包含研究假设、买卖规则、数据来源、回测设定、风险指标和是否进入模拟跟踪。",
    counterexample: "下载行情后调很多参数，挑出收益最高的一组就认为策略有效。这很可能只是过拟合。",
    practice: {
      title: "量化流程画布",
      fields: ["研究问题", "策略假设", "交易标的", "基准", "买入规则", "卖出规则", "调仓频率", "需要数据", "费用假设", "评价指标", "失败条件"],
      acceptance: "这张画布能帮助未来的你理解研究流程，并能自然转成代码需求。"
    },
    explorationPrompt: "找一篇公开策略文章，判断它有没有清楚说明假设、数据、回测设置和风险。",
    questions: [
      {
        id: "d2q1",
        concept: "research-pipeline",
        prompt: "策略研究流水线主要解决什么问题？",
        options: [q("a", "让研究过程可复盘、可检查", true), q("b", "保证策略赚钱"), q("c", "省掉数据清洗"), q("d", "自动替你选股")],
        explanation: "流水线的价值是把研究过程拆清楚。"
      },
      {
        id: "d2q2",
        concept: "strategy-report",
        prompt: "策略报告不应该只包含什么？",
        options: [q("a", "收益截图", true), q("b", "假设"), q("c", "数据来源"), q("d", "失败条件")],
        explanation: "只看收益截图会丢失风险和研究背景。"
      },
      {
        id: "d2q3",
        concept: "feedback-loop",
        prompt: "反馈循环最危险的误用是什么？",
        options: [q("a", "为了历史收益不断调参", true), q("b", "记录失败原因"), q("c", "回到假设层复盘"), q("d", "检查数据质量")],
        explanation: "反馈循环如果没有约束，会走向过拟合。"
      },
      {
        id: "d2q4",
        concept: "strategy-report",
        prompt: "基准在策略研究中的作用是什么？",
        options: [q("a", "提供可比较的参照", true), q("b", "替代策略规则"), q("c", "保证收益为正"), q("d", "消除交易成本")],
        explanation: "没有基准，就很难判断策略表现是否真的有意义。"
      }
    ],
    reviewPrompts: ["如果跳过数据清单，复习策略研究流水线。", "如果只保存收益图，复习策略报告。", "如果不断调参追求历史最优，复习反馈循环。"],
    references: [
      { label: "CFA 课程概览", url: "https://www.cfainstitute.org/programs/cfa-program/curriculum" },
      { label: "pandas 时间序列", url: "https://pandas.pydata.org/docs/user_guide/timeseries.html" },
      { label: "statsmodels 时间序列", url: "https://www.statsmodels.org/stable/tsa" }
    ]
  },
  {
    id: "day03",
    path: "/day03",
    title: "Day03 A 股规则与数据边界",
    phase: "市场",
    summary: "理解 A 股交易制度、可交易性、指数与 ETF 如何影响策略设计和回测可信度。",
    goal: "列出 A 股量化策略必须考虑的市场约束清单。",
    why: "A 股有自己的交易制度和市场结构，直接照搬其他市场教程会让回测失真。",
    diagramTitle: "A 股策略约束层",
    flow: [
      { id: "signal", label: "策略信号", detail: "规则产生买卖意图。" },
      { id: "rules", label: "市场规则检查", detail: "交易时间、T+1、涨跌幅、停牌。" },
      { id: "tradable", label: "可交易检查", detail: "成交额、流动性、是否可买卖。" },
      { id: "cost", label: "成本假设", detail: "佣金、税费、滑点。" },
      { id: "position", label: "仓位限制", detail: "单标的、行业、现金比例。" },
      { id: "record", label: "回测成交记录", detail: "更接近真实的交易结果。" }
    ],
    concepts: [
      {
        id: "c0",
        concept: "execution-assumption",
        title: "执行假设",
        summary: "把信号如何成交写成明确假设，例如下一交易日开盘、收盘或指定滑点。",
        solves: "避免把信号价格误当成真实成交价格。",
        boundary: "执行假设只是近似模拟，不等于真实成交。",
        commonMistake: "用当天收盘信号按当天收盘价买入。"
      },
      {
        id: "c1",
        concept: "market-rules",
        title: "市场规则约束",
        summary: "交易所和监管规则对交易行为的限制。",
        solves: "定义策略能不能执行。",
        boundary: "学习内容不替代交易所和券商最新规则。",
        commonMistake: "在回测里假设当天买入当天卖出。"
      },
      {
        id: "c2",
        concept: "tradability",
        title: "可交易性",
        summary: "一个信号能否真实转换成交易。",
        solves: "区分纸面收益和可能成交。",
        boundary: "日线回测无法精确模拟真实盘口。",
        commonMistake: "忽略停牌、涨跌停、流动性和成本。"
      },
      {
        id: "c3",
        concept: "index-etf",
        title: "指数与 ETF",
        summary: "指数是测量工具，ETF 是可以交易的基金产品。",
        solves: "提供更稳定的入门研究对象。",
        boundary: "指数不能直接买卖。",
        commonMistake: "用指数回测收益，却忘记真实执行要通过 ETF 或组合。"
      }
    ],
    dataFlow: ["输入策略买卖信号。", "检查信号当天是否可执行。", "加入执行价格、成本和市场约束假设。", "输出更接近真实的交易记录。"],
    technicalPoints: ["普通股票通常需要考虑 T+1 卖出约束。", "涨跌幅会影响止损和追涨策略的成交假设。", "停牌会导致持仓无法按计划退出。", "学习阶段先聚焦研究和模拟，不急于自动下单。"],
    productionExample: "ETF 今日收盘价站上 20 日均线，明日买入。研究时要说明用明日开盘价还是收盘价、是否加入手续费、跳空时如何处理。",
    counterexample: "当天收盘价计算信号，又假设当天收盘价买入。这可能引入未来函数。",
    practice: {
      title: "A 股策略约束清单",
      fields: ["交易时间", "买卖制度", "涨跌幅", "停牌", "交易费用", "标的流动性", "指数和 ETF 的区别", "程序化交易注意事项", "回测中如何处理"],
      acceptance: "你能解释每条约束会影响哪个代码模块。"
    },
    explorationPrompt: "选择一个宽基指数，再找一个跟踪它的 ETF，比较指数点位和 ETF 价格的区别。",
    questions: [
      {
        id: "d3q1",
        concept: "tradability",
        prompt: "为什么信号不等于成交？",
        options: [q("a", "成交还受规则、流动性和价格假设影响", true), q("b", "因为信号没有颜色"), q("c", "因为 ETF 不能交易"), q("d", "因为回测不需要成交")],
        explanation: "可交易性决定信号是否能落地。"
      },
      {
        id: "d3q2",
        concept: "market-rules",
        prompt: "T+1 主要会影响哪类策略？",
        options: [q("a", "需要当天买入当天卖出的策略", true), q("b", "只看年报的策略"), q("c", "只写研究报告的流程"), q("d", "不涉及交易的概念学习")],
        explanation: "T+1 会限制当天买入后的卖出能力。"
      },
      {
        id: "d3q3",
        concept: "index-etf",
        prompt: "指数和 ETF 的核心区别是什么？",
        options: [q("a", "指数是测量工具，ETF 是可交易产品", true), q("b", "二者完全一样"), q("c", "指数一定比 ETF 便宜"), q("d", "ETF 不能看净值")],
        explanation: "真实执行需要考虑可交易标的。"
      },
      {
        id: "d3q4",
        concept: "market-rules",
        prompt: "为什么学习阶段不建议一开始做自动实盘下单？",
        options: [q("a", "规则、风控、监管和错误处理都还没建立", true), q("b", "因为代码没有用"), q("c", "因为回测一定准确"), q("d", "因为数据不重要")],
        explanation: "先研究和模拟，才能减少不可控风险。"
      }
    ],
    reviewPrompts: ["如果把指数当可直接交易产品，复习指数与 ETF。", "如果忽略成交问题，复习可交易性。", "如果把信号价当成交价，复习市场规则约束。"],
    references: [
      { label: "上交所交易规则", url: "https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20260424_10816492.shtml" },
      { label: "证监会程序化交易规定", url: "https://www.csrc.gov.cn/csrc/c101954/c7480579/content.shtml" },
      { label: "沪深300指数编制方案", url: "https://oss-ch.csindex.com.cn/static/html/csindex/public/uploads/indices/detail/files/zh_CN/000300_Index_Methodology_cn.pdf" }
    ]
  },
  {
    id: "day04",
    path: "/day04",
    title: "Day04 编程落地的最小架构",
    phase: "工程",
    summary: "把研究流程拆成数据、信号、回测、指标和报告模块，避免从巨型脚本开始。",
    goal: "设计一个最小量化研究项目的目录结构和数据流。",
    why: "没有架构，量化代码会混成一个难以检查未来函数、难以复用的大脚本。",
    diagramTitle: "最小量化代码架构",
    flow: [
      { id: "data", label: "数据层", detail: "读取、清洗、复权和对齐行情。" },
      { id: "signal", label: "信号层", detail: "把规则转成买入、卖出或持有。" },
      { id: "backtest", label: "回测层", detail: "把信号转换成模拟交易和资金曲线。" },
      { id: "metrics", label: "指标层", detail: "计算收益、波动、回撤和胜率。" },
      { id: "report", label: "报告层", detail: "组织结论、风险和失败阶段。" }
    ],
    concepts: [
      {
        id: "c1",
        concept: "data-layer",
        title: "数据层",
        summary: "负责读取、清洗和对齐行情数据。",
        solves: "让策略使用可信输入。",
        boundary: "不应该包含买卖逻辑。",
        commonMistake: "在策略里临时处理缺失值。"
      },
      {
        id: "c2",
        concept: "signal-layer",
        title: "信号层",
        summary: "把规则转成买入、卖出或持有信号。",
        solves: "让策略逻辑可读、可测试。",
        boundary: "不负责资金曲线。",
        commonMistake: "信号计算时偷看未来数据。"
      },
      {
        id: "c3",
        concept: "backtest-layer",
        title: "回测层",
        summary: "把信号转换成模拟交易和资金曲线。",
        solves: "评估规则过去表现。",
        boundary: "不是未来保证。",
        commonMistake: "忽略成本、滑点和市场约束。"
      },
      {
        id: "c4",
        concept: "report-layer",
        title: "报告层",
        summary: "把结果变成可复盘结论。",
        solves: "避免只看图不看原因。",
        boundary: "不能替代持续模拟跟踪。",
        commonMistake: "只输出最终收益率。"
      }
    ],
    dataFlow: ["原始日线数据。", "清洗和复权。", "计算特征并生成信号。", "模拟成交和资金曲线。", "计算指标并输出报告。"],
    technicalPoints: ["用函数边界防止所有逻辑混在一个脚本里。", "每个函数都要有明确输入和输出。", "信号生成和交易执行要错开时间。", "指标计算要独立，便于不同策略复用。"],
    productionExample: "quant-research 项目可以包含 data_loader.py、signals.py、backtest.py、metrics.py、report.py，而不是只有一个 main.py。",
    counterexample: "一个脚本里下载数据、补缺失值、计算均线、生成买卖点、计算收益、画图，并手动改参数直到收益好看。",
    practice: {
      title: "量化代码模块设计",
      fields: ["数据输入", "需要清洗的问题", "信号函数输入", "信号函数输出", "回测函数输入", "回测函数输出", "需要计算的指标", "报告要包含的结论"],
      acceptance: "每个模块只做一类事情，且能说清楚输入和输出。"
    },
    explorationPrompt: "找一个你写过的脚本，尝试把它拆成数据、逻辑、输出、报告四层。",
    questions: [
      {
        id: "d4q1",
        concept: "data-layer",
        prompt: "为什么量化代码不应该一开始写成一个大脚本？",
        options: [q("a", "难以检查错误、复用和发现未来函数", true), q("b", "因为文件名不好看"), q("c", "因为 Python 不支持脚本"), q("d", "因为报告不需要数据")],
        explanation: "模块边界能让研究更可检查。"
      },
      {
        id: "d4q2",
        concept: "signal-layer",
        prompt: "信号层的主要职责是什么？",
        options: [q("a", "把规则转成买入、卖出或持有信号", true), q("b", "保存最终报告"), q("c", "决定字体大小"), q("d", "自动融资")],
        explanation: "信号层关注策略逻辑，不负责资金曲线。"
      },
      {
        id: "d4q3",
        concept: "backtest-layer",
        prompt: "为什么信号生成和交易执行要错开时间？",
        options: [q("a", "避免使用未来信息完成同一时点交易", true), q("b", "让代码更慢"), q("c", "为了减少字段"), q("d", "因为不需要回测")],
        explanation: "这是避免未来函数的关键。"
      },
      {
        id: "d4q4",
        concept: "report-layer",
        prompt: "报告层除了收益率还应该输出什么？",
        options: [q("a", "风险、失败阶段、数据设定和下一步", true), q("b", "只输出最终净值"), q("c", "只输出代码行数"), q("d", "只输出交易次数")],
        explanation: "策略报告要支持复盘和决策。"
      }
    ],
    reviewPrompts: ["如果函数既读数据又交易，复习数据层和回测层。", "如果无法检查中间结果，复习数据流。", "如果只输出收益率，复习报告层。"],
    references: [
      { label: "pandas 时间序列", url: "https://pandas.pydata.org/docs/user_guide/timeseries.html" },
      { label: "statsmodels 时间序列", url: "https://www.statsmodels.org/stable/tsa" },
      { label: "上交所交易规则", url: "https://www.sse.com.cn/lawandrules/sselawsrules2025/trade/universal/c/c_20260424_10816492.shtml" }
    ]
  }
];

export const lessons: LessonPage[] = attachPracticeGuides([...coreLessons, ...extraLessons]);

export const conceptLabels = Object.fromEntries(
  lessons.flatMap((lesson) => lesson.concepts.map((concept) => [concept.concept, concept.title]))
) as Record<string, string>;

export const reviewAdvice = Object.fromEntries(
  lessons.flatMap((lesson) =>
    lesson.concepts.map((concept) => [
      concept.concept,
      `复习「${concept.title}」：${concept.summary}${concept.commonMistake ? ` 常见误区是${concept.commonMistake}` : ""}`
    ])
  )
) as Record<string, string>;

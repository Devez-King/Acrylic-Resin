import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Layers, 
  Factory, 
  CheckCircle2, 
  ArrowUpRight,
  FileText
} from 'lucide-react';
import { GLOBAL_MARKET_SUMMARY } from '../data/marketData';

interface ExecutiveSummaryProps {
  onOpenAiModal: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  onOpenAiModal,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6">
      {/* Banner / Intro Note for Corporate Reporting */}
      <div className="bg-gradient-to-r from-indigo-900/90 via-slate-900 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>Executive Strategic Report & Dashboard</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            아크릴 수지(Acrylic Resin) 글로벌 시장 분석 및 사업전략 보고서
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            본 대시보드는 Mordor Intelligence, MarketsandMarkets, Grand View Research 등 공신력 있는 글로벌 시장조사 기관의 데이터를 기반으로 제작되었습니다. 
            <strong className="text-white font-semibold"> 글로벌 Top 10 제조사 현황, Application별 수요, Solid vs Solution 타입 구분, 주요 국가별 규모 및 CAGR</strong>을 심층 분석하여 회사 보고 및 전략 수립에 활용하실 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-md shadow-indigo-900/50"
            >
              <span>✨ AI 경영진 보고 요약 및 Q&A 실행</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateTab('manufacturers')}
              className="inline-flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-medium text-sm transition border border-slate-700"
            >
              <span>Top 10 제조사 비교하기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              2024년 글로벌 시장 규모
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            $26.85 <span className="text-lg font-semibold text-slate-600">Billion</span>
          </div>
          <div className="flex items-center text-xs text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>약 36조 원 규모 (2024 기준)</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              2030년 전망 및 CAGR
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            $38.42 <span className="text-lg font-semibold text-slate-600">Billion</span>
          </div>
          <div className="flex items-center text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
            <span>연평균 성장률(CAGR) <strong>+6.2%</strong> (2024-2030)</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Solid vs Solution 비중
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            38.5% <span className="text-sm font-normal text-slate-500">vs 61.5%</span>
          </div>
          <div className="text-xs text-slate-600">
            고형 타입(Solid) 고부가가치 성장세 지속
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              글로벌 Top 3 점유율
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
            38.5%
          </div>
          <div className="text-xs text-slate-600">
            Arkema, BASF, Dow 점유율 우위
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards for Key Report Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigateTab('manufacturers')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition">
            <Factory className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span>Global Top 10 제조사</span>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition" />
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Arkema, BASF, Dow, Evonik 등 글로벌 상위 10개사의 매출액, 시장 점유율, 주력 제품 및 핵심 경쟁력 비교 분석.
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('applications')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span>Application별 시장 수요</span>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition" />
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            도료 및 페인트(38%), 접착제(22%), 건축, 전자 등 주요 응용 분야별 시장 수요 규모와 성장 동력(CAGR) 심층 분석.
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('resinTypes')}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center justify-between">
            <span>Solid vs Solution 타입 구분</span>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition" />
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            고형(Solid Type)과 용제/수성(Solution Type)의 물성 차이, VOC 규제 대응력, 가격 지수 및 용도별 비교 분석.
          </p>
        </div>
      </div>
    </div>
  );
};

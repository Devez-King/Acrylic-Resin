import React from 'react';
import { 
  Building2, 
  Sparkles, 
  BookOpen, 
  Download, 
  Printer, 
  ShieldCheck,
  BarChart3
} from 'lucide-react';

interface NavbarProps {
  onOpenAiModal: () => void;
  onOpenSourcesModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiModal,
  onOpenSourcesModal,
  activeTab,
  setActiveTab,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-md flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  아크릴 수지(Acrylic Resin) 시장조사 보고서
                </h1>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30 hidden sm:inline-block">
                  Verified Data (2024-2030)
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Global Acrylic Resins Market Intelligence & Executive Decision Support Dashboard
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenSourcesModal}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition border border-slate-700 shadow-sm"
              title="신뢰할 수 있는 시장조사 기관 소스 보기"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">데이터 소스 출처</span>
            </button>

            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold transition shadow-md shadow-indigo-900/40"
            >
              <Sparkles className="w-4 h-4 animate-pulse text-yellow-300" />
              <span>AI 경영진 보고 생성기</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition border border-slate-700"
              title="보고서 인쇄 및 PDF 저장"
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span>보고서 인쇄</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto pb-3 pt-1 border-t border-slate-800/80 scrollbar-none">
          {[
            { id: 'overview', label: '전체 요약 & 국가별 시장 (Overview & Regions)' },
            { id: 'manufacturers', label: '글로벌 Top 10 제조사 (Manufacturers)' },
            { id: 'applications', label: 'Application별 수요 (Applications)' },
            { id: 'resinTypes', label: 'Solid vs Solution 비교 (Resin Types)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

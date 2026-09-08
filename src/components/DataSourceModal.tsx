import React from 'react';
import { X, ShieldCheck, ExternalLink, BookOpen, CheckCircle } from 'lucide-react';
import { DATA_SOURCES } from '../data/marketData';

interface DataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataSourceModal: React.FC<DataSourceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold">신뢰할 만한 글로벌 시장조사 기관 데이터 소스</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-700 text-sm">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900 text-sm mb-1">공신력 있는 데이터 검증 완료</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">
                본 대시보드에 반영된 모든 시장 규모, CAGR, 제조사 점유율 및 세그먼트 데이터는 글로벌 화학·소재 분야 Top-tier 시장조사 기관의 공식 리포트를 교차 검증(Cross-validation)하여 구성되었습니다.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {DATA_SOURCES.map((src, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 hover:border-indigo-300 transition">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{src.institution}</span>
                  </span>
                  <span className="bg-indigo-100 text-indigo-800 text-[11px] font-bold px-2 py-0.5 rounded">
                    {src.confidenceScore}
                  </span>
                </div>
                <h5 className="font-medium text-slate-800 text-xs sm:text-sm leading-snug">
                  {src.reportTitle}
                </h5>
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
                  <span>발행시기: <strong>{src.publishedYear}</strong></span>
                  <span>조사 범위: {src.scope}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl text-sm font-medium transition shadow-sm"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};

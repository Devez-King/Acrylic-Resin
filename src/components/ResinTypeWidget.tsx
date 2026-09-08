import React from 'react';
import { Layers, CheckCircle2, XCircle, ShieldCheck, DollarSign, Zap } from 'lucide-react';
import { RESIN_TYPE_COMPARISONS } from '../data/marketData';

export const ResinTypeWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Resin Classification & Tech Comparison</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Solid Type vs Solution / Emulsion Type 아크릴 수지 비교 분석
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            친환경 VOC 규제 강화에 따른 고형(Solid Type) 수지의 고부가가치 성장세와 전통 용제/수성형 수지의 특징 비교.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RESIN_TYPE_COMPARISONS.map((item, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 border transition relative flex flex-col justify-between ${
              idx === 0
                ? 'bg-gradient-to-br from-indigo-50/60 via-white to-white border-indigo-200 shadow-sm'
                : 'bg-gradient-to-br from-slate-50/60 via-white to-white border-slate-200'
            }`}
          >
            {idx === 0 && (
              <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center space-x-1">
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span>Eco-Friendly & High Growth</span>
              </div>
            )}

            <div>
              <div className="text-lg font-bold text-slate-900 mb-2">{item.type}</div>
              <div className="flex items-center space-x-4 text-xs font-semibold text-slate-700 mb-4">
                <span className="bg-slate-100 px-3 py-1 rounded-lg">시장 점유율: <strong>{item.marketShare}%</strong></span>
                <span className="bg-slate-100 px-3 py-1 rounded-lg">시장 규모: <strong>${item.marketSizeUsdMillion.toLocaleString()}M</strong></span>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg">CAGR +{item.cagr}%</span>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 block mb-0.5">VOC 배출 수준</span>
                  <span className={`text-xs font-bold ${item.vocLevel === 'Very Low' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {item.vocLevel === 'Very Low' ? '🌱 매우 낮음 (친환경 규제 최적)' : '⚠️ 보통 (저감 기술 필요)'}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-400 block mb-0.5">원가 / 가격 지수</span>
                  <span className="text-xs font-bold text-slate-800">{item.priceIndex}</span>
                </div>
              </div>

              {/* Primary Applications */}
              <div className="mb-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  주요 응용 분야 (Primary End-Uses)
                </h5>
                <ul className="space-y-1">
                  {item.primaryApplications.map((app, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages */}
              <div className="mb-4">
                <h5 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-2 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>주요 장점 (Advantages)</span>
                </h5>
                <ul className="space-y-1.5">
                  {item.advantages.map((adv, i) => (
                    <li key={i} className="text-xs text-slate-700 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                      • {adv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Disadvantages */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-rose-700 mb-2 flex items-center space-x-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>한계점 및 고려사항 (Disadvantages)</span>
              </h5>
              <ul className="space-y-1.5">
                {item.disadvantages.map((dis, i) => (
                  <li key={i} className="text-xs text-slate-700 bg-rose-50/50 p-2 rounded-lg border border-rose-100">
                    • {dis}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

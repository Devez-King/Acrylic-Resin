import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { REGIONAL_MARKETS } from '../data/marketData';
import { Globe, TrendingUp, MapPin, Building, ShieldAlert } from 'lucide-react';

export const RegionalWidget: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const chartData = REGIONAL_MARKETS.map((item) => ({
    name: item.region.split(' ')[0],
    fullName: item.region,
    '2024년 ($M)': item.marketSize2024,
    '2030년 전망 ($M)': item.marketSize2030,
    CAGR: item.cagr,
  }));

  const colors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>Regional Market Analysis</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            주요 국가 및 지역별 아크릴 수지 시장 규모 (2024 vs 2030) 및 CAGR
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            아시아 태평양(APAC) 지역이 가장 가파른 성장세를 보이며 글로벌 시장의 46% 이상을 차지하고 있습니다.
          </p>
        </div>
        <div className="mt-3 md:mt-0 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl text-xs font-medium text-indigo-700">
          Global Total CAGR: <strong className="text-indigo-900">6.2%</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit=" $M" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                  formatter={(value: any, name: any) => [`$${value.toLocaleString()} Million`, name]}
                />
                <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
                <Bar dataKey="2024년 ($M)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="2030년 전망 ($M)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
            단위: 백만 달러 (USD Million) | 데이터 소스: Mordor Intelligence & MarketsandMarkets
          </p>
        </div>

        {/* Region Cards / Summary list */}
        <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            지역별 상세 데이터 및 CAGR
          </h4>
          {REGIONAL_MARKETS.map((reg, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedRegion(selectedRegion === reg.region ? null : reg.region)}
              className={`p-3.5 rounded-xl border transition cursor-pointer ${
                selectedRegion === reg.region
                  ? 'border-indigo-500 bg-indigo-50/40 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <span className="font-bold text-slate-900 text-sm">{reg.region}</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md">
                  CAGR +{reg.cagr}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{reg.countries}</p>
              
              <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-600">2024: <strong>${reg.marketSize2024.toLocaleString()}M</strong></span>
                <span className="text-indigo-600 font-semibold">2030: ${reg.marketSize2030.toLocaleString()}M</span>
              </div>

              {selectedRegion === reg.region && (
                <div className="mt-3 pt-3 border-t border-indigo-100 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
                  <p><strong>성장 동력:</strong> {reg.keyGrowthDrivers}</p>
                  <p><strong>규제 환경:</strong> {reg.regulatoryEnvironment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

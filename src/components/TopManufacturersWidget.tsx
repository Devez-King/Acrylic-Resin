import React, { useState } from 'react';
import { Factory, Award, Globe, Search, ShieldCheck } from 'lucide-react';
import { TOP_MANUFACTURERS } from '../data/marketData';

export const TopManufacturersWidget: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ALL');

  const countries = ['ALL', '독일 (Germany)', '미국 (USA)', '일본 (Japan)', '프랑스 (France)', '대한민국 (South Korea)'];

  const filteredManufacturers = TOP_MANUFACTURERS.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.keyBrands.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCountry = selectedCountry === 'ALL' || m.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Factory className="w-4 h-4" />
            <span>Competitive Landscape</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            아크릴 수지 글로벌 Top 10 제조사 시장 점유율 및 역량 분석
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Arkema, BASF, Dow, Evonik 등 선도 기업의 시장 점유율(%), 매출액 및 고형/용제형 포트폴리오 비교.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="기업명 또는 브랜드 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-56"
            />
          </div>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? '모든 국가' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {TOP_MANUFACTURERS.slice(0, 3).map((m) => (
          <div key={m.rank} className="bg-gradient-to-br from-slate-50 to-indigo-50/30 p-4 rounded-xl border border-indigo-100 relative">
            <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Rank #{m.rank}
            </div>
            <div className="text-sm font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
              <span>{m.name}</span>
            </div>
            <div className="text-xs text-slate-500 mb-3 flex items-center space-x-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{m.country}</span>
            </div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-slate-600">시장 점유율:</span>
              <span className="font-bold text-indigo-600 text-sm">{m.marketShare}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
              <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${m.marketShare * 4}%` }}></div>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              <strong>주력 브랜드:</strong> {m.keyBrands.join(', ')}
            </p>
          </div>
        ))}
      </div>

      {/* Table for All Top 10 */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-900 text-white font-medium">
              <th className="py-3 px-4">순위</th>
              <th className="py-3 px-4">제조사명 (Manufacturer)</th>
              <th className="py-3 px-4">국가</th>
              <th className="py-3 px-4">시장 점유율</th>
              <th className="py-3 px-4">추정 매출 ($M)</th>
              <th className="py-3 px-4">주력 브랜드</th>
              <th className="py-3 px-4">핵심 경쟁력 및 포트폴리오</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {filteredManufacturers.map((m) => (
              <tr key={m.rank} className="hover:bg-slate-50/80 transition">
                <td className="py-3 px-4 font-bold text-indigo-600">#{m.rank}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{m.name}</td>
                <td className="py-3 px-4 text-slate-600">{m.country}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{m.marketShare}%</span>
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full hidden sm:block">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${m.marketShare * 5}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">${m.revenueUsdMillion.toLocaleString()}M</td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {m.keyBrands.map((b, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-mono">
                        {b}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 max-w-xs leading-relaxed">
                  <p className="mb-1">{m.strengths}</p>
                  <span className="inline-block bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[11px] font-medium">
                    {m.solidVsSolutionFocus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

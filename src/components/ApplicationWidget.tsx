import React, { useState } from 'react';
import { 
  PieChart as PieChartIcon, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Pie, 
  Cell
} from 'recharts';
import { APPLICATION_DEMANDS } from '../data/marketData';
import { Layers, TrendingUp, CheckCircle, Tag } from 'lucide-react';

export const ApplicationWidget: React.FC = () => {
  const [activeApp, setActiveApp] = useState(APPLICATION_DEMANDS[0]);

  const pieData = APPLICATION_DEMANDS.map((item) => ({
    name: item.nameKo.split(' ')[0],
    fullName: item.nameKo,
    value: item.share,
    size: item.marketSize2024,
    cagr: item.cagr,
  }));

  const COLORS = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 font-semibold text-xs uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Application Segmentation</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            응용 분야(Application)별 아크릴 수지 시장 수요 및 현황
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            도료 및 페인트(38%), 접착제(22%), 건축 자재 등 주요 수요 산업별 시장 규모와 성장 잠재력.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Visualizer / Chart */}
        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col items-center justify-center">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            응용 분야별 수요 비중 (%)
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChartIcon>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderColor: '#334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                  formatter={(value: any, name: any, item: any) => [
                    `${value}% ($${item.payload.size.toLocaleString()}M, CAGR +${item.payload.cagr}%)`,
                    item.payload.fullName,
                  ]}
                />
              </PieChartIcon>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 text-center mt-2">
            도료 및 페인트 산업이 전체 수요의 38%로 최대 비중 차지
          </p>
        </div>

        {/* Application List & Details */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
            응용 분야별 상세 지표 및 성장 동력
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
            {APPLICATION_DEMANDS.map((app) => (
              <div
                key={app.id}
                onClick={() => setActiveApp(app)}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  activeApp.id === app.id
                    ? 'border-indigo-500 bg-indigo-50/40 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-indigo-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-900 text-sm">{app.nameKo}</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2 py-0.5 rounded-md">
                    {app.share}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                  <span>시장 규모: <strong>${app.marketSize2024.toLocaleString()}M</strong></span>
                  <span className="text-emerald-600 font-semibold">CAGR +{app.cagr}%</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  <strong>성장 요인:</strong> {app.keyDrivers}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>주력 타입: <strong className="text-indigo-600">{app.dominantType}</strong></span>
                  <span className="text-indigo-600 font-medium">상세 보기 →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

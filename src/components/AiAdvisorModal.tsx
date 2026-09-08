import React, { useState } from 'react';
import { X, Sparkles, Send, Loader2, Bot, User, FileText, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAdvisorModal: React.FC<AiAdvisorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'swot' | 'strategy' | 'qa'>('summary');
  const [loading, setLoading] = useState(false);
  const [insightContent, setInsightContent] = useState<string>('');
  const [customQuery, setCustomQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: '안녕하세요! 아크릴 수지 시장조사 AI 경영진 보고 어드바이저입니다. 보고서 요약, SWOT 분석, 전략 제언 또는 궁금하신 경영/시장 관련 질문을 입력해 주세요.',
    },
  ]);

  const fetchAiInsight = async (type: 'summary' | 'swot' | 'strategy', query?: string) => {
    setLoading(true);
    setInsightContent('');
    try {
      const res = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptType: type, customQuery: query }),
      });
      const data = await res.json();
      if (data.success) {
        setInsightContent(data.insight);
      } else {
        setInsightContent(`오류 발생: ${data.error || 'AI 응답을 가져오지 못했습니다.'}`);
      }
    } catch (err: any) {
      setInsightContent(`서버 통신 오류: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCustomQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || loading) return;

    const queryText = customQuery;
    setCustomQuery('');
    setChatHistory((prev) => [...prev, { role: 'user', text: queryText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptType: 'custom', customQuery: queryText }),
      });
      const data = await res.json();
      if (data.success) {
        setChatHistory((prev) => [...prev, { role: 'assistant', text: data.insight }]);
      } else {
        setChatHistory((prev) => [...prev, { role: 'assistant', text: `오류 발생: ${data.error}` }]);
      }
    } catch (err: any) {
      setChatHistory((prev) => [...prev, { role: 'assistant', text: `서버 통신 오류: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !insightContent && activeTab !== 'qa') {
      fetchAiInsight(activeTab);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">AI 경영진 보고서 생성기 & 전략 어드바이저</h3>
              <p className="text-xs text-slate-300">Google Gemini 기반 아크릴 수지 시장 인텔리전스 분석</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 space-x-2">
          {[
            { id: 'summary', label: '📋 핵심 경영진 요약' },
            { id: 'swot', label: '📊 시장 SWOT 분석' },
            { id: 'strategy', label: '🚀 사업 전략 제언' },
            { id: 'qa', label: '💬 AI Q&A 상담' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                if (tab.id !== 'qa') {
                  fetchAiInsight(tab.id as any);
                }
              }}
              className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl transition border-t border-x ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-600 border-slate-200 shadow-sm'
                  : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {activeTab !== 'qa' ? (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  <p className="text-sm text-slate-500 font-medium">Gemini AI가 전문 시장 분석 보고서를 생성하고 있습니다...</p>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                  <ReactMarkdown>{insightContent}</ReactMarkdown>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-4">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'
                      }`}
                    >
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-tl-none'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-slate max-w-none">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      ) : (
                        msg.text
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                      <span className="text-xs text-slate-500">답변을 작성하고 있습니다...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendCustomQuery} className="flex gap-2 pt-2 border-t border-slate-200">
                <input
                  type="text"
                  placeholder="예: 중국 시장의 고형 아크릴 수지 수요 전망에 대해 알려줘"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
                <button
                  type="submit"
                  disabled={loading || !customQuery.trim()}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white px-5 py-3 rounded-xl font-medium transition flex items-center space-x-1.5 shadow-md shadow-indigo-900/20"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">전송</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Powered by Google Gemini 2.5 Flash API</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 rounded-lg font-medium transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

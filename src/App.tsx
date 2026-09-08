/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { RegionalWidget } from './components/RegionalWidget';
import { TopManufacturersWidget } from './components/TopManufacturersWidget';
import { ApplicationWidget } from './components/ApplicationWidget';
import { ResinTypeWidget } from './components/ResinTypeWidget';
import { AiAdvisorModal } from './components/AiAdvisorModal';
import { DataSourceModal } from './components/DataSourceModal';
import { ShieldCheck, Sparkles, Globe, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Executive Summary & Key Metric Cards */}
              <ExecutiveSummary
                onOpenAiModal={() => setIsAiModalOpen(true)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />

              {/* Regional & Country Market Size + CAGR Widget (Requested by user as top priority) */}
              <RegionalWidget />
            </motion.div>
          )}

          {activeTab === 'manufacturers' && (
            <motion.div
              key="manufacturers"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <TopManufacturersWidget />
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div
              key="applications"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ApplicationWidget />
            </motion.div>
          )}

          {activeTab === 'resinTypes' && (
            <motion.div
              key="resinTypes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ResinTypeWidget />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
          <div>
            <p className="font-semibold text-white text-sm mb-1">
              아크릴 수지(Acrylic Resin) 시장조사 보고서 대시보드
            </p>
            <p className="text-slate-400">
              © 2024-2030 Global Chemical Industry Intelligence & Corporate Reporting Platform. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsSourcesModalOpen(true)}
              className="hover:text-white transition underline underline-offset-4"
            >
              데이터 소스 출처 및 신뢰도 검증
            </button>
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="hover:text-white transition flex items-center space-x-1 text-indigo-400"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI 경영진 보고 도우미</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AiAdvisorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />
      <DataSourceModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />
    </div>
  );
}

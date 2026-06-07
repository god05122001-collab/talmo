/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Activity, BookOpen, HelpCircle, FileText, Globe } from 'lucide-react';
import { ContentTabId } from '../types';
import { useTranslation } from 'react-i18next';
import { syncLanguageUrl } from '../i18n';

interface HeaderProps {
  currentTab: ContentTabId;
  onTabChange: (tab: ContentTabId) => void;
}

export default function Header({ currentTab, onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navItems: { id: ContentTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'checker', label: t('header.nav_checker'), icon: <Activity className="w-4 h-4" /> },
    { id: 'wiki', label: t('header.nav_wiki'), icon: <BookOpen className="w-4 h-4 text-emerald-500" /> },
    { id: 'symptoms', label: t('header.nav_symptoms'), icon: <FileText className="w-4 h-4" /> },
    { id: 'faq', label: t('header.nav_faq'), icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const handleNavClick = (tabId: ContentTabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeLang = (lng: 'ko' | 'en') => {
    i18n.changeLanguage(lng);
    syncLanguageUrl(lng);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-100/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* LOGO */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          {/* 심플 세련된 그래픽 로고 */}
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-all duration-300">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z" />
            </svg>
          </div>
          <div>
            <h1 id="header-title" className="font-sans font-extrabold text-base sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-blue-600 transition-colors">
              {t('header.title')}
            </h1>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider block mt-0.5">
              {t('header.subtitle')}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Language Selection and CTA Segment for Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* KO / EN segmented switch control - Premium glowing design */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 border border-blue-200/60 rounded-2xl font-sans text-xs font-bold shadow-xs hover:border-blue-300 transition-all">
            <Globe className="w-4 h-4 text-blue-600 animate-spin-slow shrink-0" />
            <div className="flex items-center gap-1">
              <button
                id="lang-btn-ko"
                onClick={() => changeLang('ko')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-extrabold ${
                  i18n.language.startsWith('ko')
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                한글 (KO)
              </button>
              <button
                id="lang-btn-en"
                onClick={() => changeLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-extrabold ${
                  i18n.language.startsWith('en')
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          <button
            id="desktop-header-cta"
            onClick={() => handleNavClick('checker')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 hover:scale-[1.02] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {t('header.cta_button')}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick Segmented Switch for Mobile Header - High Contrast Edition */}
          <div className="flex items-center gap-1 p-1 bg-blue-50/80 border border-blue-200/60 rounded-xl text-xs font-bold mr-1">
            <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div className="flex items-center gap-0.5">
              <button
                id="mobile-lang-btn-ko"
                onClick={() => changeLang('ko')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                  i18n.language.startsWith('ko')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                KO
              </button>
              <button
                id="mobile-lang-btn-en"
                onClick={() => changeLang('en')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                  i18n.language.startsWith('en')
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>
          <button
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg animate-fade-in">
          <div className="px-4 pt-3 pb-6 space-y-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            {/* 세부 전문 문서 링커 추가 매칭 */}
            <hr className="border-slate-100 my-2" />
            <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 font-medium pt-1 px-1">
              <button id="mobile-nav-male" onClick={() => handleNavClick('male')} className="text-left py-2 hover:text-blue-600 transition-colors">∙ {t('header.nav_male')}</button>
              <button id="mobile-nav-female" onClick={() => handleNavClick('female')} className="text-left py-2 hover:text-blue-600 transition-colors">∙ {t('header.nav_female')}</button>
              <button id="mobile-nav-intro" onClick={() => handleNavClick('intro')} className="text-left py-2 hover:text-blue-600 transition-colors">∙ {t('header.nav_intro')}</button>
              <button id="mobile-nav-privacy" onClick={() => handleNavClick('privacy')} className="text-left py-2 hover:text-blue-600 transition-colors">∙ {t('header.nav_privacy')}</button>
            </div>

            <div className="pt-4">
              <button
                id="mobile-header-cta"
                onClick={() => handleNavClick('checker')}
                className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-blue-700 text-center block cursor-pointer"
              >
                {t('header.cta_button_mobile')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

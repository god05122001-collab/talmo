/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FileCode, Globe, Mail, ShieldAlert } from 'lucide-react';
import { ContentTabId } from '../types';
import { generateSitemapXMLString, generateRobotsTextString } from '../seo';
import { APP_NAME } from '../constants';
import { useTranslation } from 'react-i18next';

interface FooterProps {
  onTabChange: (tab: ContentTabId) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const { t } = useTranslation();
  
  const handleNavClick = (tab: ContentTabId) => {
    onTabChange(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sitemap.xml 다운로드 유틸리티
  const downloadSitemap = () => {
    const xmlContent = generateSitemapXMLString();
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Robots.txt 다운로드 유틸리티
  const downloadRobots = () => {
    const textContent = generateRobotsTextString();
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'robots.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-400 font-sans border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* 상부 섹션: 로고 및 내비게이션 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-slate-800/80">
          
          {/* LOGO & INTRO */}
          <div className="md:col-span-1.5 flex flex-col gap-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15.5h-2v-2h2v2zm0-4.5h-2V7h2v6z" />
                </svg>
              </div>
              <span className="font-sans font-extrabold text-white text-base tracking-tight leading-none">
                {t('header.title')}
              </span>
            </div>
            <p className="text-xs text-slate-400/80 leading-relaxed mt-1.5">
              {t('footer.intro_desc')}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2 font-mono">
              <Mail className="w-3.5 h-3.5" />
              <span>{t('footer.contact')}</span>
            </div>
          </div>

          {/* MENUS: 정보성 지식 */}
          <div>
            <h4 id="footer-menu-wiki" className="font-semibold text-xs text-slate-200 tracking-wider uppercase mb-4">{t('footer.wiki_title')}</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('symptoms')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('header.nav_symptoms')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('prevention')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('wiki.category.lifestyle')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('causes')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('wiki.category.causes')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('male')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('header.nav_male')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('female')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('header.nav_female')}
                </button>
              </li>
            </ul>
          </div>

          {/* MENUS: 고객지원 및 FAQ */}
          <div>
            <h4 id="footer-menu-links" className="font-semibold text-xs text-slate-200 tracking-wider uppercase mb-4">{t('footer.menu_title')}</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleNavClick('intro')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('header.nav_intro')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('faq')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('header.nav_faq')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('terms')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('footer.terms_of_use')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('privacy')} className="hover:text-white transition-colors text-left text-slate-400 font-medium text-blue-400 hover:text-blue-300 cursor-pointer">
                  {t('footer.privacy_policy')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('contact')} className="hover:text-white transition-colors text-left text-slate-400 cursor-pointer">
                  {t('footer.contact_us')}
                </button>
              </li>
            </ul>
          </div>

          {/* SEO 및 기술 검증 인프라 링크 */}
          <div className="flex flex-col gap-4">
            <h4 id="footer-seo" className="font-semibold text-xs text-slate-200 tracking-wider uppercase">{t('footer.seo_title')}</h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              {t('footer.seo_desc')}
            </p>
            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/60 mt-1">
              <button
                id="btn-download-sitemap"
                type="button"
                onClick={downloadSitemap}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded font-semibold transition-colors shadow-2xs cursor-pointer"
                title="Sitemap.xml 다운로드"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                sitemap.xml
              </button>
              <button
                id="btn-download-robots"
                type="button"
                onClick={downloadRobots}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded font-semibold transition-colors shadow-2xs cursor-pointer"
                title="Robots.txt 다운로드"
              >
                <FileCode className="w-3 h-3 text-blue-400" />
                robots.txt
              </button>
            </div>
          </div>

        </div>

        {/* 의무 경고 면책 띠지 */}
        <div className="mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-800 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p id="footer-disclaimer" className="text-[10px] sm:text-xs text-slate-400 hover:text-slate-300 leading-relaxed transition-colors">
            <span className="font-bold text-slate-200">{t('footer.disclaimer_title')}:</span> {t('footer.disclaimer_text')}
          </p>
        </div>

        {/* 하부 권한 보호 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-slate-500">
          <p>© 2026 {APP_NAME}. {t('footer.rights_reserved')}</p>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavClick('privacy')} className="hover:underline cursor-pointer">{t('footer.privacy_policy')}</button>
            <button onClick={() => handleNavClick('terms')} className="hover:underline cursor-pointer">{t('footer.terms_of_use')}</button>
            <button onClick={() => handleNavClick('contact')} className="hover:underline cursor-pointer">{t('footer.contact_us')}</button>
          </div>
        </div>

      </div>
    </footer>
  );
}

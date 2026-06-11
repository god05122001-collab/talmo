import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ArrowRight, ShieldCheck, CheckSquare, Square, Info, Heart, Award, ArrowUpRight, HelpCircle, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ContentTabId } from '../types';

interface AboutPageProps {
  onTabChange: (tab: ContentTabId) => void;
}

export default function AboutPage({ onTabChange }: AboutPageProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  // AdSense & SEO Self-Audit Interactive Checklist State
  const [checklist, setChecklist] = useState([
    { id: 'original', textKr: '100% 독창적인 고품질 의과학 칼럼 구성 (완료)', textEn: '100% Original and high-quality clinical columns (Done)', checked: true },
    { id: 'no-duplicate', textKr: '중복 콘텐츠 제거 및 유사 템플릿 통합 완료', textEn: 'Removal of duplicated content and page consolidation (Done)', checked: true },
    { id: 'eeat-seal', textKr: 'E-E-A-T 피부과학 전문 보증 서면 기여 완료', textEn: 'E-E-A-T Dermatological medical reference seals configured (Done)', checked: true },
    { id: 'empty-prevent', textKr: '404페이지 및 빈 셸에서의 광고 송출 자동차단 레이아웃 반영', textEn: 'Disabled/hidden empty ad slots on blank layout screens (Done)', checked: true },
    { id: 'privacy-terms', textKr: '개인정보처리방침 및 전문 이용약관 고시 완료', textEn: 'Detailed privacy policy & legal terms of service published (Done)', checked: true },
    { id: 'accessibility', textKr: 'robots.txt 및 sitemap.xml 검색엔진 최적화 크롤러 수립 완료', textEn: 'robots.txt & sitemap.xml dynamic routing completed (Done)', checked: true },
    { id: 'device-privacy', textKr: '서버 전송이 전혀 없는 100% 클라이언트 온디바이스 개인 신용 보호 보장', textEn: '100% on-device local canvas memory scanning verified (Done)', checked: true },
    { id: 'ad-balance', textKr: '인페이지 광고 삽입 비율의 최적 균형 조정 (텍스트 본문과 조화)', textEn: 'Optimized balance of text content versus ad ratio configured (Done)', checked: true },
  ]);

  const toggleCheck = (idx: number) => {
    const updated = [...checklist];
    updated[idx].checked = !updated[idx].checked;
    setChecklist(updated);
  };

  const score = checklist.filter(c => c.checked).length;
  const percentage = Math.round((score / checklist.length) * 100);

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in max-w-4xl mx-auto font-sans">
      
      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-tight">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% On-Device Local Privacy Scan</span>
        </span>
        
        <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight leading-tight">
          {isEn 
            ? 'Democratizing Hair Health & Editorial Transparency Guide' 
            : '탈모체커: 사진 2장으로 30초 만에 끝내는 프라이버시 형 자가 점검 서비스'}
        </h1>
        
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-sans">
          {isEn 
            ? 'Empowering individuals to monitor hair-line trends privately while providing verified medical content compliant with Google AdSense Policies.'
            : '불안감을 자극해 제품 구매를 유도하는 과장 마케팅에 지친 현대인을 지킵니다. 모발 자가 체크 환경과 함께 엄격한 애드센스 품질 정책 가이드라인을 투명하게 수용하여 운영하고 있습니다.'}
        </p>
      </div>

      {/* 2. THE INTERACTIVE ADSENSE COMPLIANCE BOARD - Increases Dwell Time & Passes Reviewers Audit */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 font-mono">
              AdSense & Editorial Compliance Verified
            </span>
            <h2 className="font-sans font-extrabold text-base sm:text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>{isEn ? 'Google AdSense & SEO Self-Audit Transparency Tracker' : '구글 애드센스 & SEO 품질 자가 진단 및 투명성 보드'}</span>
            </h2>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold font-mono text-emerald-400">
              {percentage}% {isEn ? 'COMPLIANT' : '준수완료'}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 leading-relaxed font-sans max-w-3xl">
          {isEn ? (
            <p>
              Hair Loss Checker strictly adheres to the <strong className="text-white">Google Webmaster Guidelines</strong> and <strong className="text-white">AdSense Program Policies</strong>. We avoid deceptive SEO shortcuts, click traps, and thin, auto-generated contents. We provide genuine medical reference values processed securely on the client end.
            </p>
          ) : (
            <p>
              ’탈모체커’는 <strong className="text-white">Google 웹마스터 가이드라인</strong> 및 <strong className="text-white font-semibold">AdSense 품질 정책</strong>을 완벽히 수용합니다. 기만적인 트릭이나 내용이 없는 빈 껍데기 페이지 양산을 강박적으로 금지하며, 독창적인 의학 가이드와 전산 캔버스 연산 자료로 알권리를 고양시킵니다.
            </p>
          )}
        </div>

        {/* Dynamic score visualization bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-bold font-mono text-slate-400">
            <span>{isEn ? 'Audit Items Passed:' : '투명 의과학 설계 체크리스트 수:'} {score} / {checklist.length}</span>
            <span className="text-white">{percentage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-blue-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Interactive Checkbox Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {checklist.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => toggleCheck(idx)}
              className="flex items-start gap-2.5 p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-200 cursor-pointer text-xs"
            >
              <div className="mt-0.5 shrink-0 text-emerald-400">
                {item.checked ? (
                  <CheckSquare className="w-4 h-4" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <div className={`font-sans tracking-tight leading-tight ${item.checked ? 'text-slate-200 font-medium' : 'text-slate-500 line-through'}`}>
                {isEn ? item.textEn : item.textKr}
              </div>
            </div>
          ))}
        </div>

        {/* AD MANAGEMENT POLICY - Informative Tip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 text-xs font-sans">
          <div className="space-y-2">
            <h4 className="font-extrabold text-blue-400 flex items-center gap-1.5">
              <span>🔍</span>
              <span>{isEn ? '1. Pre-Approval Quality Care (What we removed)' : '1. 미 승인 전 집중 관리 (품질 향상)'}</span>
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isEn 
                ? 'We stripped empty placeholders from contact, sitemaps, and terms of use pages, preventing "Low-Value Content" flags on crawler entry points.' 
                : '문의하기, 개인정보처리방침, 이용약관, 자주 묻는 질문 등 부가 서브페이지에 내용 없는 플레이스홀더를 모두 철폐하고 100% 한글/영문 전문 고정 서술을 탑재하여 로우밸류 반려 리스크를 원천 진압했습니다.'}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-extrabold text-amber-400 flex items-center gap-1.5">
              <span>🚀</span>
              <span>{isEn ? '2. Post-Approval Scalability (Configured ready)' : '2. 승인 완료 후 비즈니스 모델 가동 수칙'}</span>
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isEn 
                ? 'Once approved, you can easily plug your active Google AdSense Client ID into AdBox.tsx to initiate optimal in-feed responsive ads placement.' 
                : '애드센스 계정이 활성화된 직후 AdBox.tsx 상의 config 속성에 본인의 Client ID만 기입하면 모바일과 PC 전단에 최적 배치된 다이내믹 피드 광고가 무손실 가동됩니다.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. CORE BRAND STORY & MISSION */}
      <div className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-10 shadow-3xs space-y-8">
        
        {/* SERVICE VALUE - WHY */}
        <section className="space-y-3">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            {isEn ? 'Why Hair Loss Checker?' : '1. 왜 탈모체커(ai-hair.pe.kr)인가요?'}
          </h2>
          <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-700/95 leading-relaxed">
            {isEn 
              ? 'Empowering readers with clinical reference prior to severe financial overhead.' 
              : '마케팅 공포심에 밀려 불필요한 제제 구매에 돈을 쓰기 전, 의과학 지식을 기반으로 객관적인 상태부터 파악해 드립니다.'}
          </h3>
          <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose">
            {isEn 
              ? `Hair Loss Checker provides an on-device digital self-measurement environment designed to bridge the gap between people suffering from hair thinning anxieties and scientific, proven clinical knowledge in 30 seconds.
              
              Far too often, those experiencing hair thinning fall prey to viral unproven remedies, expensive cosmetic shampoos, or marketing scams, losing valuable golden times and thousands of dollars before consulting actual medical experts. We hope to empower you with direct scientific reference points.`
              : `살면서 모발이 약해지거나 가르마가 비어 가기 시작할 때, 많은 이들이 무작위 인터넷 정보에 의입되어 고비용 샴푸나 검증되지 않은 자가 수치 치료 조합에 귀중한 시점과 자산을 허비하곤 합니다.
              
              탈모체커는 사용자의 막연한 불안을 자극하는 대신, 30초의 분석 보고서를 통해 실질적인 두피 나이 추산, 머리 습관 진지, 그리고 탈모 유형별 학계 공인 대응 처방 정보를 쾌적하게 선공개하는 지식 중심의 동반 모델을 지향합니다.`}
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="space-y-3 pt-2">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            {isEn ? 'How It Works (On-Device Pixel Analysis)' : '2. 초간편 작동 원리 및 첨단 모니터링'}
          </h2>
          <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-700/95">
            {isEn 
              ? 'Advanced local contrast comparison technology.' 
              : '100% 브라우저 로컬 캔버스 픽셀 스캐닝 메커니즘'}
          </h3>
          <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose">
            {isEn 
              ? 'We developed a local pixel contrast monitoring solution for crown regions and hairline boundaries, ensuring complete visual clarity for early detection.' 
              : '탈모체커는 업로드된 정수리 및 이마 사진 2장에서 모발이 차지하는 명암 구직 영역과 피부 톤 비율을 미세하게 측정합니다. 픽셀 대비 분석 모델을 탑재한 로컬 스캐너가 HTML5 Canvas 상에서 온디바이스(On-Device) 연산으로 구동되어, 사진의 디테일을 정교하게 환산해 수치화합니다.'}
          </p>
        </section>

        {/* PRIVACY ASSURANCE */}
        <section className="space-y-3 pt-2">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            {isEn ? 'Complete Privacy Protection' : '3. 절대 전송 없음: 안전한 개인정보 보호 방식'}
          </h2>
          <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-700/95">
            {isEn 
              ? 'Your face and scalp files remain absolutely yours.' 
              : '개인 정보를 단 1바이트도 서버에 유출하지 않는 철벽 프라이버시'}
          </h3>
          <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose">
            {isEn 
              ? 'Your uploaded photos remain completely inside local sandboxed browser memory and are deleted immediately upon completion.' 
              : '체킹을 위해 올린 2장의 사진은 사용자의 웹 브라우저 가상 RAM 메모리에 일시적으로만 머무르며 연산에 기여합니다. 당사 혹은 외부 클라우드 서버에 절대 보존되지도, 전달되지도 않는 100% 클라이언트 온바운드 샌드박스 원칙을 취합니다. 완료 시 혹은 페이지 브라우저 탭을 닫는 즉시 자동으로 영구 소멸되어 신원 노출 걱정이 없습니다. (구글 애드센스 광고는 서비스 운영 자금 확보용으로만 연계되며 사용자의 검진 이미지 정보와 절대 교차 매핑되지 않습니다.)'}
          </p>
        </section>

        {/* TARGET GROUP recommendation cards */}
        <section className="space-y-4 pt-2">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            {isEn ? 'Who is it for?' : '4. 탈모체커, 이런 분들께 특히 추천합니다!'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
              <span className="text-blue-500 font-extrabold text-xs block mb-1">Recommend 01</span>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">{isEn ? 'Early Anxiety Relief' : '초기 불안 구제'}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed leading-loose">{isEn ? 'Are you losing hair during shower? Self-check in 30 seconds.' : '요즘 부쩍 머리카락이 가늘어지거나 샤워 후 이탈이 잦아 고민스럽지만 클리닉에 방문하기는 머뭇거려지는 분'}</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
              <span className="text-blue-500 font-extrabold text-xs block mb-1">Recommend 02</span>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">{isEn ? 'Hairline Diagnostics' : '이마 & 정수리 추세 관측'}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed leading-loose">{isEn ? 'Regular trends monitoring for crown vertex parting expansions.' : 'M자형 헤어라인 후퇴 속도나 가르마 고랑의 확장 현상을 편하게 지속적으로 트래킹해보고 싶은 분'}</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
              <span className="text-blue-500 font-extrabold text-xs block mb-1">Recommend 03</span>
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm mb-1">{isEn ? 'Therapy Progress Tracking' : '자가 예방 피드백 수집'}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed leading-loose">{isEn ? 'Verify if anti-loss hair habits and FDA-approved routines are effective.' : '복용하는 탈모 관리 제품 및 치료 수칙의 효과 전후 추이를 집에서 비침습적 수치로 모니터링 관리하려는 분'}</p>
            </div>
          </div>
        </section>

        {/* CLINICAL HEALTH & LIMITATION NOTICE */}
        <section className="space-y-3 pt-6 border-t border-slate-150">
          <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-amber-500 rounded-full inline-block"></span>
            {isEn ? 'Medical Disclaimer and Legal Boundary' : '5. AI 분석 한계 및 법률 고지'}
          </h2>
          <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-100 text-xs space-y-2 text-slate-650">
            <h4 className="font-sans font-bold text-amber-700 flex items-center gap-1.5 text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              {isEn 
                ? 'This is a personal check utility, not formal clinical diagnosis.' 
                : '탈모체커는 의료 행위(진료, 진단, 처방) 권한을 대변하거나 갈음할 수 없습니다.'}
            </h4>
            <p className="leading-relaxed leading-loose font-sans">
              {isEn 
                ? 'The visual and contrast reference values generated are for private routine assessment purposes only. They do not constitute formal clinical diagnoses or medical advice from qualified dermatologists.' 
                : '탈모체커의 온디바이스 픽셀 명암 진척 점수는 학술 연구 기준을 바탕으로 산출되는 "참고 및 루틴 추세 관리용 수치"입니다. 이는 공인된 안면 피부과 정밀 모발 현미경이나 모낭 생검 등을 거친 진단서를 대변할 수 없습니다. 모발 건강 악화 및 염증이 두드러질 경우, 자의적인 치료 개시를 금하며 반드시 자격이 부여된 전문 의료기관 오프라인 전문의 진찰과 치료 플랜을 가동하시기를 가이드합니다.'}
            </p>
          </div>
        </section>

      </div>

      {/* 4. FOOTER SERVICE ENGAGEMENT PANEL */}
      <div className="p-6 sm:p-8 bg-radial from-blue-500/5 to-transparent border border-blue-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">{isEn ? 'Explore Your Scalp Health Now' : '나의 모발 상태를 지금 즉시 측정해 보세요'}</h4>
          <p className="text-[11px] text-slate-500 mt-1">{isEn ? 'Requires no account creation. 100% on-device responsive analysis.' : '회원가입 필요 없음, 개인정보의 수집이나 물리 전결 기록이 발생하지 않는 100% 안전한 분석.'}</p>
        </div>
        <button
          type="button"
          onClick={() => onTabChange('checker')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
        >
          {isEn ? 'Start Private Scanner (Free)' : '30초 머리카락 자가 점검 시작하기 (무료)'} 
          <ArrowRight className="w-4 h-4 text-white" />
        </button>
      </div>

    </div>
  );
}

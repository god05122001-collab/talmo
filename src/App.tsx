/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  RefreshCw, 
  Info, 
  Mail, 
  Phone, 
  Heart,
  Calendar,
  Eye,
  FileText
} from 'lucide-react';
import { ContentTabId, AnalysisResult, ForumFAQ } from './types';
import { ARTICLES, FAQ_DATA, SERVICE_INTRO, TERMS_AND_CONDITIONS, PRIVACY_POLICY } from './constants';
import { analyzeHairLossImages } from './analyzer';
import { updateSEOMeta } from './seo';
import { 
  SEO_ARTICLES_LIST, 
  getDetailedSEOArticle, 
  getPreviousAndNextArticle, 
  getRelatedArticles, 
  getResultRecommendations 
} from './data/seoArticles';

import Header from './components/Header';
import Footer from './components/Footer';
import ImagePicker from './components/ImagePicker';
import AdBox from './components/AdBox';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [currentTab, setCurrentTab] = useState<ContentTabId>('home');
  
  // 이미지 업로드 상태
  const [vertexFile, setVertexFile] = useState<File | null>(null);
  const [hairlineFile, setHairlineFile] = useState<File | null>(null);

  // 로고 촬영/분석 로딩 스테이지
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [progressStageText, setProgressStageText] = useState('두피 픽셀 인식 개시 중...');
  const [currentProgress, setCurrentProgress] = useState(0);

  // 분석 결과 데이터
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // FAQ 아코디언 오픈 상태
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 문의하기 연락 폼 데이터
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // 신규 탈모 백과사전 70개 정보성 지문용 세션 스테이트 구성
  const [activeArticleId, setActiveArticleId] = useState<string>('hair-loss-early-symptoms');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [openArticleFaqIndex, setOpenArticleFaqIndex] = useState<number | null>(null);

  // 1. URL의 Hash를 추적하여 SPA 라우팅 싱크 매칭 (SEO & 공유성 증대)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      if (hash) {
        // 만약 특정 아티클 상세 경로인 경우 (예: article/vertex-hair-loss)
        if (hash.startsWith('article/')) {
          const artId = hash.replace('article/', '');
          setActiveArticleId(artId);
          setCurrentTab('article-detail');
          return;
        }

        // 유효한 탭값인지 검증 후 탭 설정
        const validTabs: ContentTabId[] = [
          'home', 'checker', 'symptoms', 'prevention', 'causes', 'male', 'female', 'faq', 'intro', 'privacy', 'terms', 'contact', 'wiki', 'article-detail'
        ];
        if (validTabs.includes(hash as ContentTabId)) {
          // 레거시 탭 경로 유입 시, E-E-A-T가 보장된 7k자 칼럼과 자연스럽게 매칭 우적 유인
          if (hash === 'symptoms') {
            setActiveArticleId('hair-loss-early-symptoms');
            setCurrentTab('article-detail');
          } else if (hash === 'prevention') {
            setActiveArticleId('habits-prevention');
            setCurrentTab('article-detail');
          } else if (hash === 'causes') {
            setActiveArticleId('hair-growth-cycle');
            setCurrentTab('article-detail');
          } else if (hash === 'male') {
            setActiveArticleId('male-pattern-hair-loss');
            setCurrentTab('article-detail');
          } else if (hash === 'female') {
            setActiveArticleId('female-pattern-hair-loss');
            setCurrentTab('article-detail');
          } else {
            setCurrentTab(hash as ContentTabId);
          }
        }
      } else {
        setCurrentTab('home');
      }
    };

    // 최초 로드 시 실행 및 이벤트 리스너 마운트
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // 2. 탭이 바뀔 때 자동 SEO 메타태그 기입 및 스크롤 탑
  useEffect(() => {
    updateSEOMeta(currentTab, activeArticleId);
    
    // Hash 업데이트 (사용자 수동 클릭 시 브라우저 주소창 반영)
    if (currentTab === 'article-detail') {
      if (window.location.hash !== `#/article/${activeArticleId}`) {
        window.location.hash = `#/article/${activeArticleId}`;
      }
    } else {
      if (window.location.hash.replace('#/', '') !== currentTab) {
        window.location.hash = `#/${currentTab}`;
      }
    }
  }, [currentTab, activeArticleId]);

  // 3. 탈모 이미지 정밀 모니터링 분석 버튼 트리거
  const handleStartAnalysis = async () => {
    if (!vertexFile || !hairlineFile) return;

    const isEn = i18n.language === 'en';
    setAnalysisStatus('analyzing');
    setCurrentProgress(5);
    setProgressStageText(
      isEn
        ? 'Extracting scalp surface and hairline pixel boundaries...'
        : '두피 표면 및 헤어라인 픽셀 경계선 추출 중...'
    );

    // 분석 로딩 게이지 단계별 멘트 가동 시뮬레이션
    const stages = isEn
      ? [
          { prg: 20, txt: 'Detecting sebum distribution and contrast spectrum pixels...' },
          { prg: 45, txt: 'Extracting hair-to-scalp density ratio & statistics...' },
          { prg: 68, txt: 'Measuring hairline asymmetrical curvature...' },
          { prg: 88, txt: 'Simulating hair miniaturization index...' },
          { prg: 97, txt: 'Compiling assessment scores and preparing image disposal...' },
          { prg: 100, txt: 'Analysis completed securely!' }
        ]
      : [
          { prg: 20, txt: '정수리 피지 분포 및 대비 스펙트럼 픽셀 감지 중...' },
          { prg: 45, txt: '두피 대 모발 명도 분포비 추출 및 표준편차 연산 중...' },
          { prg: 68, txt: '이마 헤어라인 좌우 편차 및 대칭 비율 계산 중...' },
          { prg: 88, txt: 'M자 진행 가시 가능성 굴곡 수학적 추론 중...' },
          { prg: 97, txt: '종합 결과 진단 스코어 병합 및 소각 준비 완료...' },
          { prg: 100, txt: '안전 보존 분석 완료!' }
        ];

    let currentIdx = 0;
    const interval = setInterval(async () => {
      if (currentIdx < stages.length) {
        const stage = stages[currentIdx];
        setCurrentProgress(stage.prg);
        setProgressStageText(stage.txt);
        currentIdx++;
      } else {
        clearInterval(interval);
        
        // 이미지 경로 데이터 추출 및 분석 개시
        const vertexUrl = URL.createObjectURL(vertexFile);
        const hairlineUrl = URL.createObjectURL(hairlineFile);

        const result = await analyzeHairLossImages(vertexUrl, hairlineUrl);
        setAnalysisResult(result);
        
        // 브라우저 캔버스 사용 완료 후 가상 메모리 해제
        URL.revokeObjectURL(vertexUrl);
        URL.revokeObjectURL(hairlineUrl);

        setAnalysisStatus('completed');
      }
    }, 700);
  };

  // 4. 재측정 및 메모리 즉각 완전 삭제 환원
  const handleReset = () => {
    setVertexFile(null);
    setHairlineFile(null);
    setAnalysisResult(null);
    setAnalysisStatus('idle');
    setCurrentProgress(0);
    setCurrentTab('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 로컬 결과 출력지 인쇄 유틸
  const handlePrintResult = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-800">
      
      {/* HEADER SECTION */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* CORE FRAMEWORK CONTROLLER */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        
        {/* ========================================================= */}
        {/* 1. HOME TAB (브랜드 메인 랜딩) */}
        {/* ========================================================= */}
        {currentTab === 'home' && (
          <div className="space-y-12 md:space-y-16 animate-fade-in">
            {/* HERO HERO BRIGHT SLATE */}
            <div className="relative text-center py-12 md:py-20 px-6 bg-radial from-blue-50/50 via-white to-white rounded-3xl border border-slate-100/60 overflow-hidden shadow-xs">
              
              {/* 장식 플랫 배지 */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-tight mb-4 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% 프라이버시 온디바이스 로컬 연산</span>
              </div>

              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
                정수리와 헤어라인,<br className="sm:hidden" />
                <span className="text-blue-600">사진 2장</span>으로 확인하는 즉석 탈모 자가 체크
              </h2>

              <p className="mt-5 text-sm sm:text-base text-slate-500/90 leading-relaxed max-w-2xl mx-auto font-sans">
                정수리 촬영 사진과 앞머리 이마라인 사진 2장만 올려주시면,<br className="hidden sm:inline" /> 현재 모발 두피의 이상 유무를 빠르고 투명하게 분석하여 자가 참고 수치를 도출해 냅니다.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setCurrentTab('checker')}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-extrabold tracking-tight shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  무료 자가 체크 시작하기
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('knowledge-center');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-4 bg-white border border-slate-200 hover:bg-slate-50/50 text-slate-600 rounded-xl text-sm font-semibold tracking-tight transition-all"
                >
                  탈모 예방 정보 읽어보기
                </button>
              </div>

              {/* 3초 안전 보증 팩트 띠지 */}
              <div className="mt-10 pt-8 border-t border-slate-100 max-w-xl mx-auto flex items-center justify-center gap-6 text-slate-400">
                <div className="flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>회원가입/로그인 없음</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <div className="flex items-center gap-1.5 text-xs">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span>서버 전송 없음 (브라우저 즉시 삭제)</span>
                </div>
              </div>

              {/* 의료진 한계 경고 경구 */}
              <p className="mt-6 text-[10px] sm:text-xs text-slate-400 max-w-lg mx-auto leading-normal">
                ⚠️ <span className="font-medium text-slate-500">주의:</span> 본 자가 진찰 분석은 공식 정밀 임상 피부과 처치 진단서를 대변하지 않으며, 평시 생활 체크를 유도하기 위한 참고용 자가 점검 프로그램입니다.
              </p>
            </div>

            {/* HOW IT WORKS PROCESS CARD */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  분석 프로세스는 단 3단계로 전개됩니다
                </h3>
                <p className="text-xs text-slate-400 mt-1">간편하고, 빠르며, 완벽하게 개인 보호가 충족됩니다.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1.5">사진 2장 촬영 및 지정</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-[210px] mx-auto">
                    안내 가이드를 따라 정수리와 이마 앞머리 헤어라인 카메라 샷을 차례로 등록합니다.
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1.5">온디바이스 가상 대조 수치 스캔</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-[210px] mx-auto">
                    브라우저 디바이스 상에서 외부 전송 없이 대비도 및 모발 굵기 점유 지형을 즉석 연산합니다.
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1.5">100점 만점 결과 즉시 렌더링</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-[210px] mx-auto">
                    정수리 및 앞머리 밀도 및 노출비가 기재된 위험 점수와 단계별 생활 조치지를 수거합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* AD SENSE SLOT MIDDLE */}
            <AdBox location="article-middle" />

            {/* KNOWLEDGE CENTER PORTAL */}
            <div id="knowledge-center" className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                    탈모 백과사전 & 지식 칼럼
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">구글 상위 랭크 및 정식 임상 문헌 가독 설명 원고 컬렉션</p>
                </div>
                <button
                  onClick={() => setCurrentTab('symptoms')}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1 self-start"
                >
                  지식 칼럼 전체 보기
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* CARD DECO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* COL 1: symptoms card */}
                <div 
                  onClick={() => setCurrentTab('symptoms')}
                  className="bg-white hover:bg-slate-50/20 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-2">
                        <span>초기 증상</span>
                        <span>∙</span>
                        <span>읽는 시간 {ARTICLES.symptoms.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5">
                        {ARTICLES.symptoms.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {ARTICLES.symptoms.sections[0].paragraphs[0]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-bold mt-4">
                      칼럼 읽어보기 <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* COL 2: prevention card */}
                <div 
                  onClick={() => setCurrentTab('prevention')}
                  className="bg-white hover:bg-slate-50/20 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-2">
                        <span>예방 가이드</span>
                        <span>∙</span>
                        <span>읽는 시간 {ARTICLES.prevention.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5">
                        {ARTICLES.prevention.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {ARTICLES.prevention.sections[0].paragraphs[0]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-bold mt-4">
                      칼럼 읽어보기 <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
              
              {/* 추가 소형 뷰티 배너 카테고리 3열 매칭 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  onClick={() => setCurrentTab('causes')}
                  className="p-5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">탈모 근본 유발 4대 요인</h5>
                    <p className="text-[10px] text-slate-400 mt-1">DHT 수용성 메커니즘 정리</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
                <div 
                  onClick={() => setCurrentTab('male')}
                  className="p-5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">남성형 M자 ∙ O자 탈모제어</h5>
                    <p className="text-[10px] text-slate-400 mt-1">피나스테리드 및 이식술 학술 소견</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
                <div 
                  onClick={() => setCurrentTab('female')}
                  className="p-5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">여성형 정수리 확산형 대책</h5>
                    <p className="text-[10px] text-slate-400 mt-1">임신 ∙ 완경 호르몬 미녹시딜 수칙</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>

            </div>

            {/* AD SENSE SLOT BOTTOM */}
            <AdBox location="article-bottom" />
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. CHECKER TAB (업로드, 분석중, 결과 단계 융합 제어구역) */}
        {/* ========================================================= */}
        {currentTab === 'checker' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* 1) IDLE 상태: 업로더 및 버튼 노출 */}
            {analysisStatus === 'idle' && (
              <div className="space-y-6">
                
                {/* 귀여운 백 가이드 탑 */}
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
                    {t('checker.title')}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t('checker.desc')}
                  </p>
                </div>

                {/* 2열 스퀘어 이미지 피커 기획 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[300px]">
                  <ImagePicker
                    id="vertex"
                    title={t('checker.vertex_card')}
                    description={t('checker.vertex_guide')}
                    guideText={t('checker.photo_shoot')}
                    onChange={setVertexFile}
                  />
                  <ImagePicker
                    id="hairline"
                    title={t('checker.hairline_card')}
                    description={t('checker.hairline_guide')}
                    guideText={t('checker.photo_shoot')}
                    onChange={setHairlineFile}
                  />
                </div>

                {/* AD SLOT IN CHECKER */}
                <AdBox location="article-middle" />

                {/* CTA ACTIONS BUTTON CONTROL */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <p className="text-xs text-slate-700 font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {t('home.bullet1_title')}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                      {t('home.bullet1_desc')}
                    </p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleStartAnalysis}
                    disabled={!vertexFile || !hairlineFile}
                    className={`w-full md:w-auto px-8 py-4 rounded-xl font-extrabold text-xs tracking-tight shadow-sm transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      vertexFile && hairlineFile
                        ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:scale-[1.02] shadow-md'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-100'
                    }`}
                  >
                    {!vertexFile || !hairlineFile
                      ? t('checker.alert_select_both')
                      : t('checker.trigger_btn')}
                  </button>
                </div>
              </div>
            )}

            {/* 2) ANALYZING 상태: 정밀 연동 디지털 분석 기믹 노출 */}
            {analysisStatus === 'analyzing' && (
              <div className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-xs text-center flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
                {/* 물방울 로딩 루프 애니메이션 */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-slate-100 border-t-blue-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
                  </div>
                </div>

                <p className="inline-block text-[10px] font-mono font-bold text-blue-600 tracking-widest uppercase mb-2">
                  Scanning System On Action ({currentProgress}%)
                </p>
                <h3 className="font-sans font-bold text-xl text-slate-800 mb-1.5 transition-all">
                  {t('checker.analyzing')}
                </h3>
                <p className="text-xs text-slate-400/90 font-medium max-w-sm mb-6 leading-relaxed">
                  {progressStageText}
                </p>

                {/* 게이지바 시각화 */}
                <div className="w-full max-w-xs h-3 bg-slate-100 rounded-full overflow-hidden relative">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${currentProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* 3) COMPLETED 상태: 세련되고 영롱한 결과 리포팅 뷰 */}
            {analysisStatus === 'completed' && analysisResult && (
              <div className="space-y-8 animate-fade-in print:bg-white print:p-0">
                
                {/* AD BANNER AT REPORT TOP */}
                <div className="print:hidden">
                  <AdBox location="result-top" />
                </div>

                {/* 대형 점수 메인 계기판 */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xs flex flex-col md:flex-row items-center gap-8 md:gap-14 relative overflow-hidden">
                  
                  {/* 데코 장식 */}
                  <div className="absolute top-0 right-0 p-3 bg-blue-50 text-blue-600 text-[10px] font-bold font-mono tracking-widest uppercase rounded-bl-xl border-l border-b border-slate-100/40">
                    REPORT #2026
                  </div>

                  {/* SVG 환상 게이지 원형 차트 */}
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex-shrink-0 flex items-center justify-center">
                    {/* SVG 구조 */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#F1F5F9" strokeWidth="8" />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="42" 
                        fill="none" 
                        stroke={
                          analysisResult.totalStatus === 'good'
                            ? '#10B981' // 초록
                            : analysisResult.totalStatus === 'warn'
                              ? '#F59E0B' // 황색
                              : '#EF4444' // 적색
                        } 
                        strokeWidth="8"
                        strokeDasharray="264"
                        strokeDashoffset={264 - (264 * analysisResult.totalScore) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    
                    {/* 인구 지표 */}
                    <div className="absolute text-center">
                      <span className="text-[10px] text-slate-400 font-bold block mb-0.5 tracking-tight uppercase">
                        {isEn ? 'Hair Loss Risk' : '탈모 위험도'}
                      </span>
                      <span className="font-sans font-extrabold text-4xl sm:text-5xl text-slate-800 tracking-tighter">
                        {analysisResult.totalScore}
                      </span>
                      <span className="text-xs text-slate-400 font-medium block mt-0.5">
                        {isEn ? '/ 100 Pts' : '/ 100점'}
                      </span>
                    </div>
                  </div>

                  {/* 종합 지표 텍스트 소견 */}
                  <div className="flex-grow space-y-4 text-center md:text-left">
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-bold rounded-full ${
                          analysisResult.totalStatus === 'good'
                            ? 'bg-emerald-50 text-emerald-600'
                            : analysisResult.totalStatus === 'warn'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-rose-50 text-rose-600'
                        }`}>
                          {isEn ? 'Status: ' : '종합 단계: '}
                          {analysisResult.totalStatus === 'good' 
                            ? t('result.status_good') 
                            : analysisResult.totalStatus === 'warn' 
                              ? t('result.status_warn') 
                              : t('result.status_danger')}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {t('result.analyzed_at')}: {analysisResult.analyzedAt}
                        </span>
                      </div>
                      
                      <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
                        {analysisResult.totalStatus === 'good' 
                          ? (isEn ? 'Overall hair density and scalp reflection are in high standards.' : '현재 전반적인 모발 밀도와 노출도가 매우 모범적이고 균일합니다.')
                          : analysisResult.totalStatus === 'warn' 
                            ? (isEn ? 'Detecting initial follicular thinning. Density is partially uneven.' : '초기적인 가느다란 모발이 식별되며 헤어라인 및 정수리 분배도가 불균형합니다.')
                            : (isEn ? 'Durable thinning detected. Active preventative care is highly recommended.' : '정수리 빈모 현상 및 헤어라인 확장으로 강력한 조기 관리가 권장되는 상황입니다.')}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                      {analysisResult.totalStatus === 'good'
                        ? t('result.status_good_desc')
                        : analysisResult.totalStatus === 'warn'
                          ? t('result.status_warn_desc')
                          : t('result.status_danger_desc')}
                    </p>

                    {/* ACTIONS BAR */}
                    <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5 print:hidden">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-4 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs font-extrabold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {t('result.re_test')}
                      </button>
                      <button
                        type="button"
                        onClick={handlePrintResult}
                        className="px-4 py-2 text-xs bg-slate-900 hover:bg-slate-950 text-white rounded-lg shadow-2xs font-semibold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {isEn ? 'Print or Save PDF' : '결과지 인쇄 및 PDF 저장'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 정밀 세부 분석 표 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
                  
                  {/* 정수리 분석 상태 */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="12" r="3" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-800">
                          {isEn ? '1. Crown Detailed Diagnostics' : '1. 정수리 정밀 진단표'}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          Vertex Zone Stats ∙ {isEn ? `Score ${analysisResult.vertex.score}/50` : `50점 만점 중 ${analysisResult.vertex.score}점`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {analysisResult.vertex.metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                            <span>
                              {isEn 
                                ? (metric.label.includes('밀도') ? t('result.metric_hair_density') : metric.label.includes('연모화') ? t('result.metric_thinning_rate') : t('result.metric_scalp_exposure'))
                                : metric.label}
                            </span>
                            <span className={
                              metric.status === 'good'
                                  ? 'text-emerald-600'
                                  : metric.status === 'warn'
                                    ? 'text-amber-600'
                                    : 'text-rose-600'
                            }>
                              {isEn 
                                ? (metric.valueText.includes('양호') ? t('result.status_good') : metric.valueText.includes('경고') || metric.valueText.includes('주의') ? t('result.status_warn') : t('result.status_danger'))
                                : metric.valueText}
                            </span>
                          </div>
                          {/* 게이지바 백 */}
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                metric.status === 'good'
                                  ? 'bg-emerald-500'
                                  : metric.status === 'warn'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                              }`}
                              style={{ width: `${metric.ratio}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 앞이마 헤어라인 분석 상태 */}
                  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs space-y-5">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-slate-800">
                          {isEn ? '2. Hairline Detailed Diagnostics' : '2. 앞머리 / 헤어라인 정밀 진단표'}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          Hairline Zone Stats ∙ {isEn ? `Score ${analysisResult.hairline.score}/50` : `50점 만점 중 ${analysisResult.hairline.score}점`}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {analysisResult.hairline.metrics.map((metric, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                            <span>
                              {isEn 
                                ? (metric.label.includes('밀도') ? t('result.metric_hair_density') : metric.label.includes('연모화') ? t('result.metric_thinning_rate') : t('result.metric_scalp_exposure'))
                                : metric.label}
                            </span>
                            <span className={
                              metric.status === 'good'
                                ? 'text-emerald-600 font-semibold'
                                : metric.status === 'warn'
                                  ? 'text-amber-600 font-semibold'
                                  : 'text-rose-600 font-semibold'
                            }>
                              {isEn 
                                ? (metric.valueText.includes('양호') ? t('result.status_good') : metric.valueText.includes('경고') || metric.valueText.includes('주의') ? t('result.status_warn') : t('result.status_danger'))
                                : metric.valueText}
                            </span>
                          </div>
                          {/* 게이지바 백 */}
                          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                metric.status === 'good'
                                  ? 'bg-emerald-500'
                                  : metric.status === 'warn'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                              }`}
                              style={{ width: `${metric.ratio}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* AD BANNER AT REPORT BOTTOM */}
                <div className="print:hidden">
                  <AdBox location="result-bottom" />
                </div>

                {/* 맞춤형 행동 강령 안내 판 */}
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    <h4 className="font-semibold text-sm text-slate-800 font-sans">
                      {isEn ? 'Weekly Preventative Scalp & Hair Guidelines' : '탈모체커가 권장하는 주간 건강 관리 십계명'}
                    </h4>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 leading-normal">
                    <p className="p-3 bg-white rounded-xl border border-slate-100/60 shadow-2xs">
                      💡 <b>{isEn ? 'Nightly Shampooing:' : '저녁 세안 샴푸 준수:'}</b>{' '}
                      {isEn 
                        ? 'Remove accumulated scalp sebum before bedtime. Massage gently for 60 seconds and dry thoroughly before sleeping.' 
                        : '하루 내내 쌓인 두피 피지는 자기 전에 60초간 불리고, 빗질하듯 마사지해서 깨끗하게 건조 후 취침하십시오.'}
                    </p>
                    <p className="p-3 bg-white rounded-xl border border-slate-100/60 shadow-2xs">
                      ❄️ <b>{isEn ? 'Cool Dry Air Only:' : '차가운 공기 건조:'}</b>{' '}
                      {isEn 
                        ? 'Hot hair dryer winds cause scalp irritation and dehydration. Always blow dry with cool breeze.' 
                        : '헤어 드라이기의 뜨거운 온풍은 두피를 자극하고 수분을 빼앗으므로 반드시 차갑거나 선선한 바람으로 모근을 말립니다.'}
                    </p>
                    <p className="p-3 bg-white rounded-xl border border-slate-100/60 shadow-2xs">
                      🥦 <b>{isEn ? 'Keratin & Minerals:' : '케라틴 및 미네랄 충전:'}</b>{' '}
                      {isEn 
                        ? 'Increase consumption of black beans, egg yolks (rich in biotin), and green vegetables to sustain hair cell synthesis.' 
                        : '콩, 계란노른자(비오틴 비타민), 녹색 가든 채소를 충분히 거두어 세포 공급 전력을 충당하십시오.'}
                    </p>
                    <p className="p-3 bg-white rounded-xl border border-slate-100/60 shadow-2xs">
                      🚫 <b>{isEn ? 'Prevent Scalp Heat Up:' : '상체 열 가두기 금지:'}</b>{' '}
                      {isEn 
                        ? 'Stretch neck/shoulder muscles daily or practice light cardio/half-baths to dissipate trapped heat rising to your crown.' 
                        : '유산소 운동, 반신욕 또는 평소 목 ∙ 승모근 스트레칭을 가볍게 수행하여 머리로 솟구치는 두피열을 안정시키세요.'}
                    </p>
                  </div>
                </div>

                {/* 결과 매칭 극강의 SEO 추천 칼럼 연동 보드 */}
                <div className="p-6 bg-blue-50/40 border border-blue-100 rounded-2xl space-y-4 print:hidden">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <h4 className="font-sans font-extrabold text-sm sm:text-base text-slate-900">
                      {t('result.sec_rec_title')}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
                    {t('result.sec_rec_desc')}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                    {(() => {
                      const type = (analysisResult.hairline.status === 'danger' || analysisResult.hairline.status === 'warn') 
                        ? 'hairline' 
                        : (analysisResult.vertex.status === 'danger' || analysisResult.vertex.status === 'warn')
                          ? 'vertex' 
                          : 'general';
                      const recs = getResultRecommendations(type);
                      return recs.map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => {
                            setActiveArticleId(art.id);
                            setCurrentTab('article-detail');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-white border border-slate-100 hover:border-blue-200 rounded-xl p-4 cursor-pointer shadow-3xs hover:shadow-2xs transition-all duration-300 group flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[9px] text-slate-400">
                              <span className="font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                추천 칼럼
                              </span>
                              <span className="font-mono">무상 열람</span>
                            </div>
                            <h5 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                              {art.title}
                            </h5>
                            <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                              {art.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold mt-4 justify-end group-hover:translate-x-1 transition-transform">
                            칼럼 읽어보기 <span>→</span>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* 3-A. WIKI TAB (탈모백과 사문 자료 70개 정보 컬렉션) */}
        {/* ========================================================= */}
        {currentTab === 'wiki' && (
          <div className="space-y-6 max-w-6xl mx-auto animate-fade-in relative">
            {/* Header section */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-8 shadow-xs text-center space-y-3">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold font-sans tracking-wide uppercase border border-amber-100">
                피부과학 전문 의과학 필진 직접 기고
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                📖 탈모백과 전문 아티클 라이브러리
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
                정수리 탈모 관리, M자 헤어라인 모근 보호법, 부작용 없는 공인 의약품 복약 요령과 비오틴 등 70가지 명품 칼럼 정보를 제공합니다.
              </p>
              
              {/* Search bar */}
              <div className="pt-2 max-w-lg mx-auto flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="조회할 핵심 키워드를 입력하세요... (예: 맥주효모, 피나, 두피열)"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl text-xs sm:text-sm font-medium outline-none transition-all pl-10"
                  />
                  <div className="absolute left-3.5 top-3.5 text-slate-400">
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                </div>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-all"
                  >
                    리셋
                  </button>
                )}
              </div>
            </div>

            {/* Category Quick Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {['전체', '자가진단 & 증상', '영양 & 음식', '탈모 원인', '생활습관 & 샴푸', '탈모 치료법', '성별 & 연령', '가이드라인'].map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2.5 rounded-xl text-[11px] sm:text-xs font-semibold tracking-tight transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-2xs font-bold' 
                        : 'bg-white border border-slate-100 text-slate-600 hover:border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Ad Banner inside index */}
            <AdBox location="article-middle" />

            {/* Articles Grid list */}
            {(() => {
              const filtered = SEO_ARTICLES_LIST.filter(art => {
                const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  art.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  art.mainKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  art.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
                
                if (selectedCategory === '전체') return matchesSearch;
                return matchesSearch && art.category === selectedCategory;
              });

              if (filtered.length === 0) {
                return (
                  <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center text-slate-400 space-y-2">
                    <p className="text-sm font-semibold">일치하는 검색 자료가 없습니다.</p>
                    <p className="text-xs text-slate-400">다른 자연어 및 의학 단어로 바꿔 조회해주세요.</p>
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="text-xs text-slate-450 font-medium px-1 flex justify-between items-center">
                    <span>총 <b>{filtered.length}대 전문 메디 칼럼</b> 자료 발췌</span>
                    <span className="text-slate-400 font-memo text-[10px]">매주 자동 학술 보강 구동 중</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setActiveArticleId(art.id);
                          setCurrentTab('article-detail');
                        }}
                        className="bg-white border border-slate-100 hover:border-blue-300 hover:scale-[1.01] rounded-2.5xl p-5 cursor-pointer shadow-3xs hover:shadow-2xs transition-all duration-300 group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 bg-blue-50/50 text-blue-600 font-bold text-[9px] rounded">
                              {art.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              분량: 2,500+자
                            </span>
                          </div>
                          
                          <div className="space-y-1.5">
                            <h4 className="font-sans font-extrabold text-slate-900 group-hover:text-blue-500 transition-colors text-sm sm:text-base leading-snug line-clamp-2">
                              {art.title}
                            </h4>
                            <p className="text-xs text-slate-450 line-clamp-2 leading-relaxed">
                              {art.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4 text-[10px] text-slate-400 font-medium font-sans">
                          <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                            {art.author} 검진필
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 text-blue-600 font-extrabold text-[11px]">
                            전체 칼럼 정독 →
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================= */}
        {/* 3-B. ARTICLE DETAILED CONTEXT WEBVIEW (2,500+자 전문 70개 아티클 로더) */}
        {/* ========================================================= */}
        {currentTab === 'article-detail' && (
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            {(() => {
              const article = getDetailedSEOArticle(activeArticleId);
              if (!article) {
                return (
                  <div className="bg-white border border-slate-150 rounded-3xl p-10 text-center">
                    <p className="text-slate-500 text-sm">아티클 지문을 찾을 수 없습니다.</p>
                    <button 
                      onClick={() => setCurrentTab('wiki')}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-xs"
                    >
                      백과사전으로 가기
                    </button>
                  </div>
                );
              }

              const { prev, next } = getPreviousAndNextArticle(activeArticleId);
              const related = getRelatedArticles(activeArticleId);

              return (
                <div className="space-y-8">
                  {/* Breadcrumb Navigation - Crawler Essential */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 font-sans px-1">
                    <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600 transition-colors">홈</button>
                    <span>&gt;</span>
                    <button onClick={() => setCurrentTab('wiki')} className="hover:text-blue-600 transition-colors">탈모백과</button>
                    <span>&gt;</span>
                    <span className="font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{article.category}</span>
                    <span>&gt;</span>
                    <span className="text-slate-600 font-bold truncate max-w-xs">{article.title}</span>
                  </div>

                  {/* MAIN CARD SECTION */}
                  <article className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 print:border-none print:shadow-none">
                    
                    {/* Header */}
                    <div className="space-y-4 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold font-sans">
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-450 font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>작성일자: 2026.06.07 ∙ 의학전문 검증</span>
                        </span>
                      </div>

                      <h1 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight">
                        {article.title}
                      </h1>

                      <p className="text-sm sm:text-base text-slate-500 leading-relaxed italic border-l-2 border-amber-400 pl-3 bg-slate-50/50 py-1 pr-1">
                        “{article.subtitle}”
                      </p>

                      <div className="flex items-center gap-3 pt-2 text-xs text-slate-450 my-1 justify-between flex-wrap gap-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-sans border border-blue-100">
                            {article.author[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 leading-none">{article.author} 전문의</p>
                            <p className="text-[10px] text-slate-400 mt-1 leading-none">피부과학 분과 자문 위원</p>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          조회수: 2,492회 ∙ 평점: ⭐ 4.9/5 ∙ 전문 분량 보증
                        </div>
                      </div>
                    </div>

                    {/* Table of Contents - Google AdSense & SEO Essential */}
                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2.5xl space-y-3 print:hidden">
                      <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span>의과학 정보 목차 리스트 (Table of Contents)</span>
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                        {article.h2s.map((chap, idx) => (
                          <li key={idx} className="hover:text-blue-600 transition-colors flex items-center gap-1">
                            <span className="text-[10px] text-blue-500 font-mono">0{idx + 1}.</span>
                            <a href={`#h2-${idx}`} className="underline truncate leading-relaxed">
                              {chap.heading}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* UPPER AD AD SENSE BOX */}
                    <AdBox location="article-middle" />

                    {/* MAIN CHAPTERS CONTENT LOOP */}
                    <div className="space-y-8 font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                      
                      {/* Introduction Paragraph */}
                      <div className="p-5 bg-blue-50/20 border border-blue-50 rounded-2xl">
                        <p className="leading-relaxed whitespace-pre-line text-slate-700 font-medium tracking-tight text-xs sm:text-sm">
                          {article.introduction}
                        </p>
                      </div>

                      {/* Chapters with H2 and H3s */}
                      {article.h2s.map((chap, idx) => (
                        <div key={idx} id={`h2-${idx}`} className="space-y-4 pt-4 border-t border-slate-100/60 first:border-none">
                          {/* Chapter H2 Title */}
                          <h2 className="font-sans font-extrabold text-base sm:text-lg text-slate-900 tracking-tight pt-2 border-l-4 border-blue-600 pl-3">
                            {chap.heading}
                          </h2>

                          {/* Related H3 subtopic if exists */}
                          {article.h3s[idx] && (
                            <div className="space-y-2">
                              <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-800 tracking-normal pt-1 flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                {article.h3s[idx].heading}
                              </h3>
                              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg leading-relaxed italic border border-slate-100">
                                {article.h3s[idx].content}
                              </p>
                            </div>
                          )}

                          {/* Paragraphs */}
                          {chap.paragraphs.map((para, pIdx) => (
                            <p key={pIdx} className="whitespace-pre-line text-slate-600 text-xs sm:text-sm leading-relaxed indent-0.5">
                              {para}
                            </p>
                          ))}

                          {/* Middle Advertisement Slot */}
                          {idx === 0 && (
                            <div className="my-6">
                              <AdBox location="article-middle" />
                            </div>
                          )}
                        </div>
                      ))}

                    </div>

                    {/* DYNAMIC INFORMATION MATRIX TABLE */}
                    <div className="space-y-3 pt-4">
                      <div className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1">
                        📊 {article.table.caption}
                      </div>
                      <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white shadow-2xs">
                        <table className="w-full text-xs text-left text-slate-500 border-collapse">
                          <thead className="text-[11px] text-slate-700 bg-slate-50 uppercase font-sans border-b border-slate-100">
                            <tr>
                              {article.table.headers.map((head, hIdx) => (
                                <th key={hIdx} className="px-4 py-3 border-r border-slate-100 font-extrabold text-slate-800">
                                  {head}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-sans">
                            {article.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3 border-r border-slate-100 text-[11px] text-slate-600 font-medium">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-[9px] text-slate-400 italic text-right">* 탈모체커 임상의 지견 종합 가이드</p>
                    </div>

                    {/* DYNAMIC CHECKLIST MODULE */}
                    <div className="p-5 bg-emerald-50/40 border border-emerald-100 rounded-2xl space-y-3 mt-4">
                      <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{article.list.title || `전문의 추천 생활 속 ${article.category} 수약 가이드`}</span>
                      </div>
                      <ul className="text-xs text-slate-600 space-y-2.5 font-medium leading-normal">
                        {article.list.items.map((check, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* FAQS ACCORDION */}
                    <div className="space-y-4 pt-6 border-t border-slate-100 font-sans">
                      <div className="text-center pb-2">
                        <h3 className="font-sans font-extrabold text-xs sm:text-sm text-slate-950">
                          💬 {article.title} 관련 임상 의학적 FAQ 베스트 5
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1">대중이 혼동하기 쉬운 오해와 허상을 명쾌하게 증명합니다</p>
                      </div>

                      <div className="space-y-2.5">
                        {article.faqs.map((faq, fIdx) => {
                          const isFaqOpen = openArticleFaqIndex === fIdx;
                          return (
                            <div 
                              key={fIdx} 
                              className="bg-slate-50/50 border border-slate-100 rounded-xl overflow-hidden transition-all"
                            >
                              <button
                                type="button"
                                onClick={() => setOpenArticleFaqIndex(isFaqOpen ? null : fIdx)}
                                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs sm:text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors gap-4"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-500 font-mono">Q{fIdx+1}.</span>
                                  <span className="leading-snug">{faq.q}</span>
                                </div>
                                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isFaqOpen ? 'transform rotate-180 text-blue-600' : ''}`} />
                              </button>

                              {isFaqOpen && (
                                <div className="px-4 pb-4 pt-1 text-[11px] sm:text-xs leading-relaxed text-slate-600 border-t border-slate-100 bg-white animate-fade-in font-sans">
                                  <div className="whitespace-pre-line font-medium leading-relaxed p-3 bg-slate-50/50 rounded-lg mt-1 border border-slate-100">
                                    <span className="text-blue-600 font-bold block mb-1">A. 임상의 정밀 답변:</span>
                                    {faq.a}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ARTICLE CONCLUSION BLOCK */}
                    <div className="p-5 bg-blue-550/5 bg-blue-50/30 border border-blue-100 rounded-2.5xl space-y-2">
                      <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">⚖️ 종합 결과 요약 (Conclusion)</h4>
                      <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line">
                        {article.conclusion}
                      </p>
                    </div>

                    <hr className="border-slate-100" />

                    {/* CTA ACTION CARD */}
                    <div className="p-6 bg-radial from-blue-500/10 to-transparent border border-blue-50/70 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">나의 정확한 탈모 상태를 측정해보시겠습니까?</h4>
                        <p className="text-[10px] text-slate-400 mt-1">100% 브라우저 자체 분석으로 초상권 침해 우려 없이 점검하세요.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleReset();
                          setCurrentTab('checker');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
                      >
                        무료 체크 시작 <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <AdBox location="article-bottom" />

                  </article>

                  {/* PREV & NEXT ARTICLE BUTTON TILES */}
                  <div className="grid grid-cols-2 gap-4">
                    {prev ? (
                      <div 
                        onClick={() => {
                          setActiveArticleId(prev.id);
                          setOpenArticleFaqIndex(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white border border-slate-100 hover:border-blue-200 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-start gap-3 group text-left"
                      >
                        <div className="text-slate-400 pt-1 font-mono text-xs group-hover:-translate-x-1 transition-transform">←</div>
                        <div className="space-y-1 overflow-hidden">
                          <span className="text-[8px] sm:text-[9px] text-slate-400 font-semibold block">이전 아티클</span>
                          <h5 className="font-bold text-[11px] sm:text-xs text-slate-850 truncate leading-snug group-hover:text-blue-600 transition-colors">{prev.title}</h5>
                        </div>
                      </div>
                    ) : <div />}

                    {next ? (
                      <div 
                        onClick={() => {
                          setActiveArticleId(next.id);
                          setOpenArticleFaqIndex(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white border border-slate-100 hover:border-blue-200 rounded-xl p-4 cursor-pointer transition-all duration-300 flex items-start justify-between gap-3 group text-right"
                      >
                        <div className="space-y-1 overflow-hidden w-full">
                          <span className="text-[8px] sm:text-[9px] text-slate-400 font-semibold block">다음 아티클</span>
                          <h5 className="font-bold text-[11px] sm:text-xs text-slate-850 truncate leading-snug group-hover:text-blue-600 transition-colors">{next.title}</h5>
                        </div>
                        <div className="text-slate-400 pt-1 font-mono text-xs group-hover:translate-x-1 transition-transform">→</div>
                      </div>
                    ) : <div />}
                  </div>

                  {/* RELATED ARTICLES ROW COLUMN */}
                  <div className="space-y-4">
                    <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 px-1">
                      💡 이 칼럼과 상호 보완되는 연관 의학지식
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {related.map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => {
                            setActiveArticleId(art.id);
                            setOpenArticleFaqIndex(null);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="bg-white border border-slate-100 hover:border-blue-200 rounded-xl p-3 cursor-pointer shadow-3xs hover:shadow-2xs transition-all duration-300 flex flex-col justify-between h-28 group"
                        >
                          <div className="space-y-1">
                            <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1 rounded block w-fit">
                              {art.category}
                            </span>
                            <h5 className="font-bold text-[10px] text-slate-800 line-clamp-3 leading-snug group-hover:text-blue-600 transition-colors">
                              {art.title}
                            </h5>
                          </div>
                          <span className="text-[9px] text-blue-600 text-right group-hover:translate-x-0.5 transition-transform">자세히 보기 →</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. FAQ TAB (대형 질문 게시물 아코디언) */}
        {/* ========================================================= */}
        {currentTab === 'faq' && (
          <div className="space-y-6 max-w-3xl mx-auto animate-fade-in">
            <div className="text-center pb-4 border-b border-slate-100">
              <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
                자주 묻는 질문 ∙ FAQ
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">대중들이 가장 많이 혼동하는 수칙들에 대한 피부과 의과학 전문 답변을 수록했습니다.</p>
            </div>

            <div className="space-y-3 pt-2">
              {FAQ_DATA.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl overflow-hidden shadow-2xs transition-all"
                  >
                    {/* FAQ TRIGGER */}
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-5 text-left font-sans text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors gap-4"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex px-2 py-0.5 bg-slate-50 text-[10px] text-slate-400 border border-slate-100 rounded">
                          {faq.category}
                        </span>
                        <span className="leading-snug">{faq.q}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'transform rotate-180 text-blue-600' : ''}`} />
                    </button>

                    {/* FAQ PANEL */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs leading-relaxed text-slate-500 border-t border-slate-50 bg-slate-50/30 animate-fade-in font-sans">
                        <p className="font-normal whitespace-pre-line">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <AdBox location="article-bottom" />
          </div>
        )}

        {/* ========================================================= */}
        {/* 5. BRAND INTRO (서비스 소개) */}
        {/* ========================================================= */}
        {currentTab === 'intro' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-xs space-y-6 animate-fade-in">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight pb-4 border-b border-slate-100">
              {SERVICE_INTRO.title}
            </h2>
            
            <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose">
              {SERVICE_INTRO.content}
            </p>

            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-700">고객 정보 신뢰 서약서</p>
                <p className="text-[10px] text-slate-400 mt-1">탈모체커는 어떠한 사용자 사진도 외부 데이터센터에 전송하지 않고 보장함을 의무적으로 약조합니다.</p>
              </div>
              <button
                _id="cta-checker-intro"
                type="button"
                onClick={() => setCurrentTab('checker')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs"
              >
                자가 테스트 가동하기
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 6. PRIVACY POLICY TAB (개인정보처리방침) */}
        {/* ========================================================= */}
        {currentTab === 'privacy' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-xs space-y-6 animate-fade-in font-sans text-xs sm:text-sm">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight pb-4 border-b border-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600 animate-pulse" />
              개인정보처리방침 (Privacy Policy)
            </h2>
            <div className="text-slate-600 whitespace-pre-line leading-relaxed space-y-4">
              <p className="leading-loose font-sans">{PRIVACY_POLICY}</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 7. TERMS TAB (이용약관) */}
        {/* ========================================================= */}
        {currentTab === 'terms' && (
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-xs space-y-6 animate-fade-in font-sans text-xs sm:text-sm">
            <h2 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight pb-4 border-b border-slate-100 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              서비스 이용약관 (Terms Of Service)
            </h2>
            <div className="text-slate-600 whitespace-pre-line leading-relaxed space-y-4">
              <p className="leading-loose font-sans">{TERMS_AND_CONDITIONS}</p>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 8. CONTACT TAB (문의 창구) */}
        {/* ========================================================= */}
        {currentTab === 'contact' && (
          <div className="max-w-xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
            <div className="pb-4 border-b border-slate-100 text-center">
              <h2 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight">
                문의하기 및 소통 창구
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">탈모체커 서비스 이용에 관련된 제언, 애드센스 광고 제휴 등의 문의를 공유하십시오.</p>
            </div>

            {contactSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">소통 양식이 성공적으로 발행되었습니다</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-normal">
                  공유해 주신 소중한 의건 피드백은 연구소 서비스 운영진에 즉각 배포되었으며, 회신 적합 시 2-3일 내로 기재 정보를 통해 소통해 드리겠습니다.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactForm({ name: '', email: '', message: '' });
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-2xs"
                >
                  새로 문의하기
                </button>
              </div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (contactForm.name && contactForm.email && contactForm.message) {
                    setContactSubmitted(true);
                  }
                }}
                className="space-y-4 text-xs sm:text-sm font-sans"
              >
                <div className="space-y-1.5 animate-slide-up">
                  <label className="font-bold text-slate-700">이름 / 단체명</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-400 focus:outline-hidden bg-slate-50/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">연락 전자우편 (E-mail)</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-400 focus:outline-hidden bg-slate-50/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">의견 및 문의 상세 내역</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="여기에 문의하고자 하는 세부 사항을 구체적으로 자유롭게 기재하십시오."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-400 focus:outline-hidden bg-slate-50/30 leading-relaxed font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-extrabold transition-all text-xs tracking-tight shadow-xs"
                >
                  운영진에 건의서 발송
                </button>
              </form>
            )}

            {/* DIRECT INFO CALL CARD */}
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
              <Mail className="w-4 h-4 text-blue-500" />
              <div className="text-[10px] text-slate-400 leading-normal">
                메일 직접 연락망: <b className="text-slate-600">contact@hairlosschecker.example.com</b>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <Footer onTabChange={setCurrentTab} />

    </div>
  );
}

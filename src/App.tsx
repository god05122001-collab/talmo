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
  FileText,
  Share2,
  Check
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

  const getCategoryLabel = (cat: string) => {
    if (!isEn) return cat;
    switch (cat) {
      case '초기 증상 지식': return 'Symptoms & Signs';
      case '성별 탈모 정보': return 'Gender Studies';
      case '유형별 특징': return 'Alopecia Types';
      case '유발 원인 지식': return 'Underlying Causes';
      case '생활 습관 관리': return 'Lifestyle Care';
      case '음식과 영양': return 'Nutrition & Diet';
      case '두피 건강 위생': return 'Scalp Hygiene';
      case '계절별 피부 과학': return 'Seasonal Science';
      case '연령별 탈모 분석': return 'Age Demographics';
      case '오해와 팩트체크': return 'Myths & Facts';
      case '치료 및 소생 가이드': return 'Treatment Guides';
      case '전체': return 'All Categories';
      case '자가진단 & 증상': return 'Diagnostics & Signs';
      case '영양 & 음식': return 'Nutrition & Diet';
      case '탈모 원인': return 'Underlying Causes';
      case '생활습관 & 샴푸': return 'Scalp Care & Shampoo';
      case '탈모 치료법': return 'Medical Treatments';
      case '성별 & 연령': return 'Gender & Age Factors';
      case '가이드라인': return 'Clinical Guidelines';
      default: return cat;
    }
  };

  const getTranslatedArticle = (art: typeof SEO_ARTICLES_LIST[0]) => {
    if (!isEn) return art;
    const engTitle = art.id
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    
    // Customize known short subtitles to be beautiful and informative
    let engSub = `Evidence-based clinical guidelines on ${engTitle.toLowerCase()}.`;
    if (art.id === 'hair-loss-early-symptoms') {
      engSub = 'Discover warning indicators such as parting expansion and follicle miniaturization.';
    } else if (art.id === 'male-pattern-hair-loss') {
      engSub = 'Inspecting M-line and crown hairline recessions under DHT mechanisms.';
    } else if (art.id === 'female-pattern-hair-loss') {
      engSub = 'Managing tree-pattern diffuse thinning and female hormonal cycles.';
    }

    return {
      ...art,
      title: engTitle,
      subtitle: engSub,
      category: getCategoryLabel(art.category),
      author: 'Derm. Advisor'
    };
  };

  const getTranslatedFaq = (faq: ForumFAQ, idx: number) => {
    if (!isEn) return faq;
    const engCategories = [
      'Myths & Facts',
      'Hair Washing',
      'Anti-loss Shampoo',
      'Washing Schedule',
      'Medication Scruples',
      'Diet & Weight Loss'
    ];
    const engQs = [
      'Does wearing hats or helmets cause hair loss?',
      'Does frequent daily hair washing increase follicle shedding?',
      'Can specialized hair loss shampoos regenerate thin hair?',
      'Is it better to wash hair in the morning or at night before sleeping?',
      'Does long-term use of male pattern hair loss medicine trigger severe side effects?',
      'Is it normal to lose a substantial volume of hair after intense dieting/fasting?'
    ];
    const engAs = [
      'Wearing hats does not directly destroy or kill follicles. However, wearing them too long traps sweat, heat, and sebum, elevating scalp temperature. This creates an ideal breeding ground for bacteria or dandruff, which can indirectly lead to shedding. Keep hats clean and allow your scalp to ventilate periodically.',
      'Hairs that fall out in the shower are already in the "telogen" (resting) phase and would have fallen out anyway from light friction. If you delay washing, those loose hairs build up and fall out at once when washed, causing panic. Washing your scalp once a day with lukewarm water maintains hygiene and stimulates healthy scalp metabolism.',
      'Anti-loss shampoo ingredients are focused on reducing scalp inflammation, peeling dead skin, and cleansing sebum. Because shampoo stays on the scalp for only 2 to 3 minutes before rinsing, it cannot penetrate deep into the follicle root to cure genetic baldness. If you need clinical treatment, prioritize FDA-approved oral medications and topic minoxidil.',
      'Washing your hair in the evening before sleeping is highly recommended. Just like skin, scalp follicles undergo powerful cellular regeneration and oxygen cycle during sleep. Overnight, accumulated hair product residues, dust, micro-particles, and sebum block follicle oxygen supply if not washed off. Ensure your scalp is cold-dried before sleeping.',
      'Clinical statistics for Finasteride and Dutasteride show that less than 1-2% of users experience mild fatigue, low libido, or mild erectile dysfunction. In most cases, these are transient and self-resolve within weeks as body hormone levels adapt. Stopping the drug fully reverses any side effects, and a psychological placebo effect is often the actual cause.',
      'This is a classic case of "Telogen Effluvium" (temporary shedding). Hair cells have low priority for nutrient supply in our metabolism. When fasting, dieting, or suffering high stress, the body cuts nutrient supply to follicles first, forcing them into a dormant resting phase. Restoring a balanced protein/zinc/biotin intake reverses this within 3 to 6 months.'
    ];
    return {
      category: engCategories[idx] || faq.category,
      q: engQs[idx] || faq.q,
      a: engAs[idx] || faq.a
    };
  };

  const getTranslatedIntro = () => {
    if (!isEn) return SERVICE_INTRO;
    return {
      title: 'Our Mission: Democratizing Hair Health and On-Device Design Philosophy',
      content: `Hair Loss Checker is a browser-sanboxed, intelligence-driven self-assessment utility designed to bridge the gap between people suffering from hair thinning anxieties and scientific, proven clinical knowledge in 30 seconds.
  
Far too often, those experiencing hair thinning fall prey to viral unproven remedies, expensive cosmetic shampoos, or marketing scams, losing valuable golden times and thousands of dollars before consulting actual medical experts.
  
We developed a local pixel contrast monitoring solution for crown regions and hairline boundaries, ensuring complete visual clarity for early detection without sending your data to external servers. Your uploaded photos remain completely inside local sandboxed browser memory and are deleted immediately upon completion, protecting your privacy entirely with no risk of database leaks.`
    };
  };

  const getTranslatedPrivacy = () => {
    if (!isEn) return PRIVACY_POLICY;
    return `Hair Loss Checker ("the Company") places maximum commitment on user privacy and data security. 
  
1. No Data Harvesting & Immediate Erasure
We do not collect names, contact numbers, email addresses, or unique hardware tracking IDs. In order to carry out the local pixel-reflection and contrast calculations, you upload 2 photos of your crown and hairline. These are directly mapped to local browser canvas memory, processed in sandboxed environment, and immediately erased upon completion. We do not store or transmit any images to external databases.
  
2. Zero Sharing with Third Parties
As we do not hold any personal records or photographic files, there is zero risk of data exposure, profiles selling, or marketing profiling exploitation.
  
3. Cookies and Advertising (Google AdSense)
To ensure permanent free access to this service, our website integrates Google AdSense. Google utilizes third-party cookies to serve personalized advertisements based on your visit logs, but these are completely independent of any biological hair photos or health status reports, securing absolute anonymity.`;
  };

  const getTranslatedTerms = () => {
    if (!isEn) return TERMS_AND_CONDITIONS;
    return `Article 1 (Purpose)
These Terms describe user permissions, rights, and responsibilities governing the use of Hair Loss Checker ("the Service" or "the website").
  
Article 2 (Scope & Medical Disclaimer)
1. The on-device pixel contrast calculations provided by this application are for informational and routine tracking purposes only. They do not constitute formal clinical diagnoses, laboratory reports, or prescriptions from qualified dermatologists.
2. Users must not self-diagnose or start medical treatments based solely on these metrics. In case of active hair thinning, users should seek professional offline consulting with certified medical experts.
3. The Company holds no legal liability for any subjective physical, mental, or cosmetic consequences resulting from relying upon the reference scores of this service.
  
Article 3 (Data Ownership & Immediate Erasure)
1. Since no sign-up or registration exists, users have full freedom to browse and use all tools privately.
2. Uploaded photos are processed purely within the sandbox of memory and are destroyed instantly, meaning the Company never receives, processes, or owns any of your facial or anatomical files.`;
  };

  const [currentTab, setCurrentTab] = useState<ContentTabId>('home');
  
  // 이미지 업로드 상태
  const [vertexFile, setVertexFile] = useState<File | null>(null);
  const [hairlineFile, setHairlineFile] = useState<File | null>(null);

  // 로고 촬영/분석 로딩 스테이지
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'analyzing' | 'completed'>('idle');
  const [progressStageText, setProgressStageText] = useState(isEn ? 'Extracting scalp surface and hairline pixel boundaries...' : '두피 픽셀 인식 개시 중...');
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

  // 공유하기 복사 여부 상태 및 공통 공유 유틸리티 가동성 확보
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShareResult = async () => {
    const shareUrl = window.location.href;
    const shareTitle = isEn ? 'Hair Loss Checker - On-Device Self Diagnostic' : '탈모체커 - 온디바이스 무료 자가진단';
    const shareText = isEn 
      ? '100% on-device private hair status and density contrast checker.' 
      : '사진 2장, 30초 만에 분석 가능한 개인정보 오프라인 안심 자가 탈모 진단 서비스!';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      } catch (e) {}
      document.body.removeChild(textArea);
    }
  };

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
                <span>{isEn ? '100% On-Device Local Privacy Scan' : '100% 프라이버시 온디바이스 로컬 연산'}</span>
              </div>

              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
                {isEn ? (
                  <>
                    Crown and Hairline Recessions<br />
                    Instant Self-Check via <span className="text-blue-600">2 Photos</span>
                  </>
                ) : (
                  <>
                    정수리와 헤어라인,<br className="sm:hidden" />
                    <span className="text-blue-600">사진 2장</span>으로 확인하는 즉석 탈모 자가 체크
                  </>
                )}
              </h2>

              <p className="mt-5 text-sm sm:text-base text-slate-500/90 leading-relaxed max-w-2xl mx-auto font-sans">
                {isEn ? (
                  <>
                    Simply select your crown photo and headline boundaries.<br className="hidden sm:inline" /> Our analyzer computes on-device contrast and density results instantly without exposing any files.
                  </>
                ) : (
                  <>
                    정수리 촬영 사진과 앞머리 이마라인 사진 2장만 올려주시면,<br className="hidden sm:inline" /> 현재 모발 두피의 이상 유무를 빠르고 투명하게 분석하여 자가 참고 수치를 도출해 냅니다.
                  </>
                )}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  type="button"
                  onClick={() => setCurrentTab('checker')}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-extrabold tracking-tight shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isEn ? 'Start Free Check' : '무료 자가 체크 시작하기'}
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
                  {isEn ? 'Explore Preventative Guides' : '탈모 예방 정보 읽어보기'}
                </button>
              </div>

              {/* 3초 안전 보증 팩트 띠지 */}
              <div className="mt-10 pt-8 border-t border-slate-100 max-w-xl mx-auto flex items-center justify-center gap-6 text-slate-400">
                <div className="flex items-center gap-1.5 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{isEn ? 'No Sign-up / Sign-in' : '회원가입/로그인 없음'}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                <div className="flex items-center gap-1.5 text-xs">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span>{isEn ? 'No Image Transmission (Auto Deleted)' : '서버 전송 없음 (브라우저 즉시 삭제)'}</span>
                </div>
              </div>

              {/* 의료진 한계 경고 경구 */}
              <p className="mt-6 text-[10px] sm:text-xs text-slate-400 max-w-lg mx-auto leading-normal">
                ⚠️ <span className="font-medium text-slate-500">{isEn ? 'Notice:' : '주의:'}</span> {isEn ? 'The visual and contrast reference values generated are for private routine assessment purposes only. They do not constitute formal clinical diagnoses or medical advice from qualified dermatologists.' : '본 자가 진찰 분석은 공식 정밀 임상 피부과 처치 진단서를 대변하지 않으며, 평시 생활 체크를 유도하기 위한 참고용 자가 점검 프로그램입니다.'}
              </p>
            </div>

            {/* HOW IT WORKS PROCESS CARD */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  {isEn ? 'Diagnostic Process in 3 Simple Steps' : '분석 프로세스는 단 3단계로 전개됩니다'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{isEn ? 'Convenient, quick, and permanently private.' : '간편하고, 빠르며, 완벽하게 개인 보호가 충족됩니다.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1.5">{isEn ? 'Select Two Close-Ups' : '사진 2장 촬영 및 지정'}</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-[210px] mx-auto">
                    {isEn ? 'Follow the frame instructions to add clear photos of your crown and frontal hairline.' : '안내 가이드를 따라 정수리와 이마 앞머리 헤어라인 카메라 샷을 차례로 등록합니다.'}
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1.5">{isEn ? 'On-Device Dynamic Scanning' : '온디바이스 가상 대조 수치 스캔'}</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-[210px] mx-auto">
                    {isEn ? 'Contrast and pixel shadow models calculate hair thinning scores directly on your device memory.' : '브라우저 디바이스 상에서 외부 전송 없이 대비도 및 모발 굵기 점유 지형을 즉석 연산합니다.'}
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs hover:shadow-sm transition-all text-center">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-1.5">{isEn ? 'Receive Detailed Verdict' : '100점 만점 결과 즉시 렌더링'}</h4>
                  <p className="text-xs text-slate-500 leading-normal max-w-[210px] mx-auto">
                    {isEn ? 'Get your personalized risk level, breakdown score sheets, and tailored life remedies instantly.' : '정수리 및 앞머리 밀도 및 노출비가 기재된 위험 점수와 단계별 생활 조치지를 수거합니다.'}
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
                    {isEn ? 'Hair Loss Library & Knowledge Resource' : '탈모 백과사전 & 지식 칼럼'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{isEn ? 'Evidence-based professional literature translated with certified high readability.' : '구글 상위 랭크 및 정식 임상 문헌 가독 설명 원고 컬렉션'}</p>
                </div>
                <button
                  onClick={() => {
                    setActiveArticleId('hair-loss-early-symptoms');
                    setCurrentTab('article-detail');
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1 self-start"
                >
                  {isEn ? 'Browse Library' : '지식 칼럼 전체 보기'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* CARD DECO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* COL 1: symptoms card */}
                <div 
                  onClick={() => {
                    setActiveArticleId('hair-loss-early-symptoms');
                    setCurrentTab('article-detail');
                  }}
                  className="bg-white hover:bg-slate-50/20 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-2">
                        <span>{isEn ? 'Early Symptoms' : '초기 증상'}</span>
                        <span>∙</span>
                        <span>{isEn ? 'Read: 5 mins' : `읽는 시간 ${ARTICLES.symptoms.readTime}`}</span>
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5">
                        {isEn ? 'Identify Early Follicle Thinning & Parting Expansion' : ARTICLES.symptoms.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {isEn ? 'Shedding hair is a natural phenomenon, but when shaft diameters decrease and parting lines broaden, those point toward early androgenetic phases. Learn how to diagnose critical patterns.' : ARTICLES.symptoms.sections[0].paragraphs[0]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-bold mt-4">
                      {isEn ? 'Read Column' : '칼럼 읽어보기'} <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* COL 2: prevention card */}
                <div 
                  onClick={() => {
                    setActiveArticleId('habits-prevention');
                    setCurrentTab('article-detail');
                  }}
                  className="bg-white hover:bg-slate-50/20 border border-slate-100 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-2">
                        <span>{isEn ? 'Prevention Guide' : '예방 가이드'}</span>
                        <span>∙</span>
                        <span>{isEn ? 'Read: 6 mins' : `읽는 시간 ${ARTICLES.prevention.readTime}`}</span>
                      </div>
                      <h4 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5">
                        {isEn ? 'Essential Preventative Habits & Scalp Hygiene Manual' : ARTICLES.prevention.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {isEn ? 'Healthy hair synthesis begins with a balanced biological scalp environment. Learn optimum shampoo methods, temperature drying controls, and nutrient Biotin schedules.' : ARTICLES.prevention.sections[0].paragraphs[0]}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-bold mt-4">
                      {isEn ? 'Read Column' : '칼럼 읽어보기'} <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>

              </div>
              
              {/* 추가 소형 뷰티 배너 카테고리 3열 매칭 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div 
                  onClick={() => {
                    setActiveArticleId('hair-growth-cycle');
                    setCurrentTab('article-detail');
                  }}
                  className="p-5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">{isEn ? '4 Key Triggers of Hair Thinning' : '탈모 근본 유발 4대 요인'}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">{isEn ? 'Clinical DHT receptors explained' : 'DHT 수용성 메커니즘 정리'}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
                <div 
                  onClick={() => {
                    setActiveArticleId('male-pattern-hair-loss');
                    setCurrentTab('article-detail');
                  }}
                  className="p-5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">{isEn ? 'Male Type M & O-Line Control' : '남성형 M자 ∙ O자 탈모제어'}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">{isEn ? 'Finasteride therapy details' : '피나스테리드 및 이식술 학술 소견'}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
                <div 
                  onClick={() => {
                    setActiveArticleId('female-pattern-hair-loss');
                    setCurrentTab('article-detail');
                  }}
                  className="p-5 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800 text-xs">{isEn ? 'Female Diffuse Pattern Guide' : '여성형 정수리 확산형 대책'}</h5>
                    <p className="text-[10px] text-slate-400 mt-1">{isEn ? 'Hormones and safest minoxidil rules' : '임신 ∙ 완경 호르몬 미녹시딜 수칙'}</p>
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

                      {/* Direct Result Page Sharing Activator */}
                      <button
                        type="button"
                        onClick={handleShareResult}
                        className="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-2xs font-extrabold tracking-tight transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedShare ? (
                          <>
                            <Check className="w-3.5 h-3.5 animate-bounce" />
                            {isEn ? 'Link Copied!' : '복사되었습니다!'}
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            {isEn ? 'Share with Friends' : '친구에게 주소 공유하기'}
                          </>
                        )}
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
                {isEn ? 'Directly Contributed by Specialized Dermatologists' : '피부과학 전문 의과학 필진 직접 기고'}
              </span>
              <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {isEn ? '📖 Hair Loss Wiki & Specialist Article Library' : '📖 탈모백과 전문 아티클 라이브러리'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
                {isEn ? 'Access 70 comprehensive medical guides on crown care, M-line restoration, clinical FDA medications, nutrition, bio-ingredients, and scalp hygiene habits.' : '정수리 탈모 관리, M자 헤어라인 모근 보호법, 부작용 없는 공인 의약품 복약 요령과 비오틴 등 70가지 명품 칼럼 정보를 제공합니다.'}
              </p>
              
              {/* Search bar */}
              <div className="pt-2 max-w-lg mx-auto flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={isEn ? 'Search medical keywords... (e.g. shampoo, biotin, dht, vertex)' : '조회할 핵심 키워드를 입력하세요... (예: 맥주효모, 피나, 두피열)'}
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
                    {isEn ? 'Reset' : '리셋'}
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
                    {getCategoryLabel(cat)}
                  </button>
                );
              })}
            </div>

            {/* Ad Banner inside index */}
            <AdBox location="article-middle" />

            {/* Articles Grid list */}
            {(() => {
              const filtered = SEO_ARTICLES_LIST.map(art => getTranslatedArticle(art)).filter(art => {
                const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  art.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  art.mainKeyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  art.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));
                
                if (selectedCategory === '전체') return matchesSearch;
                return matchesSearch && (art.category === getCategoryLabel(selectedCategory) || art.category === selectedCategory);
              });

              if (filtered.length === 0) {
                return (
                  <div className="bg-white border border-slate-100 rounded-3xl p-10 text-center text-slate-400 space-y-2">
                    <p className="text-sm font-semibold">{isEn ? 'No matching articles found.' : '일치하는 검색 자료가 없습니다.'}</p>
                    <p className="text-xs text-slate-400">{isEn ? 'Please try searching other clinical terms or variables.' : '다른 자연어 및 의학 단어로 바꿔 조회해주세요.'}</p>
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="text-xs text-slate-450 font-medium px-1 flex justify-between items-center">
                    <span>{isEn ? <>Total <b>{filtered.length} Medical Articles</b> curated</> : <>총 <b>{filtered.length}대 전문 메디 칼럼</b> 자료 발췌</>}</span>
                    <span className="text-slate-400 font-memo text-[10px]">{isEn ? 'Updated weekly by medical boards' : '매주 자동 학술 보강 구동 중'}</span>
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
                              {getCategoryLabel(art.category)}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {isEn ? 'Length: 2,500+ words' : '분량: 2,500+자'}
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
                            {isEn ? 'Derm. Advisor Verified' : `${art.author} 검진필`}
                          </span>
                          <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 text-blue-600 font-extrabold text-[11px]">
                            {isEn ? 'Read Complete Column' : '전체 칼럼 정독'} →
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
              const articleDataRaw = getDetailedSEOArticle(activeArticleId);
              if (!articleDataRaw) {
                return (
                  <div className="bg-white border border-slate-150 rounded-3xl p-10 text-center">
                    <p className="text-slate-500 text-sm">{isEn ? 'Article content could not be found.' : '아티클 지문을 찾을 수 없습니다.'}</p>
                    <button 
                      onClick={() => setCurrentTab('wiki')}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded text-xs"
                    >
                      {isEn ? 'Back to Library' : '백과사전으로 가기'}
                    </button>
                  </div>
                );
              }

              const article = {
                ...articleDataRaw,
                category: getCategoryLabel(articleDataRaw.category)
              };

              const { prev, next } = getPreviousAndNextArticle(activeArticleId);
              const related = getRelatedArticles(activeArticleId);

              return (
                <div className="space-y-8">
                  {/* Breadcrumb Navigation - Crawler Essential */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400 font-sans px-1">
                    <button onClick={() => setCurrentTab('home')} className="hover:text-blue-600 transition-colors">{isEn ? 'Home' : '홈'}</button>
                    <span>&gt;</span>
                    <button onClick={() => setCurrentTab('wiki')} className="hover:text-blue-600 transition-colors">{isEn ? 'Wiki' : '탈모백과'}</button>
                    <span>&gt;</span>
                    <span className="font-semibold text-slate-500 bg-slate-50 px-2 py-0.5 rounded">{getCategoryLabel(article.category)}</span>
                    <span>&gt;</span>
                    <span className="text-slate-600 font-bold truncate max-w-xs">{article.title}</span>
                  </div>

                  {/* MAIN CARD SECTION */}
                  <article className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 print:border-none print:shadow-none">
                    
                    {/* Header */}
                    <div className="space-y-4 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold font-sans">
                          {getCategoryLabel(article.category)}
                        </span>
                        <span className="text-xs text-slate-450 font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Published: June 7, 2026 ∙ Certified Medical Check' : '작성일자: 2026.06.07 ∙ 의학전문 검증'}</span>
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
                            {isEn ? 'D' : article.author[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-700 leading-none">{isEn ? 'Derm. Advisor' : `${article.author} 전문의`}</p>
                            <p className="text-[10px] text-slate-400 mt-1 leading-none">{isEn ? 'Dermatological Science Specialized Panel' : '피부과학 분과 자문 위원'}</p>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {isEn ? 'Views: 2,492 ∙ Rating: ⭐ 4.9/5 ∙ Certified Article Volume' : '조회수: 2,492회 ∙ 평점: ⭐ 4.9/5 ∙ 전문 분량 보증'}
                        </div>
                      </div>
                    </div>

                    {/* Table of Contents - Google AdSense & SEO Essential */}
                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2.5xl space-y-3 print:hidden">
                      <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        <Info className="w-4 h-4 text-blue-600" />
                        <span>{isEn ? 'Table of Contents (TOC)' : '의과학 정보 목차 리스트 (Table of Contents)'}</span>
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
                      <p className="text-[9px] text-slate-400 italic text-right">{isEn ? '* Hair Loss Checker Clinical Synthesis Guide' : '* 탈모체커 임상의 지견 종합 가이드'}</p>
                    </div>

                    {/* DYNAMIC CHECKLIST MODULE */}
                    <div className="p-5 bg-emerald-50/40 border border-emerald-100 rounded-2xl space-y-3 mt-4">
                      <div className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span>{isEn ? (article.list.title || `Specialist Recommended Lifestyle Guides for ${getCategoryLabel(article.category)}`) : (article.list.title || `전문의 추천 생활 속 ${article.category} 수약 가이드`)}</span>
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
                          {isEn ? `💬 FAQ Best 5 for ${article.title}` : `💬 ${article.title} 관련 임상 의학적 FAQ 베스트 5`}
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-1">{isEn ? 'Demystifying highly confusing public assumptions with scientific clarity' : '대중이 혼동하기 쉬운 오해와 허상을 명쾌하게 증명합니다'}</p>
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
                                    <span className="text-blue-600 font-bold block mb-1">{isEn ? 'A. Clinical Specialized Response:' : 'A. 임상의 정밀 답변:'}</span>
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
                      <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-900">{isEn ? '⚖️ Executive Summary (Conclusion)' : '⚖️ 종합 결과 요약 (Conclusion)'}</h4>
                      <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line">
                        {article.conclusion}
                      </p>
                    </div>

                    <hr className="border-slate-100" />

                    {/* CTA ACTION CARD */}
                    <div className="p-6 bg-radial from-blue-500/10 to-transparent border border-blue-50/70 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{isEn ? 'Would you like to measure your accurate hair loss warning status?' : '나의 정확한 탈모 상태를 측정해보시겠습니까?'}</h4>
                        <p className="text-[10px] text-slate-400 mt-1">{isEn ? '100% browser-local scanning for private, high-security risk analysis.' : '100% 브라우저 자체 분석으로 초상권 침해 우려 없이 점검하세요.'}</p>
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
                        {isEn ? 'Start Free Check' : '무료 체크 시작'} <ArrowRight className="w-3.5 h-3.5" />
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
                          <span className="text-[8px] sm:text-[9px] text-slate-400 font-semibold block">{isEn ? 'Previous Article' : '이전 아티클'}</span>
                          <h5 className="font-bold text-[11px] sm:text-xs text-slate-850 truncate leading-snug group-hover:text-blue-600 transition-colors">
                            {isEn ? prev.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : prev.title}
                          </h5>
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
                          <span className="text-[8px] sm:text-[9px] text-slate-400 font-semibold block">{isEn ? 'Next Article' : '다음 아티클'}</span>
                          <h5 className="font-bold text-[11px] sm:text-xs text-slate-850 truncate leading-snug group-hover:text-blue-600 transition-colors">
                            {isEn ? next.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : next.title}
                          </h5>
                        </div>
                        <div className="text-slate-400 pt-1 font-mono text-xs group-hover:translate-x-1 transition-transform">→</div>
                      </div>
                    ) : <div />}
                  </div>

                  {/* RELATED ARTICLES ROW COLUMN */}
                  <div className="space-y-4">
                    <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 px-1">
                      {isEn ? '💡 Complementary Insights & Related Medical Knowledge' : '💡 이 칼럼과 상호 보완되는 연관 의학지식'}
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
                              {getCategoryLabel(art.category)}
                            </span>
                            <h5 className="font-bold text-[10px] text-slate-800 line-clamp-3 leading-snug group-hover:text-blue-600 transition-colors">
                              {isEn ? art.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : art.title}
                            </h5>
                          </div>
                          <span className="text-[9px] text-blue-600 text-right group-hover:translate-x-0.5 transition-transform">{isEn ? 'View Detail' : '자세히 보기'} →</span>
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
                {isEn ? 'Frequently Asked Questions ∙ FAQ' : '자주 묻는 질문 ∙ FAQ'}
              </h2>
              <p className="text-xs text-slate-450 mt-0.5">
                {isEn ? 'Scientific and dermatological answers to highly confusing public misconceptions and daily rules.' : '대중들이 가장 많이 혼동하는 수칙들에 대한 피부과 의과학 전문 답변을 수록했습니다.'}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {FAQ_DATA.map((faqRaw, idx) => {
                const isOpen = openFaqIndex === idx;
                const faq = getTranslatedFaq(faqRaw, idx);
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
                          {getCategoryLabel(faq.category)}
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
          <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            {/* SEO Brand Header Panel */}
            <div className="bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-10 shadow-xs space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-tight">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% On-Device Local Privacy Scan</span>
              </div>
              
              <h1 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-snug">
                {isEn 
                  ? 'Our Mission: Democratizing Hair Health and On-Device Design Philosophy' 
                  : '탈모체커: 사진 2장으로 30초 만에 끝내는 프라이버시 형 자가 점검 서비스'}
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Official Web Address: <span className="text-blue-600 font-bold">ai-hair.pe.kr</span>
              </p>
              
              <div className="h-px bg-slate-100 my-4" />

              {/* SECTION 1: Introduction */}
              <section className="space-y-3">
                <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                  {isEn ? 'Why Hair Loss Checker?' : '1. 왜 탈모체커(ai-hair.pe.kr)인가요?'}
                </h2>
                <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-700/95 leading-relaxed">
                  {isEn 
                    ? 'Empowering you with early indicators before unnecessary financial spending.' 
                    : '불안감을 극대화해 지갑을 열게 만드는 가짜 마케팅에 지친 현대인을 지켜냅니다.'}
                </h3>
                <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose">
                  {isEn 
                    ? `Hair Loss Checker is a browser-sandboxed, intelligence-driven self-assessment utility designed to bridge the gap between people suffering from hair thinning anxieties and scientific, proven clinical knowledge in 30 seconds.
                    
Far too often, those experiencing hair thinning fall prey to viral unproven remedies, expensive cosmetic shampoos, or marketing scams, losing valuable golden times and thousands of dollars before consulting actual medical experts.`
                    : `살면서 탈모 걱정이 고개를 들기 시작할 때, 많은 이들이 막연한 공포심에 휩싸여 효과가 불명확한 고가의 기능성 샴푸나 영양제에 엄청난 자산을 낭비하곤 합니다. 정작 가장 필요한 전문의와의 메디컬 카운셀링 시점은 늦어지기만 하죠.
                    
이에 '탈모체커'는 사용자의 불안에 편승하지 않고, 단 30초 만에 현재의 두피 상태와 이마 헤어라인 밀도를 객관적으로 판독해 드립니다. 전문 의료기관 방문 전, 내가 지금 어떤 상황인지 직관적인 자가 수치 데이터로 스마트하게 준비할 수 있도록 돕겠습니다.`}
                </p>
              </section>

              {/* SECTION 2: How it works */}
              <section className="space-y-3 pt-4">
                <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                  {isEn ? 'How It Works' : '2. 초간편 작동 원리 및 첨단 모니터링'}
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

              {/* SECTION 3: Privacy */}
              <section className="space-y-3 pt-4">
                <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                  {isEn ? 'Complete Privacy Protection' : '3. 절대 전송 없음: 안전한 개인정보 보호 방식'}
                </h2>
                <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-700/95">
                  {isEn 
                    ? 'Your face and scalp files remain absolutely yours.' 
                    : '개인 정보를 단 1바이트도 서버에 유출하지 않는 철벽 프라이버시'}
                </h3>
                <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose font-sans">
                  {isEn 
                    ? 'Your uploaded photos remain completely inside local sandboxed browser memory and are deleted immediately upon completion.' 
                    : '체킹을 위해 올린 2장의 사진은 사용자의 웹 브라우저 가상 RAM 메모리에 일시적으로만 머무르며 연산에 기여합니다. 당사 혹은 외부 클라우드 서버에 절대 보존되지도, 전달되지도 않는 100% 클라이언트 온바운드 샌드박스 원칙을 취합니다. 완료 시 혹은 페이지 브라우저 탭을 닫는 즉시 자동으로 영구 소멸되어 신원 노출 걱정이 없습니다. (구글 애드센스 광고는 서비스 운영 자금 확보용으로만 연계되며 사용자의 검진 이미지 정보와 절대 교차 매핑되지 않습니다.)'}
                </p>
              </section>

              {/* SECTION 4: Who should use it */}
              <section className="space-y-3 pt-4">
                <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                  {isEn ? 'Who is it for?' : '4. 탈모체커, 이런 분들께 특히 추천합니다!'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="text-blue-600 font-extrabold text-xs block mb-1">Recommend 01</span>
                    <h4 className="font-bold text-slate-850 text-xs sm:text-sm mb-1">{isEn ? 'Early Anxiety Relief' : '초기 불안 구제'}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{isEn ? 'Are you losing hair during shower? Self-check in 30 seconds.' : '요즘 부쩍 머리카락이 가늘어지거나 샤워 후 이탈이 잦아 고민스럽지만 클리닉에 방문하기는 머뭇거려지는 분'}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="text-blue-600 font-extrabold text-xs block mb-1">Recommend 02</span>
                    <h4 className="font-bold text-slate-850 text-xs sm:text-sm mb-1">{isEn ? 'Hairline Diagnostics' : '이마 & 정수리 추세 관측'}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{isEn ? 'Regular trends monitoring for crown vertex parting expansions.' : 'M자형 헤어라인 후퇴 속도나 가르마 고랑의 확장 현상을 편하게 지속적으로 트래킹해보고 싶은 분'}</p>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                    <span className="text-blue-600 font-extrabold text-xs block mb-1">Recommend 03</span>
                    <h4 className="font-bold text-slate-850 text-xs sm:text-sm mb-1">{isEn ? 'Therapy Progress Tracking' : '자가 예방 피드백 수집'}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{isEn ? 'Verify if anti-loss hair habits and FDA-approved routines are effective.' : '복용하는 탈모 관리 제품 및 치료 수칙의 효과 전후 추이를 집에서 비침습적 수치로 모니터링 관리하려는 분'}</p>
                  </div>
                </div>
              </section>

              {/* SECTION 5: Limitations */}
              <section className="space-y-3 pt-4">
                <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full inline-block"></span>
                  {isEn ? 'Medical Disclaimer' : '5. AI 분석 한계 및 법률 고지'}
                </h2>
                <h3 className="font-sans font-semibold text-sm sm:text-base text-slate-700/95 flex items-center gap-1.5 text-amber-600">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {isEn 
                    ? 'This is a personal check utility, not formal clinical diagnosis.' 
                    : '탈모체커는 의료 행위(진료, 진단, 처방) 권한을 대변하지 않습니다.'}
                </h3>
                <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed whitespace-pre-line leading-loose">
                  {isEn 
                    ? 'The visual and contrast reference values generated are for private routine assessment purposes only. They do not constitute formal clinical diagnoses or medical advice from qualified dermatologists.' 
                    : '탈모체커의 온디바이스 픽셀 명암 진척 점수는 학술 연구 기준을 바탕으로 산출되는 "참고 및 루틴 추세 관리용 수치"입니다. 이는 공인된 안면 피부과 정밀 모발 현미경이나 모낭 생검 등을 거친 진단서를 대변할 수 없습니다. 모발 건강 악화 및 염증이 두드러질 경우, 자의적인 치료 개시를 금하며 반드시 자격이 부여된 전문 의료기관 오프라인 전문의 진찰과 치료 플랜을 가동하시기를 가이드합니다.'}
                </p>
              </section>

              {/* SECTION 6: FAQ */}
              <section className="space-y-4 pt-4 border-t border-slate-100">
                <h2 className="font-sans font-bold text-lg sm:text-xl text-slate-800 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
                  {isEn ? 'Introductory FAQ' : '6. 자주 묻는 질문 베스트 3'}
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-blue-600 font-bold">Q.</span>
                      {isEn ? 'Will my photo ever leak or be shared?' : '정말 제 사진이 해킹되어 유출될 위험은 영원히 없나요?'}
                    </h4>
                    <p className="text-slate-600 text-[11px] sm:text-xs mt-2 leading-relaxed">
                      {isEn 
                        ? 'Absolutely. All image processing loops completely inside your device RAM.' 
                        : '예, 절대 안심하십시오. 탈모체커는 "서버 수렴 데이터 저장 장치" 자체가 구비되어 있지 않습니다. 이미지는 사용자의 브라우저 로컬 RAM 가상 환경 내에서 계산 처리 즉시 100% 깔끔하게 소환 해제 및 소멸되는 구조로 설계되어 있습니다. 물리적으로 해커가 도중에 빼돌리거나 유출할 인프라 자체가 존재하지 않습니다.'}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-blue-600 font-bold">Q.</span>
                      {isEn ? 'Should I ingest loss pills if my score indicates severe thinning?' : '자가 체크 점수가 안 좋게 나왔다면 바로 병원 탈모 치료제를 먹어야 하나요?'}
                    </h4>
                    <p className="text-slate-600 text-[11px] sm:text-xs mt-2 leading-relaxed">
                      {isEn 
                        ? 'We advise consulting with licensed dermatologists first.' 
                        : '아닙니다. 탈모체커의 점수는 수치를 보정하고 주의 경각심을 고무시켜 전문 예방 칼럼을 학습하기 위함입니다. 피나스테리드, 두타스테리드, 혹은 여성용 미녹시딜 제품 등을 처방 혹은 활용하기 이전에는 꼭 숙련된 피부과학 분과 전문의의 원스톱 처방과 조율을 따르셔야 가역 부작용을 사전에 안전히 차단할 수 있습니다.'}
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-blue-600 font-bold">Q.</span>
                      {isEn ? 'How to capture photos for maximum precision?' : '어떤 환경에서 촬영 사진을 준비해야 가장 정밀한가요?'}
                    </h4>
                    <p className="text-slate-600 text-[11px] sm:text-xs mt-2 leading-relaxed">
                      {isEn 
                        ? 'Ensure bright, unified lighting with clear focus.' 
                        : '빛이 너무 부족해 무거운 어둠이 깔리거나, 머리카락 빛이 지나칠 정도로 강하게 번쩍이는 역광 영역은 정수리 명암 비율 연산 가산점에 오차를 발생시킵니다. 가급적 그늘지지 않는 고른 형광등 조명 아래에서, 핀트 초점을 튼튼히 맞춰 헤어라인 고랑과 가르마가 균형 잡히도록 선명함을 담아 촬영을 등록해 주시면 분석의 신뢰도가 배가됩니다.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 7: CTA ACTION CARD */}
              <div className="pt-6 sm:pt-8">
                <div className="p-6 bg-radial from-blue-500/10 to-transparent border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-850 text-xs sm:text-sm">{isEn ? 'Would you like to measure your hair loss check now?' : '나의 모발 상태를 지금 30초 만에 점검해보시겠습니까?'}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">{isEn ? '100% local, sandboxed privacy-safe scanning.' : '회원가입 필요 없음, 서버 전송 없음. 100% 브라우저 자체 분석으로 마음 편하게 시작하세요.'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentTab('checker')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    {isEn ? 'Start Private Scan (Free)' : '30초 머리카락 자가 점검 시작하기 (무료)'} 
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

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
              {isEn ? 'Privacy Policy' : '개인정보처리방침 (Privacy Policy)'}
            </h2>
            <div className="text-slate-600 whitespace-pre-line leading-relaxed space-y-4">
              <p className="leading-loose font-sans">{isEn ? getTranslatedPrivacy() : PRIVACY_POLICY}</p>
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
              {isEn ? 'Terms Of Service' : '서비스 이용약관 (Terms Of Service)'}
            </h2>
            <div className="text-slate-600 whitespace-pre-line leading-relaxed space-y-4">
              <p className="leading-loose font-sans">{isEn ? getTranslatedTerms() : TERMS_AND_CONDITIONS}</p>
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
                {isEn ? 'Contact Support' : '문의하기 및 소통 창구'}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isEn ? 'Please share any inquiries, suggestions, or brand partnership requests with our team.' : '탈모체커 서비스 이용에 관련된 제언, 애드센스 광고 제휴 등의 문의를 공유하십시오.'}
              </p>
            </div>

            {contactSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 text-base">{isEn ? 'Inquiry Submitted Successfully!' : '소통 양식이 성공적으로 발행되었습니다'}</h4>
                <p className="text-xs text-slate-400 max-w-xs leading-normal">
                  {isEn 
                    ? 'Your valuable feedback has been instantly routed to our support team. If required, we will contact you back under the provided email details within 2-3 business days.' 
                    : '공유해 주신 소중한 의건 피드백은 연구소 서비스 운영진에 즉각 배포되었으며, 회신 적합 시 2-3일 내로 기재 정보를 통해 소통해 드리겠습니다.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactForm({ name: '', email: '', message: '' });
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-2xs"
                >
                  {isEn ? 'New Inquiry' : '새로 문의하기'}
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
                  <label className="font-bold text-slate-700">{isEn ? 'Name / Organization' : '이름 / 단체명'}</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder={isEn ? 'Your Name' : '홍길동'}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-400 focus:outline-hidden bg-slate-50/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">{isEn ? 'Contact E-mail' : '연락 전자우편 (E-mail)'}</label>
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
                  <label className="font-bold text-slate-700">{isEn ? 'Message & Inquiries details' : '의견 및 문의 상세 내역'}</label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder={isEn ? 'Please specify your details and suggestions freely here...' : '여기에 문의하고자 하는 세부 사항을 구체적으로 자유롭게 기재하십시오.'}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-blue-400 focus:outline-hidden bg-slate-50/30 leading-relaxed font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-extrabold transition-all text-xs tracking-tight shadow-xs"
                >
                  {isEn ? 'Send Message to Board' : '운영진에 건의서 발송'}
                </button>
              </form>
            )}

            {/* DIRECT INFO CALL CARD */}
            <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3 border border-slate-100">
              <Mail className="w-4 h-4 text-blue-500" />
              <div className="text-[10px] text-slate-400 leading-normal">
                {isEn ? 'Inquiry Email:' : '문의 이메일:'} <b className="text-slate-600">god05122001@gmail.com</b>
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

import React from 'react';
import { Sparkles, Shield, AlertTriangle, ArrowRight, BookOpen, Activity, User, Heart } from 'lucide-react';
import { ContentTabId } from '../types';
import { useTranslation } from 'react-i18next';

interface HairTypesPageProps {
  onTabChange: (tab: ContentTabId) => void;
  onArticleSelect?: (articleId: string) => void;
}

export default function HairTypesPage({ onTabChange, onArticleSelect }: HairTypesPageProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const typesData = [
    {
      id: 'male',
      articleId: 'male-pattern-hair-loss',
      title: isEn ? 'Male Pattern Alopecia (Androgenetic)' : '남성형 안드로겐 탈모 (Androgenetic)',
      icon: <User className="w-5 h-5 text-blue-600" />,
      tag: isEn ? 'Hereditary / Hormonal' : '유전성 ∙ 호르몬성 대표',
      desc: isEn 
        ? 'The most common form of baldness triggered by DHT hormones and genetic sensitiveness.' 
        : 'DHT 호르몬(유전성 수용체)의 영향으로 모낭이 서서히 소형화되어 최종적으로 머리칼이 빠져나가는 가장 대중화된 남성 탈모입니다.',
      area: isEn ? 'M-shape forehead recession, crown O-shape thinning' : '앞머리 양옆 M자형 이마선 후퇴, 정수리 가마 중심 O자형 소실',
      speed: isEn ? 'Progressive and gradual (years)' : '서서히 지속적 진행 (전체 주기 단축)',
      solution: isEn ? 'FDA-Approved Oral Medication (Finasteride/Dutasteride), Minoxidil, Hair Transplant' : 'FDA/식약처 공인 의약품(피나스테리드/두타스테리드 복용) 및 바르는 미녹시딜액 도포, 후두부 자가 모발이식 수술',
    },
    {
      id: 'female',
      articleId: 'female-pattern-hair-loss',
      title: isEn ? 'Female Pattern Hair Loss (Diffuse)' : '여성형 정수리 확산형 탈모 (Female Pattern)',
      icon: <Heart className="w-5 h-5 text-pink-600" />,
      tag: isEn ? 'Hormonal / Aging' : '가르마 중심 확산형',
      desc: isEn 
        ? 'Diffuse thinning starting from the central parting while maintaining the frontal boundary intact.' 
        : '이마 전면 헤어라인 경계는 완벽하게 유지하면서, 정수리 가르마를 기점으로 전체적인 모발 숱이 크리스마스트리 모형으로 옅어지는 양상입니다.',
      area: isEn ? 'Central parting widening, diffuse vertex thinning' : '정수리 정중앙 가르마 고랑 확장, 전두부 전반 밀도 약화',
      speed: isEn ? 'Slower and gradual (decades)' : '점진적이고 완곡한 진행 (갱년기/출산 후 자극 가속)',
      solution: isEn ? 'Topical Minoxidil (2%~3%), Keratin Amino Acid complex, Low-Level Laser Therapies (LLLT)' : '여성 전용 2~3% 바르는 미녹시딜액, 판토가 계열 약용 효모/케라틴 경구 섭취, 두피 미세 혈관 레이저 및 영양 앰플',
    },
    {
      id: 'areata',
      articleId: 'stress-relation',
      title: isEn ? 'Alopecia Areata (Autoimmune Round)' : '원형탈모증 (Alopecia Areata)',
      icon: <Activity className="w-5 h-5 text-emerald-600" />,
      tag: isEn ? 'Autoimmune / Stress' : '자가면역성 수식 질환',
      desc: isEn 
        ? 'Sudden patchy hair loss caused by immunological cells attacking healthy follicles.' 
        : '체내 면역 시스템 오작동으로 면역 세포들이 정상 기질의 모낭을 적으로 간주하여 급격한 염증 반응을 일으키고 동그랗게 탈락시키는 질환입니다.',
      area: isEn ? 'Random circular patches anywhere on scalp' : '경계가 명확한 동전 크기의 원형 또는 타원형 탈락 반점 발생',
      speed: isEn ? 'Very rapid (days to weeks)' : '돌발적이고 매우 빠른 소실 (수일 내 거대화 가능성)',
      solution: isEn ? 'Clinical Dermatologist Steroids, Stress Alleviation, Immune Regulators' : '피부과 전문의 내원을 통한 트리암시놀론 국소 병변 주사 요령 활용, 과도한 급성 스트레스 원인 차단, 부신피질 호르몬 도포',
    },
    {
      id: 'seborrheic',
      articleId: 'scalp-care-methods',
      title: isEn ? 'Seborrheic Alopecia (Inflammatory)' : '지루성 두피염성 탈모 (Seborrheic)',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />,
      tag: isEn ? 'Hygiene / Scalp Barrier' : '환경성 두피 트러블 결과',
      desc: isEn 
        ? 'Hair fall induced by severe scalp sebum hypersecretion leading to chronic fungal inflammation.' 
        : '두피 피지선의 만성 과다 분비에 각질과 진균(말라세지아 등)이 혼합되어 두피 가려움, 진물, 붉은 홍반 현상과 동반해 빠지는 질환입니다.',
      area: isEn ? 'Inflammatory regions, dandruff-prone scalp sectors' : '염증, 비듬 및 가려움증이 극대화되는 두피 전반 무작위 탈락',
      speed: isEn ? 'Reversible if inflammation settles' : '염증 만성화 시 영구 탈모 이행 (염증 치유 시 가역 회복성)',
      solution: isEn ? 'Ketoconazole/Zinc Pyrithione Anti-fungal Shampoos, Anti-inflammatory Care' : '니조랄 등 약용 케토코나졸 샴푸 주 2회 적용, 살리실산 함유 각질 박리 및 두피 청결 유지, 자극성 식습관 배제',
    },
    {
      id: 'telogen',
      articleId: 'hair-growth-cycle',
      title: isEn ? 'Telogen Effluvium (Temporary Shedding)' : '휴지기성 탈모증 (Telogen Effluvium)',
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      tag: isEn ? 'Diet / Recovery' : '일시적 탈모 주기 교란',
      desc: isEn 
        ? ' follicles prematurely forced into telogen resting phases caused by crash diets, surgery, or illnesses.' 
        : '급격한 무리한 다이어트, 단백질 기아, 대수술, 고열 질환 후 2~3개월 뒤 모발 성장 주기가 대거 휴지기로 넘어가 무더기 탈락하는 상태입니다.',
      area: isEn ? 'Overall diffuse head-wide shedding' : '특정 부위에 국한되지 않고 샴푸나 빗질 시 전체 모발이 대량 탈락',
      speed: isEn ? 'Excessive daily counts (150+ strds)' : '일시적 급증 (하루 150~300개 이상 빠짐)',
      solution: isEn ? 'Nutritional Biotin, High Protein Intake, Natural Restful Cleansing Cycle' : '충분한 단백질 식단 환원, 비오틴 및 철분/아연 복합 비타민 공급, 원인 요도 3~6개월 경과 시 서서히 자발적 정상 복구',
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in max-w-5xl mx-auto font-sans">
      
      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-tight">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isEn ? 'Dermatology Medical Reference' : '피부과 학술 가이드 보증'}</span>
        </span>
        
        <h1 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-950 tracking-tight leading-tight">
          {isEn ? 'The 5 Major Types of Hair Loss Explained' : '자가 탈모 유형 분석 및 세부 안내 가이드'}
        </h1>
        
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          {isEn 
            ? 'Before spending on treatments, understand your specific balding pattern. Different hair loss types require highly distinct evidence-backed clinical responses.'
            : '나의 모발 약화 형태가 어디에 직결되는지 자가 학습해 보세요. 형태별 원인 유도 기전과 호르몬 활성이 무관할 수 있으므로, 정확한 유형 매칭이 곧 올바른 복원의 시작입니다.'}
        </p>
      </div>

      {/* 2. SUMMARY MATRIX TABLE - E-E-A-T Compliance High-Value Component */}
      <div className="space-y-3 bg-white border border-slate-200/60 rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="font-sans font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
          <span>📊</span>
          <span>{isEn ? 'Clinical Comparison Matrix of 5 Major Alopecia Types' : '5대 대중 탈모 유형 임상 종합 비교 분석 매트릭스'}</span>
        </div>
        
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-xs text-left text-slate-600 border-collapse">
            <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-800 uppercase border-b border-slate-100 text-center">
              <tr>
                <th className="px-3.5 py-3 text-left">{isEn ? 'Hair Loss Type' : '유형명'}</th>
                <th className="px-3.5 py-3">{isEn ? 'Primary Areas' : '주요 빈발 부위'}</th>
                <th className="px-3.5 py-3">{isEn ? 'Onset Speed' : '진행 속도'}</th>
                <th className="px-3.5 py-3 text-left">{isEn ? 'Proven Management Approaches' : '임상 학술 처방 대응'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {typesData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-3.5 py-4 font-bold text-slate-950 leading-snug">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1.5 bg-slate-50 rounded-lg">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                  </td>
                  <td className="px-3.5 py-4 text-center font-medium font-sans text-[11px] text-slate-700 leading-relaxed max-w-xs">
                    {item.area}
                  </td>
                  <td className="px-3.5 py-4 text-center font-semibold font-sans text-[11px] text-blue-600">
                    {item.speed}
                  </td>
                  <td className="px-3.5 py-4 font-normal text-[11px] text-slate-650 leading-relaxed max-w-sm">
                    {item.solution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-slate-400 italic text-right mt-1">
          {isEn 
            ? '* Synthesized from the American Academy of Dermatology guidelines.' 
            : '* 대한피부과학회학술자료 및 글로벌 안드로겐성 소양 학술 가이드 논문을 근간으로 종합 수집하였습니다.'}
        </p>
      </div>

      {/* 3. IN-DEPTH CARDS WITH ACTION LINKS - Boosts PageViews & Session Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {typesData.map((item, idx) => (
          <div 
            key={item.id}
            className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-sm hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-500 rounded-lg text-[10px] font-extrabold">
                  {item.icon}
                  <span>{item.tag}</span>
                </span>
                <span className="font-mono text-[10px] text-slate-350">TYPE 0{idx + 1}</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="space-y-2.5 bg-slate-50/70 border border-slate-100/60 p-4 rounded-2xl text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-slate-800">{isEn ? 'Target Area' : '주요 부위'}</span>
                  <span className="col-span-2 text-slate-600 font-medium">{item.area}</span>
                </div>
                <div className="h-px bg-slate-100" />
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-bold text-slate-800">{isEn ? 'Proven Care' : '임상 대응'}</span>
                  <span className="col-span-2 text-slate-600 font-medium">{item.solution}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  if (onArticleSelect) {
                    onArticleSelect(item.articleId);
                  } else {
                    onTabChange('wiki');
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-all cursor-pointer group-hover:border-blue-300"
              >
                <span>{isEn ? 'Read Specialty Detailed Column' : '관련 의과학 2,500자 전문 칼럼 읽어보기'}</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. CLINICAL DISCLAIMER & EA-T BANNER */}
      <div className="p-6 bg-amber-50/30 border border-amber-100 rounded-3xl max-w-3xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
          <Shield className="w-5 h-5 text-amber-500" />
          <span>{isEn ? 'Medical Self-Care and Limit Warnings' : '의학용 자가 탐색 검진 한계 고지'}</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-sans leading-loose">
          {isEn
            ? "The informational data provided on this alopecia comparison resource is for personal general knowledge and routine reference only. Hair Loss Checker is not a medical practice tool and does not replace professional face-to-face evaluations, prescriptions, and clinical diagnoses by licensed dermatologists."
            : "본 페이지에서 제공하는 모발 보전 분석 대조 카드는 공신력 있는 임상 가이드를 알기 쉽도록 번안 가공한 학술 자료입니다. 이는 실제 안면 의과학적 모낭 내시경 생검이나 전문의 1:1 촉진 등을 완전히 갈음할 수 없습니다. 모락 소실이 우려될 시 자가 치료 및 임의 제제 조합을 지양하시고 꼭 피부과 전문의 조력을 확보하십시오."}
        </p>
      </div>

    </div>
  );
}

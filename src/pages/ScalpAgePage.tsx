/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  Sparkles, 
  RefreshCw, 
  ThumbsUp, 
  AlertTriangle, 
  Heart,
  Calendar,
  Award
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ScalpAgePageProps {
  onTabChange: (tab: any) => void;
}

interface Question {
  id: number;
  questionKo: string;
  questionEn: string;
  category: string;
  options: {
    textKo: string;
    textEn: string;
    score: number; // Age offset (years)
    value?: any; // To store base age if needed
  }[];
}

export default function ScalpAgePage({ onTabChange }: ScalpAgePageProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(10).fill(0));

  const questions: Question[] = [
    {
      id: 1,
      category: 'age',
      questionKo: '현재 귀하의 연령대는 어떻게 되나요?',
      questionEn: 'What is your current age range?',
      options: [
        { textKo: '20대 초반 이하 (18~24세)', textEn: 'Early 20s or younger (18-24)', score: 21 },
        { textKo: '20대 후반 (25~29세)', textEn: 'Late 20s (25-29)', score: 27 },
        { textKo: '30대 초반 (30~34세)', textEn: 'Early 30s (30-34)', score: 32 },
        { textKo: '30대 후반 (35~39세)', textEn: 'Late 30s (35-39)', score: 37 },
        { textKo: '40대 이상 (40세~)', textEn: '40s or older (40+)', score: 45 }
      ]
    },
    {
      id: 2,
      category: 'sleep',
      questionKo: '하루 평균 수면 시간은 얼마나 되나요?',
      questionEn: 'What is your average daily sleep duration?',
      options: [
        { textKo: '7~8시간 이상 (충분하고 규칙적 수면)', textEn: '7-8 hours or more (Sufficient & regular)', score: -2 },
        { textKo: '5~6시간 선 (가끔 불규칙함)', textEn: '5-6 hours (Sometimes irregular)', score: 1 },
        { textKo: '5시간 미만 (만성 수면 부족)', textEn: 'Less than 5 hours (Chronic sleep deprivation)', score: 3 }
      ]
    },
    {
      id: 3,
      category: 'stress',
      questionKo: '일상에서 체감하는 스트레스 강도는 어떤가요?',
      questionEn: 'How would you rate your daily stress level?',
      options: [
        { textKo: '거의 없음 (평온하고 긍정적인 생활)', textEn: 'Low (Calm and positive life)', score: -1 },
        { textKo: '보통 수준 (일상적인 해소 가능한 정도)', textEn: 'Moderate (Manageable routine stress)', score: 1 },
        { textKo: '매우 높음 (자주 예민하고 불안한 상태)', textEn: 'High (Frequently sensitive or anxious)', score: 3 }
      ]
    },
    {
      id: 4,
      category: 'family',
      questionKo: '가족(부모형제 및 친척) 중 탈모 증상이 인지되나요?',
      questionEn: 'Do any family members have signs of hair loss?',
      options: [
        { textKo: '전혀 없음', textEn: 'None at all', score: 0 },
        { textKo: '친가 또는 외가 한 곳에만 있음', textEn: 'Yes, on one side (maternal or paternal)', score: 2 },
        { textKo: '양가 모두 있거나 형제 중 있음', textEn: 'Yes, on both sides or among siblings', score: 4 }
      ]
    },
    {
      id: 5,
      category: 'shedding',
      questionKo: '하루에 머리카락이 대략 몇 가닥 정도 빠지나요?',
      questionEn: 'Approximately how many hairs do you shed daily?',
      options: [
        { textKo: '50가닥 미만 (극히 자연스러운 수준)', textEn: 'Less than 50 (Very normal level)', score: -1 },
        { textKo: '50~100가닥 수준 (머리 감고 말릴 때 집중 축소)', textEn: '50-100 (Noticeable when washing/drying)', score: 1 },
        { textKo: '100가닥 이상 (침구류 및 바닥에 흔적이 심함)', textEn: 'Over 100 (Shedding heavy on bedding/floors)', score: 4 }
      ]
    },
    {
      id: 6,
      category: 'smoking',
      questionKo: '흡연을 정기적으로 하시나요?',
      questionEn: 'Do you smoke regularly?',
      options: [
        { textKo: '비흡연자 (담배를 피우지 않음)', textEn: 'Non-smoker', score: -1 },
        { textKo: '가끔 피움 / 간접 흡연 노출', textEn: 'Social smoker / exposed to secondhand smoke', score: 1 },
        { textKo: '정기 흡연자 (하루 반 갑 이상)', textEn: 'Regular smoker (Half a pack or more daily)', score: 3 }
      ]
    },
    {
      id: 7,
      category: 'exercise',
      questionKo: '일주일에 유산소 주력 신체 활동이나 운동을 얼마나 합니까?',
      questionEn: 'How often do you perform aerobic exercises or physical activities?',
      options: [
        { textKo: '일주일에 3회 이상 꾸준히 시행', textEn: 'Regularly (3+ times a week)', score: -2 },
        { textKo: '시간 날 때 가끔 (주 1~2회)', textEn: 'Occasionally (1-2 times a week)', score: 0 },
        { textKo: '거의 하지 않음 (운동 부족)', textEn: 'Rarely (Lack of exercise)', score: 2 }
      ]
    },
    {
      id: 8,
      category: 'itching',
      questionKo: '평소 두피가 가렵거나 각질(비듬)이 자주 관찰되나요?',
      questionEn: 'Do you experience scalp itchiness or notice dandruff?',
      options: [
        { textKo: '전혀 없이 쾌적함', textEn: 'Never, very clean and comfortable', score: -1 },
        { textKo: '환절기나 피곤할 때 가끔 발생', textEn: 'Occasionally during seasonal changes or fatigue', score: 2 },
        { textKo: '만성 가려움증과 굵은 비듬이 항상 동반됨', textEn: 'Always, chronic itchiness and heavy dandruff', score: 4 }
      ]
    },
    {
      id: 9,
      category: 'shampoo',
      questionKo: '샴푸 후 반나절 정도 흐른 뒤 두피 상태는 어떤가요?',
      questionEn: 'How does your scalp feel half a day after shampooing?',
      options: [
        { textKo: '보송보송하고 유수분 밸런스가 적절함', textEn: 'Fresh, balanced and comfortable', score: -1 },
        { textKo: '금방 기름이 지고 냄새나 열감이 느껴짐', textEn: 'Greasiness, heat, or sebum builds up quickly', score: 2 },
        { textKo: '푸석하고 땅기며 각질이 하얗게 들뜸', textEn: 'Dry, tight, and white flaky dead skin rises', score: 2 }
      ]
    },
    {
      id: 10,
      category: 'change',
      questionKo: '최근 1년간 머리숱(밀도)이나 굵기 변화를 느끼시나요?',
      questionEn: 'Have you noticed changes in hair thickness or density in the past year?',
      options: [
        { textKo: '이전과 동일하게 유지 중', textEn: 'No noticeable change, solid density', score: 0 },
        { textKo: '미세하게 가늘어지고 이마가 살짝 가벼워진 체감', textEn: 'Slightly thinner or forehead feels a bit lighter', score: 2 },
        { textKo: '전체적으로 모량이 줄어 눈에 띄게 비어 보임', textEn: 'Clearly thinner hair with visible scalp showing', score: 4 }
      ]
    }
  ];

  const handleSelectOption = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIdx] = index;
    setAnswers(updatedAnswers);

    if (currentIdx < 9) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentIdx(0);
    setAnswers(new Array(10).fill(0));
  };

  // 계산 유틸리티
  const calcResults = () => {
    // 1번 문항의 score는 Base Age
    const baseAge = questions[0].options[answers[0]].score;
    let ageOffset = 0;
    for (let i = 1; i < 10; i++) {
      ageOffset += questions[i].options[answers[i]].score;
    }

    let calculatedAge = baseAge + ageOffset;
    // 범위 한계 클램프
    calculatedAge = Math.max(18, Math.min(80, calculatedAge));

    // 등급 산출
    const ageDiff = calculatedAge - baseAge;
    let grade: '매우 건강' | '좋음' | '주의' | '관리 필요' | '집중 관리' = '좋음';
    let gradeEn: 'Very Healthy' | 'Good' | 'Caution' | 'Needs Care' | 'Intensive Care' = 'Good';
    let colorClass = 'text-emerald-500 bg-emerald-50 border-emerald-200';

    if (ageDiff <= -3) {
      grade = '매우 건강';
      gradeEn = 'Very Healthy';
      colorClass = 'text-green-600 bg-green-50 border-green-200';
    } else if (ageDiff <= 1) {
      grade = '좋음';
      gradeEn = 'Good';
      colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
    } else if (ageDiff <= 4) {
      grade = '주의';
      gradeEn = 'Caution';
      colorClass = 'text-amber-500 bg-amber-50 border-amber-200';
    } else if (ageDiff <= 7) {
      grade = '관리 필요';
      gradeEn = 'Needs Care';
      colorClass = 'text-orange-500 bg-orange-50 border-orange-200';
    } else {
      grade = '집중 관리';
      gradeEn = 'Intensive Care';
      colorClass = 'text-red-500 bg-red-50 border-red-200';
    }

    // 좋은 습관 TOP 3 매칭
    const goodHabitsKo = [
      '충분하고 규칙적인 수면 습관은 성장 호르몬 방출을 자극해 모근 세포 사이클을 강화합니다.',
      '유산소 주력 운동은 전신 및 두피 혈류 순환 속도를 배가하여 모발에 산소를 공급합니다.',
      '피지 분포가 청정하고 유수분 밸런스가 균형을 이루어 모공 호흡이 활성화 수준입니다.'
    ];
    const goodHabitsEn = [
      'Sufficient sleep targets healthy hair follicular renewal and boosts hair protein synthesis.',
      'Aerobic workouts speed up blood circulation to the peripheral tissues including scalp.',
      'Oily-hydration equilibrium is balanced, securing deep oxygenation of scalp roots.'
    ];

    // 나쁜 습관 / 위험 요인 TOP 3 추출
    const badHabitsKo: string[] = [];
    const badHabitsEn: string[] = [];

    if (questions[1].options[answers[1]].score > 0) {
      badHabitsKo.push('수면 부족으로 인한 호르몬 대사 가속화 및 모낭 산소 순환 억제');
      badHabitsEn.push('Sleep deprivation which disrupts growth hormone secretion of follicle cells');
    }
    if (questions[2].options[answers[2]].score > 0) {
      badHabitsKo.push('높은 신경계 스트레스 유도로 인한 혈관 긴장 및 모근 영양공급 장애');
      badHabitsEn.push('Elevated stress triggers physical vessel tightness reducing nutrient supply');
    }
    if (questions[3].options[answers[3]].score > 0) {
      badHabitsKo.push('강한 선천성 탈모 인자 보유에 따른 정밀 장기 주기 추세 체크 요구');
      badHabitsEn.push('Strong hereditary genetic traits requires regular focus diagnostics');
    }
    if (questions[4].options[answers[4]].score > 0) {
      badHabitsKo.push('일일 모발 탈락 수량 급증에 기인한 모발 생장기(Anagen) 조기종료 위험');
      badHabitsEn.push('High volume daily shedding indicates early exit from the active growth phase');
    }
    if (questions[5].options[answers[5]].score > 0) {
      badHabitsKo.push('정기 흡연으로 인한 말초 모세혈관 수축 및 체내 항산화 물질 파괴');
      badHabitsEn.push('Regular smoking causes peripheral vessel shrinking starving follicles');
    }
    if (questions[6].options[answers[6]].score > 0) {
      badHabitsKo.push('유산소 대사 활동 결여에 다른 원활치 못한 두피 열강 지열 정체 상체 집중');
      badHabitsEn.push('Lack of cardiovascular activities leading to chronic scalp thermal trapping');
    }
    if (questions[7].options[answers[7]].score > 0) {
      badHabitsKo.push('잦은 가려움 각질 방치에 따른 약해진 두피 지루 장벽 세균 이상 번식 우려');
      badHabitsEn.push('Chronic scalp irritation or dandruff increases microscopic fungus risk');
    }
    if (questions[8].options[answers[8]].score > 0) {
      badHabitsKo.push('잦은 샴푸 후 지성 노폐물 정체 혹은 건조증에 따른 모공 밀폐 노쇠 유도');
      badHabitsEn.push('Post-shampoo excess sebum or dry tension blocks healthy hair follicles');
    }
    if (questions[9].options[answers[9]].score > 0) {
      badHabitsKo.push('단기간 급격한 모발 연모화 진전 현상 기조의 적극 지열 수단 마련 긴급성');
      badHabitsEn.push('Recent visible thinning highlights critical necessity for preventative intervention');
    }

    // 습관이 다 좋아서 리스트가 비어있을 시 기본값 부여
    if (badHabitsKo.length === 0) {
      badHabitsKo.push('주의해야 할 과도한 음주 및 고당 탄수화물 식습관 패턴 점검');
      badHabitsKo.push('계절별 급격한 외부 온도 변화에 대응한 직사광선 자외선 필터 방어');
      badHabitsKo.push('왁스나 스프레이 등 헤어 제품의 과한 사용 및 불완전한 잔여물 샴푸 클렌징');
      
      badHabitsEn.push('Occasional elevated sugary snack or simple carbohydrate bingeing');
      badHabitsEn.push('Exposed scalp to excessive UV sun rays without wear protective coverage');
      badHabitsEn.push('Styling product residues clogging pores from fast hair washing');
    } else if (badHabitsKo.length < 3) {
      badHabitsKo.push('헤어 제품 잔여 노폐물의 불완전한 샴푸 세정 위험성 내재');
      badHabitsEn.push('Residual heavy hair styles or grease from hasty scalp scrubs');
    }

    return {
      baseAge,
      calculatedAge,
      grade: isEn ? gradeEn : grade,
      colorClass,
      goodHabits: isEn ? goodHabitsEn : goodHabitsKo,
      badHabits: (isEn ? badHabitsEn : badHabitsKo).slice(0, 3)
    };
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      
      {/* 1) INTRO SCREEN */}
      {step === 'intro' && (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-center focus-target">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <Activity className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {isEn ? 'Scalp Age Test' : '두피 나이 테스트'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {isEn 
                ? 'Answer 10 short clinical-based lifestyle and biological questions to calculate your estimated scalp health age!'
                : '10가지 과학적인 생활 습관 및 생물학적 문항에 답하고, 본인의 예상 두피 생물학적 나이와 개선 가이드를 즉시 도출해 보세요.'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl max-w-md mx-auto border border-slate-100 text-left text-xs text-slate-500 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>{isEn ? '10 items, single choice' : '총 10개 엄선 문항 (화면당 1문항 진행)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>{isEn ? '100% serverless client computation' : '개인정보 서버 유출 우려 없는 100% 로컬 연산'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span>{isEn ? 'Accurately measures behavior weights' : '수면, 영양, 생장주기 결합형 지수 대조'}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep('test')}
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 mx-auto"
            >
              {isEn ? 'Start Scalp Age Test' : '두피 나이 측정 개시하기'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2) TEST SCREEN */}
      {step === 'test' && (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* HEADER (QUESTION PROGRESS) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-blue-600 font-extrabold tracking-wider bg-blue-50 px-2 py-0.5 rounded-md">
                Q. {questions[currentIdx].id} / 10
              </span>
              <span className="text-slate-400 font-semibold">{Math.round(((currentIdx + 1) / 10) * 100)}%</span>
            </div>
            
            {/* PROGRESS BAR */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* QUESTION TEXT */}
          <div className="space-y-1.5 min-h-[60px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
              {questions[currentIdx].category.toUpperCase()} FACTOR
            </span>
            <h3 className="font-sans font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight leading-snug">
              {isEn ? questions[currentIdx].questionEn : questions[currentIdx].questionKo}
            </h3>
          </div>

          {/* OPTION BUTTONS */}
          <div className="space-y-3">
            {questions[currentIdx].options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className="w-full text-left p-4 sm:p-5 bg-white hover:bg-blue-50/20 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 hover:border-blue-300 transition-all shadow-3xs cursor-pointer flex items-center justify-between group"
              >
                <span>{isEn ? opt.textEn : opt.textKo}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all shrink-0 ml-4" />
              </button>
            ))}
          </div>

          {/* BOTTOM CONTROLS */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`flex items-center gap-1 text-xs font-bold ${
                currentIdx === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {isEn ? 'Back' : '이전 문항'}
            </button>
            
            <span className="text-[10px] text-slate-450 font-mono">ON-DEVICE SECURE SANDBOX</span>
          </div>
        </div>
      )}

      {/* 3) RESULT SCREEN */}
      {step === 'result' && (() => {
        const res = calcResults();
        return (
          <div className="space-y-8 animate-fade-in">
            
            {/* CORE HERO RESULT CARD */}
            <div className="bg-white border border-slate-200/65 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold tracking-tight">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Personal Assessment Verified' : '피부보건 행동요인 및 유전 추론 결과'}</span>
                </div>
                <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  {isEn ? 'Your Scalp Health Assessment Report' : '종합 두피 건강 나이 진단서'}
                </h2>
              </div>

              {/* ESTIMATED AGE INDICATOR */}
              <div className="relative py-6 max-w-sm mx-auto flex flex-col items-center justify-center">
                <div className="w-40 h-40 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center bg-radial from-blue-50/10 to-transparent shadow-xs">
                  <span className="text-slate-400 text-xs font-bold mb-0.5">{isEn ? 'Scalp Age' : '예상 두피 나이'}</span>
                  <span className="text-4xl font-extrabold text-blue-600 font-mono tracking-tighter">
                    {res.calculatedAge}
                  </span>
                  <span className="text-slate-400 text-xs font-bold mt-1">{isEn ? 'Years Old' : '세'}</span>
                </div>

                <div className={`mt-5 px-4 py-1.5 rounded-full border text-xs font-extrabold ${res.colorClass} shadow-3xs`}>
                  {isEn ? 'Health Grade: ' : '두피 상태 등급: '} {res.grade}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                {isEn 
                  ? `Based on daily routines, sleep architecture, stress index and genetic elements, your estimated scalp biologically behaves like ${res.calculatedAge} years of age.`
                  : `응답해주신 생활 습관, 수면 깊이, 체감 스트레스 장벽, 생리적 모발 탈락 현황 수치 분석 결과 귀하의 현재 예상 두피 건강 나이는 만 ${res.calculatedAge}세로 수렴 진단됩니다.`}
              </p>
            </div>

            {/* TWO GRIDS: OPTION HABITS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* GOOD HABITS CARD */}
              <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-3xs space-y-4">
                <h3 className="font-sans font-extrabold text-sm sm:text-base text-emerald-700 flex items-center gap-1.5">
                  <ThumbsUp className="w-5 h-5 text-emerald-500" />
                  {isEn ? 'Good Habits TOP 3' : '좋은 습관 TOP 3'}
                </h3>
                <div className="h-px bg-slate-100" />
                <ul className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                  {res.goodHabits.map((h, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center font-bold text-[10px] mt-0.5">
                        {i + 1}
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RISK HABITS CARD */}
              <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-3xs space-y-4">
                <h3 className="font-sans font-extrabold text-sm sm:text-base text-amber-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  {isEn ? 'Risk Factors TOP 3' : '위험 습관 TOP 3'}
                </h3>
                <div className="h-px bg-slate-100" />
                <ul className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                  {res.badHabits.map((h, i) => (
                    <li key={i} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex-shrink-0 flex items-center justify-center font-bold text-[10px] mt-0.5">
                        {i + 1}
                      </span>
                      <span className="font-medium text-slate-700">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ACTION FOOTER CARD */}
            <div className="p-6 bg-slate-50 border border-slate-150 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1">
                <h4 className="font-sans font-bold text-slate-850 text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-500" />
                  {isEn ? 'Want to check your Hair Habits Score?' : '평소 모발/가마 관리 습관 점수를 아시나요?'}
                </h4>
                <p className="text-[11px] text-slate-450 leading-relaxed">
                  {isEn 
                    ? 'Check out the Hair Habit test next to measure your detailed hair care habits on a 0-100 scale.'
                    : '10가지 머리 관리 디테일 체크리스트를 통해 세부 생활 지표를 0~100점 점수로 정밀 진찰해 보세요.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-extrabold text-xs rounded-xl shadow-3xs transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {isEn ? 'Re-Test Age' : '나이 다시 테스트'}
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('hair-habit')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                >
                  {isEn ? 'Check Hair Habit Score' : '머리 습관 점수 보기'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        );
      })()}

    </div>
  );
}

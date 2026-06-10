/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  RefreshCw, 
  Award, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  Heart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HairHabitPageProps {
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
    points: number;
    tipKo: string;
    tipEn: string;
  }[];
}

export default function HairHabitPage({ onTabChange }: HairHabitPageProps) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [step, setStep] = useState<'intro' | 'test' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(10).fill(0));

  const questions: Question[] = [
    {
      id: 1,
      category: 'shampoo_freq',
      questionKo: '주된 샴푸 빈도와 시간대는 어떻게 되나요?',
      questionEn: 'How often and when do you wash your hair?',
      options: [
        { 
          textKo: '하루 1회, 주로 저녁 시간대 (추천)', 
          textEn: 'Once a day, primarily in the evening (Recommended)', 
          points: 10,
          tipKo: '하루 동안 쌓인 유해 먼지와 노폐물을 완벽히 씻고 숙면할 수 있어 가장 이상적입니다.',
          tipEn: 'Cleanses accumulated dust and sebum before sleep, supporting root oxygenation.'
        },
        { 
          textKo: '하루 1~2회, 주로 아침 시간대', 
          textEn: '1-2 times a day, primarily in the morning', 
          points: 8,
          tipKo: '두피를 깨끗이 하지만, 밤사이 분비된 천연 보호막 유분이 씻겨 자외선 방어력이 일시적으로 줄어듭니다.',
          tipEn: 'Cleanses effectively but strips natural protective oils right before UV sun exposure.'
        },
        { 
          textKo: '이틀에 1회 이하 (노폐물 정체 가중)', 
          textEn: 'Once every 2 days or less (Excess sebum build-up)', 
          points: 4,
          tipKo: '피지 산화물이 모인 고랑 주변에 말라붙어 모공을 밀폐시키고 국소 염증을 가중할 위험이 높습니다.',
          tipEn: 'Allows oxidized sebum to build up, clogging follicles and increasing inflammatory risks.'
        }
      ]
    },
    {
      id: 2,
      category: 'water_temp',
      questionKo: '머리를 감을 때 물의 온도는 어떤가요?',
      questionEn: 'What is the temperature of the water when washing?',
      options: [
        { 
          textKo: '미온수나 약간 시원한 물 (30~35도 내외)', 
          textEn: 'Lukewarm or cool water (30-35°C / 86-95°F)', 
          points: 10,
          tipKo: '두피 모공 잔여 유분을 적당히 이완해 씻어내며 열 자극이 없어 모근 긴장도를 안정시킵니다.',
          tipEn: 'Optimal range that removes oils without irritating or trapping scalp heat.'
        },
        { 
          textKo: '약간 따뜻한 정도의 온수', 
          textEn: 'Warm water', 
          points: 7,
          tipKo: '나쁘지는 않으나 두피 장벽이 얇거나 예민한 분들은 수분 증발과 모공 자극을 주의해야 합니다.',
          tipEn: 'Acceptable but might dry out sensitive scalps or trigger oil over-creation.'
        },
        { 
          textKo: '뜨끈하고 다소 뜨거운 물', 
          textEn: 'Hot water', 
          points: 2,
          tipKo: '두피 콜라겐 단백질을 미세 열변성 유도해 모낭 지지력을 급추락 시키며 탈수를 유발합니다.',
          tipEn: 'Denatures collagen, severely weakening follicles and triggering extreme skin dryness.'
        }
      ]
    },
    {
      id: 3,
      category: 'dry_temp',
      questionKo: '머리를 말릴 때 헤어 드라이기 세팅 노하우는 어떤가요?',
      questionEn: 'How do you dry your hair after washing?',
      options: [
        { 
          textKo: '찬 바람이나 냉온풍 순환 조절을 통해 두피 속까지 완전 건조', 
          textEn: 'Cold air or cool/warm circulation until scalp is fully dry', 
          points: 10,
          tipKo: '드라이 열 손상을 철저 차단하고 습한 곰팡이성 비듬균 증식을 완벽 진압합니다.',
          tipEn: 'Prevents thermal damage and shields from damp microbial overgrowth.'
        },
        { 
          textKo: '뜨겁고 따뜻한 바람 위주로 모발 빠르게 일체 건조', 
          textEn: 'Hot air only to dry hair as fast as possible', 
          points: 7,
          tipKo: '모발 건조는 빠르나 두피 국소 고온을 유발해 두피 사막화를 가속화할 우려가 큽니다.',
          tipEn: 'Saves time but high target temperatures can dehydrate scalp layers.'
        },
        { 
          textKo: '완전히 말리지 않고 축축한 상태 유지 또는 과열 밀착 건출', 
          textEn: 'Leave it damp or blow dry with extreme high heat near the skin', 
          points: 3,
          tipKo: '축축한 가르마 사이에 균류가 밀착 발호하고 퀴퀴한 지루성 악취와 각질 탈각을 유발합니다.',
          tipEn: 'Traps moisture, breeding bacterial odors, flakes, and follicular thinning.'
        }
      ]
    },
    {
      id: 4,
      category: 'night_snack',
      questionKo: '늦은 밤 야식(기름지거나 맵고 짠 밀가루/배달 요리) 빈도는 어떻게 되나요?',
      questionEn: 'How often do you eat late-night snacks?',
      options: [
        { 
          textKo: '야식을 거의 안 먹음 (취침 전 공복 유지)', 
          textEn: 'Rarely (Keep empty stomach before sleep)', 
          points: 10,
          tipKo: '밤사이 소기 소화 대사에너지가 두피 모낭 재생과 산소 공급으로 보전됩니다.',
          tipEn: 'Conserves somatic cellular resources for nightly hair follicular repair.'
        },
        { 
          textKo: '일주일에 1~2회 내외 가볍게 가루나 과일 등으로 축수', 
          textEn: 'Occasionally (1-2 times a week, light snacking)', 
          points: 7,
          tipKo: '비교적 평이하나 지나친 염분은 피해 주시면 순환 전반에 한층 더 좋습니다.',
          tipEn: 'Relatively fine but avoiding greasy fast foods is best for hair quality.'
        },
        { 
          textKo: '주 3회 이상 단골 야식 섭취 (치킨, 피자, 불닭 등)', 
          textEn: 'Frequently (3+ times a week with heavy meals)', 
          points: 3,
          tipKo: '위장관 부하가 수면 장벽을 정지시키고 인슐린 과도 방출로 피지 과다 배출로 직행합니다.',
          tipEn: 'Triggers insulin surges which stimulate oil-excreting scalp sebaceous glands.'
        }
      ]
    },
    {
      id: 5,
      category: 'sleep_quality',
      questionKo: '주된 수면 패턴과 시간 약속은 어떤 수준을 보이나요?',
      questionEn: 'How would you rate your sleep schedule & quality?',
      options: [
        { 
          textKo: '규칙적으로 밤 11시~12시 이내 취침하며 충분한 잠', 
          textEn: 'Consistent deep sleep starting before midnight', 
          points: 10,
          tipKo: '성장 자극 호르몬 분비가 피크 시간대에 배출되어 모근 구조 수명을 늘려줍니다.',
          tipEn: 'Matches peak circadian windows, releasing growth hormones for hair cycle.'
        },
        { 
          textKo: '불규칙적으로 새벽 2~3시 지연 취침 혹은 빈번한 스마트폰 응시', 
          textEn: 'Irregular sleeping, staying up on screen until 2-3 AM', 
          points: 5,
          tipKo: '블루라이트 자극이 수면 유도 멜라토닌 신호를 꺼버려 두피 재생 효율을 억제합니다.',
          tipEn: 'Blue-light suppresses melatonin, cutting short essential repair mechanisms.'
        },
        { 
          textKo: '밤을 자주 지새우거나 만성적으로 모자란 수면 (하루 5시간 미만)', 
          textEn: 'Chronic night shifts or insomnia (Under 5 hours daily)', 
          points: 4,
          tipKo: '교감신경이 만성 초긴장 상태를 유도해 온몸 말초 혈관이 굳어 극심한 가을 탈락을 유발합니다.',
          tipEn: 'Chronically activates sympathetic stress system, starving skin roots.'
        }
      ]
    },
    {
      id: 6,
      category: 'protein',
      questionKo: '달걀, 육류, 검은콩, 생선 등 단백질 식사에 대한 만족도는 어떤가요?',
      questionEn: 'How sufficient is your dietary protein intake (eggs, soy, meat)?',
      options: [
        { 
          textKo: '매끼 혹은 하루 한 번 이상 골고루 풍부하게 섭취', 
          textEn: 'Excellent (Balanced protein intake in main meals)', 
          points: 10,
          tipKo: '모발 케라틴 단백질 합성을 위한 기본 아미노산 공급망이 넘치도록 충족됩니다.',
          tipEn: 'Abundantly satisfies amino-acid stores required for keratin synthesis.'
        },
        { 
          textKo: '가끔 챙김 / 영양제 비오틴이나 비타민 위주 보충', 
          textEn: 'Moderate (Rely occasionally on supplements/biotin)', 
          points: 7,
          tipKo: '보충 영양제만으로는 한계가 있으니 실제 식사 내 식품 고유 단백질을 보강하세요.',
          tipEn: 'Supplements are great, but whole-food proteins contain essential amino-acids.'
        },
        { 
          textKo: '인스턴트, 탄수화물, 밀가루 위주 편향 식사', 
          textEn: 'Poor (High carb, processed, minimal whole proteins)', 
          points: 3,
          tipKo: '영양소 우선 분배상 모세혈관 끝 모낭에 보낼 아미노산이 턱없이 부족해 유연 가늘어집니다.',
          tipEn: 'Follicles are low in priority for nutrition, making hair weak when protein-starved.'
        }
      ]
    },
    {
      id: 7,
      category: 'workout',
      questionKo: '체력 증진 목적의 다리 근육 하체 단련 및 유산소 활동 빈도는 어떤가요?',
      questionEn: 'How often do you engage in cardiovascular workouts?',
      options: [
        { 
          textKo: '주 3회 정기적 트레이닝 및 땀 흘리는 유산소', 
          textEn: 'Frequent (3+ times per week, deep aerobic sweat)', 
          points: 10,
          tipKo: '중력에 눌린 체내 정맥혈을 위로 짜 올리고 두피 산소 관류 속도를 기함합니다.',
          tipEn: 'Pumps oxygenated blood up, washing out micro-wastes inside scalp roots.'
        },
        { 
          textKo: '가벼운 산책이나 스트레칭 중심의 생활 속 연계', 
          textEn: 'Light (Mainly gentle walking or home stretchings)', 
          points: 7,
          tipKo: '하지 않는 것보단 나으나 유산소적인 정점 심박수를 이끄는 훈련량 보강을 추천합니다.',
          tipEn: 'Better than sedentary habits but elevation of cardiovascular index is advised.'
        },
        { 
          textKo: '숨쉬기 위주의 비활동성 및 극도의 신체 자제형', 
          textEn: 'Sedentary (Rarely exercise or perform physical action)', 
          points: 3,
          tipKo: '경동맥 모세혈관 순환 정체와 대사 부전으로 하반신 노폐물이 정체되며 두피 상열을 이끕니다.',
          tipEn: 'Slow circulation lets head temperatures run hot while slowing growth metabolism.'
        }
      ]
    },
    {
      id: 8,
      category: 'stress_mgt',
      questionKo: '쌓이는 사회적 분노나 스트레스를 어떻게 정화하시나요?',
      questionEn: 'How do you mostly process mental stress?',
      options: [
        { 
          textKo: '나만의 건전한 독서, 운동, 명상, 보정 취미로 즉시 배출', 
          textEn: 'Healthy venting (Hobbies, reading, meditation, workouts)', 
          points: 10,
          tipKo: '코르티솔 호르몬 축적을 지연해 혈류 긴장을 이완하며 면역 장벽 공격성을 소멸합니다.',
          tipEn: 'Lowers cortisol levels immediately, preventing follicular autoimmune blockages.'
        },
        { 
          textKo: '특별히 없이 담아두거나 속으로 참으며 지연', 
          textEn: 'Internalizing (Suppressing or ignoring daily stressors)', 
          points: 6,
          tipKo: '만성 스트레스는 자율신경계 교란을 조장해 머리로 가는 미세 순환을 차단시킵니다.',
          tipEn: 'Chronic suppression triggers micro-spasms in vessel entries.'
        },
        { 
          textKo: '과음, 과다 야식, 흡연 강도 가속화로 폭발', 
          textEn: 'Unhealthy release (Binge drinking, oversleeping, excessive smoking)', 
          points: 2,
          tipKo: '아세트알데히드 대사 독소가 직접 모낭 줄기세포 에너지를 교란해 가랑비 탈모를 유발합니다.',
          tipEn: 'Toxins directly disrupt follicle stem cells, resulting in accelerated shedding.'
        }
      ]
    },
    {
      id: 9,
      category: 'scalp_care',
      questionKo: '스킨케어처럼 두피 건강을 위해 전용 용품이나 맞춤 도포를 하십니까?',
      questionEn: 'Do you use targeted scalp care products or tonics?',
      options: [
        { 
          textKo: '상태 연계형 지성/건성 샴푸 분리 고집 및 두피 토닉/영양액 사용', 
          textEn: 'Active Care (Differentiated shampoo + anti-loss scalp tonics)', 
          points: 10,
          tipKo: '진정 작용 영양액과 청결 세정이 두피 지질 장벽을 튼튼히 보정해 줍니다.',
          tipEn: 'Targeted cooling tonics soothe local heat and preserve structural skin barriers.'
        },
        { 
          textKo: '일반 마트 대용량 선호하며 크게 구분 없이 수동 사용', 
          textEn: 'Basic (General body/hair shampoos without specific target)', 
          points: 6,
          tipKo: '강한 합성 설페이트 계면활성제가 잔존해 약한 두피를 해칠 수 있습니다.',
          tipEn: 'Standard sulfate detergents can dry out and break weak hair shaft cuticles.'
        },
        { 
          textKo: '린스/팩이 정수리 두피 모공에 항상 닿은 채로 방치 또는 불완전 세척', 
          textEn: 'Impaired (Allow conditioners to touch scalp surface directly)', 
          points: 2,
          tipKo: '린스의 고농축 미세 실리콘 유연제가 모공 숨구멍을 직접 봉쇄하여 두피 질식화를 초래합니다.',
          tipEn: 'Silicones in conditioners clog scalp pores directly, suffocating deep roots.'
        }
      ]
    },
    {
      id: 10,
      category: 'massage',
      questionKo: '손끝 지문이나 지압용 브러시를 이용한 두피 마마사지 빈도는 어떤가요?',
      questionEn: 'How frequently do you massage your scalp?',
      options: [
        { 
          textKo: '매일 샴푸 중 혹은 수면 전 일과 중 1~2분 정기적으로 지합', 
          textEn: 'Daily (1-10 minutes of gentle finger pressure every day)', 
          points: 10,
          tipKo: '두피 진피 세포 기계적 자극이 서브스턴스 P 신호 전달을 촉진해 굵고 단단한 모근을 유치합니다.',
          tipEn: 'Fingertip massage increases hair thickness by stimulating dermal papilla cells.'
        },
        { 
          textKo: '미용실 가거나 가끔 가려울 때 즉흥적으로 하는 수준', 
          textEn: 'Infrequent (Only during salon visits or random scalp itching)', 
          points: 6,
          tipKo: '가급적 아침저녁 빗질 시 정수리 위주 지압을 생활화하시는 루틴을 구축하세요.',
          tipEn: 'Try establishing a daily routine during brushing or before bed.'
        },
        { 
          textKo: '마사지를 전혀 해본 적 없고 판때기처럼 모상 건막이 땅땅히 굳어있음', 
          textEn: 'None (Scalp skin is rigid, tightly bound and hard)', 
          points: 2,
          tipKo: '굳어버린 건막이 주변 측두 정수리 모세동맥 입구를 움켜쥐어 극단적 연모화를 지목합니다.',
          tipEn: 'A rigid muscular layer constricts vessels, accelerating root miniaturization.'
        }
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

  // 평가 점수 요약 및 추천 도출
  const calcScoreResults = () => {
    let totalScore = 0;
    for (let i = 0; i < 10; i++) {
      totalScore += questions[i].options[answers[i]].points;
    }

    let grade: '관리왕' | '안정권' | '주의' | '위험' | '개선 필요' = '안정권';
    let gradeEn: 'Management King' | 'Safe Zone' | 'Caution' | 'Danger' | 'Needs Improvement' = 'Safe Zone';
    let colorClass = 'text-green-600 bg-green-50 border-green-200';
    let summaryKo = '';
    let summaryEn = '';

    if (totalScore >= 90) {
      grade = '관리왕';
      gradeEn = 'Management King';
      colorClass = 'text-emerald-600 bg-emerald-50 border-emerald-200';
      summaryKo = '더 이상 조언해 드릴 단점이 없는 초일류 두피 관리의 달인입니다. 현재 세팅된 건강한 루틴을 그대로 유지하시면 풍성함을 영구 수호하는 데 완벽한 무기가 될 것입니다.';
      summaryEn = 'You are an absolute master of scalp and hair conservation! Maintain this pristine lifestyle to secure thick, robust hair follicles for years to come.';
    } else if (totalScore >= 75) {
      grade = '안정권';
      gradeEn = 'Safe Zone';
      colorClass = 'text-blue-600 bg-blue-50 border-blue-200';
      summaryKo = '탈모 진행성 환경에 대응해 올바른 위생 및 자가 예방 기조를 모범적으로 수호하고 있습니다. 야식 제어나 샴푸 후 찬 바람 건조 수칙 등의 미세 조율만 더해주시면 100점입니다.';
      summaryEn = 'Exemplary efforts! You are managing key parameters properly. Slight adjustments to late-night snacking or hair dryer settings will make your routine perfect.';
    } else if (totalScore >= 60) {
      grade = '주의';
      gradeEn = 'Caution';
      colorClass = 'text-amber-500 bg-amber-50 border-amber-200';
      summaryKo = '일상 속에 일부 좋은 습관을 품고 계시지만, 뜨거운 물 샤워 습관이나 젖은 머리 방착 등 치명적인 나쁜 습관이 두피 수소 장벽을 야금야금 무너뜨려 연모화(가늘어짐)를 가드합니다.';
      summaryEn = 'Several healthy routines are active, but a few critical mistakes (like hot shower water or sleeping with damp hair) are slowly draining your scalp barrier defense.';
    } else if (totalScore >= 40) {
      grade = '위험';
      gradeEn = 'Danger';
      colorClass = 'text-orange-500 bg-orange-50 border-orange-200';
      summaryKo = '불규칙한 수면, 드라이 자극, 단백질 미달 영양 결식 등 탈모 스피드를 극대화하는 촉진 환경에 깊이 노출해 있습니다. 모근 사막화가 탄력을 받기 전에 식습관 및 샤워 태도를 혁신해야 합니다.';
      summaryEn = 'Heavy exposure to hair loss accelerators: high temperature dryer blowing, poor sleep hygiene, and low protein intake. Act aggressively now before follicle roots enter a dormant phase.';
    } else {
      grade = '개선 필요';
      gradeEn = 'Needs Improvement';
      colorClass = 'text-red-500 bg-red-50 border-red-200';
      summaryKo = '두피 건강과 모모 세포 재생을 방해하고 열을 가두는 최악의 가중 환경에 전면 노출 중입니다. 장기적 성모 이탈 가속화가 전개되고 있으니 경각심을 갖고 오늘부터 온디바이스 수식 전환에 기여해야 합니다.';
      summaryEn = 'Critically compromised hair care patterns. Autoimmune stress, heat-trapping washing, and rigid muscle barriers are starving hair cells. Radical lifestyle reconstruction is vital.';
    }

    // 추천 사항 3개 엄선
    const recommendationsKo = [
      '저녁 샴푸 후 드라이 온도를 "찬 바람(냉풍)" 위주로 꼼꼼히 설정해 모근 속 습기 비듬균 완전 차단하기',
      '새벽 밤샘 취침 습관 방어: 밤 11시 전후 멜라토닌 피크 시점에 모발 성장 세포 생장 활성화 유도하기',
      '식염 지합 마사지: 하루 한 번 가르마 입구를 지문 부위로 부드럽고 가볍게 2분간 자극해 혈류 정체 개통하기'
    ];
    const recommendationsEn = [
      'Strictly dry your hair scalp with cold blow options to remove damp bacterial microclimates.',
      'Target consistent sleep schedules before midnight to align cellular renewal peaks.',
      'Slightly press and cycle your fingers across structural hairlines for 2 minutes to restore blood supply.'
    ];

    return {
      totalScore,
      grade: isEn ? gradeEn : grade,
      colorClass,
      summary: isEn ? summaryEn : summaryKo,
      recommendations: isEn ? recommendationsEn : recommendationsKo
    };
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      
      {/* 1) INTRO SCREEN */}
      {step === 'intro' && (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-center focus-target">
          <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {isEn ? 'Hair Habit Score Test' : '머리 습관 점수 테스트'}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {isEn 
                ? 'Check your daily hair washing, drying, eating, and sleeping habits to calculate your lifestyle score from 0 to 100!'
                : '매일 실천하는 샴푸 빈도, 건조 온도, 야식, 수면, 단백질 식습관을 다각도로 분석하여 나의 모발 보존 능력 점수(0~100점)를 관측해 보세요.'}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl max-w-md mx-auto border border-slate-100 text-left text-xs text-slate-500 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              <span>{isEn ? '10 habits mapping, instant score feedback' : '나의 행동 요인 10개 점수 도출'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              <span>{isEn ? 'Drives personalized prevention advice' : '습관별 치명률에 기반한 정밀 감점 연산'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              <span>{isEn ? 'Connects with scalp health guidelines' : '두피 열 차정 및 마사지 행동 지침 매칭'}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setStep('test')}
              className="px-8 py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 mx-auto"
            >
              {isEn ? 'Measure Hair Habits' : '머리 습관 점수 측정 개시하기'}
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
              <span className="text-pink-600 font-extrabold tracking-wider bg-pink-50 px-2 py-0.5 rounded-md">
                Q. {questions[currentIdx].id} / 10
              </span>
              <span className="text-slate-400 font-semibold">{Math.round(((currentIdx + 1) / 10) * 100)}%</span>
            </div>
            
            {/* PROGRESS BAR */}
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-600 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* QUESTION TEXT */}
          <div className="space-y-1.5 min-h-[60px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
              {questions[currentIdx].category.toUpperCase()} ROUTINE
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
                className="w-full text-left p-4 sm:p-5 bg-white hover:bg-pink-50/20 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 hover:text-pink-600 hover:border-pink-300 transition-all shadow-3xs cursor-pointer flex items-center justify-between group"
              >
                <span>{isEn ? opt.textEn : opt.textKo}</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-pink-500 transition-all shrink-0 ml-4" />
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
            
            <span className="text-[10px] text-slate-450 font-mono">HABITS MONITORING CODES</span>
          </div>
        </div>
      )}

      {/* 3) RESULT SCREEN */}
      {step === 'result' && (() => {
        const res = calcScoreResults();
        return (
          <div className="space-y-8 animate-fade-in">
            
            {/* CORE HERO RESULT CARD */}
            <div className="bg-white border border-slate-200/65 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-xs font-bold tracking-tight">
                  <Award className="w-3.5 h-3.5 animate-bounce" />
                  <span>{isEn ? 'Habits Health Index compiled' : '자가 행동 지수 평가 검진 완료'}</span>
                </div>
                <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  {isEn ? 'Your Hair Care Habits Score Sheet' : '나의 머리 관리 습관 성적표'}
                </h2>
              </div>

              {/* ESTIMATED AGE INDICATOR */}
              <div className="relative py-6 max-w-sm mx-auto flex flex-col items-center justify-center">
                <div className="w-44 h-44 rounded-full border-4 border-slate-100 flex flex-col items-center justify-center bg-radial from-pink-50/10 to-transparent shadow-xs">
                  <span className="text-slate-400 text-xs font-bold mb-0.5">{isEn ? 'Habit Score' : '습관 총점'}</span>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-extrabold text-pink-600 font-mono tracking-tighter">
                      {res.totalScore}
                    </span>
                    <span className="text-slate-400 text-sm font-semibold ml-1">/100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{isEn ? 'Points' : '점 수준'}</span>
                </div>

                <div className={`mt-5 px-4 py-1.5 rounded-full border text-xs font-extrabold ${res.colorClass} shadow-3xs`}>
                  {isEn ? 'Action Grade: ' : '체감 행동 등급: '} {res.grade}
                </div>
              </div>

              {/* LIFESTYLE SUMMARY */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-left max-w-2xl mx-auto space-y-2.5">
                <h4 className="font-sans font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                  <Lightbulb className="w-4.5 h-4.5 text-amber-500" />
                  {isEn ? 'Daily Routine Diagnostics Summary' : '생활 습관 원인 요약 조언'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
                  {res.summary}
                </p>
              </div>
            </div>

            {/* HIGH-IMPACT RECOMMENDATIONS CARD */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-6 sm:p-8 shadow-3xs space-y-5">
              <div className="space-y-1 text-left">
                <h3 className="font-sans font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  {isEn ? 'Top 3 Actionable Recommendations' : '머리 건강 보존을 위한 필수 실천 3선'}
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {isEn 
                    ? 'Improve these high-yielding daily routines immediately to see a massive reduction in shedding.'
                    : '이 세 가지 고효율 습관을 보완하는 것만으로 두피의 탈락 주기를 눈에 띄게 개선 및 확장할 수 있습니다.'}
                </p>
              </div>
              <div className="h-px bg-slate-100" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {res.recommendations.map((rec, i) => (
                  <div key={i} className="p-4 rounded-xl border border-pink-100 bg-pink-50/10 space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="inline-flex px-1.5 py-0.5 bg-pink-100 text-[10px] text-pink-700 font-extrabold rounded-md mb-2">
                        Recommendation {i + 1}
                      </span>
                      <p className="text-xs font-semibold text-slate-870 leading-relaxed">
                        {rec}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTION FOOTER CARD */}
            <div className="p-6 bg-slate-50 border border-slate-150 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left space-y-1">
                <h4 className="font-sans font-bold text-slate-850 text-sm flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-emerald-500 animate-pulse" />
                  {isEn ? 'Want to calculate your Scalp Age?' : '나의 실제 두피 나이도 테스트해 보세요!'}
                </h4>
                <p className="text-[11px] text-slate-450 leading-relaxed">
                  {isEn 
                    ? 'Take our Scalp Age diagnostic survey to see how old your scalp acts compared to your real age.'
                    : '가정 유전력 상태, 수면의 지속성, 모발 굵기 등을 반영해 예상 두피 생태 나이를 구체적으로 알아봅니다.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 font-extrabold text-xs rounded-xl shadow-3xs transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {isEn ? 'Re-Test Habits' : '습관 다시 테스트'}
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('scalp-age')}
                  className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs rounded-xl shadow-xs hover:scale-[1.02] transition-all flex items-center justify-center gap-1.5"
                >
                  {isEn ? 'Calculate Scalp Age' : '두피 나이 테스트 하기'}
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

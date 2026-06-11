/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContentTabId } from './types';
import { SEO_ARTICLES_LIST } from './data/seoArticles';
import i18n from './i18n';

export const SEO_METADATA: Record<ContentTabId, { title: string; description: string; keywords: string }> = {
  home: {
    title: '탈모체커 - 사진 2장으로 확인하는 자가 탈모 테스트',
    description: '정수리 사진과 이마 헤어라인 사진 2장을 브라우저 모바일 카메라로 촬영 및 업로드하여 단 30초 만에 현재 탈모 위험도 점수를 자가 체크하세요. 100% 비저장 개인정보 안전 보장.',
    keywords: '탈모자가진단, 탈모체크, 탈모, 정수리탈모, M자탈모, 탈모예방, 탈모테스트, 탈모체커'
  },
  checker: {
    title: '탈모 위험도 정밀 스캔 시작 | 탈모체커',
    description: '정수리 및 앞머리 이마 라인의 고해상도 이미지 전용 대비도 픽셀 분석을 구동합니다. 현재 상태가 양호, 주의, 고위험 상태인지 무상으로 확인하십시오.',
    keywords: '탈모이미지분석, 머리숱검사, 정수리스캔, 이마헤어라인검사, 탈모무료검사'
  },
  symptoms: {
    title: '탈모 초기 증상 5가지 리스트와 셀프 진찰 지식 | 탈모체커',
    description: '하루에 빠지는 머리카락이 100개 이상인가요? 연모화 및 비듬, 두피 열감 등 핵심적인 5개 초기 징후를 알아보고 자간 검진하세요.',
    keywords: '탈모초기증상, 머리카락가늘어짐, 탈락모발개수, 가르마넓어짐, 두피열감'
  },
  prevention: {
    title: '탈모 예방 일상 관리 수칙과 두피 모발 영양 공급 | 탈모체커',
    description: '이른 예방이 치료보다 강력합니다. 올바른 샴푸법, 블랙푸드 섭취 권장, 두피 마사지 요령을 수록한 고품질 가이드를 확인하세요.',
    keywords: '탈모예방, 두피관리, 샴푸법, 미녹시딜, 비오틴효과, 블랙푸드추천'
  },
  causes: {
    title: '탈모 유발 근본 4대 원인과 DHT 호르몬 정보 | 탈모체커',
    description: '유전과 5알파 환원효소의 작용 메커니즘부터 스트레스 유도성 코르티솔 분비 및 영양 결핍 장애가 두피에 미치는 유해성을 분석합니다.',
    keywords: '탈모원인, DHT호르몬, 5알파환원효소, 스트레스성탈모, 원형탈모원인'
  },
  male: {
    title: '남성형 탈모 완벽 가이드 및 처방 치료법 정리 | 탈모체커',
    description: 'M자형 및 정수리 O자형 탈모 진행을 억제하는 공인 의약품(피나스테리드, 두타스테리드)의 실질적인 작용과 이식 모발 기술을 대변합니다.',
    keywords: '남성탈모, M자이마, 아보다트, 프로페시아, 탈모약부작용, 모발이식'
  },
  female: {
    title: '여성형 탈모 크리스마스 트리 양상과 호르몬 수책 | 탈모체커',
    description: '여성 맞춤형 정수리 확산형 가르마 모발 탈락 진단과 임신, 출산 및 갱년기 호르몬 변동에 따른 2-3% 미녹시딜 활용 안전 대책을 수록했습니다.',
    keywords: '여성탈모, 수산형탈모, 출산후탈모, 여자미녹시딜, 엘크라넬, 가르마탈모'
  },
  faq: {
    title: '탈모 오해와 진실 자주 묻는 질문 베스트 6 | 탈모체커',
    description: '모자를 자주 쓰면 머리가 빠지는지, 아침저녁 샴푸 횟수의 효율적 설계, 그리고 탈모 전용 샴푸 복원의 환상과 오해를 완전 해소합니다.',
    keywords: '탈모FAQ, 탈모오해, 매일샴푸, 모자탈모, 탈모약성기능, 휴지기탈모갱신'
  },
  intro: {
    title: '탈모체커 브랜드 소개 및 비장 온디바이스 개발 이념 | 탈모체커',
    description: '의료 지식의 합리적 대중화와 100% 브라우저 메모리 기반 초고속 자체 스캔 탑재로 어떠한 개인 사생활 유출도 없는 안심 서비스입니다.',
    keywords: '탈모체커소개, 온디바이스진단, 개인정보안심테스트, 두피스캐너브랜드'
  },
  privacy: {
    title: '개인정보 처리방침 가이드 (초상 이미지 완전 소각) | 탈모체커',
    description: '수집 또는 저정하는 사용자 머리 사진이 일절 존재하지 않는 무포집 원칙에 대한 대국민 투명성 보증 협약서입니다.',
    keywords: '개인정보처리방침, 탈모체커보안, 이미지서버비전송, 초상권보호'
  },
  terms: {
    title: '서비스 이용약관 및 의학 자문 참고용 한계 고지 | 탈모체커',
    description: '서비스 제공 내역의 목적과 참고 한계, 그리고 이용자와 플랫폼 간의 의무 소재 및 의료 처방 한계 구역을 엄수 전파합니다.',
    keywords: '이용약관, 참고안내서, 면책고지, 탈모진단경고, 피부과의사상담'
  },
  contact: {
    title: '고객지원 및 문의하기 소통 채널 | 탈모체커',
    description: '탈모체커 서비스 이용에 관해 피드백이나 기타 보도, 광고 설치 문의가 있으신 경우 담당자 전자 메일 소통 창구입니다.',
    keywords: '문의하기, 제휴문의, 피드백전달, 고객센터'
  },
  'scalp-age': {
    title: '두피 나이 테스트 | 자가 두피 진단 | 탈모체커',
    description: '10가지 정밀 행동 및 유전형 문항 설문을 통해 나의 예상 두피 생물학적 나이와 상태 등급을 진단하고, 습관별 추천 관리 가이드를 즉시 도출해 보세요.',
    keywords: '두피나이, 두피수준, 두피건강, 탈모유전, 두피상태, 두피테스트'
  },
  'hair-habit': {
    title: '머리 관리 습관 점수 테스트 | 자가 점검 | 탈모체커',
    description: '매일 반복되는 샴푸, 풍건 온도, 야식, 수면, 단백질 식습관 등 10가지 세부 관측 지표를 분석하여 0~100점의 머리 관리 역량 점수 성적표를 확인해 보세요.',
    keywords: '머리습관, 탈모습관, 모발보존점수, 두피열관리, 샴푸습관, 자가측정지수'
  },
  wiki: {
    title: '탈모백과 전체 인덱스 - 총 70편의 고품격 의학 라이브러리 | 탈모체커',
    description: '총 70편의 고품격 탈모 의학 및 생활 상식 칼럼 라이브러리입니다. 모발 성장 주기, 완벽 영양소 공급법, 연령별 증상을 검색하십시오.',
    keywords: '탈모백과, 탈모칼럼, 두피케어 정보, 탈모치료법, 롱테일가이드'
  },
  'article-detail': {
    title: '탈모 의학 정보 상세보기 자문 칼럼 | 탈모체커',
    description: '피부과학 전문 자문단이 기고한 맞춤형 예방 및 치료 지침 글입니다.',
    keywords: '전문탈모칼럼, 두피건강, 의학근거가이드'
  },
  'hair-types': {
    title: '5대 탈모 유형 완벽 가이드 | 남성, 여성, 원형, 지루성, 휴지기 | 탈모체커',
    description: '남성형 안드로겐 탈모, 여성형 정수리 확산형 탈모, 원형탈모, 지루성 탈모 및 일시적 휴지기 탈모의 진행 원인, 부위와 임상 대응 요약을 알기 쉽게 분석 제공합니다.',
    keywords: '탈모유형, 남성형탈모, 여성탈모, 원형탈모증, 지루성탈모, 휴지기탈모, 크리스마스트리탈모'
  }
};

export const SEO_METADATA_EN: Record<ContentTabId, { title: string; description: string; keywords: string }> = {
  home: {
    title: 'Hair Loss Checker - 30-Second Browser Hair Loss Diagnostic Test',
    description: 'Upload just 2 photos (vertex crown and forehead hairline) from your smartphone to scan your current hair loss risk rating. 100% private and secure local processing guaranteed.',
    keywords: 'hair loss test, crown baldness, hairline check, hairline receding, free hair screening, self hair diagnostic'
  },
  checker: {
    title: 'Start Hair Loss Risk Precision Scan | Hair Loss Checker',
    description: 'Run our proprietary local contrast-based image diagnostic on vertex crown partings and hairline hair lines. Free of charge, private, and instant.',
    keywords: 'hair-scanning tool, density tracker, crown diagnostics, local image filter, receding hairline check'
  },
  symptoms: {
    title: '5 Early Warning Signs of Hair Loss & Self-Diagnostic | Hair Loss Checker',
    description: 'Is your daily hair shedding exceeding 100 strands? Discover five early warning signs, including follicle miniaturization, excessive dandruff, and hot scalp, to diagnose yourself early.',
    keywords: 'early baldness signs, thin follicle conversion, shedding counts, crown widening'
  },
  prevention: {
    title: 'Preventative Daily Hair Guidelines & Nourishment | Hair Loss Checker',
    description: 'Prevention is more effective and economical than restoration. Follow our science-backed scalp washing, dietary biotin intake, and cooling massage checklists.',
    keywords: 'hair loss prevention, scalp health washing, minoxidil usage, safe biotin, crown cooling therapies'
  },
  causes: {
    title: '4 Biological Underlying Causes of Hair Loss & DHT Hormone | Hair Loss Checker',
    description: 'Diving deep into genetics, 5-alpha reductase activity, cortisol stress hormones, and nutritional deficiencies that miniaturize healthy hair follicles.',
    keywords: 'underlying causes of hair loss, dihydrotestosterone pathways, genetics pattern loss, chronic stress shedding'
  },
  male: {
    title: 'Male Pattern Balding Guide & Approved Therapies | Hair Loss Checker',
    description: 'The science behind the M-line and vertex O-line recession. Discover the real-world safety profiles of finasteride, dutasteride, topical minoxidil, and follicular transplantation.',
    keywords: 'male pattern baldness, finasteride efficacy, transplant procedures, crown restoration, receding hairline guide'
  },
  female: {
    title: 'Female Pattern Thinning (Christmas Tree Model) & Care | Hair Loss Checker',
    description: 'Analyzing crown widening, postpartum shedding triggers, hormonal shifts during menopause, and female-safe topical minoxidil 2% or 3% solutions.',
    keywords: 'female hair thinning, diffuse hair loss, postpartum shedding, minoxidil for women, crown widening patterns'
  },
  faq: {
    title: 'Dispelling Top 6 Myths and Truths of Hair Loss | Hair Loss Checker',
    description: 'Does wearing hats limit follicle oxygen? Is washing daily harmful? Read our direct answers to common questions about hair health and shampoos.',
    keywords: 'hair myths, shampoo efficacy, daily washing concerns, hat-wearing shedding'
  },
  intro: {
    title: 'Our Mission - Democratizing Hair Health | Hair Loss Checker',
    description: 'Empowering individuals worldwide to monitor hair loss securely and privately using 100% local, sandboxed browser scanning technology.',
    keywords: 'on-device scanning, mission statement, privacy-first checking, scalp health, secure technology'
  },
  privacy: {
    title: 'Privacy Policy - 100% Local Confidentiality | Hair Loss Checker',
    description: 'Establishing our absolute commitment to zero server storage. We do not transmit or store any user portrait photos.',
    keywords: 'privacy policy, data eradication compliance, zero server storage, on-device analysis'
  },
  terms: {
    title: 'Terms of Use & Medical Disclaimer Guidance | Hair Loss Checker',
    description: 'Understanding our platform standards, limits of informational self-scans, and the necessity of clinical dermatologist evaluations.',
    keywords: 'terms of use, clinical warning boundaries, user responsibilities, medical warning disclaimer'
  },
  contact: {
    title: 'Contact Us & Global Partnerships | Hair Loss Checker',
    description: 'Reach out to our engineering, alliance development, and health coordination desk for suggestions or corporate partnerships.',
    keywords: 'contact us, team partnerships, feedback submission, smart health offices'
  },
  'scalp-age': {
    title: 'Scalp Age Test | Biological Scalp Diagnosis | Hair Loss Checker',
    description: 'Answer 10 short clinical-based questions to forecast your biological scalp health age and get personalized, evidence-backed hair preservation advice.',
    keywords: 'scalp age, scalp testing, hair biological age, hair loss heredity, scalp health check'
  },
  'hair-habit': {
    title: 'Hair Care Habits Score Test | Custom Audit | Hair Loss Checker',
    description: 'Audit your daily hair washing, blow-dry heat, late night snacks, sleep patterns, and protein intake to find your wellness habit score out of 100.',
    keywords: 'hair care habits, follicle habits, hair care audit, scalp thermal level, hair health score'
  },
  wiki: {
    title: 'Encyclopedia Index - 70 Volumes of Medical Analysis | Hair Loss Checker',
    description: 'Explore our robust dermatological catalog of 70 articles covering dietary biotin, L-cysteine, androgenic pathways, and scalp care.',
    keywords: 'hair encyclopedia, research papers, hair loss wiki, curated medical columns'
  },
  'article-detail': {
    title: 'Clinical Hair Column Review | Hair Loss Checker',
    description: 'Evidence-backed columns written by leading dermatological advisors and scalp specialists.',
    keywords: 'verified hair column, medical evidence, expert guidelines'
  },
  'hair-types': {
    title: 'Guide to 5 Major Hair Loss Types | Male, Female, Areata, Seborrheic | Hair Loss Checker',
    description: 'Understand the biological pathways, localized areas, and proven FDA-authorized treatments of androgenetic, diffuse female, alopecia areata, seborrheic, and telogen hair loss.',
    keywords: 'hair loss types, alopecia types, male pattern baldness, female pattern thinning, alopecia areata, seborrheic scalp, telogen effluvium'
  }
};

/**
 * Helper to dynamically generate Title Case from kebab-case IDs for long-tail articles
 */
export function getEnglishTitleCase(id: string): string {
  return id
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

/**
 * 활성화된 탭에 맞춰 가상 메타 데이터를 실시간 갱신하는 헬퍼 함수
 */
export function updateSEOMeta(tab: ContentTabId, articleId?: string) {
  const isEn = i18n.language === 'en';
  let meta = isEn
    ? (SEO_METADATA_EN[tab] || SEO_METADATA_EN.home)
    : (SEO_METADATA[tab] || SEO_METADATA.home);

  // 만약 아티클 상세 탭이면서 특정 아티클 ID가 들어온 경우 해당 아티클 정보로 Dynamic Overwrite
  if (tab === 'article-detail' && articleId) {
    const articleMeta = SEO_ARTICLES_LIST.find(item => item.id === articleId);
    if (articleMeta) {
      if (isEn) {
        const engTitle = getEnglishTitleCase(articleId);
        meta = {
          title: `${engTitle} | Hair Loss Checker`,
          description: `Clinical insights and recommendations on ${engTitle.toLowerCase()} backed by dermatological experts.`,
          keywords: articleId.split('-').concat(['hair care', 'scalp check']).join(', ')
        };
      } else {
        meta = {
          title: articleMeta.metaTitle,
          description: articleMeta.metaDesc,
          keywords: [articleMeta.mainKeyword, ...articleMeta.keywords].join(', ')
        };
      }
    }
  }
  
  // 1. Title 업데이트
  document.title = meta.title;

  // 2. Meta Description 업데이트
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', meta.description);

  // 3. Meta Keywords 업데이트
  let keyTag = document.querySelector('meta[name="keywords"]');
  if (!keyTag) {
    keyTag = document.createElement('meta');
    keyTag.setAttribute('name', 'keywords');
    document.head.appendChild(keyTag);
  }
  keyTag.setAttribute('content', meta.keywords);

  // 4. OpenGraph og:title 및 og:description 동적 반영
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', meta.title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', meta.description);

  // 5. hreflang 및 canonical 리서칭 최적화 링크 동적 기입
  updateHreflangTags();

  // 6. Schema.org 구조화데이터 동적 주입 (AdSense EEAT 인증)
  updateStructuredData(tab, articleId);
}

/**
 * Schema.org JSON-LD 구조화 데이터 동적 빌더 및 주입
 */
export function updateStructuredData(tab: ContentTabId, articleId?: string) {
  // 기존 수기 주입된 구조화 데이터 모두 소각하여 최신 메타 유지
  const existing = document.querySelectorAll('script[type="application/ld+json"]');
  existing.forEach(s => s.remove());

  const origin = window.location.origin;
  const isEn = i18n.language === 'en';
  let schema: any = null;

  if (tab === 'home') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": isEn ? "Hair Loss Checker" : "탈모체커",
      "url": origin,
      "description": isEn 
        ? "Evaluate your hair baldness rating using our 100% private locally configured sandbox scanner." 
        : "정수리 가르마 및 헤어라인 사진 2장으로 브라우저 내에서 즉각 판단하는 투명한 자가모발측정.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${origin}/#/wiki?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
  } else if (tab === 'article-detail' && articleId) {
    const article = SEO_ARTICLES_LIST.find(a => a.id === articleId);
    if (article) {
      schema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": article.title,
        "description": article.metaDesc,
        "url": `${origin}/#/article/${articleId}`,
        "lastReviewed": "2026-06-11",
        "mainContentOfPage": {
          "@type": "WebPageElement",
          "cssSelector": ".markdown-body"
        },
        "author": {
          "@type": "Person",
          "name": article.author,
          "jobTitle": "Hair Loss Clinical Biologist"
        },
        "publisher": {
          "@type": "Organization",
          "name": "탈모체커 (Hair Loss Checker)",
          "url": origin,
          "logo": {
            "@type": "ImageObject",
            "url": `${origin}/favicon.ico`
          }
        }
      };
    }
  } else if (tab === 'faq') {
    schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "모자나 헬멧을 자주 착용하면 모공이 짓눌려 탈모가 가속화되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "기본적으로 정밀 검사 결과 모자를 쓴다는 행동 자체만이 모근의 물리적 수용 세포를 파괴하거나 영구 사멸시키지 않습니다. 다만 모자를 지나치게 오래 쓰면 내부의 통풍 기능이 현저히 마비되어 땀과 피지가 정체되고 두피 열감 온도가 고열로 유지되게 만듭니다..."
          }
        },
        {
          "@type": "Question",
          "name": "매일 아침저녁으로 머리를 자주 잘 감으면 그로 인해 더 가속되어 탈모가 유발되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "머리를 감는 수순에 수챗구멍에서 탈락하는 엄청난 모발들은 실상 수명이 다해 이미 모근에서 분리되어 가벼운 터치에도 떨어질 ‘휴지기’ 단계의 죽어 있는 모발들입니다..."
          }
        }
      ]
    };
  } else if (tab === 'hair-types') {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isEn ? "Guide to 5 Major Hair Loss Types" : "5대 대중 탈모 유형 임상 종합 가이드",
      "description": isEn 
        ? "Comparison and medical explanation of Androgenetic, diffuse female, alopecia areata, seborrheic, and telogen hair loss." 
        : "남성형 안드로겐 탈모, 여성형 탈모, 원형 탈모, 지루성 두피 및 휴지기 탈모 비교 대조 연구서.",
      "url": `${origin}/#/hair-types`
    };
  } else {
    schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": isEn ? `${tab.toUpperCase()} Info | Hair Loss Checker` : `${tab} 주요정보안내 | 탈모체커`,
      "url": `${origin}/#/${tab}`
    };
  }

  if (schema) {
    const sc = document.createElement('script');
    sc.type = 'application/ld+json';
    sc.text = JSON.stringify(schema);
    document.head.appendChild(sc);
  }
}

export function updateHreflangTags() {
  const origin = window.location.origin;
  const hash = window.location.hash;

  // ko-KR link alternate
  let koLink = document.querySelector('link[hreflang="ko-KR"]');
  if (!koLink) {
    koLink = document.createElement('link');
    koLink.setAttribute('rel', 'alternate');
    koLink.setAttribute('hreflang', 'ko-KR');
    document.head.appendChild(koLink);
  }
  koLink.setAttribute('href', `${origin}/${hash}`);

  // en-US link alternate
  let enLink = document.querySelector('link[hreflang="en-US"]');
  if (!enLink) {
    enLink = document.createElement('link');
    enLink.setAttribute('rel', 'alternate');
    enLink.setAttribute('hreflang', 'en-US');
    document.head.appendChild(enLink);
  }
  enLink.setAttribute('href', `${origin}/en${hash}`);

  // x-default link alternate
  let xLink = document.querySelector('link[hreflang="x-default"]');
  if (!xLink) {
    xLink = document.createElement('link');
    xLink.setAttribute('rel', 'alternate');
    xLink.setAttribute('hreflang', 'x-default');
    document.head.appendChild(xLink);
  }
  xLink.setAttribute('href', `${origin}/${hash}`);

  // canonical link
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', window.location.href);
}

/**
 * sitemap.xml 문서를 동적으로 캡슐화 포장하여 반환
 */
export function generateSitemapXMLString(): string {
  const baseUrl = window.location.origin;
  const tabs: ContentTabId[] = [
    'home', 'checker', 'scalp-age', 'hair-habit', 'hair-types', 'symptoms', 'prevention', 'causes', 'male', 'female', 'faq', 'intro', 'privacy', 'terms', 'contact', 'wiki'
  ];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  tabs.forEach((tab) => {
    const fallbackTabUrl = `${baseUrl}/#/${tab}`;
    const dateStr = new Date().toISOString().split('T')[0];
    xml += `  <url>\n`;
    xml += `    <loc>${fallbackTabUrl}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${tab === 'home' ? '1.0' : tab === 'checker' ? '0.9' : '0.7'}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 70개 정보성 아티클 전부를 sitemap에 기입하여 검색 엔진 봇에 수집 위세 극대화
  SEO_ARTICLES_LIST.forEach((art) => {
    const artUrl = `${baseUrl}/#/article/${art.id}`;
    const dateStr = new Date().toISOString().split('T')[0];
    xml += `  <url>\n`;
    xml += `    <loc>${artUrl}</loc>\n`;
    xml += `    <lastmod>${dateStr}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });
  
  xml += `</urlset>`;
  return xml;
}

/**
 * robots.txt 문서를 동적으로 캡슐화 포장하여 반환
 */
export function generateRobotsTextString(): string {
  const baseUrl = window.location.origin;
  return `# robots.txt for HairLossChecker (탈모체커)
User-agent: *
Allow: /
Allow: /#/home
Allow: /#/symptoms
Allow: /#/prevention
Allow: /#/causes
Allow: /#/male
Allow: /#/female
Allow: /#/faq
Allow: /#/intro
Allow: /#/wiki
Allow: /#/article/*

Sitemap: ${baseUrl}/sitemap.xml
`;
}

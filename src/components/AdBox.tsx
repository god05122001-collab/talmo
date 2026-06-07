/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface AdBoxProps {
  location: 'result-top' | 'result-bottom' | 'article-middle' | 'article-bottom';
}

export default function AdBox({ location }: AdBoxProps) {
  // 위치별 가상 광고 규격 매칭
  let sizeLabel = '반응형 광고 슬롯 (구글 애드센스 자동 대응)';
  let heightClasses = 'h-24 md:h-28';

  if (location === 'result-top') {
    sizeLabel = 'Result Top | 스폰서 배너 AD (728x90 ∙ 320x100 대응)';
    heightClasses = 'h-20 md:h-24';
  } else if (location === 'result-bottom') {
    sizeLabel = 'Result Bottom | 추천 네트워크 AD (반응형 핏)';
    heightClasses = 'h-24 md:h-32';
  } else if (location === 'article-middle') {
    sizeLabel = 'In-Article AD | 본문 중간 부합 인피드 광고 (반응형)';
    heightClasses = 'h-24 md:h-28';
  } else if (location === 'article-bottom') {
    sizeLabel = 'Article Bottom | 매칭형 기사 하단 AD (300x250 슬라이드 대응)';
    heightClasses = 'h-32 md:h-40';
  }

  return (
    <div className="w-full my-6 animate-fade-in">
      <div className={`relative w-full ${heightClasses} bg-slate-50/40 hover:bg-slate-50 border border-dashed border-slate-200/80 rounded-xl flex flex-col items-center justify-center p-4 transition-all duration-300 overflow-hidden`}>
        {/* 모던하고 미니멀한 AD 레이블 기재 */}
        <span className="absolute top-2 left-3 px-1.5 py-0.5 rounded text-[8px] font-mono font-medium tracking-wide text-slate-400 border border-slate-200/60 bg-white shadow-2xs">
          SPONSOR
        </span>
        
        <div className="text-center">
          <p className="text-[10px] md:text-xs font-mono font-semibold text-slate-400 tracking-tight">
            Google AdSense Slot
          </p>
          <p className="text-[9px] md:text-[10px] text-slate-400/80 mt-1 font-sans">
            {sizeLabel}
          </p>
        </div>

        {/* 미세 데코 라인: 광고가 없어도 세련된 웹 기술 목업처럼 보이게 함 */}
        <div className="absolute inset-0 border-[4px] border-white/40 pointer-events-none rounded-xl" />
      </div>
    </div>
  );
}

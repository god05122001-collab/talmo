/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { Camera, FolderOpen, Trash2, X, AlertCircle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ImagePickerProps {
  id: 'vertex' | 'hairline';
  title: string;
  description: string;
  guideText: string;
  onChange: (file: File | null) => void;
}

export default function ImagePicker({
  id,
  title,
  description,
  guideText,
  onChange,
}: ImagePickerProps) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  // 카메라 전용 입력 엘리먼트 레퍼런스 (모바일은 촬영 우선)
  const cameraInputRef = useRef<HTMLInputElement>(null);
  // 갤러리/PC 파일 첨부 전용 입력 엘리먼트 레퍼런스 (절대 카메라는 안 뜸)
  const galleryInputRef = useRef<HTMLInputElement>(null);
  // 웹캠 비디오 및 캔버스 레퍼런스
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 웹캠 상태 머신
  const [showWebcam, setShowWebcam] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const [webcamError, setWebcamError] = useState<string | null>(null);

  // 모바일 디바이스 감지
  const isMobileDevice = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua) || 
           (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
           (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);
  };

  // 비디오가 마운트될 때 스트림 전달 자동 재생 바인딩
  useEffect(() => {
    if (showWebcam && videoRef.current && webcamStream) {
      videoRef.current.srcObject = webcamStream;
      videoRef.current.play().catch((err) => {
        console.error('Webcam autoplay error:', err);
      });
    }
  }, [showWebcam, webcamStream]);

  // 언마운트 시 미디어 스트림 트랙 자동 전원 파괴 (메모리 릭 방지)
  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [webcamStream]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (validTypes.includes(file.type)) {
        setupFile(file);
      }
    }
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setupFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setupFile(e.target.files[0]);
    }
  };

  const setupFile = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange(file);
  };

  const clearFile = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onChange(null);
    if (cameraInputRef.current) {
      cameraInputRef.current.value = '';
    }
    if (galleryInputRef.current) {
      galleryInputRef.current.value = '';
    }
    stopWebcam();
  };

  // [📷 사진 촬영하기] 핸들러
  const handleCaptureAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // 모바일인 경우 일반 네이티브 환경 카메라 유입
    if (isMobileDevice()) {
      cameraInputRef.current?.click();
    } else {
      // PC인 경우 HTML5 웹캠 즉각 실행 에디션 전개
      startWebcam();
    }
  };

  // [📁 사진 첨부하기] 핸들러 (순수 갤러리 유전형)
  const handleAttachAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    galleryInputRef.current?.click();
  };

  // PC 웹캠 시동 걸기
  const startWebcam = async () => {
    setWebcamError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam API unsupported');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: id === 'hairline' ? 'user' : 'environment',
          width: { ideal: 720 },
          height: { ideal: 720 }
        }
      });
      
      setWebcamStream(stream);
      setShowWebcam(true);
    } catch (err: any) {
      console.warn('Webcam permission denied or unsupported. Fallback to file attach:', err);
      setWebcamError(t('checker.webcam_error_fallback', '카메라를 지원하지 않거나 허용 권한이 거부되어 갤러리 사진 선택으로 자동 전환되었습니다.'));
      
      // 모달/UI에 경고 메세지 점멸 후 자동으로 갤러리 트리거
      setTimeout(() => {
        galleryInputRef.current?.click();
        setWebcamError(null);
      }, 1500);
    }
  };

  // PC 웹캠 실재 촬영 처리
  const captureWebcamSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas && webcamStream) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // 정사각형 비율로 고화질 크롭 캡처 매핑
        const size = Math.min(video.videoWidth, video.videoHeight);
        const startX = (video.videoWidth - size) / 2;
        const startY = (video.videoHeight - size) / 2;

        canvas.width = 600;
        canvas.height = 600;
        
        ctx.drawImage(
          video, 
          startX, startY, size, size, // 비디오 크롭 소스 범위
          0, 0, 600, 600             // 대상 캔버스 맞춤 좌표
        );
        
        canvas.toBlob((blob) => {
          if (blob) {
            const ext = 'jpg';
            const file = new File([blob], `${id}_cam_capture_${Date.now()}.${ext}`, {
              type: 'image/jpeg'
            });
            setupFile(file);
            stopWebcam();
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };

  // PC 웹캠 종료 및 정적 채널 초기화
  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach((track) => track.stop());
      setWebcamStream(null);
    }
    setShowWebcam(false);
  };

  const triggerGallery = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    galleryInputRef.current?.click();
  };

  const triggerCamera = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleCaptureAction(e);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* 1. 헤더 영역 (제목, 설명) */}
      <div className="mb-4">
        <h3 id={`title-${id}`} className="font-sans font-bold text-lg text-slate-900 mb-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block"></span>
          {title}
        </h3>
        <p className="text-xs text-slate-500 leading-normal">{description}</p>
      </div>

      {/* 숨겨진 실제 미디어 인풋 컨트롤 */}
      {/* 모바일 전용 카메라 촬영 (capture="environment") */}
      <input
        id={`camera-input-${id}`}
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        capture="environment"
        onChange={handleCameraChange}
        className="hidden"
      />
      {/* PC 및 갤러리 수동 사진 첨부 */}
      <input
        id={`gallery-input-${id}`}
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg, image/jpg, image/png, image/webp"
        onChange={handleGalleryChange}
        className="hidden"
      />

      {/* 실시간 캡처용 브라우저 가상 캔버스 */}
      <canvas ref={canvasRef} className="hidden" />

      {/* 2. 인터랙티브 드롭존 & 촬영 뷰포트 & 결과 미리보기 */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative flex-1 flex flex-col items-center justify-center min-h-[350px] rounded-xl border-2 border-dashed p-4 transition-all duration-300 ${
          selectedFile
            ? 'border-emerald-500 bg-emerald-50/[0.02]'
            : dragActive
              ? 'border-blue-500 bg-blue-50/20'
              : 'border-slate-200 bg-slate-50/[0.3] hover:border-blue-400'
        }`}
      >
        {/* 에러 발생 배너 */}
        {webcamError && (
          <div className="absolute top-4 left-4 right-4 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-2.5 rounded-lg flex items-start gap-2 z-20 animate-fade-in shadow-xs">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span className="leading-normal font-medium">{webcamError}</span>
          </div>
        )}

        {showWebcam ? (
          /* ========================================================= */
          /* PC 웹캠 라이브 비디오 제어기 활성화 상태                  */
          /* ========================================================= */
          <div className="relative w-full h-full flex flex-col items-center justify-center animate-fade-in">
            <div className="relative w-full max-w-[280px] h-[280px] rounded-2xl overflow-hidden bg-black border border-slate-700 shadow-md">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]" // 거울모드로 편안하게 촬영
              />
              
              {/* 타원 가이드 오버레이 */}
              <div className="absolute inset-0 border-[3px] border-dashed border-white/30 rounded-full m-8 flex items-center justify-center pointer-events-none">
                <div className="w-[12px] h-[12px] bg-red-500 rounded-full animate-ping" />
              </div>

              {/* 안내 문구 배너 */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/85 backdrop-blur-xs py-1.5 px-2.5 rounded-lg text-center pointer-events-none">
                <p className="text-[10px] text-white font-medium">
                  {id === 'vertex' 
                    ? t('checker.vertex_align_desc', '정수리를 가운데 붉은 점에 조준하세요.')
                    : t('checker.hairline_align_desc', '이마와 헤어라인이 다 나오게 조정하세요.')}
                </p>
              </div>
            </div>

            {/* 웹캠 촬영용 전용 제어기 단 */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={captureWebcamSnapshot}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                {t('checker.camera_shoot', '즉시 촬영하기')}
              </button>
              <button
                type="button"
                onClick={stopWebcam}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-all cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                {t('checker.cancel', '취소')}
              </button>
            </div>
          </div>
        ) : previewUrl ? (
          /* ========================================================= */
          /* 업로드 완료 상태 (미리보기 및 명확한 완수 레이블과 액션) */
          /* ========================================================= */
          <div className="relative w-full h-full flex flex-col items-center justify-center py-2 animate-fade-in text-center">
            
            {/* ✅ 업로드 상태 체크 표시 안내 (필수 사양 완수) */}
            <div className="mb-4 bg-emerald-50 border border-emerald-100 rounded-2xl px-5 py-2.5 flex items-center justify-center gap-2 text-emerald-800 text-xs font-extrabold shadow-xs">
              <span className="text-emerald-500 text-sm">✅</span>
              <span>
                {id === 'vertex' ? t('checker.vertex_card', '정수리 가마 영역') : t('checker.hairline_card', '앞이마 헤어라인 영역')} {t('checker.completed_badge', '사진 업로드 완료')}
              </span>
            </div>

            {/* 실제 업로드된 이미지 썸네일 */}
            <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 flex items-center justify-center">
              <img
                src={previewUrl}
                alt={`${title} Preview`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* 원터치 딜리트 코너 액션 */}
              <button
                type="button"
                onClick={clearFile}
                className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-950 text-white transition-all duration-200 z-10 cursor-pointer"
                title={t('checker.delete', '삭제')}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 업로드된 파일의 메타데이터 크기 정보 */}
            <p className="text-[10px] text-slate-400 max-w-[200px] truncate mt-2">
              {selectedFile?.name || 'captured_photo.jpg'}
            </p>

            {/* 3대 핵심 후속 버튼부 (다시 촬영, 다른 사진 첨부, 삭제) */}
            <div className="mt-5 flex flex-col gap-2 w-full max-w-[210px]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  id={`re-camera-${id}`}
                  type="button"
                  onClick={triggerCamera}
                  className="flex items-center justify-center gap-1.5 px-2 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border border-blue-200/60 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  <Camera className="w-3 h-3 text-blue-500" />
                  {t('checker.re_take', '다시 촬영')}
                </button>
                <button
                  id={`re-gallery-${id}`}
                  type="button"
                  onClick={triggerGallery}
                  className="flex items-center justify-center gap-1.5 px-2 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-bold rounded-lg transition-all cursor-pointer"
                >
                  <FolderOpen className="w-3 h-3 text-slate-500" />
                  {t('checker.attach_other', '다른 사진 첨부')}
                </button>
              </div>
              
              <button
                id={`delete-${id}`}
                type="button"
                onClick={() => clearFile()}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-100 text-xs font-bold rounded-lg transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t('checker.delete', '삭제')}
              </button>
            </div>

          </div>
        ) : (
          /* ========================================================= */
          /* 업로드 대기 상태 (촬영 가이드, 예시 이미지, 2대 수단 명확 배정) */
          /* ========================================================= */
          <div className="flex flex-col items-center text-center w-full">
            
            {/* 직관적 예시 가이드 묘사 */}
            <div className="mb-4">
              <span className="inline-block text-[10px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-2.5 py-0.5 mb-2.5 uppercase tracking-wider">
                {t('checker.recommended_guide', '권장 등록 기준 가이드')}
              </span>
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-blue-500">
                {id === 'vertex' ? (
                  // 정수리 핀포인트 벡터 가이드
                  <svg className="w-16 h-16 text-blue-500/80" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                    <path d="M32 10c-12 0-20 10-20 22s8 22 20 22 20-10 20-22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="32" cy="32" r="4.5" fill="currentColor" className="animate-pulse" />
                    <path d="M32 18c-2 3-2 6 0 9M29 22c3-1 6-1 9 0M30 38c2 2.5 5 2.5 7 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : (
                  // 헤어라인 정밀 벡터 가이드
                  <svg className="w-16 h-16 text-blue-500/80" viewBox="0 0 64 64" fill="none">
                    <path d="M32 6C17.5 6 6 17.5 6 32c0 9.5 5.5 19 13.5 23.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                    <path d="M44.5 55.5C52.5 51 58 41.5 58 32c0-14.5-11.5-26-26-26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
                    <path d="M16 26c4-8 10-10 16-4 6-6 12-4 16 4M14 36c4 0 6-3 8-6M50 36c-4 0-6-3-8-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M22 42h20M24 47h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* 안내 텍스트 */}
            <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed mb-5">
              {t('checker.drag_drop_desc', '스마트폰 카메라도 바로 작동을 보장하며, 드래그 앤 드롭 파일 첨부도 잘 호환됩니다.')}
            </p>

            {/* 양대산맥 버튼 레이아웃 기획 */}
            <div className="w-full max-w-[270px] space-y-3">
              
              {/* 방법 1: 카메라로 바로 촬영 */}
              <div className="text-left animate-fade-in">
                <span className="block text-[10px] text-blue-600 font-extrabold mb-1">
                  {t('checker.method_1', '방법 1 : 카메라로 바로 촬영')}
                </span>
                <button
                  id={`camera-trigger-${id}`}
                  type="button"
                  onClick={handleCaptureAction}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white text-xs font-extrabold py-3.5 px-4 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer ring-4 ring-blue-500/10"
                >
                  <Camera className="w-4 h-4 shrink-0" />
                  {t('checker.photo_shoot', '사진 촬영하기')}
                </button>
              </div>

              {/* 방법 2: 갤러리에서 사진 첨부 */}
              <div className="text-left animate-fade-in">
                <span className="block text-[10px] text-slate-500 font-extrabold mb-1">
                  {t('checker.method_2', '방법 2 : 갤러리에서 사진 첨부')}
                </span>
                <button
                  id={`gallery-trigger-${id}`}
                  type="button"
                  onClick={handleAttachAction}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 hover:text-slate-900 border border-slate-200 text-xs font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4 shrink-0 text-slate-500" />
                  {t('checker.photo_attach', '사진 첨부하기')}
                </button>
              </div>

            </div>

          </div>
        )}
      </div>
      
    </div>
  );
}

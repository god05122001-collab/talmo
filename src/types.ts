/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AnalysisStatus = 'idle' | 'analyzing' | 'completed';

export interface ImageUploadState {
  file: File | null;
  previewUrl: string | null;
}

export interface DetailedAnalysis {
  score: number; // 0 to 50
  status: 'good' | 'warn' | 'danger'; // 양호, 주의, 고위험
  metrics: {
    label: string;
    ratio: number; // 0 to 100
    status: 'good' | 'warn' | 'danger';
    valueText: string;
  }[];
}

export interface AnalysisResult {
  vertex: DetailedAnalysis;    // 정수리 분석
  hairline: DetailedAnalysis;  // 헤어라인 분석
  totalScore: number;          // 0 to 100
  totalStatus: 'good' | 'warn' | 'danger'; // 양호, 주의, 고위험
  analyzedAt: string;
}

export type ContentTabId =
  | 'home'
  | 'checker'
  | 'symptoms'
  | 'prevention'
  | 'causes'
  | 'male'
  | 'female'
  | 'faq'
  | 'intro'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'wiki'
  | 'article-detail'
  | 'scalp-age'
  | 'hair-habit'
  | 'hair-types';

export interface ForumFAQ {
  q: string;
  a: string;
  category: string;
}

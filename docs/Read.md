# README.md - UNIHAIR 미용샵 랜딩페이지 프로젝트

## 📋 개요

**UNIHAIR** 미용샵의 트렌디하고 전환 중심적인 랜딩페이지 프로젝트입니다. 신규/기존 고객의 온라인 예약을 극대화하고, 브랜드 신뢰감과 프리미엄 이미지를 전달합니다.

- **라이브 URL**: (배포 후 입력)
- **기술 스택**: React/Next.js + Tailwind CSS + TypeScript + Firebase/Node.js
- **빌더**: v0 (Vercel) 기반 생성 시작
- **예상 론칭**: 2025년 12월

---

## 🎯 핵심 목표

1. **예약 전환율 12% 이상** 달성
2. **모바일 체험 만족도 95%** 이상 확보
3. **SNS 유입 비율 35%** 달성
4. **초기 로딩 2초 이내**, Lighthouse 90점 이상

---

## ✨ 주요 기능

- **히어로 섹션**: 브랜드 로고, 매장 대표 이미지, 가치 제안 명확
- **서비스 소개**: 컷/컬러/펌/케어 등 시술별 설명 및 이미지
- **예약 시스템**: 간편 온라인 폼, 이메일/카톡 알림
- **실고객 리뷰**: 네이버/카카오/인스타 리뷰 및 SNS 링크
- **전문가 소개**: 원장/스타일리스트 프로필 및 포트폴리오
- **FAQ & 이벤트**: 자주 묻는 질문, 할인/프로모션 안내
- **지도 연동**: 구글/네이버 지도, 주소, 연락처
- **반응형 디자인**: 모든 기기에 최적화(모바일·태블릿·데스크톱)

---

## 📁 프로젝트 구조

```
unihair-landing/
├── src/
│   ├── components/     # React 컴포넌트
│   ├── pages/          # 페이지 라우팅
│   ├── styles/         # CSS 스타일
│   ├── data/           # 정적 데이터 (JSON)
│   ├── utils/          # 유틸리티 함수
│   └── public/         # 정적 자산 (이미지, 폰트)
├── api/                # 백엔드 API (예약, 이메일 등)
├── docs/               # 추가 문서
├── tests/              # 테스트 코드
├── PRD.md              # 제품 요구사항 문서
├── TODO.md             # 작업 체크리스트
├── Mermaid.md          # 다이어그램
└── DIR.md              # 디렉토리 구조

자세한 내용은 DIR.md 참조.
```

---

## 🚀 시작하기

### 1. 환경 셋업

```bash
# 저장소 클론
git clone https://github.com/your-org/unihair-landing.git
cd unihair-landing

# 의존성 설치
npm install

# .env 파일 설정 (.env.example 참조)
cp .env.example .env.local
```

### 2. 개발 서버 실행

```bash
npm run dev
# 브라우저에서 http://localhost:3000 접속
```

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

---

## 📖 주요 문서

| 문서 | 설명 |
|------|------|
| [PRD.md](./PRD.md) | 전체 제품 요구사항(비전, 목표, 기능 등) |
| [TODO.md](./TODO.md) | 작업 체크리스트 및 마일스톤 |
| [Mermaid.md](./Mermaid.md) | 사용자 여정, 플로우, 아키텍처 다이어그램 |
| [DIR.md](./DIR.md) | 프로젝트 디렉토리 구조 및 파일 설명 |
| [docs/DESIGN_GUIDE.md](./docs/DESIGN_GUIDE.md) | 디자인 가이드(컬러, 폰트, 컴포넌트) |
| [docs/SETUP.md](./docs/SETUP.md) | 로컬 개발 환경 상세 설정 |
| [docs/API_DOCS.md](./docs/API_DOCS.md) | 백엔드 API 명세 |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | 배포 가이드 |

---

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: #F8E8E0 (라이트 핑크)
- **Secondary**: #8B6C63 (브라운)
- **Accent**: #E9C9B8 (베이지)
- **Background**: #FFFFFF (화이트)
- **Text**: #333333 (다크 그레이)

### 폰트
- **Heading**: Pretendard Bold, 28-36px
- **Body**: Pretendard Regular, 14-16px
- **Caption**: Pretendard Light, 12px

### 레이아웃
- **Max-width**: 1200px
- **Grid**: 12 컬럼 시스템
- **Spacing**: 8px 베이스 유닛

---

## 🧪 테스트

```bash
# 단위 테스트
npm run test:unit

# 통합 테스트
npm run test:integration

# E2E 테스트
npm run test:e2e

# 전체 테스트
npm test
```

---

## 📊 성능 최적화

- **이미지**: WebP 포맷, 동적 로딩, lazy loading
- **번들**: Code splitting, 트리 셰이킹
- **캐싱**: CDN 캐싱, 브라우저 캐싱
- **SEO**: 메타 태그, Schema.org 마크업, 사이트맵

**목표 성과**:
- Lighthouse Performance: 90+
- Core Web Vitals: Good
- 초기 로딩: 2초 이내

---

## 🔗 배포

### Vercel (권장)
```bash
npm install -g vercel
vercel
# 프롬프트 따라 배포
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

자세한 내용은 [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) 참조.

---

## 📈 분석 & 모니터링

- **Google Analytics 4**: 사용자 행동, 이벤트 추적
- **Facebook Pixel**: 전환 추적
- **Hotjar (선택)**: 히트맵, 세션 분석

---

## 🤝 기여 가이드

1. `develop` 브랜치에서 `feature/기능명` 브랜치 생성
2. 코드 작성 및 테스트 (npm test)
3. PR 작성 및 리뷰 요청
4. 승인 후 merge
5. `main` 에 PR 후 배포

**커밋 컨벤션**:
```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 포맷팅 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드, 의존성 등 기타
```

---

## 🐛 버그 리포팅

[Issues](https://github.com/your-org/unihair-landing/issues) 탭에서 버그를 보고해주세요.

**버그 리포팅 템플릿**:
- 현상 설명
- 재현 방법
- 예상 동작
- 스크린샷/동영상
- 환경(OS, 브라우저)

---

## 📞 문의 & 지원

- **PM**: [PM 이메일]
- **개발팀**: [개발팀 이메일]
- **Slack**: #unihair-landing

---

## 📜 라이센스

Copyright © 2025 UNIHAIR. All rights reserved.

---

## 📝 변경 이력

### v1.0.0 (2025-12-27) - 초기 론칭
- 기본 랜딩페이지 구현
- 예약 시스템 통합
- 실고객 리뷰 노출
- 모바일 최적화

### v1.1.0 (예정)
- 실시간 채팅 상담 추가
- 스타일리스트별 일정 예약
- 리뷰 작성 기능

---

**마지막 업데이트**: 2025-11-17
**관리자**: [담당자 이름]

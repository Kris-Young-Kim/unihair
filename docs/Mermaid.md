# Mermaid.md - UNIHAIR 랜딩페이지 다이어그램

## 1. 사용자 여정 맵 (User Journey Map)

```mermaid
graph TD
    A["🔍 인식 단계 (Awareness)"] --> B["SNS/지도검색에서<br/>유니헤어 발견"]
    B --> C["🌐 탐색 단계 (Consideration)"]
    C --> D["랜딩페이지 방문"]
    D --> E["서비스·리뷰·후기<br/>살펴보기"]
    E --> F{"관심 있음?"}
    
    F -->|Yes| G["📝 예약 단계 (Booking)"]
    F -->|No| H["이탈"]
    
    G --> I["예약 폼 작성"]
    I --> J["✅ 예약 확인"]
    J --> K["📧 이메일/카톡<br/>알림 수신"]
    K --> L["🛍️ 경험 단계 (Experience)"]
    L --> M["매장 방문<br/>시술 받음"]
    M --> N["⭐ 공유 단계 (Advocacy)"]
    N --> O["SNS·리뷰<br/>공유/등록"]
    O --> P["새로운 고객<br/>유입 증대"]
```

## 2. 페이지 구조 및 섹션 흐름 (Page Structure)

```mermaid
graph TD
    A["🏠 Header (GNB)"] --> B["영역 1: Hero Section<br/>로고·비주얼·가치제안·CTA"]
    B --> C["영역 2: Services<br/>컷/컬러/펌/케어 카드"]
    C --> D["영역 3: Expert Profile<br/>원장/스타일리스트"]
    D --> E["영역 4: Reviews & SNS<br/>실고객 후기·링크"]
    E --> F["영역 5: FAQ<br/>자주묻는질문"]
    F --> G["영역 6: Events/Promo<br/>이벤트·할인안내"]
    G --> H["영역 7: Map & Location<br/>지도·주소·연락처"]
    H --> I["🔗 Footer<br/>개인정보보호·이용약관·SNS"]
```

## 3. 예약 플로우 (Booking Flow)

```mermaid
sequenceDiagram
    participant User as 사용자
    participant FE as Frontend
    participant API as Backend API
    participant Email as Email Service
    participant Kakao as Kakao API
    
    User->>FE: ① 예약 버튼 클릭
    FE->>FE: 예약 폼 팝업/모달 표시
    
    User->>FE: ② 정보 입력<br/>(이름·번호·서비스·날짜/시간)
    FE->>FE: ③ 입력값 검증
    
    alt 검증 실패
        FE->>User: 오류 메시지 표시
    else 검증 성공
        FE->>API: ④ POST /api/booking
        API->>API: ⑤ DB에 예약 저장
        API->>Email: ⑥ 확인 이메일 발송
        API->>Kakao: ⑦ 카톡 알림 발송
        API->>FE: ⑧ 성공 응답
        FE->>User: ⑨ 예약 완료 메시지<br/>+ 확인 번호 표시
    end
```

## 4. 시스템 아키텍처 (System Architecture)

```mermaid
graph LR
    subgraph Client["📱 클라이언트"]
        A["React 앱<br/>(v0 생성)"]
    end
    
    subgraph CDN["🚀 배포"]
        B["Vercel/Netlify<br/>(정적 호스팅)"]
    end
    
    subgraph Backend["⚙️ 백엔드"]
        C["Node.js/Express<br/>또는 Firebase"]
        D["PostgreSQL/MongoDB<br/>(DB)"]
    end
    
    subgraph Third_Party["🔗 외부 서비스"]
        E["Google Analytics"]
        F["Facebook Pixel"]
        G["Email Service"]
        H["Kakao API"]
        I["Google Maps"]
    end
    
    A -->|예약 데이터| B
    B -->|API 호출| C
    C -->|CRUD| D
    C -->|이메일 발송| G
    C -->|카톡 알림| H
    B -->|추적 코드| E
    B -->|추적 코드| F
    A -->|지도 로드| I
```

## 5. 컴포넌트 계층도 (Component Hierarchy)

```mermaid
graph TD
    A["App (루트)"]
    
    A --> B["Header/Navigation"]
    A --> C["HeroSection"]
    A --> D["ServicesGrid"]
    A --> E["ExpertProfile"]
    A --> F["ReviewCarousel"]
    A --> G["FAQAccordion"]
    A --> H["EventsBanner"]
    A --> I["LocationMap"]
    A --> J["BookingModal"]
    A --> K["Footer"]
    
    J --> J1["Form Component"]
    J1 --> J1A["Input Field"]
    J1 --> J1B["Select/Dropdown"]
    J1 --> J1C["DateTimePicker"]
    J1 --> J1D["SubmitButton"]
    
    D --> D1["ServiceCard"]
    D1 --> D1A["Image"]
    D1 --> D1B["Title"]
    D1 --> D1C["Description"]
    
    F --> F1["ReviewCard"]
    F1 --> F1A["Avatar"]
    F1 --> F1B["Rating"]
    F1 --> F1C["Text"]
```

## 6. 반응형 디자인 브레이크포인트 (Responsive Design)

```mermaid
graph LR
    A["📱 Mobile<br/>< 640px"]
    B["📱 Tablet<br/>640px - 1024px"]
    C["🖥️ Desktop<br/>> 1024px"]
    
    A --> A1["싱글 컬럼<br/>풀 너비"]
    B --> B1["2 컬럼 그리드<br/>좌우 패딩"]
    C --> C1["3+ 컬럼 그리드<br/>최대 너비 제한"]
    
    A --> A2["폼: 전체 스택<br/>터치 친화적"]
    B --> B2["폼: 2단 레이아웃"]
    C --> C2["폼: 3단 레이아웃"]
```

## 7. SEO & 분석 연동 (SEO & Analytics)

```mermaid
graph TD
    A["랜딩페이지 배포"]
    
    A --> B["🔍 SEO"]
    B --> B1["메타 태그<br/>title, description"]
    B --> B2["Schema.org<br/>구조화된 데이터"]
    B --> B3["Google Search<br/>Console 등록"]
    
    A --> C["📊 Analytics"]
    C --> C1["Google Analytics 4<br/>이벤트 추적"]
    C --> C2["Facebook Pixel<br/>전환 추적"]
    C --> C3["Heatmap<br/>사용자 행동"]
    
    C1 --> D["예약 클릭"]
    C1 --> E["폼 제출"]
    C1 --> F["페이지 체류시간"]
    C1 --> G["이탈률"]
```

## 8. 배포 및 모니터링 (Deployment & Monitoring)

```mermaid
graph LR
    A["로컬 개발"]
    B["Git Repository<br/>(GitHub/GitLab)"]
    C["CI/CD Pipeline<br/>(GitHub Actions)"]
    D["Staging<br/>테스트 배포"]
    E["Production<br/>라이브 배포"]
    F["Monitoring<br/>& Alerting"]
    
    A -->|Commit| B
    B -->|Trigger| C
    C -->|Build & Test| D
    D -->|Manual Approve| E
    E --> F
    F -->|버그 감지| A
```

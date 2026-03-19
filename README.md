# Ziggle FE

Ziggle 공지 플랫폼의 프론트엔드 레포지토리입니다.

## Tech Stack

| Category          | Library                             |
| ----------------- | ----------------------------------- |
| Framework         | React 19                            |
| Language          | TypeScript                          |
| Bundler           | Vite                                |
| Package Manager   | Bun                                 |
| Routing           | TanStack Router                     |
| Server State      | TanStack Query                      |
| Client State      | Zustand                             |
| Styling           | Tailwind CSS v4                     |
| i18n              | i18next                             |
| API Client        | openapi-fetch + openapi-react-query |
| Rich Text Editor  | TinyMCE                             |
| Component Catalog | Storybook                           |
| Analytics         | Amplitude                           |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.x 이상

### Environment Variables

환경 변수는 Infisical에서 관리합니다. Notion의 **Ziggle Frontend** 페이지에서 접속 방법을 확인하거나, 팀원에게 접근 권한을 요청하세요.

`.env.local` 파일을 생성하고 아래 변수를 설정하세요. `.env.example`을 참고하세요.

```env
SWAGGER_USER=
SWAGGER_PASSWORD=

VITE_IDP_CLIENT_ID=
VITE_IDP_REDIRECT_URI=
VITE_IDP_AUTHORIZE_URL=
VITE_IDP_TOKEN_URL=
VITE_API_BASE_URL=
VITE_CHATBOT_WIDGET_KEY=
VITE_AMPLITUDE_API_KEY=
```

### Install & Run

```bash
bun install
bun run dev
```

## Scripts

| Command             | Description                                                 |
| ------------------- | ----------------------------------------------------------- |
| `bun run dev`       | 개발 서버 실행                                              |
| `bun run build`     | 프로덕션 빌드                                               |
| `bun run preview`   | 빌드 결과물 미리보기                                        |
| `bun run check`     | Prettier 포맷 + ESLint 자동 수정                            |
| `bun run lint`      | ESLint 검사                                                 |
| `bun run format`    | Prettier 검사                                               |
| `bun run test`      | 테스트 실행                                                 |
| `bun run gen:api`   | Swagger에서 API 타입 자동 생성 (`src/@types/api-schema.ts`) |
| `bun run storybook` | Storybook 개발 서버 실행                                    |

## i18n (국제화)

한국어(`ko`)와 영어(`en`)를 지원하며, [i18next](https://www.i18next.com)와 [i18next-cli](https://github.com/i18next/i18next-cli)를 사용합니다.

번역 파일은 `public/locales/{language}/{namespace}.json`에 위치합니다.

### 사용법

컴포넌트에서 `useTranslation`으로 네임스페이스를 지정한 뒤 `t('key')` 형태로 사용합니다.

```tsx
const { t } = useTranslation('notice');
t('title');
```

### 주요 명령어

```bash
# 번역 키 추출 + TypeScript 타입 생성 (개발 중 watch 권장)
bun run gen:i18n

# 번역 키 추출만
bun run i18n:extract

# TypeScript 타입 생성만
bun run i18n:types

# 번역 상태 확인 (누락된 키 파악)
bun run i18n:status

# 언어 파일 동기화
bun run i18n:sync

# 하드코딩된 문자열 검사
bun run i18n:lint
```

## Project Structure

```text
src/
├── @types/            # 전역 타입 (api-schema, i18next)
├── common/            # 피처 간 공유 코드
│   ├── components/    # 공용 컴포넌트
│   │   ├── ui/        # 프리미티브 컴포넌트 (Button, Loading, Toggle …)
│   │   ├── layout/    # 레이아웃 컴포넌트 (Footer …)
│   │   └── shared/    # 앱 컨텍스트를 사용하는 복합 컴포넌트
│   ├── lib/           # 라이브러리 설정 (api, i18n, dayjs …)
│   ├── utils/         # 유틸 함수
│   └── const/         # 공용 상수
├── features/          # 도메인별 피처 모듈
│   ├── auth/
│   ├── landing/
│   ├── notice/
│   └── write/
├── routes/            # 파일 기반 라우트 정의
└── routeTree.gen.ts   # TanStack Router 자동 생성 파일
```

각 피처는 아래 구조를 따릅니다.

```text
features/<name>/
├── models/       # API 응답 타입, 데이터 변환
├── viewmodels/   # 상태 관리, 쿼리, 비즈니스 로직
├── views/        # UI 컴포넌트, 페이지
└── index.ts      # 외부에 공개할 항목만 re-export
```

### Architecture

MVVM + 피처 기반 아키텍처를 따릅니다.

- **View → ViewModel → Model** 방향으로만 의존합니다.
- View는 Model을 직접 참조하지 않습니다.
- 피처 외부에서 내부 파일을 직접 import하지 않고 `index.ts`를 통해 접근합니다.
- API 스키마 타입(`@/@types/api-schema`)은 모델 파일과 `src/common/lib/api.ts`에서만 직접 import합니다.

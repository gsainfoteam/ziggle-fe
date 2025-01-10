# Ziggle Frontend

엄청난 역사를 지닌 지글 프론트엔드 레포지토리를 방문해주신 여러분, 환영합니다

## Project Structure

```
.
├── public
│   ├── .well-known: 앱 링크를 위한 파일
│   └── tinymce: wysiwyg editor
└── src
    ├── api: 앱 내부에서 호출하는 api. fetch를 통해 호출
    │   ├── auth
    │   ├── image
    │   ├── log
    │   ├── notice
    │   └── tag
    ├── app
    │   ├── [lng]: 지글의 모든 화면은 이 디렉토리 밑에 있습니다
    │   │   ├── (group): ziggle groups 관련 (분리 후 제거 예정)
    │   │   │   └── group    
    │   │   ├── (with-page-layout): Header, Footer, Toast Layout이 있는 페이지들
    │   │   │   ├── (with-sidebar-layout): Sidebar가 있는 페이지들
    │   │   │   │   ├── [category]
    │   │   │   │   └── notice
    │   │   │   │       └── [id] 
    │   │   │   └── (without-sidebar-layout): Sidebar가 없는 페이지들
    │   │   │       ├── mypage
    │   │   │       └── search
    │   │   ├── (without-page-layout): Header, Footer, Toast Layout이 없는 페이지들
    │   │   │   ├── app: /[lng]/app - 앱 설치 페이지 리다이렉션
    │   │   │   └── login: /[lng]/login - 로그인 페이지 리다이렉션
    │   │   └── (write): 사이드바가 없고, 상단바가 있는 글쓰기 화면
    │   │       └── write: /[lng]/write
    │   ├── api
    │   │   ├── auth: nextauth를 사용하여 인증을 처리
    │   │   │   └── [...nextauth]
    │   │   ├── bff: ziggle-backend와 통신하는 api. proxy 역할
    │   │   │   └── [...ziggle]
    │   │   ├── notice: 직접 ziggle-backend와 통신하는 api (deprecated)
    │   │   │   └── [noticeId]
    │   │   │       ├── [contentId]
    │   │   │       │   └── foreign
    │   │   │       ├── additional
    │   │   │       └── full
    │   │   ├── og: open graph image를 생성하는 api
    │   │   ├── vapor-bff
    │   │   │   └── [...ziggle]
    │   │   └── ziggle
    │   │       └── [...proxy]
    │   ├── components: 여러 곳에서 공통적으로 쓰이는 컴포넌트
    │   │   ├── layout: 레이아웃에 쓰이는 컴포넌트
    │   │   │   ├── Footer
    │   │   │   ├── Navbar
    │   │   │   ├── NavbarWrite
    │   │   │   └── Sidebar
    │   │   └── shared: 레이아웃에 쓰이지 않고 공통적으로 쓰이는 컴포넌트
    │   │       ├── Analytics
    │   │       ├── Button
    │   │       ├── LoadingCatAnimation
    │   │       ├── Pagination
    │   │       ├── Tags
    │   │       ├── Toggle
    │   │       └── Zabo
    │   └── i18next: 다국어 지원을 위한 설정
    │       └── locales
    │           ├── en
    │           └── ko
    ├── assets: 이미지, 폰트, 아이콘 등의 정적 파일
    │   ├── animations: lottie 애니메이션
    │   ├── fonts
    │   ├── icons
    │   └── logos
    └── mock: 개발 환경(storybook)에서 사용하는 mock 데이터
```

### 몇가지 알아두면 좋은 점

#### Next.js

지글은 Next.js의 app directory 구조를 따르고 있습니다.
이 때문에 각 컴포넌트(페이지)는 Client Component와 Server Component로
나눠지게 됩니다

각각은 [각자의 특성](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)을 가지고 있습니다.

- Client Component: 클라이언트에서 hydrate되는 컴포넌트
- Server Component: 서버에서 렌더링되는 컴포넌트 (hydration이 필요 없음)

#### i18next

지글은 다국어 지원을 위해서 i18next를 사용하고 있습니다.
`src/app/i18next/locales` 디렉토리에 각 언어별 폴더로 json 파일을 만들어서
다국어를 지원하고 있습니다.

자세한 json 파일 작성법은 i18next 문서를 참고해주세요.

Server Component에서는 `const {t} = await createTranslation()`을,
Client Component에서는 `const {t} = useTranslation`을 사용해야 합니다.
서버와 클라이언트에서 동일한 번역을 사용하기 위해서 파라미터로 받은 `lng`를
각 함수의 인수로 넘겨주어야 합니다.

#### auth

지글은 NextAuth를 사용하여 인증을 처리하고 있습니다.
`src/api/auth` 디렉토리에 NextAuth의 설정 파일이 있습니다.

별도로 설정 값을 바꿀 필요는 없이 token refresh, access token 등의 정보가 모두
세션에 담겨 있습니다.

- `session.user.studentNumber`
- `session.user.uuid`
- `session.accessToken`

Server Component에서는 `const session = await auth()`로 인증정보를 가져올 수 있고,
Client Component에서는 `const { data: session } = useSession()`으로 인증정보를
가져올 수 있습니다.

## .env

기본적으로 제공되는 `.env` 파일은 localhost:3000으로 개발 서버를 열 때
사용 가능한 파일입니다.

이외에 두가지 환경변수가 추가로 필요합니다
- `NEXTAUTH_SECRET`
- `IDP_CLIENT_SECRET`

이 두가지 환경변수를 `.env.local` 파일에 작성하시면 버전 관리에 tracking
되지 않고 편하게 사용하실 수 있습니다.

`NEXTAUTH_SECRET`는 `openssl rand -base64 128`과 같은 명령어로 생성한 랜덤한
문자열이면 되고, `IDP_CLIENT_SECRET`은 infisical에서 `ziggle2023` client의
secret값을 받아오실 수 있습니다.

## Install & Run

<details>
  <summary>yarn berry를 사용하고 있습니다</summary>
  - zero-install X
  - node-modules linker
  - `.yarnrc.yml` 파일 참고
</details>

```bash
yarn install
yarn dev
```

## Test

Playwright를 이용하여 E2E 테스트를 진행하고 있습니다.

```bash
yarn playwright test // 모든 테스트 실행
yarn playwright test --ui // 테스트 콘솔 UI 실행
```

## Misc

해당 프로젝트는 `.gitattributes` 파일에서 eol 설정을 `lf`로 하고 있습니다.
만약에 이미지 파일과 같은 바이너리 파일을 추가하는 경우에는, 해당 파일에 대해서
`*.png binary`와 같은 설정을 해주셔야 의도치 않은 결과를 막을 수 있습니다.



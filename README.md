# GIST Infoteam Frontend Template

## 구성 요소

### React

- React: <https://reactjs.org/>

### TypeScript

- TypeScript: <https://www.typescriptlang.org/>

저희가 사용하는 TypeScript 설정은 3가지 입니다.

- `tsconfig.json`: 기본이 되는 파일로, 기본적으로 이 파일에 기반해서 타입 검사를 합니다. `src` 내부의 내용을 검사합니다. 자주 사용되는 타입을 저장하는 폴더인 `@types`에 alias가 설정되어 잇습니다.
- `tsconfig.node.json`: `tsconfig.json`을 확장해서 `vite.config.ts` 를 검사하도록 설정이 포함되어 있습니다.
- `tsconfig.eslint.json`: `tsconfig.json`을 확장한 eslint용 설정 파일입니다. `node_modules`를 제외하고 실제 컴파일은 하지 않도록 되어있습니다.

### Styled-Component

- CSS MDN: <https://developer.mozilla.org/ko/docs/Web/CSS>
- Styled-Component: <https://styled-components.com/>

저희는 스타일 시트 제작에 기본적인 CSS와 Styled-Component를 사용합니다.

### Yarn

저희는 Yarn 3.XX 버전을 사용합니다. 타입스크립트 플러그인을 켜두었기 때문에, `yarn add` 명령어 입력시 별도의 `@types` 패키지를 입력할 필요가 없습니다.

### Prettier, ESLint

- Prettier: <https://prettier.io/>
- ESlint: <https://eslint.org>

포맷터와 린터(문법 오류 검출기)입니다. 두 설정의 충돌을 방지하기 위해, 둘을 통합해주는 플러그인 사용 중입니다.

그 외 적용된 플러그인들은 다음과 같습니다.

- react: JSX 문법 감지 및 수정
- react-hooks: react의 hook 사용과 관련된 문법 오류 감지.
- simple-import-sort: import 문 정리

### Vite

- Vite : <https://vitejs.dev/>

저희가 SPA를 위해 사용하는 번들러는 Vite 입니다. 4.XX 버전을 사용합니다. 다음 파일들에 설정이 나눠져 있습니다.

- `vite.config.ts`: vite 설정과 플러그인 설정들을 관리하는 파일입니다.
- `src/vite-env.d.ts`: vite 플러그인들의 타입 설정 등을 로드합니다.
- `src/env.d.ts`: `.env` 파일에서 관리하는 환경변수들의 타입을 지정합니다. 자세한 건 아래 환경변수 관리 문단을 참고해주세요.

#### 환경변수 관리

Vite에서 제공하는 환경변수 이외에도 `.env` 파일을 통해 환경변수를 코드로 지정할 수 있습니다. `dotenv`를 통해서 말이죠. Vite에서 제공하는 환경변수를 포함해서 이 변수들은 `import.meta.env.환경변수명`으로 TS 파일 내에서 접근이 가능합니다. 보안상, Vite는 커스텀 환경변수 중에서 `VITE_`로 시작하는 변수들만 지원합니다.
저희가 사용하는 파일은 3가지 입니다. 이를 통해 테스트 API 서버 도메인 관리 같은 걸 더 쉽게 할 수 있습니다.

- `.env.development`: 로컬 개발 모드에서 사용되는 파일입니다.
- `.env.staging`: 스테이징 개발(내부 테스트용)에서 사용되는 파일입니다.
- `.env.production`: 실제 제품 배포에 활용되는 환경변수 입니다.

#### CORS

매번 IP가 바뀔 수 있는 로컬 개발 특성상, 그 IP를 Allow origin에 추가해달라는 건 굉장히 귀찮습니다. 저희는 프록시를 사용합니다.

`env.development` 파일에 있는 문자열을 감지해서 그걸 치환하는 방식으로 프록시가 설정되어 있습니다.

#### 사용하는 vite 플러그인

- `react`: react 컴포넌트를 감지하고 HMR을 가능하게 합니다.
- `vite-tsconfig-paths`: vite 자체 alias 기능을 `tsconfig`와 연동해서 별도 설정이 필요없게 합니다.
- `vite-plugin-checker`: 타입스크립트 경고와 eslint 경고를 vite에서 띄워 줍니다.
- `vite-plugin-svgr`: svg 파일을 react 컴포넌트 처럼 쓸 수 있게 해줍니다. 혹시 svg 관련 타입 에러가 뜨면 `yarn` 후에 VS Code를 재시작 해주세요.

### i18n

- `react-i18next` : <https://react.i18next.com/>

외국인 이용객이 생길 수도 있으므로, [i18n](https://ko.wikipedia.org/wiki/%EA%B5%AD%EC%A0%9C%ED%99%94%EC%99%80_%EC%A7%80%EC%97%AD%ED%99%94)을 지원하는 형태로 제작하였습니다.

- 왜 `*.json`이 아니라 `*.ts`로 만들었나요?: 주석을 사용할 수 있습니다. 그리고 양이 많지 않으면 `index.ts`에서 바로 작성가능하기도 하고

`src/locales`에 각 언어별 폴더를 만들고, 같은 object 형식으로 작성하면 됩니다. 새로 추가된 파일이 있거나 새로 추가해야 되는 언어가 있으면 복사해서 다른 언어 폴더로 붙여넣읍시다.

이후 공식 문서를 참고해서 사용하면 됩니다. `App.tsx`에 예시가 있습니다.

## 새 프로젝트 만들기

### CLI

```shell
npm install -g degit
```

degit은 Git 저장소에서 커밋 기록을 제외한 나머지를 쉽게 다운 받게 해줍니다.

```shell
degit https://github.com/gsainfoteam/Infoteam-frontend-template.git <프로젝트 이름>
```

### Github Template

이 프로젝트는 깃헙 템플릿 저장소로 만들어져 있기 때문에, 다른 프로젝트를 만드는 템플릿으로 활용이 가능합니다. 저장소 주소 옆에, `Use this template`을 클릭하고 `Create a new repository`를 클릭합시다.

## 실행하기

- 개발서버 실행

  ```shell
  yarn run dev
  ```

- 빌드하기

  빌드환경에서 환경변수 `VITE_MODE` 를 미리 지정해주세요. 인포팀에서 테스트용으로 쓸 `staging`과 실제 제품 배포에 활용되는 `production`모드가 있습니다.

  ```shell
  yarn run build
  ```
  
- 프리뷰
  
  빌드 된 제품이 어떻게 보일지 볼 수 있습니다. 빌드 이후에 실행해 주세요.

  ```shell
  yarn run preview
  ```

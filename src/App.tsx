import "./App.css";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { ReactComponent as ReactLogo } from "./assets/react.svg";

const ReadTheDocs = styled.p`
  color: #888;
`;

function App() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation("main");

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src="/src/assets/react.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <ReadTheDocs>
        {t("title")}
        <ReactLogo width={16} height={16} />
      </ReadTheDocs>
    </div>
  );
}

export default App;

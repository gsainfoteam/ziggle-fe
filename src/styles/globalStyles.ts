import { createGlobalStyle } from "styled-components";

import colorSet from "./colorSet";

const GlobalStyle = createGlobalStyle`
    * {
    ::-moz-selection { /* Code for Firefox */
        background: ${colorSet.secondary};
      }
      
      ::selection {
        background: ${colorSet.secondary};
      }
}
`;

export default GlobalStyle;

import { createGlobalStyle } from "styled-components";

import colorSet from "./colorSet";

const GlobalStyle = createGlobalStyle`
    * {
    ::-moz-selection { /* Code for Firefox */
        background: ${colorSet.primary}20;
      }
      
      ::selection {
        background: ${colorSet.primary}20;
      }

      -moz-box-orient: none;
}
`;

export default GlobalStyle;

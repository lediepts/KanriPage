/* eslint-disable react-hooks/rules-of-hooks */

import { createGlobalStyle } from "styled-components";

const fontFamily: string = [
  "EB Garamond",
  "ヒラギノ角ゴ Pro W3",
  "Hiragino Kaku Gothic Pro",
  "メイリオ",
  "Meiryo",
  "verdana",
  "Osaka",
  "ＭＳ Ｐゴシック",
  "MS PGothic",
  "Sans-Serif",
].join(", ");

export const GlobalStyle = createGlobalStyle`
  :root {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    letter-spacing: 0.03em;
    font-family: ${fontFamily};
    background-color: white;
    box-sizing:border-box;
    font-size:14px;
  }
  ::selection {
    color: inherit;
    background:bisque;
  }
`;

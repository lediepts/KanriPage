import ReactHtmlParser from "react-html-parser";
export const nodeParser = (s: string | undefined) => {
  if (!s) return null;
  return ReactHtmlParser(s);
};

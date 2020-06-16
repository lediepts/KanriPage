export const scrollToElement = (
  event?: React.MouseEvent<any>,
  selector?: string
) => {
  const anchor =
    event && selector
      ? (
          (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector(selector)
      : document.querySelector("body");

  if (anchor) {
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

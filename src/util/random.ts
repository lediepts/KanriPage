// eslint-disable-next-line import/prefer-default-export
export function random() {
  return Math.random()
    .toString(36)
    .substring(2)
}

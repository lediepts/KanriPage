export type URLParam = {
  add?: any;
  edit?: any;
};

export function parse(search: string): URLParam {
  const params = new URLSearchParams(search);

  const add = params.get("add");
  const edit = params.get("edit");

  return {
    add: add,
    edit: edit,
  };
}

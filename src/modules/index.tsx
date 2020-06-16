import ui, { UI, UIAction } from "./ui";
import news, { NewsState, NewsAction } from "./news";
import { AnyAction } from "redux";

export type RootState = {
  ui: UI;
  news: NewsState;
};
export type Status =
  | "INITIAL"
  | "NEED_TO_REFRESH"
  | "LOADING"
  | "COMPLETE"
  | "ERROR";

export type AllActions = ValueOf<UIAction> | ValueOf<NewsAction>;

export type Reducer<TStateSlice, TAction> = (
  slicedState: DeepReadonly<TStateSlice> | undefined,
  action: TAction,
  rootState?: DeepReadonly<RootState> | undefined
) => DeepReadonly<TStateSlice>;

/**
 * 最も根幹となる reducer.
 *
 * @param state Root state
 * @param action 全アクションが渡ってくる
 */
export const rootReducer: Reducer<RootState, AnyAction> = function (
  state,
  action
) {
  return {
    ui: ui(state && state.ui, action as ValueOf<UIAction>, state),
    news: news(state && state.news, action as ValueOf<NewsAction>, state),
  };
};

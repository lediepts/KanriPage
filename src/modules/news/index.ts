import { Reducer } from "..";
import { NewsState, News } from "./state";

export * from "./state";

export type NewsAction = {
  REFRESH: {
    type: "NEWS.REFRESH";
  };
  EDIT: {
    type: "NEWS.EDIT";
    payload: boolean;
  };
  UPDATE: {
    type: "NEWS.UPDATE";
  };
  SetNewsEditting: {
    type: "NEWS.NewsEditting";
    payload: News;
  };
};

const reducer: Reducer<NewsState, ValueOf<NewsAction>> = function (
  news = {
    newslist: [],
    APIGetNewsStatus: "NEED_TO_REFRESH",
  },

  action
) {
  switch (action.type) {
    case "NEWS.REFRESH": {
      return {
        ...news,
        APIGetNewsStatus: "NEED_TO_REFRESH",
      };
    }
    case "NEWS.EDIT": {
      const { payload: isEdit } = action;
      if (!isEdit)
        return {
          ...news,
          isEdit,
          newsEditting: {},
        };
      return {
        ...news,
        isEdit,
      };
    }
    case "NEWS.UPDATE": {
      return {
        ...news,
        APIUpdateNewsStatus: "NEED_TO_REFRESH",
      };
    }
    case "NEWS.NewsEditting": {
      const { payload: newsEditting } = action;
      return {
        ...news,
        newsEditting,
      };
    }

    default: {
      return news;
    }
  }
};
export default reducer;

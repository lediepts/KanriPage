/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import produce from "immer";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useAPI } from "../../../hooks";
import { RootState } from "../../../modules";
import { baseURL } from "../../../App";
import _ from "lodash";
import { News } from "../../../modules/news";

export default function newsGetAPI() {
  const store = useStore();
  useEffect(() => store.appendReducer(reducer), [store]);

  useAPI(
    ({ ui: { user }, news: { APIGetNewsStatus } }) => ({
      APIGetNewsStatus,
      user,
    }),
    (dispatch) => async ({ APIGetNewsStatus, user }) => {
      if (APIGetNewsStatus !== "NEED_TO_REFRESH" || !user) {
        return;
      }

      dispatch({
        type: "GET_NEWS.Loading",
      });

      await axios
        .get(`${baseURL}/api/news/all`)
        .then(function (response) {
          if (response.data.success) {
            dispatch({
              type: "GET_NEWS.Complete",
              payload: response.data.data,
            });
          } else {
            dispatch({
              type: "GET_NEWS.Error",
              payload: response.data.message,
            });
          }
        })
        .catch(function (error) {
          dispatch({
            type: "GET_NEWS.Error",
            payload: error,
          });
        });
    }
  );
  return null;
}

export type Action = {
  Loading: {
    type: "GET_NEWS.Loading";
  };

  Complete: {
    type: "GET_NEWS.Complete";
    payload: News[];
  };

  Error: {
    type: "GET_NEWS.Error";
    payload: any;
  };
};

export const reducer = produce((draft: RootState, action: ValueOf<Action>) => {
  switch (action.type) {
    case "GET_NEWS.Loading": {
      draft.news.APIGetNewsStatus = "LOADING";

      return;
    }

    case "GET_NEWS.Complete": {
      const data = action.payload;
      draft.news.APIGetNewsStatus = "COMPLETE";
      draft.news.newslist = _.reverse(_.sortBy(data, "updated_at"));
      return;
    }

    case "GET_NEWS.Error": {
      draft.news.APIGetNewsStatus = "ERROR";
      return;
    }

    default: {
      return;
    }
  }
});

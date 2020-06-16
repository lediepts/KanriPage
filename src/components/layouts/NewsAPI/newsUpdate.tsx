/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import produce from "immer";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { baseURL } from "../../../App";
import { useAPI } from "../../../hooks";
import { RootState } from "../../../modules";
import { random } from "../../../util";

export default function update() {
  const store = useStore();
  useEffect(() => store.appendReducer(reducer), [store]);

  useAPI(
    ({
      ui: { user },
      news: { APIUpdateNewsStatus, isEdit, newsEditting },
    }) => ({
      APIUpdateNewsStatus,
      user,
      newsEditting,
      isEdit,
    }),
    (dispatch) => async ({
      APIUpdateNewsStatus,
      user,
      newsEditting,
      isEdit,
    }) => {
      if (APIUpdateNewsStatus !== "NEED_TO_REFRESH" || !user) {
        return;
      }

      dispatch({
        type: "UPDATE_NEWS.Loading",
      });

      if (isEdit) {
        await axios
          .patch(`${baseURL}/api/news/update/${newsEditting?.id}`, newsEditting)
          .then(function (response) {
            if (response.data.success) {
              dispatch({
                type: "UPDATE_NEWS.Complete",
              });
            } else {
              dispatch({
                type: "UPDATE_NEWS.Error",
                payload: response.data.message,
              });
            }
          })
          .catch(function (error) {
            dispatch({
              type: "UPDATE_NEWS.Error",
              payload: error,
            });
          });
      } else {
        await axios
          .post(`${baseURL}/api/news/add`, newsEditting)
          .then(function (response) {
            if (response.data.success) {
              dispatch({
                type: "UPDATE_NEWS.Complete",
              });
            } else {
              dispatch({
                type: "UPDATE_NEWS.Error",
                payload: response.data.message,
              });
            }
          })
          .catch(function (error) {
            dispatch({
              type: "UPDATE_NEWS.Error",
              payload: error,
            });
          });
      }
    }
  );
  return null;
}

export type Action = {
  Loading: {
    type: "UPDATE_NEWS.Loading";
  };

  Complete: {
    type: "UPDATE_NEWS.Complete";
  };

  Error: {
    type: "UPDATE_NEWS.Error";
    payload: any;
  };
};

export const reducer = produce((draft: RootState, action: ValueOf<Action>) => {
  switch (action.type) {
    case "UPDATE_NEWS.Loading": {
      draft.news.APIUpdateNewsStatus = "LOADING";

      return;
    }

    case "UPDATE_NEWS.Complete": {
      draft.news.APIUpdateNewsStatus = "COMPLETE";
      draft.news.APIGetNewsStatus = "NEED_TO_REFRESH";
      draft.news.newsEditting = undefined;
      draft.ui.messages.push({
        key: random(),
        type: "success",
        message: "Updated success",
      });

      return;
    }

    case "UPDATE_NEWS.Error": {
      draft.news.APIUpdateNewsStatus = "ERROR";

      draft.ui.messages.push({
        key: random(),
        message: "エラーが発生しました。",
        type: "error",
      });

      return;
    }

    default: {
      return;
    }
  }
});

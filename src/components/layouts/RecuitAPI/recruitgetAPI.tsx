/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import produce from "immer";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useAPI } from "../../../hooks";
import { RootState } from "../../../modules";
import { Recruit } from "../../../modules/ui";
import { baseURL } from "../../../App";
import _ from "lodash";

export default function recruitGetAPI() {
  const store = useStore();
  useEffect(() => store.appendReducer(reducer), [store]);

  useAPI(
    ({ ui: { recruitGetAPIStatus, user } }) => ({
      recruitGetAPIStatus,
      user,
    }),
    (dispatch) => async ({ recruitGetAPIStatus, user }) => {
      if (recruitGetAPIStatus !== "NEED_TO_REFRESH" || !user) {
        return;
      }

      dispatch({
        type: "GET_AUCENT.Loading",
      });

      await axios
        .get(`${baseURL}/api/recruit/all`)
        .then(function (response) {
          if (response.data.success) {
            dispatch({
              type: "GET_AUCENT.Complete",
              payload: response.data.data,
            });
          } else {
            dispatch({
              type: "GET_AUCENT.Error",
              payload: response.data.message,
            });
          }
        })
        .catch(function (error) {
          dispatch({
            type: "GET_AUCENT.Error",
            payload: error,
          });
        });
    }
  );
  return null;
}

export type Action = {
  Loading: {
    type: "GET_AUCENT.Loading";
  };

  Complete: {
    type: "GET_AUCENT.Complete";
    payload: Recruit[];
  };

  Error: {
    type: "GET_AUCENT.Error";
    payload: any;
  };
};

export const reducer = produce((draft: RootState, action: ValueOf<Action>) => {
  switch (action.type) {
    case "GET_AUCENT.Loading": {
      draft.ui.recruitGetAPIStatus = "LOADING";

      return;
    }

    case "GET_AUCENT.Complete": {
      const data = action.payload;
      draft.ui.recruitGetAPIStatus = "COMPLETE";
      draft.ui.recruit = _.reverse(_.sortBy(data, "updated_at"));
      return;
    }

    case "GET_AUCENT.Error": {
      draft.ui.recruitGetAPIStatus = "ERROR";
      return;
    }

    default: {
      return;
    }
  }
});

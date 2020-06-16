/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import produce from "immer";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { useAPI } from "../../../hooks";
import { RootState } from "../../../modules";
import { User } from "../../../modules/ui";
import { baseURL } from "../../../App";

export default function userGetAPI() {
  const store = useStore();
  useEffect(() => store.appendReducer(reducer), [store]);

  useAPI(
    ({ ui: { userGetAPIStatus, user } }) => ({
      userGetAPIStatus,
      user,
    }),
    (dispatch) => async ({ userGetAPIStatus, user }) => {
      if (userGetAPIStatus !== "NEED_TO_REFRESH" || user?.role !== "admin") {
        return;
      }

      dispatch({
        type: "GET_USER.Loading",
      });

      await axios
        .get(`${baseURL}/user/all`)
        .then(function (response) {
          if (response.data.success) {
            dispatch({
              type: "GET_USER.Complete",
              payload: response.data.data,
            });
          } else {
            dispatch({
              type: "GET_USER.Error",
              payload: response.data.message,
            });
          }
        })
        .catch(function (error) {
          dispatch({
            type: "GET_USER.Error",
            payload: error,
          });
        });
    }
  );
  return null;
}

export type Action = {
  Loading: {
    type: "GET_USER.Loading";
  };

  Complete: {
    type: "GET_USER.Complete";
    payload: User[];
  };

  Error: {
    type: "GET_USER.Error";
    payload: any;
  };
};

export const reducer = produce((draft: RootState, action: ValueOf<Action>) => {
  switch (action.type) {
    case "GET_USER.Loading": {
      draft.ui.userGetAPIStatus = "LOADING";

      return;
    }

    case "GET_USER.Complete": {
      const data = action.payload;
      draft.ui.userGetAPIStatus = "COMPLETE";
      draft.ui.listUser = data;
      return;
    }

    case "GET_USER.Error": {
      draft.ui.userGetAPIStatus = "ERROR";
      return;
    }

    default: {
      return;
    }
  }
});

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
    ({ ui: { recruitUpdateAPIStatus, user, recruitEditting, isEdit } }) => ({
      recruitUpdateAPIStatus,
      user,
      recruitEditting,
      isEdit,
    }),
    (dispatch) => async ({
      recruitUpdateAPIStatus,
      user,
      recruitEditting,
      isEdit,
    }) => {
      if (recruitUpdateAPIStatus !== "NEED_TO_REFRESH" || !user) {
        return;
      }

      dispatch({
        type: "UPDATE_AUCENT.Loading",
      });
      if (isEdit) {
        console.log("object");
        await axios
          .patch(
            `${baseURL}/api/recruit/update/${recruitEditting?._id}`,
            recruitEditting
          )
          .then(function (response) {
            if (response.data.success) {
              dispatch({
                type: "UPDATE_AUCENT.Complete",
              });
            } else {
              dispatch({
                type: "UPDATE_AUCENT.Error",
                payload: response.data.message,
              });
            }
          })
          .catch(function (error) {
            dispatch({
              type: "UPDATE_AUCENT.Error",
              payload: error,
            });
          });
      } else {
        await axios
          .post(`${baseURL}/api/recruit/add`, recruitEditting)
          .then(function (response) {
            if (response.data.success) {
              dispatch({
                type: "UPDATE_AUCENT.Complete",
              });
            } else {
              dispatch({
                type: "UPDATE_AUCENT.Error",
                payload: response.data.message,
              });
            }
          })
          .catch(function (error) {
            dispatch({
              type: "UPDATE_AUCENT.Error",
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
    type: "UPDATE_AUCENT.Loading";
  };

  Complete: {
    type: "UPDATE_AUCENT.Complete";
  };

  Error: {
    type: "UPDATE_AUCENT.Error";
    payload: any;
  };
};

export const reducer = produce((draft: RootState, action: ValueOf<Action>) => {
  switch (action.type) {
    case "UPDATE_AUCENT.Loading": {
      draft.ui.recruitUpdateAPIStatus = "LOADING";

      return;
    }

    case "UPDATE_AUCENT.Complete": {
      draft.ui.recruitUpdateAPIStatus = "COMPLETE";
      draft.ui.recruitEditting = undefined;
      draft.ui.recruitGetAPIStatus = "NEED_TO_REFRESH";
      draft.ui.recruitEditting = undefined;
      draft.ui.messages.push({
        key: random(),
        type: "success",
        message: "Updated success",
      });
      return;
    }

    case "UPDATE_AUCENT.Error": {
      draft.ui.recruitUpdateAPIStatus = "ERROR";
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

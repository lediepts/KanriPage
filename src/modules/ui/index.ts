import { Color } from "@material-ui/lab/Alert";
import { Reducer } from "..";
import { UI, User, Recruit } from "./state";
import { random } from "../../util";

export * from "./state";

export type UIAction = {
  SetTitle: {
    type: "UI.User";
    payload: User;
  };
  GETIP: {
    type: "UI.GETIP";
    payload: string;
  };
  REFRESH: {
    type: "UI.REFRESH";
  };
  EDIT: {
    type: "UI.EDIT";
    payload: boolean;
  };
  UPDATE: {
    type: "UI.UPDATE";
  };
  SetRecruits: {
    type: "UI.Recruits";
    payload: Recruit[];
  };
  SetRecruitEditting: {
    type: "UI.RecruitEditting";
    payload: Recruit;
  };
  SetUsers: {
    type: "UI.Users";
    payload: User[];
  };
  AddMessage: {
    type: "UI.AddMessage";
    payload: {
      type: Color;
      message: string;
    };
  };

  RemoveMessage: {
    type: "UI.RemoveMessage";
    payload: string;
  };
};

const reducer: Reducer<UI, ValueOf<UIAction>> = function (
  ui = {
    title: "",
    recruit: [],
    messages: [],
    listUser: [],
    userGetAPIStatus: "NEED_TO_REFRESH",
    userUpdateAPIStatus: "INITIAL",
    recruitGetAPIStatus: "NEED_TO_REFRESH",
    recruitUpdateAPIStatus: "INITIAL",
    user: undefined,
  },
  action
) {
  switch (action.type) {
    case "UI.GETIP": {
      const { payload: ipClient } = action;
      return {
        ...ui,
        ipClient,
      };
    }

    case "UI.User": {
      const { payload: user } = action;
      return {
        ...ui,
        user,
      };
    }
    case "UI.REFRESH": {
      return {
        ...ui,
        userGetAPIStatus: "NEED_TO_REFRESH",
        recruitGetAPIStatus: "NEED_TO_REFRESH",
      };
    }
    case "UI.EDIT": {
      const { payload: isEdit } = action;
      if (!isEdit)
        return {
          ...ui,
          isEdit,
          recruitEditting: {},
        };
      return {
        ...ui,
        isEdit,
      };
    }
    case "UI.UPDATE": {
      return {
        ...ui,
        recruitUpdateAPIStatus: "NEED_TO_REFRESH",
      };
    }
    case "UI.Recruits": {
      const { payload: recruit } = action;
      return {
        ...ui,
        recruit,
      };
    }
    case "UI.RecruitEditting": {
      const { payload: recruitEditting } = action;
      return {
        ...ui,
        recruitEditting,
      };
    }
    case "UI.Users": {
      const { payload: listUser } = action;
      return {
        ...ui,
        listUser,
      };
    }
    case "UI.AddMessage": {
      const { payload: message } = action;
      return {
        ...ui,
        messages: [
          ...ui.messages,
          {
            key: random(),
            ...message,
          },
        ],
      };
    }

    case "UI.RemoveMessage": {
      const { payload: key } = action;
      return {
        ...ui,
        messages: ui.messages.filter((m) => m.key !== key),
      };
    }

    default: {
      return ui;
    }
  }
};
export default reducer;

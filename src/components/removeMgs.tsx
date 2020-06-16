/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RemoveMessage() {
  const arrayMess = useSelector((state) => state.ui.messages);
  const Dispatch = useDispatch();
  useEffect(() => {
    if (arrayMess) {
      setTimeout(
        () =>
          arrayMess.forEach((val) => {
            if (val.key)
              Dispatch({
                type: "UI.RemoveMessage",
                payload: val.key,
              });
          }),
        8000
      );
    }
  }, [Dispatch, arrayMess]);
  return null;
}

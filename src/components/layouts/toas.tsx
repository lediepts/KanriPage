import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import MessageBar from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translate(-50%,0%)",
      zIndex: 2000,
      width: "300px",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    messageBar: {
      animation: "toas ease-out",
      animationDuration: "300ms",
      height: "50px",
    },
  })
);

export default function Toas() {
  // MAX 3 莉ｶ縺ｾ縺ｧ縺励°陦ｨ遉ｺ縺励↑縺・
  const messages = useSelector((state) => state.ui.messages.slice(-3));
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {messages.map(({ key, type, message }) => (
        <MessageBar
          key={key}
          variant="filled"
          severity={type}
          color={type}
          className={classes.messageBar}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                dispatch({
                  type: "UI.RemoveMessage",
                  payload: key,
                });
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </MessageBar>
      ))}
    </div>
  );
}

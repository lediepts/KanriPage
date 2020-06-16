import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { nodeParser } from "../util/parserHTML";

interface Dialog {
  open: boolean;
  title: string | "";
  textContent: string | "";
  handleClose: () => void;
  handleClickOK: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiDialog-scrollPaper": {
        width: "100vw",
      },
      "& .MuiDialog-paperWidthSm": {
        width: 500,
        padding: 10,
      },
    },
  })
);

export default function ConfimDialog({
  open,
  handleClose,
  handleClickOK,
  textContent,
  title,
}: Dialog) {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{nodeParser(textContent)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickOK} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { nodeParser } from "../util/parserHTML";

interface Dialog {
  open: boolean;
  textContent: string | "";
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiDialog-scrollPaper": {
        width: "100vw",
      },
      "& .MuiDialog-paperWidthSm": {
        maxWidth: "80vw",
        width: "80vw",
        padding: 10,
      },
      "& .MuiDialogContent-root": {
        minHeight: 100,
        border: "1px solid red",
      },
    },
  })
);

export default function ViewHTMLModal({
  open,
  handleClose,
  textContent,
}: Dialog) {
  const classes = useStyles();
  return (
    <div>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>DEMO</DialogTitle>
        <DialogContent>{nodeParser(textContent)}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

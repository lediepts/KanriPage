/* eslint-disable react-hooks/rules-of-hooks */
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    },
    input: {
      display: "none",
    },
    media: {},
  })
);
interface Props {
  onChangeFile?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function imageUpload({ onChangeFile }: Props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container justify="center" alignItems="center">
        <input
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={onChangeFile}
        />
        <label htmlFor="contained-button-file">
          <Fab
            component="span"
            //   className={classes.button}
          >
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </Grid>
    </React.Fragment>
  );
}

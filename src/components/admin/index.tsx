/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "../../hooks";
import MainCard from "./mainCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      width: "98%",
      margin: "10px auto",
    },
    column: {
      width: "50%",
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

export default function index() {
  const classes = useStyles();
  const recruit = useSelector((s) => s.ui.recruit);
  const newslist = useSelector((s) => s.news.newslist);
  const { history } = useRouter();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            {recruit && (
              <MainCard
                title="Recruit"
                handleClick={() => {
                  history.push("/admin/recruit");
                }}
              >
                <Typography variant="h6" component="p">
                  Total of boards recorded : <strong>{recruit?.length}</strong>
                </Typography>
                <Typography variant="h6" component="p">
                  Last Updated :{" "}
                  <span>
                    {dayjs(recruit[0]?.updated_at)
                      .format("YYYY年MM月DD日 HH:mm")
                      .toUpperCase()}
                  </span>
                </Typography>
              </MainCard>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} elevation={0}>
            {newslist && (
              <MainCard
                title="News"
                handleClick={() => {
                  history.push("/admin/news");
                }}
              >
                <Typography variant="h6" component="p">
                  Total of boards recorded : <strong>{newslist?.length}</strong>
                </Typography>
                <Typography variant="h6" component="p">
                  Last Updated :{" "}
                  <span>
                    {dayjs(newslist[0]?.updated_at)
                      .format("YYYY年MM月DD日 HH:mm")
                      .toUpperCase()}
                  </span>
                </Typography>
              </MainCard>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

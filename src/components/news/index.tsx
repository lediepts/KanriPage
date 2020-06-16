/* eslint-disable react-hooks/rules-of-hooks */
import { orange, blue } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../App";
import { useRouter } from "../../hooks";
import { News } from "../../modules/news";
import { formatDDMMMYYHH, japanDate } from "../../util/date";
import ConfimDialog from "../confimdialog";
import AddAndUpdate from "./addandupdate";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "98vw",
    },
    container: {
      boxShadow: theme.shadows[10],
      width: "98vw",
      margin: "60px auto 0px",
      borderRadius: 6,
      paddingTop: 40,
    },
    button: {
      width: 40,
      height: 40,
      boxShadow: "none",
      margin: theme.spacing(0, 1),
      "&:hover": {
        transition: "all 300ms",
        transform: "scale(1.2)",
      },
    },
    fab: {
      position: "absolute",
      top: 10,
      right: 20,
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
      transition: "all 300ms",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        transform: "scale(1.2)",
      },
    },
    topHeader: {
      position: "absolute",
      top: "-80px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "98%",
      borderRadius: 4,
      lineHeight: "80px",
      paddingLeft: 20,
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
      boxShadow: theme.shadows[10],
    },
    cell: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "12%",
      margin: "10px 2px",
      display: "table-cell",
      fontWeight: 300,
    },
    cellHeader: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "12%",
      margin: "10px 2px",
      display: "table-cell",
      fontWeight: "bold",
    },
    rowContainer: {
      width: "100%",
      lineHeight: "40px",
      display: "flex",
      justifyContent: "space-around",
      borderBottom: "1px solid #eee",
      "&:hover": {
        zIndex: 100,
        cursor: "pointer",
        transition: "all 400ms",
        boxshadow: theme.shadows[10],
        backgroundColor: "#eee !important",
      },
    },
    tableContainer: {
      // border: "1px solid #eee",
      margin: theme.spacing(2),
    },
    headerContainer: {
      width: "100%",
      display: "flex",
      lineHeight: "40px",
      fontSize: 16,
      fontWeight: 500,
      justifyContent: "space-around",
      color: theme.palette.secondary.main,
      borderBottom: "1px solid #eee",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { history, location } = useRouter();
  const prifix = location.search.replace("?", "");
  const [openDialog, setOpenDialog] = useState(false);
  const IphoneWidth = useMediaQuery("(min-width:500px)");

  const [rowSelected, setRowSelected]: [
    News | undefined,
    React.Dispatch<React.SetStateAction<News | undefined>>
  ] = useState();

  const onEdit = (row) => {
    dispatch({
      type: "NEWS.NewsEditting",
      payload: row,
    });
    dispatch({
      type: "NEWS.EDIT",
      payload: true,
    });
    history.push("/admin/news?edit");
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const rows = useSelector((s) => s.news.newslist) || [];
  let tableHeader: JSX.Element;
  let table: JSX.Element[];
  if (!prifix) {
    const curRows = rows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );

    tableHeader = (
      <div className={classes.headerContainer}>
        <span className={classes.cellHeader} style={{ width: "20%" }}>
          Title
        </span>
        <span className={classes.cellHeader} style={{ width: "15%" }}>
          Category
        </span>
        {IphoneWidth && (
          <span className={classes.cellHeader} style={{ width: "20%" }}>
            Contents
          </span>
        )}
        {IphoneWidth && (
          <span className={classes.cellHeader} style={{ width: "20%" }}>
            Thumbnail
          </span>
        )}
        {IphoneWidth && (
          <span className={classes.cellHeader} style={{ width: "15%" }}>
            Display date
          </span>
        )}
        {IphoneWidth && <span className={classes.cellHeader}>Created At</span>}
        {IphoneWidth && <span className={classes.cellHeader}>Updated At</span>}
        <span className={classes.cellHeader} style={{ width: "10%" }}>
          Action
        </span>
      </div>
    );
    table = curRows.map((row, index) => {
      return (
        <div
          key={index}
          className={classes.rowContainer}
          // style={{ backgroundColor: index % 2 === 0 ? "beige" : "white" }}
          onClick={() => onEdit(row)}
        >
          <span className={classes.cell} style={{ width: "20%" }}>
            {row.title}
          </span>
          <span className={classes.cell} style={{ width: "15%" }}>
            {row.category}
          </span>
          {IphoneWidth && (
            <span className={classes.cell} style={{ width: "20%" }}>
              {row.content}
            </span>
          )}
          {IphoneWidth && (
            <span className={classes.cell} style={{ width: "20%" }}>
              {row.thumbnail}
            </span>
          )}
          {IphoneWidth && (
            <span className={classes.cell} style={{ width: "15%" }}>
              {formatDDMMMYYHH(row.display_date || "")}
            </span>
          )}
          {IphoneWidth && (
            <span className={classes.cell} style={{ fontSize: 12 }}>
              {japanDate(row.created_at || "")}
            </span>
          )}
          {IphoneWidth && (
            <span className={classes.cell} style={{ fontSize: 12 }}>
              {japanDate(row.updated_at || "")}
            </span>
          )}
          <span
            className={classes.cell}
            style={{ width: "10%", overflow: "visible" }}
          >
            <Fab
              color="secondary"
              className={`${classes.button}`}
              onClick={(event) => {
                event.stopPropagation();
                setOpenDialog(true);
                setRowSelected(row);
              }}
            >
              <DeleteIcon />
            </Fab>
            <Fab
              color="primary"
              className={`${classes.button}`}
              onClick={() => onEdit(row)}
            >
              <EditIcon />
            </Fab>
          </span>
        </div>
      );
    });
  } else {
    tableHeader = <></>;
    table = [<></>];
  }
  return prifix ? (
    <AddAndUpdate />
  ) : (
    <div className={classes.container}>
      {/* <Backdrop className={classes.backdrop} 
        <CircularProgress color="inherit" />
      </Backdrop> */}
      <ConfimDialog
        open={openDialog}
        title="Confim delete!!!"
        textContent="削除しますが、よろしいでしょうか。"
        handleClose={() => setOpenDialog(false)}
        handleClickOK={async () => {
          console.log(rowSelected);
          rowSelected &&
            (await axios
              .delete(baseURL + "/api/news/delete/" + rowSelected.id)
              .then(function (response) {
                dispatch({
                  type: "NEWS.REFRESH",
                });
              })
              .catch(function (error) {
                console.log(error);
              }));
          setOpenDialog(false);
        }}
      />
      <div style={{ position: "relative" }}>
        <h2 className={classes.topHeader}>
          <Fab
            color="primary"
            aria-label="add"
            className={`${classes.fab} ${classes.fabGreen}`}
            onClick={() => {
              dispatch({
                type: "NEWS.EDIT",
                payload: false,
              });
              history.push("/admin/news?add");
            }}
          >
            <AddIcon />
          </Fab>
          NEWS LIST
        </h2>
      </div>
      <div className={classes.tableContainer}>
        {tableHeader || ""}
        {table || ""}
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows ? rows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

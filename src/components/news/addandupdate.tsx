/* eslint-disable react-hooks/rules-of-hooks */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import HelpIcon from "@material-ui/icons/Help";
import SaveIcon from "@material-ui/icons/Save";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { baseURL } from "../../App";
import { useRouter } from "../../hooks";
import { News } from "../../modules/news";
import { scrollToElement } from "../../util/scrollTo";
import ConfimDialog from "../confimdialog";
import ViewHTMLModal from "../viewHTMLModal";
import StaticDatePicker from "./datepicker";
import ImageUpload from "./imageUpload";
import { Controlled as CodeMirror } from "react-codemirror2";
import CodeMode from "../codeMode";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/javascript/javascript.js");

export default function index() {
  const dispatch = useDispatch();
  const news = useSelector((s) => s.news.newsEditting);
  const [openViewDemo, setOpenViewDemo] = useState(false);
  const [openToggleSource, setOpenToggleSource] = useState(false);
  const [state, setState]: [
    News | undefined,
    React.Dispatch<React.SetStateAction<News | undefined>>
  ] = useState({
    id: news?.id,
    title: news?.title,
    category: news?.category,
    content: news?.content,
    thumbnail: news?.thumbnail,
    display_date: news?.display_date || new Date().toString(),
  });
  const { history } = useRouter();
  const [isCode, setIsCode] = useState({
    content: false,
  });
  const [showHelp, setShowHelp] = useState(false);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        boxShadow: theme.shadows[10],
        width: "90vw",
        minHeight: 500,
        padding: theme.spacing(1),
        margin: "10px auto",
        "& .MuiTextField-root": {
          width: "95%",
        },
      },
      header: {
        background: theme.palette.primary.main,
        lineHeight: "60px",
        color: "#fff",
        fontWeight: 700,
        textAlign: "center",
        verticalAlign: "middle",
      },
      row: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
      },
      button: {
        margin: theme.spacing(1),
        padding: theme.spacing(1.5, 6),
      },
      textarea: {
        minHeight: "182px",
        width: "100%",
        resize: "none",
        padding: 10,
        fontSize: "16px",
      },
      help: {
        // position: "relative",
        paddingLeft: 5,
        fontSize: "24px",
        display: "inline-block",
        width: "max-content",
        height: "100%",
        cursor: "pointer",
        color: theme.palette.primary.main,
      },
      helpimg: {
        position: "absolute",
        transition: "all 300ms",
        display: `${showHelp ? "inherit" : "none"}`,
        top: "200px",
        right: "50vw",
        width: "80vw",
        minHeight: 300,
        background: `url("./images/help_news.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        transform: "translateX(50%)",
        backgroundPosition: "center top",
        zIndex: 2000,
      },
      thumbnailImg: {
        boxShadow: theme.shadows[5],
      },
    })
  );
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push("/admin/news");
          }}
        >
          Back To List
        </Button>
      </header>

      <h4 className={classes.header}>NEWS FORM</h4>
      <div className={classes.row}>
        <ColumnLable>
          <strong> Title </strong>
        </ColumnLable>
        <ColumnField>
          <TextField
            required
            id="outlined-required"
            label=""
            value={state?.title || ""}
            variant="outlined"
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }}
          />
          <span
            className={classes.help}
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
          >
            <HelpIcon />
          </span>
        </ColumnField>
      </div>
      <div className={classes.row}>
        <ColumnLable>
          <strong> Category </strong>
        </ColumnLable>
        <ColumnField>
          <TextField
            required
            id="outlined-required"
            label=""
            value={state?.category || ""}
            variant="outlined"
            onChange={(e) => {
              setState({ ...state, category: e.target.value });
            }}
          />
          <span
            className={classes.help}
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
          >
            <span className={classes.helpimg}></span>
            <HelpIcon />
          </span>
        </ColumnField>
      </div>
      <div className={classes.row}>
        <ColumnLable>
          <strong> Display Date </strong>
        </ColumnLable>
        <ColumnField>
          <StaticDatePicker
            date={state.display_date || new Date().toISOString()}
            onChangeDate={(date) => {
              setState({ ...state, display_date: date?.toISOString() });
            }}
          />
        </ColumnField>
      </div>
      <div className={classes.row}>
        <ColumnLable>
          <strong> Thumbnail </strong>
        </ColumnLable>
        <ColumnField>
          <ImageUpload
            onChangeFile={async (event) => {
              var file = event.target.files ? event.target.files[0] : null;
              if (file) {
                let formdata = new FormData();
                formdata.append("file", file);
                await fetch(`${baseURL}/api/news/thumbnail`, {
                  method: "POST",
                  body: formdata,
                  redirect: "follow",
                })
                  .then((response) => response.text())
                  .then(async (result) => {
                    setState({
                      ...state,
                      thumbnail: JSON.parse(result).url,
                    });
                  });
              }
            }}
          />
          {state?.thumbnail && (
            <div className={classes.thumbnailImg}>
              <img width="100%" src={state?.thumbnail} alt="" />
            </div>
          )}
        </ColumnField>
      </div>
      <div className={classes.row}>
        <ColumnField style={{ borderWidth: 1, width: "100%" }}>
          <h4>Input Content</h4>
          <ConfimDialog
            open={openToggleSource}
            textContent="<span style='color:#FF9800;font-size:30px'>&#9888;</span>　CSSが全て無くなりますが、よろしいでしょうか。"
            title="確認"
            handleClose={() => setOpenToggleSource(false)}
            handleClickOK={() => {
              setOpenToggleSource(false);
              setIsCode({ ...isCode, content: !isCode.content });
            }}
          />
          <Button
            color="secondary"
            style={{ padding: 10, margin: "20px 0px" }}
            variant="contained"
            onClick={() => {
              if (isCode.content) {
                setOpenToggleSource(true);
              } else {
                setState({
                  ...state,
                  content: state.content
                    ?.replace(/></gim, `>\n\t<`)
                    .replace(/<br>|<br\/>/gim, `<br/>\n\t`),
                });
                setIsCode({ ...isCode, content: !isCode.content });
              }
            }}
          >
            {isCode.content ? "UnActive Source" : "Active Source"}
          </Button>
          {isCode.content && (
            <Button
              color="secondary"
              style={{
                padding: 10,
                margin: "20px 0px",
                marginLeft: 20,
              }}
              variant="contained"
              onClick={() => {
                setOpenViewDemo(true);
              }}
            >
              View Demo
            </Button>
          )}
          {isCode.content ? (
            <div>
              <ViewHTMLModal
                open={openViewDemo}
                textContent={state.content || ""}
                handleClose={() => setOpenViewDemo(false)}
              />
              <CodeMode
                value={state?.content || ""}
                setValue={(value) => setState({ ...state, content: value })}
              />
            </div>
          ) : (
            <CKEditor
              editor={ClassicEditor}
              data={state?.content}
              onInit={(editor) => {}}
              config={{
                ckfinder: {
                  uploadUrl: baseURL + "/ckfinder",
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setState({ ...state, content: data });
              }}
            />
          )}
        </ColumnField>
      </div>
      <div className={classes.row}>
        <ActionArea>
          <Button
            disabled={
              !state ||
              !state.title ||
              !state.category ||
              !state.content ||
              !state.display_date
            }
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={(event) => {
              dispatch({
                type: "NEWS.NewsEditting",
                payload: state,
              });
              dispatch({
                type: "NEWS.UPDATE",
              });
              history.push("/admin/news");
              scrollToElement();
            }}
          >
            Save
          </Button>
        </ActionArea>
      </div>
    </div>
  );
}
const ColumnLable = styled.div`
  background-color: rgba(238, 238, 238, 0.35);
  display: inline-flex;
  font-size: 16px;
  font-weight: bold;
  vertical-align: middle;
  text-align: left;
  width: 30%;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(230, 230, 230);
  padding: 10px 10px 30px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ColumnField = styled.div`
  padding: 10px 10px 30px 10px;
  display: table-cell;
  float: left;
  width: 100%;
  font-size: 13px;
  border-width: 1px 1px 1px 0px;
  border-style: solid;
  border-color: rgb(230, 230, 230);
`;
const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;

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
import { Recruit } from "../../modules/ui";
import { scrollToElement } from "../../util/scrollTo";
import ConfimDialog from "../confimdialog";
import ViewHTMLModal from "../viewHTMLModal";
import CodeMode from "../codeMode";

export default function index() {
  const dispatch = useDispatch();
  const recruit = useSelector((s) => s.ui.recruitEditting);
  const [openViewDemo, setOpenViewDemo] = useState(false);
  const [openToggleSource, setOpenToggleSource] = useState(false);
  const [fieldTarget, setFielgTaget] = useState("");
  const [state, setState]: [
    Recruit | undefined,
    React.Dispatch<React.SetStateAction<Recruit | undefined>>
  ] = useState({
    _id: recruit?._id,
    categoryTitle: recruit?.categoryTitle,
    contentsTitle: recruit?.contentsTitle,
    subContent: recruit?.subContent,
    description1: recruit?.description1,
    description2: recruit?.description2,
    description3: recruit?.description3,
    termsOfService: recruit?.termsOfService,
  });
  const { history } = useRouter();
  const [isCode, setIsCode] = useState({
    description1: false,
    description2: false,
    description3: false,
    termsOfService: false,
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
        minHeight: 400,
        background: `url("./images/help_recuit.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        transform: "translateX(50%)",
        backgroundPosition: "center top",
        zIndex: 2000,
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
            history.push("/admin/recruit");
          }}
        >
          Back To List
        </Button>
      </header>

      <h4 className={classes.header}>RECRUIT FORM</h4>
      <div className={classes.row}>
        <ColumnLable>
          <strong> Category </strong>
        </ColumnLable>
        <ColumnField>
          <TextField
            required
            id="outlined-required"
            label=""
            value={state?.categoryTitle || ""}
            variant="outlined"
            onChange={(e) => {
              setState({ ...state, categoryTitle: e.target.value });
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
          <strong> Title </strong>
        </ColumnLable>
        <ColumnField>
          <TextField
            required
            id="outlined-required"
            label=""
            value={state?.contentsTitle || ""}
            variant="outlined"
            onChange={(e) => {
              setState({ ...state, contentsTitle: e.target.value });
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
          <strong> Subject </strong>
        </ColumnLable>
        <ColumnField>
          <TextField
            required
            id="outlined-required"
            label=""
            value={state?.subContent || ""}
            variant="outlined"
            onChange={(e) => {
              setState({ ...state, subContent: e.target.value });
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
      <ConfimDialog
        open={openToggleSource}
        textContent="<span style='color:#FF9800;font-size:30px'>&#9888;</span>　CSSが全て無くなりますが、よろしいでしょうか。"
        title="確認"
        handleClose={() => setOpenToggleSource(false)}
        handleClickOK={() => {
          setOpenToggleSource(false);
          switch (fieldTarget) {
            case "description1":
              setIsCode({ ...isCode, description1: !isCode.description1 });
              break;
            case "description2":
              setIsCode({ ...isCode, description2: !isCode.description2 });
              break;
            case "description3":
              setIsCode({ ...isCode, description3: !isCode.description3 });
              break;
            default:
              break;
          }
        }}
      />
      {/* 仕事概要 */}
      <div className={classes.row}>
        <ColumnField style={{ borderWidth: 1, width: "100%" }}>
          <h4>仕事概要</h4>
          <Button
            color="secondary"
            style={{ padding: 10, margin: "20px 0px" }}
            variant="contained"
            onClick={() => {
              if (isCode.description1) {
                setOpenToggleSource(true);
                setFielgTaget("description1");
              } else {
                setState({
                  ...state,
                  description1: state.description1
                    ?.replace(/></gim, `>\n\t<`)
                    .replace(/<br>|<br\/>/gim, `<br/>\n\t`),
                });
                setIsCode({ ...isCode, description1: !isCode.description1 });
              }
            }}
          >
            {isCode.description1 ? "UnActive Source" : "Active Source"}
          </Button>
          {isCode.description1 && (
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
          {isCode.description1 ? (
            <div>
              <ViewHTMLModal
                open={openViewDemo}
                textContent={state.description1 || ""}
                handleClose={() => setOpenViewDemo(false)}
              />
              <CodeMode
                value={state?.description1 || ""}
                setValue={(value) =>
                  setState({ ...state, description1: value })
                }
              />
            </div>
          ) : (
            <CKEditor
              editor={ClassicEditor}
              data={state?.description1}
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                //   console.log("Editor is ready to use!", editor);
              }}
              config={{
                ckfinder: {
                  // Upload the images to the server using the CKFinder QuickUpload command.
                  uploadUrl: baseURL + "/ckfinder",
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData() as string;
                setState({ ...state, description1: data });
              }}
            />
          )}
        </ColumnField>
      </div>

      {/* 応募概要 */}
      <div className={classes.row}>
        <ColumnField style={{ borderWidth: 1, width: "100%" }}>
          <h4>応募概要</h4>
          <Button
            color="secondary"
            style={{ padding: 10, margin: "20px 0px" }}
            variant="contained"
            onClick={() => {
              if (isCode.description2) {
                setOpenToggleSource(true);
                setFielgTaget("description2");
              } else {
                setState({
                  ...state,
                  description2: state.description2
                    ?.replace(/></gim, `>\n\t<`)
                    .replace(/<br>|<br\/>/gim, `<br/>\n\t`),
                });
                setIsCode({ ...isCode, description2: !isCode.description2 });
              }
            }}
          >
            {isCode.description2 ? "UnActive Source" : "Active Source"}
          </Button>
          {isCode.description2 && (
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
          {isCode.description2 ? (
            <div>
              <ViewHTMLModal
                open={openViewDemo}
                textContent={state.description2 || ""}
                handleClose={() => setOpenViewDemo(false)}
              />
              <CodeMode
                value={state?.description2 || ""}
                setValue={(value) =>
                  setState({ ...state, description2: value })
                }
              />
            </div>
          ) : (
            <CKEditor
              editor={ClassicEditor}
              data={state?.description2}
              onInit={(editor) => {
                // You can store the "editor" and use when it is needed.
                //   console.log("Editor is ready to use!", editor);
              }}
              config={{
                ckfinder: {
                  // Upload the images to the server using the CKFinder QuickUpload command.
                  uploadUrl: baseURL + "/ckfinder",
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData() as string;
                setState({ ...state, description2: data });
              }}
            />
          )}
        </ColumnField>
      </div>

      {/* 応募・選考プロセス */}
      <div className={classes.row}>
        <ColumnField style={{ borderWidth: 1, width: "100%" }}>
          <h4>応募・選考プロセス</h4>
          <Button
            color="secondary"
            style={{ padding: 10, margin: "20px 0px" }}
            variant="contained"
            onClick={() => {
              if (isCode.description3) {
                setOpenToggleSource(true);
                setFielgTaget("description3");
              } else {
                setState({
                  ...state,
                  description3: state.description3
                    ?.replace(/></gim, `>\n\t<`)
                    .replace(/<br>|<br\/>/gim, `<br/>\n\t`),
                });
                setIsCode({ ...isCode, description3: !isCode.description3 });
              }
            }}
          >
            {isCode.description3 ? "UnActive Source" : "Active Source"}
          </Button>
          {isCode.description3 && (
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
          {isCode.description3 ? (
            <div>
              <ViewHTMLModal
                open={openViewDemo}
                textContent={state.description3 || ""}
                handleClose={() => setOpenViewDemo(false)}
              />
              <CodeMode
                value={state?.description3 || ""}
                setValue={(value) =>
                  setState({ ...state, description3: value })
                }
              />
            </div>
          ) : (
            <CKEditor
              editor={ClassicEditor}
              data={state?.description3}
              onInit={(editor) => {}}
              config={{
                ckfinder: {
                  uploadUrl: baseURL + "/ckfinder",
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData() as string;
                setState({ ...state, description3: data });
              }}
            />
          )}
        </ColumnField>
      </div>
      <div className={classes.row}>
        <ColumnField style={{ borderWidth: 1, width: "100%" }}>
          <h4>Input Terms Of Service</h4>
          {isCode.termsOfService ? (
            <div>
              <CodeMode
                value={state?.termsOfService || ""}
                setValue={(value) =>
                  setState({ ...state, termsOfService: value })
                }
              />
            </div>
          ) : (
            <CKEditor
              editor={ClassicEditor}
              data={state?.termsOfService}
              onInit={(editor) => {}}
              config={{
                ckfinder: {
                  uploadUrl: baseURL + "/ckfinder",
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setState({ ...state, termsOfService: data });
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
              !state.categoryTitle ||
              !state.contentsTitle ||
              !state.subContent ||
              !state.description1 ||
              !state.description2 ||
              !state.description3 ||
              !state.termsOfService
            }
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={(event) => {
              dispatch({
                type: "UI.RecruitEditting",
                payload: state,
              });
              dispatch({
                type: "UI.UPDATE",
              });
              history.push("/admin/recruit");
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

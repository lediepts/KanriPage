/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "../../hooks";
import UserGetAPI from "./UserAPI/userGetAPI";
import RecuitGetAPI from "./RecuitAPI/recruitgetAPI";
import RecruitUpdateAPI from "./RecuitAPI/recruitUpdate";
import NewsAll from "./NewsAPI/newsgetAPI";
import UpdateNews from "./NewsAPI/newsUpdate";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../../App";
import Header from "./header";
import Footer from "./footer";
import styled from "styled-components/macro";
import Toas from "./toas";
import RemoveMessage from "../removeMgs";

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
export default function index(props: Props) {
  const [cookie] = useCookies();
  const { history } = useRouter();
  const user = useSelector((s) => s.ui.user);
  const dispatch = useDispatch();
  const initUser = async () => {
    await axios
      .get(baseURL + "/user/id/" + cookie.__token)
      .then(function (response) {
        if (response.data.success) {
          dispatch({
            type: "UI.User",
            payload: response.data.User,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (!cookie.__token) {
      history.push("/admin/login");
    } else if (!user) {
      initUser();
    }
  }, [user, cookie, history]);
  const InitBody = cookie.__token
    ? styled.div``
    : styled.div`
        background: #f0f0f0;
        text-align: center;
        min-height: 100vh;
      `;
  return (
    <InitBody>
      <UserGetAPI />
      <NewsAll />
      <UpdateNews />
      <RecuitGetAPI />
      <RecruitUpdateAPI />
      <Body {...props} />
    </InitBody>
  );
}
export function Body(props: Props) {
  return (
    <div
      style={{
        fontFamily: `"EB Garamond",
"ヒラギノ角ゴ Pro W3",
"Hiragino Kaku Gothic Pro",
"メイリオ",
"Meiryo",
"verdana",
"Osaka",
"ＭＳ Ｐゴシック",
"MS PGothic",
"Sans-Serif"`,
      }}
    >
      <Toas />
      <RemoveMessage />
      <div
        style={{ position: "absolute", top: "0px", width: "100%", zIndex: 100 }}
      >
        <Header />
      </div>
      <div
        style={{
          position: "absolute",
          top: "80px",
          width: "100%",
        }}
      >
        <div
          style={{
            minHeight: "78vh",
          }}
        >
          {props.children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

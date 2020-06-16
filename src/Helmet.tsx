import React from "react";
import { useSelector } from "react-redux";
import ReactHelmet from "react-helmet";

export default function Helmet() {
  const { title } = useSelector((state) => ({
    title: state.ui.title,
  }));

  return <ReactHelmet title={title ? `${title} - 4S` : "4S"} />;
}

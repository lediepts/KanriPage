import React from "react";
import styled from "styled-components/macro";

export default function footer() {
  return (
    <Footer>
      &copy; {new Date().getFullYear()} Copyright:{" "}
      <a href="0004s.com"> Fourseasons </a>
    </Footer>
  );
}

const Footer = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 16px;
`;

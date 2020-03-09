import React from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";

import Color from "./color";

const NavBar = () => {
  const spin = keyframes`
    to {
      transform: rotate(365deg);
    }`;
  return (
    <header
      css={css`
        background: aliceblue;
        padding: 2rem;
        background: ${Color.accent};
      `}
    >
      <Link
        css={css`
          text-decoration: underline;
        `}
        to="/"
      >
        Adopt me !
      </Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: ${spin} 2s infinite;
        `}
        role="img"
        aria-label="logo"
      >
        👦
      </span>
    </header>
  );
};
export default NavBar;

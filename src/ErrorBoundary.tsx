import React, { Component, ErrorInfo } from "react";
import { Redirect, Link } from "@reach/router";

class ErrorBoundary extends Component {
  public state = {
    hasError: false,
    redirect: false
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("errorBoundary caught an error", error, info);
  }
  public componentDidUpdate() {
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }
  public render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          there is error with this listining. <Link to="/">Click Here</Link> to
          back to the home page or wait five seconed
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import React, { Component } from "react";
import { Redirect, Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    redirect: false
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("errorBoundary caught an error", error, info);
  }
  componentDidUpdate() {
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }
  render() {
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

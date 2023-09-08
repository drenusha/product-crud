import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error);
    this.setState({ hasError: true, error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render a custom error UI or message
      return (
        <div>
          <h1>Something went wrong!</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <div>{this.state.errorInfo && this.state.errorInfo.componentStack}</div>
        </div>
      );
    }

    // If no error, render the children
    return this.props.children;
  }
}

export default ErrorBoundary;

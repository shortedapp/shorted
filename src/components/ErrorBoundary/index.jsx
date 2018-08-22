import React from 'react';
/**
 * Generic ErrorBoundary handler. Will catch error and return a basic respons message
 * TODO:
 *  * Extend the plesantry of the error message and perhaps direct to help page etc
 *  * improve verbosity of logging
 * 
 * 
 * 
 * 
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      console.log(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Ooops. Something went wrong.</h1>;
      }
      return this.props.children;
    }
  }

  export default ErrorBoundary;
import React from "react";
import ReactDOM from "react-dom";
import Index from "./index.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="application">
        <h1>Hello React.</h1>
        <Index />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

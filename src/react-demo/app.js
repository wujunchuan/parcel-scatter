import React from "react";
import ReactDOM from "react-dom";
import Index from "./index_2.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="application">
        <Index />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

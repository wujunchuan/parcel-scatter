import React, { useState } from "react";

export default function index() {
  const [count, setCount] = useState(0);

  const handleButtonClick = (type) => {
    if (type) setCount(count + 1);
    else setCount(count - 1);
  };

  return (
    <div>
      <div>Current count: {count}</div>
      <div className="button-group">
        <button onClick={() => handleButtonClick(1)}>+</button>
        <button onClick={() => handleButtonClick()}>-</button>
      </div>
    </div>
  );
}

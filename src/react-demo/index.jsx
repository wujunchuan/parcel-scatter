import React, { useState, useEffect, useRef } from "react";

export default function index() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = React.useRef();


  const mountedRef = useRef(false);

  const handleButtonClick = (type) => {
    if (type) setCount((preCount) => preCount + 1);
    else setCount((preCount) => preCount - 1);
  };

  const fetch = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCount(1);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetch();
    return () => {};
  }, [fetch]);

  useEffect(() => {
    ref.current = count;
    mountedRef.current = true;
    return () => mountedRef.current = false;
  }, []);

  useEffect(() => {
    ref.current = count;
    console.log("Count updated: ", count);
    // setTimeout(() => {
    //   console.log(count);
    // }, 2000);
    return () => console.log("clean", count);
  }, [count]);

  return (
    <div>
      {!loading ? (
        <>
          <div>Current count: {count}</div>
          <div>PreCount: {ref.current}</div>
        </>
      ) : (
        <h1>Loading..</h1>
      )}
      <div className="button-group">
        <button onClick={() => handleButtonClick(1)}>+</button>
        <button onClick={() => handleButtonClick()}>-</button>
      </div>
    </div>
  );
}

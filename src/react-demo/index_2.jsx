import React, { useState, useEffect, useRef } from "react";

export default function index_2() {
  const [count, setCount] = useState(0);
  const windowSize = useWindowSize();

  const handleBtnClick = () => {
    setCount((pre) => pre + 1);
  };

  useEffect(() => {
    console.log(windowSize);
    return () => {};
  }, [windowSize]);

  return (
    <>
      <h1>{`The component has been re-rendered ${count} Times`}</h1>
      <button onClick={handleBtnClick}>点击</button>    
    </>
  );
}

function getSize() {
  const { innerHeight, innerWidth, outerHeight, outerWidth } = window;
  return { innerHeight, innerWidth, outerHeight, outerWidth };
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

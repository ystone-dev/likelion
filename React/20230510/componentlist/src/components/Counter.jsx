import React from "react";

export default function Counter() {
  const [number, setNumber] = useState(0);
  const increment = () => setNumberer(numberer + 1);
  const decrement = () => setNumberer(numberer - 1);
  return (
    <>
      <p>Counter: {number}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </>
  );
}

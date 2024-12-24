import React, { useState } from 'react';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='d-flex justify-content-center align-items-center bg-light flex-grow-1'>
      <div className="text-center p-4 bg-white shadow rounded">
        <h1 className="mb-4">Counter</h1>
        <div className="p-3 mb-4 border rounded bg-light">
          <strong>Counter Value:</strong> {count}
        </div>
        <div className="d-flex gap-3 justify-content-center">
          <button className="btn btn-success" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
            Decrement
          </button>
          <button className="btn btn-primary" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterApp;
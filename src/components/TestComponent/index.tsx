import { FC, useState } from 'react';

const TestComponent: FC = () => {
  const [state, setState] = useState(0);

  return (
    <div>
      TestComponent
      <button onClick={() => setState(state + 1)}>+</button>
      {state}
    </div>
  );
};

export default TestComponent;

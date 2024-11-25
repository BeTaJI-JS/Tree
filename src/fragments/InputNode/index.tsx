import { ChangeEventHandler, useState } from 'react';

import styles from './styles.module.scss';

type InputNodeProps = {
  valueInput: string;
  handleNode: (name: string) => void;
};

const InputNode = ({ valueInput, handleNode }: InputNodeProps) => {
  const [value, setValue] = useState(valueInput);

  const onChangeInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    handleNode(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNode(value);
    }
  };

  return (
    <input
      type='text'
      value={value}
      onChange={onChangeInputHandler}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      autoFocus
      className={styles.inputNode}
    />
  );
};

export default InputNode;

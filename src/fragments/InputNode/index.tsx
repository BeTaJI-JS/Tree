import { ChangeEventHandler, KeyboardEventHandler, useCallback, useState } from 'react';

import styles from './styles.module.scss';

type InputNodeProps = {
  valueInput: string;
  handleNode: (name: string) => void;
};

const InputNode = ({ valueInput, handleNode }: InputNodeProps) => {
  const [value, setValue] = useState(valueInput);

  const onChangeInputHandler: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    handleNode(value);
  }, [handleNode, value]);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleNode(value);
      }
    },
    [handleNode, value],
  );

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

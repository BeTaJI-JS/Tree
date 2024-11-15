import styles from './styles.module.scss';

type InputNode = {
  valueInput: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNode: () => void;
};

const InputNode = ({ valueInput, onChange, handleNode }: InputNode) => {
  return (
    <input
      type='text'
      value={valueInput}
      onChange={onChange}
      onBlur={handleNode}
      onKeyDown={(e) => e.key === 'Enter' && handleNode()}
      autoFocus
      className={styles.inputNode}
    />
  );
};

export default InputNode;

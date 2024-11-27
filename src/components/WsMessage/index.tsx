import { Flip, ToastContainer } from 'react-toastify';

import styles from './styles.module.scss';

const WsMessage = () => (
  <div className={styles.toastContainer}>
    <ToastContainer
      className={styles.toastContainerBody}
      bodyClassName={styles.toastContainerToast}
      autoClose={7000}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      transition={Flip}
      limit={2}
    />
  </div>
);

export default WsMessage;

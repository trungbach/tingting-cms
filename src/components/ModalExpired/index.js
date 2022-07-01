import React from "react";
import { Modal } from "antd";
import styles from "./styles.scss";
const ModalExpired = ({ children }) => {
  return (
    <>
      <Modal
        centered
        visible={true}
        closeIcon={null}
        maskClosable={false}
        footer={null}
        wrapClassName={styles.modal}
      >
        <div className={styles.notifi}>
          <h2>Thông báo</h2>
          <div className={styles.notifiContent}>{children}</div>
        </div>
      </Modal>
    </>
  );
};

export default ModalExpired;

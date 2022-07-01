import "@/base.scss";
import ModalExpired from "@/components/ModalExpired";
import TopHeader from "@/components/TopHeader";
import { SESSION_AUTH } from "@/config/constant";
import { useCountSessionExpired, useSessionStorage } from "@/hooks";
import { connect } from "dva";
import React, { useEffect } from "react";
import { withRouter } from "umi";
import styles from "./styles.scss";

function PageTemplate(props) {
  const { dispatch, content } = props;

  const [sessionTime, setSessionTime] = useSessionStorage(SESSION_AUTH);
  useEffect(() => {
    // reset session time each time change page.
    setSessionTime(Math.floor(new Date().getTime() / 1000.0));
  }, []);

  const isSessionExpired = useCountSessionExpired(sessionTime);

  // TODO: logout when session ended
  useEffect(() => {
    if (isSessionExpired) {
      setTimeout(() => {
        dispatch({ type: "MASTERDATA/logout" });
      }, 3000);
    }
  }, [isSessionExpired]);

  return (
    <>
      <TopHeader />
      <div className={styles.contentPage}>
        {content}
        {isSessionExpired && (
          <ModalExpired>Phiên đăng nhập của bạn đã hết hạn</ModalExpired>
        )}
      </div>
    </>
  );
}

export default connect(({ MASTERDATA }) => ({
  masterDataStore: MASTERDATA,
}))(withRouter(PageTemplate));

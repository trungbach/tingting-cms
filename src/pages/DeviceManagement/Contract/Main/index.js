import React, { useEffect, useState, useCallback } from "react";
import styles from "./styles.scss";
import { connect } from "dva";
import { withRouter, router } from "umi";
import PageTitle from "@/components/PageTitle";
import Loading from "@/components/Loading";
import { useUploadFile, useSessionStorage } from "@/hooks";
import { TOKEN_KEY, ADMIN_KEY, ROLE_ADMIN_SYSTEM } from "@/config/constant";
import config from "@/config/index";
import superagent from "superagent";
import { message } from "antd";
const Contract = (props) => {
  const { match, dispatch, accountStore } = props;
  const { userCode } = match.params;
  const { contract, loading } = accountStore;
  const [finishUpload, setFinishUpload] = useState(false);
  const [admin] = useSessionStorage(ADMIN_KEY);

  console.log("contract", contract);

  const [file, setFile] = useState();
  const [pdfRes, setPdfRes] = useUploadFile(file);

  console.log("pdfRes", pdfRes);

  useEffect(() => {
    setFinishUpload(false);
  }, [pdfRes]);

  useEffect(() => {
    let payload = { userCode: userCode };
    dispatch({ type: "ACCOUNT/getContract", payload: payload });
  }, [userCode]);

  const handleUploadContract = () => {
    let formData = new FormData();
    formData.append("file", file);

    superagent
      .post(config.API_DOMAIN + "api/admin/v1/user/upload-contract")
      .set("Authorization", "Bearer " + sessionStorage.getItem(TOKEN_KEY))
      .field("userCode", userCode)
      .attach("contractFile", file)
      .end((err, res) => {
        if (res) {
          message.success(res.body.message);
          setFinishUpload(true);
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  const renderContract = () => {
    if (!contract && !pdfRes) {
      return (
        <div className={styles.noContract}>
          <h1 className="mb-5">Chưa có hợp đồng.</h1>
          {admin.role !== ROLE_ADMIN_SYSTEM && (
            <>
              <label htmlFor="file" className={styles.primaryBtn}>
                Sửa hợp đồng
              </label>
              <input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
        </div>
      );
    } else {
      let contractUrl = pdfRes ? pdfRes.originUrl : contract.originUrl;
      return (
        <>
          <div className={styles.cta}>
            {admin.role !== ROLE_ADMIN_SYSTEM && (
              <>
                <label htmlFor="file" className={styles.primaryBtn}>
                  Chỉnh sửa
                </label>
                <input
                  id="file"
                  accept="application/pdf"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </>
            )}
            {!finishUpload && file && (
              <button
                style={{ marginLeft: 10 }}
                className={styles.primaryBtn}
                onClick={handleUploadContract}
              >
                Hoàn tất
              </button>
            )}
          </div>
          <iframe
            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${contractUrl}#toolbar=0&scrollbar=0`}
            frameBorder="0"
            scrolling="auto"
            height="700px"
            width="100%"
          ></iframe>
        </>
      );
    }
  };

  return (
    <div className={styles.content}>
      <PageTitle linkBack="/admin/account-manage" title="Sửa hợp đồng" />
      <div className={styles.contract}>{renderContract()}</div>
    </div>
  );
};

export default connect(({ ACCOUNT }) => ({
  accountStore: ACCOUNT,
}))(withRouter(Contract));

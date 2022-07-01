import {
  ADMIN_KEY,
  ROLE_ADMIN_COMPANY,
  ROLE_ADMIN_SYSTEM,
} from "@/config/constant";
import { useSessionStorage } from "@/hooks";
import { Modal, Select } from "antd";
import { connect } from "dva";
import React, { useCallback, useEffect, useMemo } from "react";
import Admin from "./Admin";
import styles from "./styles.scss";
const { Option } = Select;
const { confirm } = Modal;
function TopHeader(props) {
  let { dispatch, masterDataStore } = props;
  let {
    companies,
    companyId,
    hideSelectCompanies,
    updateProfileResponse,
  } = masterDataStore;

  const [admin] = useSessionStorage(ADMIN_KEY);

  const updateCompany = useCallback(
    (payload) => {
      dispatch({ type: "MASTERDATA/updateCompany", payload });
    },
    [dispatch]
  );

  useEffect(() => {
    if (companies.length === 0) {
      dispatch({ type: "MASTERDATA/getListCompanies" });
    }
  }, [companies]);

  const companyName = useMemo(() => {
    if (admin?.role === ROLE_ADMIN_COMPANY && companies.length > 0) {
      return companies.find((company) => company.id === admin.companyId).name;
    }
  }, [admin, companies]);

  return (
    <div className={styles.headerUser}>
      {!hideSelectCompanies && (
        <>
          {admin?.role === ROLE_ADMIN_SYSTEM ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 10 }}>Công ty:</span>
              <Select
                className={styles.listSchool}
                value={companyId}
                style={{ minWidth: 150 }}
                onChange={(value) => updateCompany({ id: value })}
              >
                {companies.map((value, index) => (
                  <Option key={index} value={value.id}>
                    {value.name}
                  </Option>
                ))}
              </Select>
            </div>
          ) : (
            <span style={{ marginRight: 10 }}>Công ty: {companyName}</span>
          )}
        </>
      )}

      <Admin />
    </div>
  );
}

export default connect(({ MASTERDATA }) => ({
  masterDataStore: MASTERDATA,
}))(TopHeader);

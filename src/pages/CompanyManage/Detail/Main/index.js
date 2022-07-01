import React, { useEffect } from 'react';
import styles from './styles.scss';
import { router, withRouter } from 'umi';
import { connect } from 'dva';
import Loading from '@/components/Loading';
import PageTitle from '@/components/PageTitle';
import { useSessionStorage } from '@/hooks';
import { ADMIN_KEY, ROLE_ADMIN_SYSTEM } from '@/config/constant';
import { formatVnd } from '@/util/function';
const DetailCompany = props => {
    const { companyStore, dispatch, match } = props;
    const { detailCompany, loading } = companyStore;
    const { companyCode } = match.params;
    const [admin] = useSessionStorage(ADMIN_KEY);

    useEffect(() => {
        const payload = { code: companyCode };
        dispatch({
            type: 'COMPANY/getDetailCompany',
            payload,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyCode]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={styles.content}>
            {admin?.role === ROLE_ADMIN_SYSTEM ? (
                <PageTitle linkBack="/admin/company-manage" title="Thông tin doanh nghiệp" />
            ) : (
                <div className={styles.pageTitle}>Thông tin doanh nghiệp</div>
            )}
            {detailCompany.logo?.originUrl && (
                <div className={styles.companyImg}>
                    <img src={detailCompany?.logo?.originUrl} alt="img-company" />
                </div>
            )}

            <h1 className={styles.name}>{detailCompany.name}</h1>
            <h5 className={styles.address}>{detailCompany.address}</h5>
            <h5 className={styles.budget}>Hạn mức: {formatVnd(detailCompany.budget)}</h5>
            <p className={styles.description}>{detailCompany.description}</p>
            {admin?.role !== ROLE_ADMIN_SYSTEM && (
                <button
                    className={styles.primaryBtn}
                    onClick={() => router.push(`/admin/update-company/${companyCode}`)}
                >
                    Sửa thông tin
                </button>
            )}
        </div>
    );
};

export default connect(({ COMPANY }) => ({
    companyStore: COMPANY,
}))(withRouter(DetailCompany));

import ic_back from '@/assets/image/ic_back.png';
import Loading from '@/components/Loading';
import { ADMIN_KEY, ROLE_ADMIN_SYSTEM, ROLE_ADMIN_COMPANY } from '@/config/constant';
import { useSessionStorage, useUploadFile } from '@/hooks';
import { Button, Form, Input, InputNumber } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { router, withRouter } from 'umi';
import styles from './styles.scss';

const { TextArea } = Input;
const EditCompany = props => {
    const [form] = Form.useForm();
    const { companyStore, dispatch, match } = props;
    const { detailCompany, loading } = companyStore;
    const { companyCode } = match.params;

    const [admin] = useSessionStorage(ADMIN_KEY);

    const [file, setFile] = useState();
    const [logo] = useUploadFile(file);

    useEffect(() => {
        logo && form.setFieldsValue({ logoId: logo.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logo]);

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

    const handleSubmit = values => {
        values.name = values.name.trim();
        values.address = values.address.trim();
        values.description = values.description.trim();

        values.id = detailCompany.id;
        dispatch({
            type: 'COMPANY/updateCompany',
            payload: { data: values, code: companyCode },
        });
    };

    const linkBack =
        admin?.role === ROLE_ADMIN_SYSTEM
            ? '/admin/company-manage'
            : `/admin/detail-company/${companyCode}`;

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>
                <img
                    src={ic_back}
                    alt="back"
                    className={styles.sizeIcon}
                    style={{ marginRight: 10 }}
                    onClick={() => router.push(linkBack)}
                />
                Sửa thông tin doanh nghiệp
            </div>

            <div className={styles.form}>
                <Form scrollToFirstError layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Tên doanh nghiệp:"
                        rules={[
                            { required: true, message: 'Bạn chưa nhập tên doanh nghiệp!' },
                            { max: 100, message: 'Tên doanh nghiệp không được quá 100 ký tự!' },
                            { whitespace: true, message: 'Bạn chưa nhập tên doanh nghiệp!' },
                        ]}
                        name="name"
                        initialValue={detailCompany.name}
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    {admin.role !== ROLE_ADMIN_COMPANY && (
                        <Form.Item
                            label="Hạn mức:"
                            rules={[{ required: true, message: 'Bạn chưa nhập hạn mức!' }]}
                            name="budget"
                            initialValue={detailCompany.budget}
                        >
                            <InputNumber stringMode min={0} prefix="₫" />
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Địa chỉ:"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập địa chỉ doanh nghiệp!',
                            },
                            { whitespace: true, message: 'Bạn chưa nhập địa chỉ doanh nghiệp!' },
                        ]}
                        name="address"
                        initialValue={detailCompany.address}
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả:"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Bạn chưa nhập mô tả doanh nghiệp!',
                            },
                            { whitespace: true, message: 'Bạn chưa nhập mô tả doanh nghiệp!' },
                        ]}
                        initialValue={detailCompany.description}
                    >
                        <TextArea rows={10} className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item label="Logo:" name="logoId" initialValue={detailCompany.logoId}>
                        {' '}
                        {(logo || detailCompany) && (
                            <div className={styles.imgCompany}>
                                <img
                                    src={logo ? logo.originUrl : detailCompany.logo?.originUrl}
                                    alt="logo"
                                    style={{
                                        width: 150,
                                        height: 150,
                                        borderRadius: 10,
                                        objectFit: 'cover',
                                    }}
                                />
                            </div>
                        )}
                        <label htmlFor="logo" className={styles.labelLogo}>
                            Tải lên
                        </label>
                        <input
                            id="logo"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </Form.Item>

                    <Button htmlType="submit" className={styles.primaryBtn}>
                        Lưu
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default connect(({ COMPANY }) => ({
    companyStore: COMPANY,
}))(withRouter(EditCompany));

import ic_back from '@/assets/image/ic_back.png';
import { useUploadFile } from '@/hooks';
import { validateMessages } from '@/util/function';
import { Button, Form, Input, InputNumber } from 'antd';
import { connect } from 'dva';
import React, { useCallback, useEffect, useState } from 'react';
import { router } from 'umi';
import styles from './styles.scss';

const { TextArea } = Input;
const CreateCompany = props => {
    const [form] = Form.useForm();
    const { companyStore, dispatch } = props;
    const { loading } = companyStore;

    const [file, setFile] = useState();
    const [logo] = useUploadFile(file);

    const createCompany = useCallback(
        payload => {
            dispatch({ type: 'COMPANY/createCompany', payload });
        },
        [dispatch],
    );

    useEffect(() => {
        logo && form.setFieldsValue({ logoId: logo.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logo]);

    const handleSubmit = values => {
        values.name = values.name.trim();
        values.address = values.address.trim();
        values.description = values.description.trim();
        createCompany(values);
    };

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>
                <img
                    src={ic_back}
                    alt="back"
                    className={styles.sizeIcon}
                    style={{ marginRight: 10 }}
                    onClick={() => router.push('/admin/company-manage')}
                />
                Thêm doanh nghiệp
            </div>

            <div className={styles.form}>
                <Form
                    scrollToFirstError
                    layout="vertical"
                    form={form}
                    onFinish={handleSubmit}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Tên doanh nghiệp:"
                        rules={[
                            { required: true, message: 'Bạn chưa nhập tên doanh nghiệp!' },
                            { max: 100, message: 'Tên doanh nghiệp không được quá 100 ký tự!' },
                            { whitespace: true, message: 'Bạn chưa nhập tên doanh nghiệp!' },
                        ]}
                        name="name"
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Hạn mức:"
                        rules={[{ required: true, message: 'Bạn chưa nhập hạn mức!' }]}
                        name="budget"
                    >
                        <InputNumber stringMode min={0} prefix="₫" />
                    </Form.Item>

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
                    >
                        <TextArea rows={10} className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item label="Logo:" name="logoId">
                        {logo && (
                            <div className={styles.imgCompany}>
                                <img
                                    src={logo.originUrl}
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

                    <Button loading={loading} htmlType="submit" className={styles.primaryBtn}>
                        Lưu
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default connect(({ COMPANY }) => ({
    companyStore: COMPANY,
}))(CreateCompany);

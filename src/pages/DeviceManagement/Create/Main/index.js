import PageTitle from '@/components/PageTitle';
import { ADMIN_KEY, DATE_FILTER, ROLE_ADMIN_SYSTEM } from '@/config/constant';
import { useSessionStorage, useUploadFile } from '@/hooks';
import variables from '@/_variables.scss';
import { Button, DatePicker, Form, Input, Radio, InputNumber } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import styles from './styles.scss';
import { validateMessages } from '@/util/function';
function CreateAccount(props) {
    const { dispatch, accountStore, masterDataStore } = props;
    const { loading } = accountStore;
    const { companyId } = masterDataStore;
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };

    const [admin] = useSessionStorage(ADMIN_KEY);
    const [file, setFile] = useState();
    const [avatar] = useUploadFile(file);

    useEffect(() => {
        avatar && form.setFieldsValue({ avatarId: avatar.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

    const disabledFuture = current => {
        // Can not select days before today and today
        return current && current.valueOf() > Date.now();
    };

    const handleSubmit = values => {
        values.birthday = values['birthday'] ? values['birthday'].format(DATE_FILTER) : '';

        values.name = values['name'].trim();
        values.phone = values['phone'].trim();
        values.address = values['address'] ? values['address'].trim() : '';
        values.email = values['email'].trim();
        if (values.role !== ROLE_ADMIN_SYSTEM) {
            values.companyId = companyId;
        }
        dispatch({ type: 'ACCOUNT/createAccount', payload: values });
    };

    const handleValuesChange = (changedValues, allValues) => {
        console.log('changedValues', changedValues);
        console.log('allValues', allValues);
    };

    return (
        <div className={styles.content}>
            <PageTitle title="Tạo tài khoản" linkBack="/admin/account-manage" />
            <div className={styles.form}>
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={handleSubmit}
                    validateMessages={validateMessages}
                    onValuesChange={handleValuesChange}
                    scrollToFirstError
                >
                    <Form.Item
                        label="Tên"
                        rules={[
                            { required: true },
                            {
                                max: 40,
                                message: 'Tên tài khoản không được nhiều hơn 40 ký tự!',
                            },
                        ]}
                        name="name"
                        whitespace={true}
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        rules={[
                            { required: true },
                            {
                                len: 10,
                                message: 'Số điện thoại bao gồm 10 số!',
                            },
                            {
                                pattern: new RegExp(/^\d*[1-9]\d*$/), // only number
                                message: 'Số điện thoại chưa đúng định dạng!',
                            },
                        ]}
                        name="phone"
                        whitespace
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item label="Ngày sinh" name="birthday">
                        <DatePicker className={styles.datePicker} disabledDate={disabledFuture} />
                    </Form.Item>

                    <Form.Item
                        label="Số CCCD"
                        rules={[
                            { required: true },
                            { len: 12, message: 'Số CCCD phải là 12 số!' },
                            {
                                pattern: new RegExp(/\d+/g), // only number
                                message: 'Số CCCD chưa đúng định dạng!',
                            },
                        ]}
                        name="citizenCode"
                        whitespace
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Hạn mức"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        name="budget"
                    >
                        <InputNumber stringMode prefix="₫" min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Giới tính"
                        rules={[{ required: true }]}
                        name="gender"
                        initialValue={0}
                    >
                        <Radio.Group defaultValue={0}>
                            <Radio value={0}>Nam</Radio>
                            <Radio value={1}>Nữ</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        rules={[{ max: 100, message: 'Địa chỉ không được quá 100 ký tự!' }]}
                        label="Địa chỉ"
                        name="address"
                        whitespace
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        whitespace
                        rules={[
                            { required: true },
                            { type: 'email', message: 'Email chưa đúng định dạng!' },
                        ]}
                        name="email"
                    >
                        <Input type="email" className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Chức vụ"
                        rules={[{ required: true }]}
                        name="positionInCompany"
                    >
                        <Input className={styles.textInputLight} />
                    </Form.Item>

                    <Form.Item
                        label="Vai trò"
                        rules={[{ required: true }]}
                        name="role"
                        initialValue={2}
                    >
                        <Radio.Group defaultValue={2}>
                            <Radio value={2}>Admin For Company</Radio>
                            {admin.role === ROLE_ADMIN_SYSTEM && (
                                <Radio value={1}>System Admin</Radio>
                            )}
                            <Radio value={0}>Nhân viên</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Ảnh đại diện" name="avatarId">
                        {avatar && (
                            <img
                                style={{
                                    width: 150,
                                    height: 150,
                                    objectFit: 'cover',
                                    display: 'block',
                                    borderRadius: variables.borderRadius,
                                }}
                                width={150}
                                src={avatar.originUrl}
                                alt={avatar.originUrl}
                            />
                        )}
                        <label htmlFor="avatar" className={styles.labelLogo}>
                            Tải lên
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            onChange={e => setFile(e.target.files[0])}
                            className={styles.textInputLight}
                            accept="image/png, image/gif, image/jpeg"
                        />
                    </Form.Item>

                    <Button loading={loading} htmlType="submit" className={styles.primaryBtn}>
                        Tạo ngay
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default connect(({ MASTERDATA, ACCOUNT }) => ({
    masterDataStore: MASTERDATA,
    accountStore: ACCOUNT,
}))(CreateAccount);

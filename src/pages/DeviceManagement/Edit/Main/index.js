import ic_back from '@/assets/image/ic_back.png';
import Loading from '@/components/Loading';
import { ADMIN_KEY, DATE_FILTER, ROLE_ADMIN_SYSTEM } from '@/config/constant';
import { useSessionStorage, useUploadFile } from '@/hooks';
import variables from '@/_variables.scss';
import { Button, DatePicker, Form, Input, InputNumber, Radio } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import React, { useEffect, useState, useCallback } from 'react';
import { router, withRouter } from 'umi';
import styles from './styles.scss';
const UpdateDevice = props => {
    const { dispatch, accountStore, masterdataStore, match } = props;
    const { detailAccount, loading } = accountStore;
    const { companyId } = masterdataStore;
    const { userCode } = match.params;
    const [form] = Form.useForm();
    const [file, setFile] = useState();
    const [avatar] = useUploadFile(file);
    const [admin] = useSessionStorage(ADMIN_KEY);

    const getDetailAccount = useCallback(
        payload => {
            dispatch({ type: 'ACCOUNT/getDetailAccount', payload });
        },
        [dispatch],
    );
    useEffect(() => {
        getDetailAccount({ userCode: userCode });
        return () => {
            dispatch({ type: 'ACCOUNT/resetCurrentAccount' });
        };
    }, [userCode]);

    useEffect(() => {
        avatar && form.setFieldsValue({ avatarId: avatar.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);

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

    const disabledFuture = current => {
        // Can not select days before today and today
        return current && current.valueOf() > Date.now();
    };

    const handleSubmit = values => {
        values.id = detailAccount.id;

        if (values.role !== ROLE_ADMIN_SYSTEM) {
            values.companyId = companyId;
        }
        values.birthday = values['birthday'] ? values['birthday'].format(DATE_FILTER) : '';

        values.name = values['name'].trim();
        values.phone = values['phone'].trim();
        values.address = values['address'] ? values['address'].trim() : '';
        values.email = values['email'].trim();

        dispatch({
            type: 'ACCOUNT/updateAccount',
            payload: { data: values, userCode: detailAccount.code },
        });
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'Bạn chưa nhập ${label}',
    };
    /* eslint-enable no-template-curly-in-string */

    const handleValuesChange = (changedValues, allValues) => {
        console.log('changedValues', changedValues);
        console.log('allValues', allValues);
    };

    if (loading) {
        return <Loading />;
    }

    if (!detailAccount.name) {
        return null;
    }

    const initialValues = {
        name: detailAccount.name,
        phone: detailAccount.phone,
        birthday: moment(detailAccount.birthday),
        citizenCode: detailAccount.citizenCode,
        budget: detailAccount.budget,
        gender: detailAccount.gender,
        address: detailAccount.address,
        email: detailAccount.email,
        positionInCompany: detailAccount.positionInCompany,
        role: detailAccount.role,
        avatarId: detailAccount.avatarId,
    };

    return (
        <div className={styles.content}>
            <div className={styles.pageTitle}>
                <img
                    src={ic_back}
                    alt="back"
                    className={styles.sizeIcon}
                    style={{ marginRight: 10 }}
                    onClick={() => router.push('/admin/account-manage')}
                />
                Chỉnh sửa tài khoản
            </div>
            <div className={styles.form}>
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={handleSubmit}
                    validateMessages={validateMessages}
                    onValuesChange={handleValuesChange}
                    scrollToFirstError
                    initialValues={initialValues}
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
                                pattern: new RegExp(/\d+/g), // only number
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

                    <Form.Item label="Giới tính" rules={[{ required: true }]} name="gender">
                        <Radio.Group defaultValue={detailAccount.gender}>
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

                    <Form.Item label="Vai trò" rules={[{ required: true }]} name="role">
                        <Radio.Group defaultValue={detailAccount.role}>
                            <Radio value={2}>Admin For Company</Radio>
                            {admin.role === ROLE_ADMIN_SYSTEM && (
                                <Radio value={1}>System Admin</Radio>
                            )}
                            <Radio value={0}>Nhân viên</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Ảnh đại diện" name="avatarId">
                        {(avatar || detailAccount.avatar) && (
                            <img
                                style={{
                                    width: 150,
                                    height: 150,
                                    objectFit: 'cover',
                                    display: 'block',
                                    borderRadius: variables.borderRadius,
                                }}
                                width={150}
                                src={avatar ? avatar.originUrl : detailAccount.avatar.originUrl}
                                alt="avatar"
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
                        Cập nhật
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default connect(({ ACCOUNT, MASTERDATA }) => ({
    masterdataStore: MASTERDATA,
    accountStore: ACCOUNT,
}))(withRouter(UpdateDevice));

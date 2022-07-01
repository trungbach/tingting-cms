import React, { useState, useEffect } from 'react';
import styles from './styles.scss';
import { Modal, Form, Input, Radio, DatePicker } from 'antd';
import { useSessionStorage, useModal, useUploadFile } from '@/hooks';
import { ADMIN_KEY, ROLE_ADMIN_SYSTEM } from '@/config/constant';
import { router } from 'umi';
import moment from 'moment';
import { connect } from 'dva';

const { confirm } = Modal;
const Admin = ({ dispatch, masterdataStore }) => {
    const { myProfile, updateProfileResponse, companyId } = masterdataStore;
    const [admin] = useSessionStorage(ADMIN_KEY);
    const [isModalOpen, setModalOpen] = useModal();
    const [form] = Form.useForm();
    const [file, setFile] = useState();
    const [avatar] = useUploadFile(file);

    useEffect(() => {
        dispatch({ type: 'MASTERDATA/getMyProfile' });
    }, [updateProfileResponse]);

    const disabledFuture = current => {
        // Can not select days before today and today
        return current && current.valueOf() > Date.now();
    };

    const handleLogout = () => {
        confirm({
            title: 'Bạn có chắc chắn muốn đăng xuất?',
            onOk: () => {
                dispatch({ type: 'MASTERDATA/logout' });
            },
            onCancel() {},
        });
    };

    const handleSave = values => {
        values.id = myProfile.id;
        if (myProfile.role !== ROLE_ADMIN_SYSTEM) {
            values.companyId = companyId;
        }
        dispatch({ type: 'MASTERDATA/updateProfile', payload: values });
        setModalOpen(false);
    };

    const handleClose = () => setModalOpen(false);

    return (
        <>
            <div className={styles.admin} onClick={() => setModalOpen(true)}>
                {myProfile?.avatar?.originUrl && (
                    <div className={styles.adminAvatar}>
                        <img src={myProfile?.avatar?.originUrl} alt="avatar" />
                    </div>
                )}
                <span>{myProfile?.name}</span>
            </div>
            {isModalOpen && (
                <Modal
                    title="Thông tin tài khoản"
                    visible={isModalOpen}
                    wrapClassName={styles.modal}
                    onOk={handleClose}
                    onCancel={handleClose}
                    destroyOnClose
                    footer={[
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                className={styles.secondaryBtn}
                                key="save"
                                onClick={() => form.submit()}
                            >
                                Lưu
                            </button>
                            <button
                                className={styles.secondaryBtn}
                                key="changepass"
                                onClick={() => router.push('/change-password')}
                            >
                                Đổi mật khẩu
                            </button>

                            <button
                                className={styles.secondaryBtn}
                                key="logout"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                            <button
                                className={styles.secondaryBtn}
                                key="back"
                                onClick={handleClose}
                            >
                                Hủy
                            </button>
                        </div>,
                    ]}
                >
                    <div className={styles.form}>
                        <Form
                            layout="vertical"
                            form={form}
                            scrollToFirstError
                            onFinish={handleSave}
                        >
                            <Form.Item
                                label="Tên:"
                                rules={[{ required: true, message: 'Bạn chưa nhập tên!' }]}
                                initialValue={myProfile.name}
                                name="name"
                            >
                                <Input className={styles.textInputLight} />
                            </Form.Item>

                            <Form.Item
                                label="Địa chỉ:"
                                rules={[{ required: true, message: 'Bạn chưa nhập địa chỉ!' }]}
                                initialValue={myProfile.address}
                                name="address"
                            >
                                <Input className={styles.textInputLight} />
                            </Form.Item>

                            <div className="row">
                                <div className="col-5">
                                    <Form.Item
                                        name="phone"
                                        label="Số điện thoại:"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Bạn chưa nhập số điện thoại!',
                                            },
                                        ]}
                                        initialValue={myProfile.phone}
                                    >
                                        <Input className={styles.textInputLight} />
                                    </Form.Item>
                                </div>
                                <div className="col-6 offset-1">
                                    <Form.Item
                                        label="Email:"
                                        name="email"
                                        rules={[
                                            { required: true, message: 'Bạn chưa nhập email!' },
                                        ]}
                                        initialValue={myProfile.email}
                                    >
                                        <Input className={styles.textInputLight} />
                                    </Form.Item>
                                </div>

                                <div className="col-5">
                                    <Form.Item
                                        label="Giới tính:"
                                        name="gender"
                                        initialValue={myProfile.gender}
                                    >
                                        <Radio.Group defaultValue={myProfile.gender}>
                                            <Radio value={0}>Nam</Radio>
                                            <Radio value={1}>Nữ</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                                <div className="col-6 offset-1">
                                    <Form.Item
                                        label="Ngày sinh:"
                                        name="birthday"
                                        initialValue={moment(myProfile.birthday)}
                                    >
                                        <DatePicker
                                            className={styles.datePicker}
                                            disabledDate={disabledFuture}
                                        />
                                    </Form.Item>
                                </div>

                                <div className="col-5">
                                    <Form.Item
                                        label="Số CCCD:"
                                        initialValue={myProfile.citizenCode}
                                        name="citizenCode"
                                    >
                                        <Input className={styles.textInputLight} />
                                    </Form.Item>
                                </div>
                                <div className="col-6 offset-1">
                                    <Form.Item
                                        label="Ảnh đại diện:"
                                        name="avatarId"
                                        initialValue={myProfile.avatarId}
                                    >
                                        <img
                                            style={{
                                                width: 150,
                                                margin: '30px 0',
                                                display: 'block',
                                            }}
                                            src={
                                                avatar
                                                    ? avatar.originUrl
                                                    : myProfile?.avatar?.originUrl
                                            }
                                            alt="avatar"
                                        />
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
                                </div>
                            </div>
                        </Form>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default connect(({ MASTERDATA }) => ({
    masterdataStore: MASTERDATA,
}))(Admin);

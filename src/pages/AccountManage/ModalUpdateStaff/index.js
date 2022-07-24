import { message, Modal } from 'antd';
import Cleave from 'cleave.js/react';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import styles from './styles.scss';
import ModalLoading from '@/components/ModalLoading';

function ModalUpdateStaff({ dispatch, currentStaff, setCurrentStaff, accountStore }) {
    const { detailAccount } = accountStore;
    const [depositAgent, setDepositAgent] = useState();
    const [withdrawAgent, setWithdrawAgent] = useState();
    const [depositSystem, setDepositAgentSystem] = useState();
    const [withdrawSystem, setWithdrawSystem] = useState();
    console.log('detailAccount', detailAccount);

    useEffect(() => {
        const payload = { userId: currentStaff.id };
        dispatch({ type: 'ACCOUNT/getDetailAccount', payload });
    }, [currentStaff, dispatch]);

    const handleClose = () => {
        setCurrentStaff({
            ...currentStaff,
            isShow: false,
        });
    };

    useEffect(() => {
        if (detailAccount) {
            setDepositAgent(detailAccount.userMoneyConfig.agentPayFeeBank);
            setWithdrawAgent(detailAccount.userMoneyConfig.agentWithdrawFeeBank);
            setDepositAgentSystem(detailAccount.userMoneyConfig.systemPayFeeBank);
            setWithdrawSystem(detailAccount.userMoneyConfig.systemWithdrawFeeBank);
        }
    }, [detailAccount]);

    const handleSubmit = () => {
        if (!depositAgent || !withdrawAgent || !depositSystem || !withdrawSystem) {
            message.error(formatMessage({ id: 'REQUIRE_VALUE' }));
            return;
        }
        const payload = {
            ownerId: currentStaff.id,
            dailyWithdrawMoney: detailAccount.userMoneyConfig.dailyWithdrawMoney,
            oneTimesWithdrawMoney: detailAccount.userMoneyConfig.oneTimesWithdrawMoney,
            agentPayFeeBank: depositAgent,
            agentPayFeeQrBank: depositAgent,
            agentPayFeeWallet: depositAgent,
            agentPayFeeWalletQr: depositAgent,
            agentPayFeeUsdt: depositAgent,
            systemPayFeeQrBank: depositSystem,
            systemPayFeeBank: depositSystem,
            systemPayFeeWalletQr: depositSystem,
            systemPayFeeWallet: depositSystem,
            systemPayFeeUsdt: depositSystem,
            agentWithdrawFeeQrBank: withdrawAgent,
            agentWithdrawFeeBank: withdrawAgent,
            agentWithdrawFeeWalletQr: withdrawAgent,
            agentWithdrawFeeWallet: withdrawAgent,
            systemWithdrawFeeQrBank: withdrawSystem,
            systemWithdrawFeeBank: withdrawSystem,
            systemWithdrawFeeWalletQr: withdrawSystem,
            systemWithdrawFeeWallet: withdrawSystem,
        };
        dispatch({ type: 'ACCOUNT/configMoney', payload });
        handleClose();
    };

    const handleChangeDeposit = e => {
        setDepositAgent(Number(e.currentTarget.rawValue));
    };

    const handleChangeWithdraw = e => {
        setWithdrawAgent(Number(e.currentTarget.rawValue));
    };

    const handleChangeDepositSystem = e => {
        setDepositAgentSystem(Number(e.currentTarget.rawValue));
    };

    const handleChangeWithdrawSystem = e => {
        setWithdrawSystem(Number(e.currentTarget.rawValue));
    };

    if (!detailAccount) {
        return <ModalLoading />;
    }

    return (
        <Modal
            title={formatMessage({ id: 'CONFIG_PERCENT_DEPOSIT_WITHDRAW' })}
            visible={currentStaff.isShow}
            wrapClassName={styles.modal}
            onOk={handleSubmit}
            okText={formatMessage({ id: 'SUBMIT' })}
            onCancel={handleClose}
            destroyOnClose
        >
            <div className={styles.form}>
                <div>
                    <span className="mb-2 d-block">
                        {formatMessage({ id: 'DEPOSIT_FEE_FOR_AGENT' })} ( % ):
                    </span>
                    <Cleave
                        value={detailAccount.userMoneyConfig.agentPayFeeBank}
                        className={styles.textInputLight}
                        onChange={handleChangeDeposit}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                        }}
                    />
                </div>

                <div className="mt-4">
                    <span className="mb-2 d-block">
                        {formatMessage({ id: 'WITHDRAWAL_FEE_FOR_AGENT' })} ( % ):
                    </span>

                    <Cleave
                        value={detailAccount.userMoneyConfig.agentWithdrawFeeBank}
                        className={styles.textInputLight}
                        onChange={handleChangeWithdraw}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                        }}
                    />
                </div>

                <div className="mt-4">
                    <span className="mb-2 d-block">
                        {formatMessage({ id: 'DEPOSIT_FEE_FOR_SYSTEM' })} ( % ):
                    </span>
                    <Cleave
                        value={detailAccount.userMoneyConfig.systemPayFeeBank}
                        className={styles.textInputLight}
                        onChange={handleChangeDepositSystem}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                        }}
                    />
                </div>

                <div className="mt-4">
                    <span className="mb-2 d-block">
                        {formatMessage({ id: 'WITHDRAWAL_FEE_FOR_SYSTEM' })} ( % ):
                    </span>

                    <Cleave
                        value={detailAccount.userMoneyConfig.systemWithdrawFeeBank}
                        className={styles.textInputLight}
                        onChange={handleChangeWithdrawSystem}
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: 'thousand',
                        }}
                    />
                </div>
            </div>
        </Modal>
    );
}
export default connect(({ ACCOUNT }) => ({
    accountStore: ACCOUNT,
}))(ModalUpdateStaff);

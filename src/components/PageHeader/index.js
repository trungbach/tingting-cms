/* eslint-disable jsx-a11y/alt-text */
import ic_business from '@/assets/image/ic_business.svg';
import ic_card from '@/assets/image/ic_card.svg';
import ic_deposit from '@/assets/image/ic_deposit.svg';
import ic_setting from '@/assets/image/ic_setting.svg';
import ic_transaction from '@/assets/image/ic_transaction.svg';
import ic_withdraw from '@/assets/image/ic_withdraw.svg';
import logo_tingting from '@/assets/image/logo_tingting.jpg';
import { ADMIN_KEY } from '@/config/constant';
import { useLocalStorage } from '@/hooks';
import { Layout, Menu } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'umi';
import { formatMessage } from 'umi-plugin-react/locale';
import { Role } from '../../config/constant';
import styles from './styles.scss';
const { Sider } = Layout;
const { SubMenu } = Menu;

function PageHeader(props) {
    const { location, masterDataStore } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState(location.pathname);

    const [admin] = useLocalStorage(ADMIN_KEY);
    const { companies } = masterDataStore;

    let listMenu = [
        {
            page: 'transaction',
            icon: <img src={ic_transaction} />,
            url: '/home/transaction',
            text: formatMessage({ id: 'DASHBOARD' }),
        },
        {
            page: 'deposit',
            icon: <img src={ic_deposit} />,
            url: '/home/deposit',
            text: formatMessage({ id: 'DEPOSIT' }),
        },
        {
            page: 'withdraw',
            icon: <img src={ic_withdraw} />,
            url: '/home/withdraw',
            text: formatMessage({ id: 'WITHDRAW' }),
        },
    ];
    console.log('admin', admin);
    if (admin?.role === Role.ROLE_ADMIN) {
        const adminMenu = [
            {
                page: 'account-manage',
                icon: <img src={ic_business} />,
                url: '/home/account-manage',
                text: formatMessage({ id: 'ACCOUNT_MANAGEMENT' }),
            },
            {
                page: 'admin',
                icon: <img src={ic_business} />,
                url: '/home/admin',
                text: formatMessage({ id: 'ADMIN' }),
            },
            {
                page: 'ip',
                icon: <img src={ic_business} />,
                url: '/home/ip-address',
                text: formatMessage({ id: 'IP_ADDRESS_LIMIT' }),
            },
        ];
        listMenu = [...listMenu, ...adminMenu];
    }

    useEffect(() => {
        setPage(location.pathname);
    }, [location.pathname]);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const renderListMenu = listMenu.map((menu, index) => {
        return (
            <Menu.Item
                key={menu.url}
                icon={menu.icon}
                className={
                    page === menu.url ||
                    page.includes(menu.subUrl) ||
                    page.includes(menu.subUrl1) ||
                    page.includes(menu.subUrl2) ||
                    page.includes(menu.subUrl3) ||
                    page.includes(menu.subUrl4)
                        ? styles.activeAdmin
                        : ''
                }
            >
                <Link to={menu.url}>
                    <span className={styles.menuText}>{menu.text}</span>
                </Link>
            </Menu.Item>
        );
    });

    return (
        <div className={styles.menuHeader}>
            <Sider
                width={250}
                collapsedWidth={100}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                mode="inline"
            >
                <div className={styles.logoMenu}>
                    <img style={{ width: collapsed ? 100 : 145 }} src={logo_tingting} alt="logo" />
                </div>
                <Menu theme="dark" mode="inline">
                    {renderListMenu}
                    {admin?.role === Role.ROLE_ADMIN && (
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                                    <img src={ic_card} alt="" />
                                    <span style={{ marginLeft: '10px' }}>
                                        {formatMessage({ id: 'CARD' })}
                                    </span>
                                </span>
                            }
                        >
                            <Menu.Item key="9" icon={<img src={ic_setting} />}>
                                <Link to="/home/device-management">
                                    <span className={styles.menuText}>
                                        {formatMessage({ id: 'DEVICE_MANAGEMENT' })}
                                    </span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="10" icon={<img src={ic_transaction} />}>
                                <Link to="/home/tranfer-balance">
                                    <span className={styles.menuText}>
                                        {formatMessage({ id: 'TRANFER_BALANCE' })}
                                    </span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                    )}
                </Menu>
            </Sider>
        </div>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(withRouter(PageHeader));

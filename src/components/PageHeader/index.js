import React, { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { connect } from 'dva';
import { withRouter, Link } from 'umi';
import ic_overview from '@/assets/image/ic_overview.svg';
import ic_transaction from '@/assets/image/ic_transaction.svg';
import ic_account from '@/assets/image/ic_account.svg';
import ic_business from '@/assets/image/ic_business.svg';
import ic_borrow from '@/assets/image/ic_borrow.png';
import ic_logo from '@/assets/image/ic_logo.svg';
import ic_statement from '@/assets/image/ic_statement.png';
import styles from './styles.scss';
import { ROLE_ADMIN_SYSTEM, ROLE_ADMIN_COMPANY, ADMIN_KEY } from '@/config/constant';
import { useSessionStorage } from '@/hooks';
import { router } from 'umi';
const { Sider } = Layout;

function PageHeader(props) {
    const { location, masterDataStore } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState(location.pathname);

    const [admin] = useSessionStorage(ADMIN_KEY);
    const { companies } = masterDataStore;

    const adminMenu = [
        {
            page: 'overview',
            icon: <img src={ic_overview} />,
            url: '/admin/overview',
            text: 'Tổng quan',
        },
        {
            page: 'transaction',
            icon: <img src={ic_transaction} />,
            url: '/admin/transaction-manage',
            subUrl: '/admin/detail-transaction',
            subUrl1: '/admin/update-transaction',
            text: 'Quản lý giao dịch',
        },
        {
            page: 'account-manage',
            icon: <img src={ic_account} />,
            url: '/admin/account-manage',
            subUrl: '/admin/create-account',
            subUrl1: '/admin/detail-account',
            subUrl2: '/admin/edit-account',
            subUrl3: '/admin/contract-account',
            subUrl4: '/admin/bank-account',
            text: 'Quản lý tài khoản',
        },

        {
            page: 'company',
            icon: <img src={ic_business} />,
            url: (() => {
                if (admin?.role === ROLE_ADMIN_SYSTEM) {
                    return '/admin/company-manage';
                } else {
                    if (companies.length) {
                        const company = companies.find(company => company.id === admin.companyId);
                        return `/admin/detail-company/${company?.code}`;
                    }
                }
            })(),
            subUrl: '/admin/detail-company',
            subUrl1: '/admin/update-company',
            subUrl2: '/admin/create-company',
            text:
                admin?.role === ROLE_ADMIN_SYSTEM
                    ? 'Quản lý doanh nghiệp'
                    : 'Thông tin doanh nghiệp',
        },
        {
            page: 'statement-manage',
            icon: <img src={ic_statement} />,
            url: '/admin/statement-manage',
            subUrl4: '/admin/transaction-statement-manage',
            text: 'Quản lý sao kê',
        },
    ];

    if (admin?.role === ROLE_ADMIN_COMPANY) {
        adminMenu.push({
            page: 'borrowing',
            icon: <img src={ic_borrow} />,
            url: '/admin/borrow-manage',
            text: 'Quản lý dư nợ nhân viên',
        });
    }

    useEffect(() => {
        setPage(location.pathname);
    }, [location.pathname]);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const renderListMenu = adminMenu.map((menu, index) => {
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
                width={300}
                collapsedWidth={100}
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                mode="inline"
            >
                <div className={styles.logoMenu}>
                    <img style={{ width: collapsed ? 100 : 145 }} src={ic_logo} alt="logo" />
                </div>
                <Menu theme="dark" mode="inline">
                    {renderListMenu}
                </Menu>
            </Sider>
        </div>
    );
}

export default connect(({ MASTERDATA }) => ({
    masterDataStore: MASTERDATA,
}))(withRouter(PageHeader));

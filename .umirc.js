// ref: https://umijs.org/config/
export default {
    treeShaking: true,
    sass: {},
    routes: [
        {
            path: '/',
            component: '../pages/Login',
            Routes: ['./src/components/AdminAuthentication'],
        },
        {
            path: '/login',
            component: '../pages/Login',
            Routes: ['./src/components/AdminAuthentication'],
        },
        {
            path: '/forgot-password',
            component: '../pages/ForgotPassword',
            Routes: ['./src/components/AdminAuthentication'],
        },

        {
            path: '/change-password',
            component: '../pages/ChangePassword',
            Routes: ['./src/components/AdminAuthentication'],
        },

        {
            path: '/change-first-password',
            component: '../pages/Login/ChangePasswordInit',
            Routes: ['./src/components/AdminAuthentication'],
        },

        {
            path: '/home',
            component: '../Wrappers',
            routes: [
                {
                    path: '/home/transaction',
                    component: '../pages/Transaction',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/home/deposit',
                    component: '../pages/Deposit',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/home/withdraw',
                    component: '../pages/Withdraw',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/home/account-manage',
                    component: '../pages/AccountManage',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/home/device-management',
                    component: '../pages/DeviceManagement',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/home/tranfer-balance',
                    component: '../pages/TransferBalance',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/home/admin',
                    component: '../pages/Admin',
                    Routes: ['./src/components/AdminAuthentication'],
                },
            ],
        },

        {
            path: '/admin',
            component: '../Wrappers',
            routes: [
                {
                    path: '/admin',
                    component: '../pages/Overview',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/admin/overview',
                    component: '../pages/Overview',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                // Admin Account

                {
                    path: '/admin/my-account',
                    component: '../pages/MyAccount',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                // Transaction Page
                {
                    path: '/admin/transaction-manage',
                    component: '../pages/TransactionManage',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/detail-transaction/:transactionCode',
                    component: '../pages/TransactionManage/Detail',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                // Acount Page
                {
                    path: '/admin/account-manage',
                    component: '../pages/AccountManage',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/create-account',
                    component: '../pages/AccountManage/Create',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/edit-account/:userCode',
                    component: '../pages/AccountManage/Edit',
                    Routes: ['./src/components/AdminAuthentication'],
                },
                {
                    path: '/admin/detail-account/:userCode',
                    component: '../pages/AccountManage/Detail',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/contract-account/:userCode',
                    component: '../pages/AccountManage/Contract',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/bank-account/:userCode',
                    component: '../pages/AccountManage/Bank',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                // Company Page
                {
                    path: '/admin/company-manage',
                    component: '../pages/CompanyManage',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/create-company',
                    component: '../pages/CompanyManage/Create',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/detail-company/:companyCode',
                    component: '../pages/CompanyManage/Detail',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/update-company/:companyCode',
                    component: '../pages/CompanyManage/Edit',
                    Routes: ['./src/components/AdminAuthentication'],
                },

                {
                    path: '/admin/borrow-manage',
                    component: '../pages/BorrowManage',
                    Routes: ['./src/components/AdminAuthentication'],
                },
            ],
        },
    ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                antd: true,
                dva: true,
                dynamicImport: { webpackChunkName: true },
                title: 'TingTing',
                dll: false,
                locale: {
                    enable: true,
                    default: 'en-US',
                },
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//,
                    ],
                },
            },
        ],
    ],
};

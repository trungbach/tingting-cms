import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';
import RendererWrapper0 from '/Users/macair/TrungBach/TingTingPayCMS/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__Login" */ '../Login'),
        })
      : require('../Login').default,
    Routes: [require('../../components/AdminAuthentication').default],
    exact: true,
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    path: '/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__Login" */ '../Login'),
        })
      : require('../Login').default,
    Routes: [require('../../components/AdminAuthentication').default],
    exact: true,
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    path: '/forgot-password',
    component: __IS_BROWSER
      ? _dvaDynamic({
          app: require('@tmp/dva').getApp(),
          models: () => [
            import(/* webpackChunkName: 'p__ForgotPassword__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/ForgotPassword/models/index.js').then(
              m => {
                return { namespace: 'index', ...m.default };
              },
            ),
          ],
          component: () =>
            import(/* webpackChunkName: "p__ForgotPassword" */ '../ForgotPassword'),
        })
      : require('../ForgotPassword').default,
    Routes: [require('../../components/AdminAuthentication').default],
    exact: true,
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    path: '/change-password',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__ChangePassword" */ '../ChangePassword'),
        })
      : require('../ChangePassword').default,
    Routes: [require('../../components/AdminAuthentication').default],
    exact: true,
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    path: '/change-first-password',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "p__Login__ChangePasswordInit" */ '../Login/ChangePasswordInit'),
        })
      : require('../Login/ChangePasswordInit').default,
    Routes: [require('../../components/AdminAuthentication').default],
    exact: true,
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    path: '/home',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "Wrappers" */ '../../Wrappers'),
        })
      : require('../../Wrappers').default,
    routes: [
      {
        path: '/home/transaction',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Transaction__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/Transaction/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Transaction" */ '../Transaction'),
            })
          : require('../Transaction').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/home/deposit',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Deposit__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/Deposit/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Deposit" */ '../Deposit'),
            })
          : require('../Deposit').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/home/withdraw',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Withdraw__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/Withdraw/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Withdraw" */ '../Withdraw'),
            })
          : require('../Withdraw').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/home/account-manage',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage" */ '../AccountManage'),
            })
          : require('../AccountManage').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/home/device-management',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__DeviceManagement__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/DeviceManagement/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__DeviceManagement" */ '../DeviceManagement'),
            })
          : require('../DeviceManagement').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/home/tranfer-balance',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__TransferBalance__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/TransferBalance/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__TransferBalance" */ '../TransferBalance'),
            })
          : require('../TransferBalance').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/home/admin',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Admin__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/Admin/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Admin" */ '../Admin'),
            })
          : require('../Admin').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/macair/TrungBach/TingTingPayCMS/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
    ],
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    path: '/admin',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(/* webpackChunkName: "Wrappers" */ '../../Wrappers'),
        })
      : require('../../Wrappers').default,
    routes: [
      {
        path: '/admin',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Overview__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/Overview/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Overview" */ '../Overview'),
            })
          : require('../Overview').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/overview',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__Overview__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/Overview/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__Overview" */ '../Overview'),
            })
          : require('../Overview').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/my-account',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__MyAccount" */ '../MyAccount'),
            })
          : require('../MyAccount').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/transaction-manage',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__TransactionManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/TransactionManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__TransactionManage" */ '../TransactionManage'),
            })
          : require('../TransactionManage').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/detail-transaction/:transactionCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__TransactionManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/TransactionManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__TransactionManage__Detail" */ '../TransactionManage/Detail'),
            })
          : require('../TransactionManage/Detail').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/account-manage',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage" */ '../AccountManage'),
            })
          : require('../AccountManage').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/create-account',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage__Create" */ '../AccountManage/Create'),
            })
          : require('../AccountManage/Create').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/edit-account/:userCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage__Edit" */ '../AccountManage/Edit'),
            })
          : require('../AccountManage/Edit').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/detail-account/:userCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage__Detail" */ '../AccountManage/Detail'),
            })
          : require('../AccountManage/Detail').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/contract-account/:userCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage__Contract" */ '../AccountManage/Contract'),
            })
          : require('../AccountManage/Contract').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/bank-account/:userCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__AccountManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/AccountManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__AccountManage__Bank" */ '../AccountManage/Bank'),
            })
          : require('../AccountManage/Bank').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/company-manage',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__CompanyManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/CompanyManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__CompanyManage" */ '../CompanyManage'),
            })
          : require('../CompanyManage').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/create-company',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__CompanyManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/CompanyManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__CompanyManage__Create" */ '../CompanyManage/Create'),
            })
          : require('../CompanyManage/Create').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/detail-company/:companyCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__CompanyManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/CompanyManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__CompanyManage__Detail" */ '../CompanyManage/Detail'),
            })
          : require('../CompanyManage/Detail').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/update-company/:companyCode',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__CompanyManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/CompanyManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__CompanyManage__Edit" */ '../CompanyManage/Edit'),
            })
          : require('../CompanyManage/Edit').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        path: '/admin/borrow-manage',
        component: __IS_BROWSER
          ? _dvaDynamic({
              app: require('@tmp/dva').getApp(),
              models: () => [
                import(/* webpackChunkName: 'p__BorrowManage__models__index.js' */ '/Users/macair/TrungBach/TingTingPayCMS/src/pages/BorrowManage/models/index.js').then(
                  m => {
                    return { namespace: 'index', ...m.default };
                  },
                ),
              ],
              component: () =>
                import(/* webpackChunkName: "p__BorrowManage" */ '../BorrowManage'),
            })
          : require('../BorrowManage').default,
        Routes: [require('../../components/AdminAuthentication').default],
        exact: true,
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/macair/TrungBach/TingTingPayCMS/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
        _title: 'TingTing',
        _title_default: 'TingTing',
      },
    ],
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/macair/TrungBach/TingTingPayCMS/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
    _title: 'TingTing',
    _title_default: 'TingTing',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}

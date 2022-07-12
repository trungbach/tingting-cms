import superagent from 'superagent';
import config from '@/config';
import { router } from 'umi';
import { handleRemoveSession } from '@/util/function';
export default {
    get: (url, data = {}) =>
        superagent
            .get(config.API_DOMAIN + url)
            .query(data)
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
            .set('Accept', 'application/json')
            .use(req =>
                req.on('error', err => {
                    if (err.status === 401) {
                        handleRemoveSession();
                        router.push({ pathname: '/login' });
                    }
                }),
            ),

    post: (url, data = {}) =>
        superagent
            .post(config.API_DOMAIN + url)
            .send(data)
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
            .set('Accept', 'application/json, multipart/form-data')
            .use(req =>
                req.on('error', err => {
                    if (err.status === 401 && url !== '/login') {
                        handleRemoveSession();
                        router.push({ pathname: '/login' });
                    }
                }),
            ),

    put: (url, data = {}) =>
        superagent
            .put(config.API_DOMAIN + url)
            .send(data)
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
            .set('Accept', 'application/json, multipart/form-data')
            .use(req =>
                req.on('error', err => {
                    if (err.status === 401) {
                        handleRemoveSession();
                        router.push({ pathname: '/login' });
                    }
                }),
            ),

    delete: (url, data = {}) =>
        superagent
            .delete(config.API_DOMAIN + url)
            .send(data)
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
            .set('Accept', 'application/json')
            .use(req =>
                req.on('error', err => {
                    if (err.status === 401) {
                        handleRemoveSession();
                        router.push({ pathname: '/login' });
                    }
                }),
            ),

    download: (url, data = {}) =>
        superagent
            .get(config.API_DOMAIN + url)
            .query(data)
            .set('Authorization', 'Bearer ' + sessionStorage.getItem('token'))
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/pdf')
            .set('Content-Disposition', 'attachment; filename="qr.pdf"')
            .responeType('blob')
            .use(req =>
                req.on('error', err => {
                    if (err.status === 401) {
                        handleRemoveSession();
                        router.push({ pathname: '/login' });
                    }
                }),
            ),
};

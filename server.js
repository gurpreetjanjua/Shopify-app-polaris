const express = require('express');
const next = require('next');
const path = require('path');
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const apiRoutes = require('./server/routes/shopify.js');
const nonce = require('nonce')();
const dotenv = require('dotenv').config();
const request = require('request-promise');

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

app.prepare().then(() => {
    const server = express();
    server.use(bodyParser.json());
    // shopify routes
    server.use('/api', apiRoutes);

    server.get('/install', (req, res) => {
        const shop = req.query.shop;
        const permissions = req.query.scopes ? req.query.scopes : ["read_orders", "read_products"];
        const scopes = permissions.toString();
        if (shop) {
            const state = nonce();
            const redirectUri = 'https://abc-zjaz.localhost.run/callback';
            const installUrl = 'https://' + shop +
                '/admin/oauth/authorize?client_id=' + apiKey +
                '&scope=' + scopes +
                '&state=' + state +
                '&redirect_uri=' + redirectUri;
            res.redirect(installUrl);
        } else {
            return res.status(400).send('Wrong Store');
        }
    });

    server.get('/callback', (req, res) => {
        const { shop, hmac, code, state } = req.query;

        if (shop && hmac && code) {
            const accessTokenRequestUrl = 'https://' + shop + '/admin/oauth/access_token';
            const accessTokenPayload = {
                client_id: apiKey,
                client_secret: apiSecret,
                code,
            };

            request.post(accessTokenRequestUrl, {
                json: accessTokenPayload
            }).then((accessTokenResponse) => {
                console.log('accessTokenResponse: ', accessTokenResponse);
                res.redirect('//' + shop + '/admin/apps/react-polaris-1');
            }).catch((error) => {
                res.status(error.statusCode).send(error.error.error_description);
            });
        } else {
            res.status(400).send('Required parameters missing');
        }
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    });

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`> Read on http://localhost:${PORT}`)
    });
})

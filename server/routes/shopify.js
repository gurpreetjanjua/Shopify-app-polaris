const express = require('express');
const router = express();
const Shopify = require('shopify-api-node');


router.get('/orders', (req, res) => {
    const shopify = new Shopify({
        shopName: 'appinfo.myshopify.com',
        accessToken: '28fd77785bf6e57adb93217fd9a343f0'
    });

    shopify.order.list({ limit: 5 })
        .then(orders => {
            return res.send(orders) 
        })
        .catch(err => {
            console.error('err', err)
        });
})


module.exports = router;
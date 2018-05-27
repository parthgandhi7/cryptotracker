const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');
const request = require('request');
const COIN_MARKET_API = 'https://api.coinmarketcap.com/';
const TICKER_API = 'v2/ticker/';
import { get } from 'lodash';
// const apiRoutes = require('./server/routes/apiRoutes.js');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.post('/coins', (req, res) => {
    console.log(req.body);
    let currencyCode = req.body.currencyCode || 'INR';
    function makeProperData (data) {
      let responseArr = [];
      data.forEach((eachElement) => {
        let obj = {
          id: eachElement.id,
          name: eachElement.name + ' (' + eachElement.symbol + ')',
          symbol: eachElement.symbol,
          rank: eachElement.rank,
          website_slug: eachElement.website_slug,
          last_updated: new Date(eachElement.last_updated*1000),
          inr_price:(get(eachElement, `quotes.${currencyCode}.price`)).toLocaleString(),
          inr_market_cap:get(eachElement, `quotes.${currencyCode}.market_cap`).toLocaleString(),
          usd_price:get(eachElement, 'quotes.USD.price').toLocaleString(),
          usd_market_cap:get(eachElement, 'quotes.USD.market_cap').toLocaleString()
        };
        responseArr.push(obj);
      })

      return responseArr;
    }
    request
    .get(`${COIN_MARKET_API}${TICKER_API}?structure=array&convert=${currencyCode}&sort=rank`, function (e, r, body) {
        console.log("body: ", body);
        res.json({
          code: 'SUCCESS',
          message: 'Response successful',
          data: makeProperData(JSON.parse(body).data)
        })
        // res.send(response);
    })

  })
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3000');
  });
});

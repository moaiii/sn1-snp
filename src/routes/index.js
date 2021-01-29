var SplitTheVote = require('../utils/index');
const fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

router.get('/api', function(req, res, next) {
  try {
    const snpRatio = req.query.sr;
    const region = req.query.region;
    const x = SplitTheVote({snpRatio, region});
    res.status(200).send(x);
  } catch (e) {
    console.log(e)
  }
});

router.get('/:region?/:sr?', async function(req, res, next) {
  try {
    const { region = 'scotland', sr = '0' } = req.params ;
    const _sr = ((100 - sr) / 100).toFixed(2);
    let url = 'http://localhost:3000/api?sr=' + _sr + '&region=' + region;
    const data = await fetch(url).then(res => res.json());
    res.render('index', { title: 'Holyrood 2021', ...data });
  } catch (e) {
    console.log(e)
  }
});


module.exports = router;
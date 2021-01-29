const fetch = require('node-fetch');

(async function() {
  var url = 'http://localhost:3000/api';

  const _res = [];

  for (let i = 20; i >= 0; i--) {
    let sr = (1/20 * i).toFixed(2);

    const call = await fetch(url + '?sr=' + sr + "&region=south of scotland")
      .then(res => res.json())
      .then(json => {
        return {
          ratio: sr,
          indyRegionalTotal: json.alliances.indy.regional,
          unionRegionalTotal: json.alliances.union.regional,
        }
      })
    
    _res.push(call)
  }

  var all = await Promise.all(_res)
    .then(r => r);

  console.log(all);
})();

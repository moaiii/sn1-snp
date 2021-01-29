var regions = require('./Region');

module.exports = ({ snpRatio }) => {
  const _snpRatio = parseFloat(snpRatio);

  if (_snpRatio > 1 || _snpRatio < 0) {
    throw new Error('snp Ratio is out of bounds', { _snpRatio });
  }

  var newRegions = { ...regions };

  var x = Object.entries(newRegions)
    .map((el) => {
      const [regionName, data] = el;
      const {
        votes: { party },
      } = data;

      const newSnp = Math.floor(party.snp * _snpRatio);
      // prettier-ignore
      const newGreen = party.green + (party.snp * (1 - _snpRatio));
      // prettier-ignore
      // console.log(regionName, party.green, newGreen, (1 - _snpRatio));

      return {
        regionName,
        ...data,
        votes: {
          ...data.votes,
          party: {
            ...data.votes.party,
            snp: Math.floor(newSnp),
            green: Math.floor(newGreen),
          },
        },
      };
    })
    .reduce((acc, cur) => {
      return {
        ...acc,
        [cur.regionName]: { ...cur },
      };
    }, {});

  return x;
};

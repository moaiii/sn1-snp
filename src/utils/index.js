var format = require('format-number');
var Party = require('./Party');
var Alliance = require('./Alliance');
var Vote = require('./Vote');
var Modifier = require('./Modifier');
var Regions = require('./Region');

// parties

const Parties = [
  {
    name: 'snp',
    colour: '#fdf38e',
    allegiance: 'independence',
  },
  {
    name: 'green',
    colour: '#43b02a',
    allegiance: 'independence',
  },
  {
    name: 'conservative',
    colour: '#00aeef',
    allegiance: 'union',
  },
  {
    name: 'labour',
    colour: '#e4003b',
    allegiance: 'union',
  },
  {
    name: 'libdems',
    colour: '#faa01a',
    allegiance: 'union',
  },
];

var condenseData = ({ allRegionalVotes, region }) => {
  var regionSelectionData;
  var partyInfo;
  var regionMetaData;

  if (region.toLowerCase() === 'scotland') {
    var aux = Object.values(allRegionalVotes)
      .map((region) => {
        return region.parties.map((party) => {
          return {
            name: party.name,
            constituencySeats: party.constituencySeats,
            listVoteCount: party.listVoteCount,
            regionalSeats: party.rounds.length,
          };
        });
      })
      .flat()
      .reduce(
        (acc, cur) => {
          return {
            ...acc,
            [cur.name]: {
              name: cur.name,
              originalList: acc[cur.name].originalList,
              constituencySeats:
                acc[cur.name].constituencySeats + cur.constituencySeats,
              listVoteCount: acc[cur.name].listVoteCount + cur.listVoteCount,
              regionalSeats: acc[cur.name].regionalSeats + cur.regionalSeats,
              totalSeats:
                acc[cur.name].constituencySeats +
                cur.constituencySeats +
                acc[cur.name].regionalSeats +
                cur.regionalSeats,
            },
          };
        },
        {
          snp: {
            constituencySeats: 0,
            listVoteCount: 0,
            regionalSeats: 0,
            originalList: 4,
          },
          green: {
            constituencySeats: 0,
            listVoteCount: 0,
            regionalSeats: 0,
            originalList: 6,
          },
          conservative: {
            constituencySeats: 0,
            listVoteCount: 0,
            regionalSeats: 0,
            originalList: 24,
          },
          labour: {
            constituencySeats: 0,
            listVoteCount: 0,
            regionalSeats: 0,
            originalList: 21,
          },
          libdems: {
            constituencySeats: 0,
            listVoteCount: 0,
            regionalSeats: 0,
            originalList: 1,
          },
        },
      );

    partyInfo = Object.values(aux).map((el) => {
      return {
        ...el,
        listVoteCount: format()(el.listVoteCount),
      };
    });
  } else {
    const { listOriginal } = Regions[region];

    regionSelectionData = allRegionalVotes[region];

    partyInfo = regionSelectionData.parties.map((party) => {
      return {
        name: party.name,
        constituencySeats: party.constituencySeats,
        listVoteCount: format()(party.listVoteCount.toFixed(0)),
        regionalSeats: party.rounds.length,
        totalSeats: party.constituencySeats + party.rounds.length,
        originalList: listOriginal[party.name],
      };
    });

    regionMetaData = {
      constituencies: regionSelectionData.region.constituencies,
      votes: format()(regionSelectionData.region.votes.total.toFixed(0)),
      electorate: format({ suffix: ' eligible voters' })(
        regionSelectionData.region.votes.electorate.toFixed(0),
      ),
      turnout:
        (
          (regionSelectionData.region.votes.total /
            regionSelectionData.region.votes.electorate) *
          100
        ).toFixed(1) + '%',
    };
  }

  var totals = partyInfo.reduce(
    (a, c) => {
      var _listVoteCount =
        parseFloat(a.listVoteCount.replace(/,/g, '')) +
        parseFloat(c.listVoteCount.toString().replace(/,/g, ''));

      return {
        constituencySeats: a.constituencySeats + c.constituencySeats,
        listVoteCount: format()(_listVoteCount),
        regionalSeats: a.regionalSeats + c.regionalSeats,
        totalSeats: a.totalSeats + c.totalSeats,
      };
    },
    {
      name: '',
      constituencySeats: 0,
      listVoteCount: '0',
      regionalSeats: 0,
      totalSeats: 0,
    },
  );

  return {
    partyInfo,
    regionMetaData,
    totals,
  };
};

var SplitTheVote = ({ snpRatio = 1, region = 'scotland' }) => {
  // split the vote

  const modifiedRegions = Modifier({ snpRatio });

  // votes

  const allRegionalVotes = Object.entries(modifiedRegions).reduce(
    (acc, [regionName, regionData]) => {
      return {
        ...acc,
        [regionName]: new Vote({
          name: regionName,
          parties: Parties.map((conf) => {
            return new Party(conf);
          }),
          region: regionData,
        }),
      };
    },
    {},
  );

  // alliance

  var Independence = new Alliance({
    type: 'independence',
    regionalVotes: allRegionalVotes,
    parties: ['snp', 'green'],
  });

  var Unionist = new Alliance({
    type: 'unionist',
    regionalVotes: allRegionalVotes,
    parties: ['libdems', 'labour', 'conservative'],
  });

  // final ui object
  const _data = condenseData({ allRegionalVotes, region });

  return {
    ..._data,
    alliances: {
      indy: Independence.generateData(region),
      union: Unionist.generateData(region),
    },
    region,
    snpRatio,
  };
};

SplitTheVote({ snpRatio: 1, region: 'scotland' });

module.exports = SplitTheVote;

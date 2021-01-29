
var Alliance = (function() {
  function Alliance({name, regionalVotes, parties}) {
    this.TOTAL_SEATS = 129;
    this.name = name;
    this.regionalVotes = regionalVotes;
    this.parties = parties;
  }

  Alliance.prototype.countRegionSeats = function(region) {
    const regionData = this.regionalVotes[region].parties
      .filter(party => this.parties.some(el => el === party.name))
      .reduce((acc, cur) => {
        return acc + cur.rounds.length
      }, 0)

    return regionData;
  }

  Alliance.prototype.countAllRegionsSeats = function() {
    const allRegionCount = Object
      .keys(this.regionalVotes)
      .reduce((acc, cur) => {
        return acc + this.countRegionSeats(cur)
      }, 0);

    return allRegionCount;
  }

  Alliance.prototype.countConstituencySeats = function(region) {
    const constSeats = Object
      .entries(this.regionalVotes[region].region.constituencySeats.party)
      .filter(party => this.parties.some(el => el === party[0] ))
      .reduce((acc, cur) => {
        return acc + cur[1]
      }, 0)

    return constSeats;
  }

  Alliance.prototype.countAllConstituencySeats = function() {
    const allConstCount = Object
      .keys(this.regionalVotes)
      .reduce((acc, cur) => {
        return acc + this.countConstituencySeats(cur)
      }, 0);

    return allConstCount;
  }

  Alliance.prototype.countAllSeats = function() {
    var a = parseFloat(this.countAllRegionsSeats(), 10);
    var b = parseFloat(this.countAllConstituencySeats(), 10);

    // seatShare: ((a + b) / this.TOTAL_SEATS * 100).toFixed(1) + "%" 
    return a + b;
  }

  Alliance.prototype.generateData = function(region) {
    if (region.toLowerCase() === 'scotland') {
      return {
        constituency: this.countAllConstituencySeats(),
        regional: this.countAllRegionsSeats(),
        total: this.countAllSeats()
      }
    } else {
      var regional = this.countRegionSeats(region);
      var constituency = this.countConstituencySeats(region);

      return {
        constituency,
        regional,
        total: constituency + regional
      }
    }
  }

  return Alliance;
})();

module.exports = Alliance;

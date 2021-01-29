
var Party = (function() {
  function Party({name, colour, constituencySeats, listVoteCount, allegiance}) {
    this.name = name;
    this.colour = colour;
    this.constituencySeats = constituencySeats;
    this.listVoteCount = listVoteCount;
    this.allegiance = allegiance;
    this.dHondtIndex = 0;
    this.rounds = []
  }

  Party.prototype.getMeta = function() {
    return {name: this.name, colour: this.colour}
  }

  Party.prototype.setDHondtIndex = function(index) {
    this.dHondtIndex = index;
  }

  Party.prototype.incrementDHondtIndex = function(index) {
    this.dHondtIndex = this.dHondtIndex + 1;
  }

  Party.prototype.addRound = function(round) {
    this.rounds = [...this.rounds, round];
  }

  Party.prototype.setListVoteCount = function(count) {
    this.listVoteCount = count;
  }

  Party.prototype.setConstituencySeats = function(seats) {
    this.setDHondtIndex(seats + 1);
    this.constituencySeats = seats;
  }

  return Party;
})();

module.exports = Party;

var Vote = (function() {
  function Vote({name, parties, region}) {
    this.name = name;
    this.parties = parties;
    this.region = region;
    this.rounds = this.region.votes.seats;

    this.parties.forEach(party => {
      const constituencySeats = this.region.constituencySeats.party[party.name];
      const listVoteCount = this.region.votes.party[party.name];
      party.setConstituencySeats(constituencySeats);
      party.setListVoteCount(listVoteCount);
    });

    this.getSeatAllocation();
  }

  Vote.prototype.getMeta = function() {
    return {name: this.name, parties: this.parties}
  }

  Vote.prototype.applyDuHondt = function() {
    if (this.rounds === 0) {
      return this.parties;
    } else {

      var winningRound = this.parties
        .map((party, idx, arr) => {

          var newListVoteCount =  Math.round(party.listVoteCount / party.dHondtIndex)

          var round = {
            name: party.name,
            index: this.rounds,
            listVoteCount: newListVoteCount,
            dHondtIndex: party.dHondtIndex,
          }

          return round;
        })
        .reduce((prev, current) => {
            return (prev.listVoteCount > current.listVoteCount) ? prev : current
        })

      const winningParty = this.parties.find(party => party.name === winningRound.name)
      winningParty.incrementDHondtIndex();
      winningParty.addRound(winningRound);

      this.rounds -= 1;
      return this.applyDuHondt()
    }
  }

  Vote.prototype.getSeatAllocation = function () {
    return this.applyDuHondt();
  };

  return Vote;
})();


module.exports = Vote;

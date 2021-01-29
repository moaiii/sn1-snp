import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setRegion, setVoteShare } from './redux';
import RegionSelector from './components/RegionSelector';
import VoteShare from './components/VoteShare';
import ListTable from './components/ListTable';
import RegionDetails from './components/RegionDetails';
import Overall from './components/Overall';
import Footer from './components/Footer';
import Intro from './components/Intro';
import { Spin } from 'antd';

function App(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    props.setVoteShare({
      voteShare: 50,
      region: props.region.selectedRegion,
    });
    setLoaded(true);
  }, [props.region.selectedRegion]);

  if (loaded) {
    return (
      <div className="App">
        <Intro />
        <RegionSelector
          results={props.voteShare.results}
          region={props.region}
          setRegion={props.setRegion}
        />
        <RegionDetails results={props.voteShare.results} />
        <VoteShare
          region={props.region}
          voteShare={props.voteShare}
          setVoteShare={props.setVoteShare}
        />
        <Overall results={props.voteShare.results} />

        <ListTable voteShare={props.voteShare} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Spin />
    </div>
  );
}

const mapState = (state) => ({
  region: state.region,
  voteShare: state.voteShare,
});

const mapDispatch = {
  setRegion,
  setVoteShare,
};

export default connect(mapState, mapDispatch)(App);

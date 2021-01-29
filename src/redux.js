import { createSlice } from '@reduxjs/toolkit';
import { createStore, combineReducers } from 'redux';
import Regions from './utils/Region';
import SPLIT_THE_VOTE from './utils';

const initialRegionState = {
  regions: Object.keys(Regions),
  selectedRegion: 'glasgow',
};

const region = createSlice({
  name: 'regions',
  initialState: initialRegionState,

  reducers: {
    setRegion(state, action) {
      state.selectedRegion = action.payload;
    },
  },
});

export const { setRegion } = region.actions;

const initialVoteShareState = {
  voteShare: 100,
  results: false,
  results2016: false,
};

const voteShare = createSlice({
  name: 'voteShare',
  initialState: initialVoteShareState,

  reducers: {
    setVoteShare(state, action) {
      const { voteShare, region } = action.payload;

      state.voteShare = voteShare;

      state.results = SPLIT_THE_VOTE({
        snpRatio: voteShare / 100,
        region: region,
      });

      state.results2016 = SPLIT_THE_VOTE({
        snpRatio: 100 / 100,
        region: region,
      });
    },
  },
});

export const { setVoteShare } = voteShare.actions;

const reducer = combineReducers({
  region: region.reducer,
  voteShare: voteShare.reducer,
});

export default createStore(reducer);

import React from 'react';
import { Statistic } from 'antd';

const { Countdown } = Statistic;

export default () => {
  return (
    <div className="Intro">
      <h1>
        <span style={{ marginRight: '0.5rem' }}>🏴󠁧󠁢󠁳󠁣󠁴󠁿</span>
        <span style={{ fontWeight: '100' }}>SCOTTISH ELECTIONS</span> SNP1 SNP2
        🤔
      </h1>
      {/* <BsInfoCircle /> */}
      <h3 className="intro">
        Who do you vote for on the list to secrure and Pro-Indy majority?
        Mathematically, it depends on where you live...
      </h3>
      <p className="intro">
        This website helps visualise{' '}
        <span
          style={{ background: 'black', color: 'white', padding: '0 0.25rem' }}
        >
          what would have been in 2016
        </span>{' '}
        had the Indy movement split the list vote between the two biggest
        Pro-Indy parties in all regions of Scotland.
      </p>
      {/* <div className="countdown">
        <Countdown
          title="May 6th 2021"
          value={new Date('5/6/2021')}
          format="D d H h"
        />
      </div> */}
    </div>
  );
};

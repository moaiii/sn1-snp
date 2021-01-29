import React, { useState } from 'react';
import { Slider } from 'antd';
import snp from '../../images/snp.png';
import green from '../../images/green.png';

var format = require('format-number');

export default (props) => {
  const {
    voteShare: { voteShare, results, results2016 },
    setVoteShare,
  } = props;
  const [sliderValue, setSliderValue] = useState(voteShare);

  const snp2016 = parseInt(
    results2016.partyInfo
      .find((el) => el.name === 'snp')
      .listVoteCount.replace(',', ''),
    10,
  );
  const green2016 = parseInt(
    results2016.partyInfo
      .find((el) => el.name === 'green')
      .listVoteCount.replace(',', ''),
    10,
  );

  const snpProjected = parseInt(
    results.partyInfo
      .find((el) => el.name === 'snp')
      .listVoteCount.replace(',', ''),
    10,
  );

  const greenProjected = parseInt(
    results.partyInfo
      .find((el) => el.name === 'green')
      .listVoteCount.replace(',', ''),
    10,
  );

  const snpChange = snpProjected - snp2016;
  const greenChange = greenProjected - green2016;

  const snpChangePerc = sliderValue / 1 - 100;
  // prettier-ignore
  const greenChangePerc = 100 - (sliderValue / 1)

  return (
    <div className="VoteShare">
      <h2>Share the vote</h2>
      <div className="inner-container">
        <div className="party__stat">
          <div className="VoteShare__image">
            <img alt="snp" src={snp} />
          </div>
        </div>
        <Slider
          min={0}
          max={100}
          onChange={setSliderValue}
          onAfterChange={() =>
            setVoteShare({
              voteShare: sliderValue,
              region: results.region,
            })
          }
          value={sliderValue}
        />
        <div className="party__stat">
          <div className="VoteShare__image">
            <img alt="green" src={green} />
          </div>
        </div>
      </div>
      <div className="VoteShare__numbers">
        <div className="item">
          <p>
            <span>2016</span> {format()(snp2016)}
          </p>
          <p>
            <span>2021</span> {format()(snpProjected)}
          </p>
          <p>
            <span>Change</span> {format()(snpChange)}
          </p>
          {/* <p>{snpChangePerc}%</p> */}
        </div>
        <div className="item">
          <p>
            <span>2016</span> {format()(green2016)}
          </p>
          <p>
            <span>2021</span> {format()(greenProjected)}
          </p>
          <p>
            <span>Change</span> {format()(greenChange)}
          </p>
          {/* <p>{greenChangePerc}%</p> */}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
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
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.voteShare.results) {
      const _partyData = results.partyInfo.map((party) => {
        return {
          party: party.name,
          change: party.regionalSeats - party.originalList,
        };
      });
      setData(_partyData);
    }
  }, [results]);

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

  const change = data.length > 0 ? Math.abs(data[0].change) : 0;

  const snpHaveLost =
    data.length > 0
      ? `The SNP have lost ${change} list ${
          change === 1 ? 'seat' : 'seats'
        } in ${results.region.toUpperCase()}`
      : '';

  return (
    <div className="VoteShare">
      <h2 style={{ padding: '1rem 0' }}>Share the list vote</h2>
      <hr />
      <div className="inner-container">
        <div className="party__stat">
          <div className="VoteShare__image">
            <img alt="snp" src={snp} />
          </div>
        </div>
        <Slider
          min={0}
          max={100}
          reverse={true}
          onChange={setSliderValue}
          onAfterChange={() => {
            // debugger;
            setVoteShare({
              voteShare: 100 - sliderValue,
              region: results.region,
            });
          }}
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
          <p>- {100 + snpChangePerc}%</p>
        </div>
        <div className="item --commentary">
          <p>{`${format()(greenChange)} votes from the SNP to Greens`}</p>
          <p className="--snp">{snpHaveLost}</p>
        </div>
        <div className="item">
          <p>{Math.abs(greenChangePerc - 100)}%</p>
        </div>
      </div>
    </div>
  );
};

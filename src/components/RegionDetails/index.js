import React from 'react';
import { Statistic, Row, Col } from 'antd';
import { FaVoteYea } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { FaPercent } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';

export default (props) => {
  const { results } = props;

  if (results) {
    return (
      <div className="RegionDetails">
        <h2>{results.region} in 2016</h2>
        <div className="RegionDetails__stats">
          <Statistic
            title="List seats"
            value={results.totals.regionalSeats}
            prefix={<MdEventSeat />}
          />
          <Statistic
            title="Electorate"
            value={results.regionMetaData.electorate.replace(
              ' eligible voters',
              '',
            )}
            prefix={<IoIosPeople />}
          />
          <Statistic
            title="Votes cast"
            value={results.regionMetaData.votes}
            prefix={<FaVoteYea />}
          />
          <Statistic
            className="--turnout"
            title="Turnout"
            value={results.regionMetaData.turnout.replace('%', '')}
            prefix={<FaPercent />}
          />
        </div>
      </div>
    );
  }

  return null;
};

import React from 'react';
import { Select } from 'antd';
import { Statistic, Row, Col } from 'antd';
import { FaVoteYea } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { FaPercent } from 'react-icons/fa';
import { MdEventSeat } from 'react-icons/md';

const { Option } = Select;

export default (props) => {
  const {
    region: { regions, selectedRegion },
    setRegion,
    results,
  } = props;

  const onChange = (value) => {
    setRegion(value);
  };
  return (
    <div className="RegionSelector">
      <div className="heading">
        <h2>{results.region} in 2016</h2>
        <Select
          className="RegionSelector__dropdown"
          showSearch
          value={selectedRegion}
          style={{ width: 200 }}
          placeholder="Your region"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {regions.map((region) => {
            return (
              <Option
                key={`RegionSelector__${region}`}
                className="RegionSelector__option"
                value={region}
              >
                {region}
              </Option>
            );
          })}
        </Select>
      </div>
      <hr />
      <div className="RegionDetails">
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
    </div>
  );
};

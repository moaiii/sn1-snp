import React from 'react';
import { Select } from 'antd';

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
      <h2>Scottish region</h2>
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
      <p className="areas">
        {results.regionMetaData.constituencies.map((el) => `${el}, `)}
      </p>
    </div>
  );
};

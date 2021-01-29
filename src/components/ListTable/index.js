import React, { useState, useEffect } from 'react';
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Party',
    dataIndex: 'party',
    key: 'party',
    render: (text) => text.toUpperCase(),
  },
  {
    title: 'List votes',
    dataIndex: 'list-votes',
    key: 'list-votes',
  },
  {
    title: 'List seats',
    dataIndex: 'list-seats',
    key: 'list-seats',
  },
  {
    title: 'Constituency seats',
    dataIndex: 'constituency-seats',
    key: 'constituency-seats',
  },
  {
    title: 'Total seats',
    dataIndex: 'total-seats',
    key: 'total-seats',
  },
  {
    title: 'Change',
    key: 'change',
    dataIndex: 'change',
    render: (change) => {
      if (change === 0) return null;
      const color = change < 0 ? 'red' : 'green';

      return (
        <Tag color={color} key={change}>
          {change}
        </Tag>
      );
    },
  },
];

export default (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (props.voteShare.results) {
      const _partyData = props.voteShare.results.partyInfo.map((party) => {
        return {
          party: party.name,
          'list-votes': party.listVoteCount,
          'list-seats': party.regionalSeats,
          'constituency-seats': party.constituencySeats,
          'total-seats': party.totalSeats,
          change: party.regionalSeats - party.originalList,
        };
      });

      setData(_partyData);
    }
  }, [props.voteShare.results]);

  return (
    <div className="ListTable">
      <h2 style={{ padding: '1rem 0' }}>Party numbers</h2>
      <hr />
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

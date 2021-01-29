import React, { useEffect, useState } from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default (props) => {
  const { results } = props;
  const [indyDiff, setIndyDiff] = useState();
  const [unionDiff, setUnionDiff] = useState();

  if (results) {
    const diff = results.partyInfo
      .map((party) => {
        return {
          [party.name]: party.regionalSeats - party.originalList,
        };
      })
      .reduce(
        (acc, cur) => {
          const [partyName, partyDiff] = Object.entries(cur).pop();
          const isIndy = partyName === 'snp' || partyName === 'green';
          const indy = isIndy ? acc.indy + partyDiff : acc.indy;
          const union = !isIndy ? acc.union + partyDiff : acc.union;
          return {
            ...acc,
            indy,
            union,
          };
        },
        { indy: 0, union: 0 },
      );

    const colour = (num) => {
      if (num > 0) {
        return '#3f8600';
      }
      if (num < 0) {
        return '#cf1322';
      }

      // return 'transparent';
    };

    const totalSeatsAvailable = results.totals.regionalSeats;
    const newIndySeats = results.alliances.indy.regional;
    const newUnionSeats = results.alliances.union.regional;

    useEffect(() => {
      const _diff_indy = diff.indy === 0 ? 'No change' : diff.indy;
      const _diff_union = diff.union === 0 ? 'No change' : diff.union;
      setIndyDiff(_diff_indy);
      setUnionDiff(_diff_union);
    }, [results]);

    return (
      results && (
        <div className="Overall">
          <h2 style={{ padding: '1rem 0' }}>Overall change</h2>
          <hr />
          <div className="inner-container">
            <Card>
              <Statistic
                title={`Pro Indy: ${newIndySeats} / ${totalSeatsAvailable} seats`}
                value={indyDiff}
                precision={0}
                valueStyle={{ color: colour(diff.indy) }}
                prefix={<ArrowUpOutlined />}
                suffix=""
              />
            </Card>
            <Card>
              <Statistic
                title={`Union: ${newUnionSeats} / ${totalSeatsAvailable} seats`}
                value={unionDiff}
                precision={0}
                valueStyle={{ color: colour(diff.union) }}
                prefix={<ArrowDownOutlined />}
                suffix=""
              />
            </Card>
          </div>
        </div>
      )
    );
  }

  return null;
};

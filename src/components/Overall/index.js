import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default (props) => {
  const { results } = props;

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

      return 'transparent';
    };

    return (
      results && (
        <div className="Overall">
          <h2>Overall</h2>
          <div className="inner-container">
            <Card>
              <Statistic
                title="Pro Independence"
                value={diff.indy}
                precision={0}
                valueStyle={{ color: colour(diff.indy) }}
                prefix={<ArrowUpOutlined />}
                suffix="seats"
              />
            </Card>
            <Card>
              <Statistic
                title="Unionist"
                value={diff.union}
                precision={0}
                valueStyle={{ color: colour(diff.union) }}
                prefix={<ArrowDownOutlined />}
                suffix="seats"
              />
            </Card>
          </div>
        </div>
      )
    );
  }

  return null;
};

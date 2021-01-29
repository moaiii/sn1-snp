import React from 'react';
import { Statistic } from 'antd';
import { RiQuestionAnswerLine } from 'react-icons/ri';
import { BsInfoCircle } from 'react-icons/bs';

const { Countdown } = Statistic;

export default () => {
  return (
    <div className="Intro">
      <h1>
        <RiQuestionAnswerLine style={{ marginRight: '1rem' }} />
        SNP1 SNP2 ?
      </h1>
      <BsInfoCircle />
      <p className="intro">
        There has been a lot of conversation in the Indy Movement around who to
        vote for on the list to secrure and Pro-Indy majority. And the answer,
        mathematically, depends on where you live.
      </p>
      <p className="intro">
        This website helps us visualise the effects of spliting the list vote
        between the two strongest Pro-Indy parties - The Scottish National Party
        and The Scottish Greens.
      </p>
      <p className="intro">
        Note: the total numbers of votes and the constituency results are
        assumed the same as the 2017 election results.
      </p>
      <div className="countdown">
        <Countdown
          title="May 6th 2021"
          value={new Date('5/6/2021')}
          format="D d H h"
        />
      </div>
    </div>
  );
};

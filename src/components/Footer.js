import React from 'react';
import { RiTwitterLine } from 'react-icons/ri';
import { FaLinkedin } from 'react-icons/fa';

export default () => {
  return (
    <div className="Footer">
      <h2 style={{ padding: '1rem 0' }}>thank you</h2>
      <hr />
      <div className="inner-container">
        <div className="avatar"></div>
        <div className="blurb">
          <p>
            I am a software developer from Glasgow excited to be a part of a
            forward thinking independent Scotland. Voted SNP all my life. Pro
            European. Pro climate activism.
          </p>
        </div>
      </div>
      <div className="social">
        <div
          className="social__item"
          onClick={() => window.open('https://twitter.com/___moaiii')}
        >
          <p>Twitter</p>
          <RiTwitterLine />
        </div>
        <div
          className="social__item"
          onClick={() => window.open('https://www.linkedin.com/in/moaiii/')}
        >
          <p>Linkedin</p>
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
};

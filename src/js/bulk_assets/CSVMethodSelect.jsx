import React from 'react';
import classNames from 'classnames';

const CSVMethodSelect = ({ importMethod, onSelect }) => (
  <div className="kn-records-nav clearfix">
    <ul className="kn-filter-menu">
      <li className={classNames({'active': importMethod === 'UPLOAD' })}>
        <a href="#" onClick={e => onSelect(e, 'UPLOAD')}>
          <span>
            <i className="fa fa-upload"></i>
            &nbsp;&nbsp;Upload File
          </span>
        </a>
        <div className="kn-nub">
          <div className="kn-nub-internal"></div>
        </div>
      </li>
      <li className={classNames({'active': importMethod === 'MANUAL' })}>
        <a href="#" onClick={e => onSelect(e, 'MANUAL')}>
          <span>
            <i className="fa fa-keyboard-o"></i>
            &nbsp;&nbsp;Paste/Enter Manually
          </span>
        </a>
        <div className="kn-nub">
          <div className="kn-nub-internal"></div>
        </div>
      </li>
  </ul>
  </div>
);

export default CSVMethodSelect;

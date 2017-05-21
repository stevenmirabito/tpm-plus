import React from 'react';

import CSVProgressTable from './CSVProgressTable';
import spinnerStyle from '../../css/spinner.scss';
import componentStyle from '../../css/CSVProgress.scss';

const CSVProgress = ({ importing, cards }) => (
  <div>
    <div className={componentStyle.processingMsg}>
      <svg
        className={spinnerStyle.spinner}
        width="25px"
        height="25px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          className={spinnerStyle.path}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30">
        </circle>
      </svg>

      { importing ?
        <h3>Importing...</h3> :
        <h3>Processing file...</h3> }
    </div>
    { importing ? <CSVProgressTable cards={cards} /> : null }
  </div>
);

export default CSVProgress;

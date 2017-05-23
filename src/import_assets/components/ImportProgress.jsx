import React from 'react';

import { ImportStates } from '../utils/enums';
import ImportProgressTable from './ImportProgressTable';
import spinnerStyle from '../css/spinner.scss';
import componentStyle from '../css/progress.scss';

export default class ImportProgress extends React.Component {
  getStateVisual() {
    switch (this.props.importState) {
      case ImportStates.SUCCESS:
        return (
          <i className={componentStyle.success + " fa fa-check-circle"} aria-hidden="true"></i>
        );
        break;
      case ImportStates.ERROR:
        return (
          <i className={componentStyle.error + " fa fa-times-circle"} aria-hidden="true"></i>
        );
        break;
      default:
        return (
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
        );
        break;
    }
  }

  render() {
    return (
      <div>
        <div className={componentStyle.message}>
          {this.getStateVisual()}
          <h3>
            {this.props.importState.getPrintableMessage()}
            {this.props.importState === ImportStates.SUCCESS ?
              <span> - redirecting...</span> : null}
          </h3>
        </div>
        {
          (this.props.importState !== ImportStates.IDLE) &&
          (this.props.importState !== ImportStates.PROCESSING) ?
          <ImportProgressTable cards={this.props.cards} /> :
          null
        }
      </div>
    );
  }
}

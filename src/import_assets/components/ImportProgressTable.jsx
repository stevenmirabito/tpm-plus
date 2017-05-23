import React from 'react';

import { ItemStates } from '../utils/enums';
import componentStyle from '../css/progress.scss';

const ImportProgressTable = ({ cards }) => {
  let cardRows = [];
  for (let i = 0; i < cards.size; i++) {
    const card = cards.get(i);

    let status = (
      <span>
        <i className={componentStyle.waiting + " fa fa-clock-o"} aria-hidden="true"></i>
        Waiting
      </span>
    );

    switch(card.get('state')) {
      case ItemStates.IMPORTING:
        status = (
          <span>
            <i className={componentStyle.importing + " fa fa-download"} aria-hidden="true"></i>
            Importing
          </span>
        );
        break;
      case ItemStates.SUCCESS:
        status = (
          <span>
            <i className={componentStyle.success + " fa fa-check-circle"} aria-hidden="true"></i>
            Success
          </span>
        );
        break;
      case ItemStates.ERROR:
        status = (
          <span>
            <i className={componentStyle.error + " fa fa-times-circle"} aria-hidden="true"></i>
            Error
          </span>
        );
        break;
    }

    cardRows.push(
      <tr key={i}>
        <td>{card.get('cardNumber')}</td>
        <td>{card.get('pin')}</td>
        <td>{status}</td>
      </tr>
    );
  }

  return (
    <div className={componentStyle.table + " kn-table kn-view"}>
      <table className="kn-responsive kn-table-table is-bordered is-striped">
        <thead>
          <tr>
            <th>Card Number</th>
            <th>PIN</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {cardRows}
        </tbody>
      </table>
    </div>
  );
};

export default ImportProgressTable;

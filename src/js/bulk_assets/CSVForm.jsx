import React from 'react';

import CSVMethodSelect from './CSVMethodSelect';
import formsStyle from '../../css/forms.css';

const CSVForm = ({ importMethod, onSubmit, onCheck, onFileChange, onChangeMethod }) => (
  <form action="#" method="post" onSubmit={onSubmit}>
    <CSVMethodSelect importMethod={importMethod} onSelect={onChangeMethod} />
    <div className={formsStyle.formGroup}>
      {importMethod === 'UPLOAD' ?
        <input type="file" onChange={onFileChange} required={true} /> :
        <textarea rows="10" cols="50" onChange={onFileChange} required={true} />
      }
    </div>
    <div className={formsStyle.formGroup}>
      <input type="checkbox" name="csvheaders" onChange={onCheck} />
      <label htmlFor="csvheaders">My CSV includes a header row</label>
    </div>
    <div className={formsStyle.formGroup}>
      <input type="submit" value="Start Import" />
    </div>
  </form>
);

export default CSVForm;

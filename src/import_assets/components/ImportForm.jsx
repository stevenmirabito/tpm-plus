import React from 'react';

import { ImportMethods } from '../utils/enums';
import ImportMethodSelect from './ImportMethodSelect';
import formsStyle from '../css/forms.css';

const ImportForm = ({
  importMethod,
  validationError,
  onSubmit,
  onCheck,
  onFileChange,
  onChangeMethod,
}) => (
  <form action="#" method="post" onSubmit={onSubmit}>
    <ImportMethodSelect importMethod={importMethod} onSelect={onChangeMethod} />
    <div className={formsStyle.formGroup}>
      {validationError ?
        <p className={formsStyle.validationError}>
          {validationError.getPrintableMessage()}
        </p> : null }
      {importMethod === ImportMethods.UPLOAD ?
        <input type="file" onChange={onFileChange} required={true} /> :
        <textarea rows="10" cols="50" onChange={onFileChange} required={true} />
      }
    </div>
    <div className={formsStyle.formGroup}>
      <input type="checkbox" name="csvheaders" onChange={onCheck} />
      <label htmlFor="csvheaders">CSV includes a header row</label>
    </div>
    <div className={formsStyle.formGroup}>
      <input type="submit" value="Start Import" />
    </div>
  </form>
);

export default ImportForm;

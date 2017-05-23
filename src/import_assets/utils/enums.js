import { Enum } from 'enumify';

class ImportStates extends Enum {
  getPrintableMessage() {
    return this.printable;
  }
}
ImportStates.initEnum({
  IDLE: {
    printable: 'Waiting...',
  },
  PROCESSING: {
    printable: 'Processing file...',
  },
  IMPORTING: {
    printable: 'Importing...',
  },
  SUCCESS: {
    printable: 'Import Successful',
  },
  ERROR: {
    printable: 'Import Failed',
  },
});

class ImportMethods extends Enum {}
ImportMethods.initEnum(['UPLOAD', 'MANUAL']);

class ItemStates extends Enum {}
ItemStates.initEnum(['WAITING', 'IMPORTING', 'SUCCESS', 'ERROR']);

class ValidationErrors extends Enum {
  getPrintableMessage() {
    return this.printable;
  }
}
ValidationErrors.initEnum({
  INVALID_FILE_TYPE: {
    printable: 'Please choose a valid CSV file.',
  },
})

export {
  ImportStates,
  ImportMethods,
  ItemStates,
  ValidationErrors,
}

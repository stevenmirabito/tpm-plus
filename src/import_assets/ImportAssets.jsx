import React from 'react';
import { queue } from 'd3-queue';
import { List, Map } from 'immutable';
import { autobind } from 'core-decorators';

import {
  ImportStates,
  ImportMethods,
  ItemStates,
  ValidationErrors,
} from './utils/enums';
import { Asset } from './utils/api';
import csvParser from './utils/parser';
import cardProcessor from './utils/processor';
import ImportForm from './components/ImportForm';
import ImportProgress from './components/ImportProgress';

const IMPORT_CONCURRENCY = 5;

export default class ImportAssets extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      importState: ImportStates.IDLE,
      importMethod: ImportMethods.UPLOAD,
      validationError: null,
      file: null,
      headersInCsv: false,
      cards: List(),
    };
  }

  @autobind
  setHeadersOption(e) {
    if (e && e.target) {
      this.setState({ headersInCsv: e.target.checked });
    }
  }

  @autobind
  setFile(e) {
    if (e && e.target) {
      if (e.target.files) {
        // Upload method
        const file = e.target.files[0];

        // Make sure the file is a CSV
        if (file.type === 'text/csv') {
          // Remove validation error, if any
          if (this.state.validationError === ValidationErrors.INVALID_FILE_TYPE) {
            this.setState({ validationError: null });
          }

          // CSV, store it in state
          this.setState({ file: e.target.files[0] });
        } else {
          // Not a CSV, reset the field and show an error
          e.target.value = '';
          this.setState({ validationError: ValidationErrors.INVALID_FILE_TYPE });
        }
      } else {
        // Manual method, store the textarea value in state
        this.setState({ file: e.target.value });
      }
    }
  }

  @autobind
  submit(e) {
    if (e && e.preventDefault instanceof Function) {
      e.preventDefault();
    }

    this.setState({ importState: ImportStates.PROCESSING });

    // Parse the file as a CSV
    csvParser(this.state.file, this.state.headersInCsv)
      .then((results) => {
        // Get the line item record ID
        const scene = this.extRoot.parentNode.parentNode;
        const lidField = scene.querySelector('input[name="item-add-cards-type_id"]');

        if (lidField) {
          this.setState({
            importState: ImportStates.IMPORTING,
            // Process the cards into a more friendly,
            // immutable array of objects
            cards: List(
              results.data
                .filter(data =>
                  // Sanity check, row should have at least 2 columns
                   data.length >= 2)
                .map(card => Map({
                  cardNumber: card[0],
                  pin: card[1],
                  state: ItemStates.WAITING,
                })),
            ),
          });

          // Instantiate an Asset API object with the LID
          const asset = new Asset(lidField.value);

          // Instantiate a queue for processing cards
          const assetQueue = queue(IMPORT_CONCURRENCY);

          // Queue each card
          for (let i = 0; i < this.state.cards.size; i += 1) {
            assetQueue.defer(cardProcessor.bind(this), asset, i, this.state.cards.get(i));
          }

          // When the queue has been processed...
          assetQueue.await((error) => {
            if (error) {
              this.setState({ importState: ImportStates.ERROR });
              throw error;
            }

            this.setState({ importState: ImportStates.SUCCESS });
            setTimeout(() => window.location.reload(), 3000);
          });
        } else {
          throw new Error('Unable to find line item ID field');
        }
      })
      .catch((err) => {
        throw new Error('[tpm-plus]', err);
      });
  }

  @autobind
  changeMethod(e, method) {
    if (e && e.preventDefault instanceof Function) {
      e.preventDefault();
    }

    if (method instanceof ImportMethods) {
      this.setState({ importMethod: method });
    }
  }

  render() {
    return (
      <div className="kn-form kn-view" ref={(c) => { this.extRoot = c; }}>
        <div className="view-header">
          <h2>Import Assets</h2>
          <p className="description">
            This tool allows you to add assets from a CSV file with your
            card numbers and PINs in the first two columns, respectively.
            The delimiter will be detected automatically.
          </p>
        </div>
        {
          (this.state.importState === ImportStates.IDLE) ?
            <ImportForm
              importMethod={this.state.importMethod}
              validationError={this.state.validationError}
              onSubmit={this.submit}
              onCheck={this.setHeadersOption}
              onFileChange={this.setFile}
              onChangeMethod={this.changeMethod}
            /> :
            <ImportProgress
              importState={this.state.importState}
              cards={this.state.cards}
            />
        }
      </div>
    );
  }
}

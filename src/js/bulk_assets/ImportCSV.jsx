import React from 'react';

import csvParser from './utils/parser';
import { Asset } from './utils/api';
import CSVForm from './CSVForm';
import CSVProgress from './CSVProgress';
import formsStyle from '../../css/forms.css';

class UploadCSV extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    this.state = {
      submitted: false,
      importing: false,
      headersInCsv: false,
      file: null,
      cards: [],
      importMethod: 'UPLOAD',
    };
  }

  submit(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    this.setState({ submitted: true });

    // Parse the file as a CSV
    csvParser(this.state.file, this.state.headersInCsv)
      .then(results => {
        // Get the line item record ID
        const scene = this.refs.extRoot.parentNode.parentNode;
        const lidField = scene.querySelector('input[name="item-add-cards-type_id"]');

        if (lidField) {
          // Indicate that we're processing the cards
          // and add the card data to state
          this.setState({
            importing: true,
            cards: results.data.filter(data => {
              // Sanity check, row should have at least 2 columns
              return data.length >= 2;
            }).map(card => {
              return {
                cardNumber: card[0],
                pin: card[1],
                processed: false,
              };
            }),
          });

          // Instantiate an Asset API utility with the LID
          //const asset = new Asset(lidField.value);

          // Add the assets
          //asset.add({
          //  cardNumber: results.data[0][0],
          //  pin: results.data[0][1],
          //});
        } else {
          throw "Unable to find line item ID field";
        }
      })
      .catch(err => {
        console.error('[tpm-plus]', err);
      });
  }

  setHeadersOption(e) {
    if (e && e.target) {
      this.setState({ headersInCsv: e.target.checked });
    }
  }

  setFile(e) {
    if (e && e.target) {
      if (e.target.files) {
        // Upload method
        this.setState({ file: e.target.files[0] });
      } else {
        // Manual method
        this.setState({ file: e.target.value });
      }
    }
  }

  changeMethod(e, method) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (method === 'UPLOAD' || method === 'MANUAL') {
      this.setState({ importMethod: method });
    }
  }

  render() {
    return (
      <div className="kn-form kn-view" ref="extRoot">
        <div className="view-header">
          <h2>Import Assets</h2>
          <p className="description">This tool allows you to add assets from a CSV file with your card numbers and PINs in the first two columns, respectively. The delimiter will be detected automatically.</p>
        </div>
        {
          this.state.submitted ?
          <CSVProgress
            importing={this.state.importing}
            cards={this.state.cards} /> :
          <CSVForm
            importMethod={this.state.importMethod}
            onSubmit={this.submit.bind(this)}
            onCheck={this.setHeadersOption.bind(this)}
            onFileChange={this.setFile.bind(this)}
            onChangeMethod={this.changeMethod.bind(this)} />
        }
      </div>
    );
  }
}

export default UploadCSV;

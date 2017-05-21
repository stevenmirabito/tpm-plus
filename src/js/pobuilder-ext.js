import React from 'react';
import ExtensionComponentInjector from './utils/inject';

import ImportCSV from './bulk_assets/ImportCSV';

const injector = new ExtensionComponentInjector(ImportCSV, '#view_828');
injector.inject();

if (module.hot) {
  module.hot.accept('./bulk_assets/ImportCSV', () => injector.updateComponent(ImportCSV));
}

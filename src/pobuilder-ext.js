import React from 'react';
import ExtensionComponentInjector from './utils/inject';

import ImportAssets from './import_assets/ImportAssets';

const injector = new ExtensionComponentInjector(ImportAssets, '#view_828');
injector.inject();

if (module.hot) {
  module.hot.accept('./import_assets/ImportAssets', () => injector.updateComponent(ImportAssets));
}

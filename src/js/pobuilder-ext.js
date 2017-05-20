import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Greeting from './bulk_assets/greeting_component';

const renderHelper = (Component, containerId) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById(containerId)
  );
}

const render = (viewId) => {
  const addAssetForm = document.getElementById(viewId);
  const extContainer = document.createElement('div');
  extContainer.id = `tpmplus-${viewId}-${Math.floor(Math.random() * 1000)}`;
  addAssetForm.parentNode.insertBefore(extContainer, addAssetForm.nextSibling);

  renderHelper(Greeting, extContainer.id);
  if (module.hot) {
    module.hot.accept('./bulk_assets/greeting_component', () => renderHelper(Greeting, extContainer.id));
  }
}

const extInject = (viewId) => {
  const addAssetForm = document.getElementById(viewId);
  if (addAssetForm) {
    render(viewId);
  } else {
    console.warn("[ext] Waiting!");

    // Wait for the requested view to be added to the page, then inject
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.id === viewId) {
              // Found the view, render
              console.warn("[ext] Rendering!");
              render(viewId);
            }
          })
        }
      });
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

export default extInject;

import hotRender from './render';

export default class ExtensionComponentInjector {
  constructor(Component, targetViewSelector) {
    this.component = Component;
    this.targetViewSelector = targetViewSelector;
    this.instances = [];
  }

  static createContainer(insertAfterNode) {
    const container = document.createElement('div');
    container.id = `tpmplus-${Math.floor(Math.random() * 10000)}`;
    insertAfterNode.parentNode.insertBefore(container, insertAfterNode.nextSibling);

    return container.id;
  }

  insertComponent(insertAfterNode) {
    // Create a container for the component on the page
    const containerId = ExtensionComponentInjector.createContainer(insertAfterNode);

    // Render the component
    hotRender(this.component, containerId);

    // Add the container to the list of instances
    this.instances.push(containerId);
  }

  updateComponent(component) {
    // Update the component
    this.component = component;

    // Rerender each valid instance
    this.instances.forEach((instance) => {
      hotRender(this.component, instance);
    });
  }

  addMutationListener() {
    // Listen for new instances of the target view and inject
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (typeof node.matches === 'function' &&
                node.matches(this.targetViewSelector)) {
              // Found a new instance of the target view, render
              this.insertComponent(node);
            }
          });
        }
      });
    }).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  inject() {
    if (document.querySelector(this.targetViewSelector)) {
        // Target view is already on the page, render immediately
      this.insertComponent();
    }

    // Add a mutation listener to inject the component
    // when the site loads the target view
    this.addMutationListener();
  }
}

# TPM+

A Chrome extension that adds additional functionality to The Plastic Merchant's Bulk Seller Platform.

## Development
_Also see the [Chrome Extension](https://developer.chrome.com/extensions/getstarted) developer documentation._

1. Clone the repository.
2. Install [yarn](https://yarnpkg.com): `brew install yarn`.
3. Run `yarn`.
6. Run `yarn start`.
7. Load the extension in Chrome by doing the following:
    1. Navigate to `chrome://extensions/`
    2. Check `Developer mode`
    3. Click `Load unpacked extension...`
    4. Select the `build` folder

Most modules/components are set up for hot module reloading. If you make changes outside of these components or refresh the page, you will have to reload the extension for your changes to appear.

## Building
To run a production build:

```
yarn build
```

The contents of the `build` folder will be the extension, ready to be submitted to the Chrome Web Store. More information can be found in the [official publishing guide](https://developer.chrome.com/webstore/publish).
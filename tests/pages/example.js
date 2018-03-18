
module.exports = {
  url() {
    return `${this.api.launchUrl}/`;
  },
  elements: {
    main: {
      selector: '#sign-in-page',
    },
  },
  commands: [{
    ssr() {
      return this.waitForElementPresent('@main');
    },
  }],
};

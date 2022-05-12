const customPaths = {
  src:    '../../src',
  dist:   '../../dist',
  public: '../../public',
};

const CSSLoader = {
  loader:  'css-loader',
  options: {
    sourceMap: true,
    minimize:  true,
  },
};

module.exports = {
  customPaths,
  CSSLoader,
};

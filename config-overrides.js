const { 
    addDecoratorsLegacy,
    disableEsLint, // eslint를 끄는 것이 아님
    override,
  } = require("customize-cra");
  
  module.exports = {
    webpack: override(
        disableEsLint(),
        addDecoratorsLegacy()
    ),
  };
/**
 * Main Module.
 * It builds array of styles based in given rules.
 */
module.exports = function conditionalStyleSheet(styleDefinitions) {
  return function styleSelector(...args) {
    // Empty collection of styles.
    // Collection accepts additional style definition (unlimited number of style definitions).
    const collectedStyles = [];
    collectedStyles.add = function add(style) {
      collectedStyles.push(style);
      return collectedStyles;
    }

    // Iterate passed style rules and build style collection based on it.
    function iterateStyleRules(argument) {
      if (typeof argument === 'string') {
        checkStyleExistence(styleDefinitions, argument);

        collectedStyles.push(styleDefinitions[argument]);
        return;
      }

      if (typeof argument === 'object') {
        Object.keys(argument).forEach(function(styleName) {
          checkStyleExistence(styleDefinitions, styleName);

          if (argument[styleName]) {
            collectedStyles.push(styleDefinitions[styleName])
          }
        })
      }
    }

    args.forEach(iterateStyleRules);

    return collectedStyles;
  }
}

/**
 * Throw, if style definition does not exist.
 */
function checkStyleExistence(styleDefinitions, style) {
  if (__DEV__ && typeof styleDefinitions[style] === 'undefined') {
    throw new Error(`[ConditionalStyleSheet] Requesting undefined style: ${style}`);
  }
}

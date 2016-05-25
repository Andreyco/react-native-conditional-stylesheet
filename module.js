import { StyleSheet } from 'react-native';

function isString(arg) {
  return typeof arg === 'string';
}

function isArray(arg) {
  if (Array.isArray) return Array.isArray(arg);

  return Object.prototype.toString.call(arg) === '[object Array]';
}

// If any of object properties equals to `true` or `false`, it's
// safe to assume object is mapping for styles to use.
function isMappingObject(obj) {
  for (const key of Object.keys(obj)) {
    if (obj[key] === true || obj[key] === false) {
      return true;
    }
  }

  return false;
}

function create(rawStyle) {
  const style = StyleSheet.create(rawStyle);

  return function buildStyle(...args) {
    let collectedStyles = [];

    for (const arg of args) {
      if (!arg) return;

      if (isString(arg)) {
        collectedStyles.push(style[arg]);
        continue;
      }

      if (isArray(arg)) {
        collectedStyles = collectedStyles.concat(arg);
        continue;
      }

      if (isMappingObject(arg)) {
        Object.keys(arg).forEach((key) => {
          if (arg[key]) {
            collectedStyles.push(style[key]);
          }
        });
        continue;
      }

      // Push style to collection and let React Native to validate its properties.
      collectedStyles.push(arg);
    }

    return collectedStyles;
  };
}

module.exports = {
  create: create,
};

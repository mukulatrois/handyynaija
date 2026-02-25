/**
 * Polyfills for older Node.js versions
 * This file should be loaded before Metro bundler starts
 */

// Polyfill for Array.prototype.toReversed() (ES2023)
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function() {
    return [...this].reverse();
  };
}

// Export empty object to make this a valid module
module.exports = {};

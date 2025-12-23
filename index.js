"use strict"

var GetIntrinsic = require("es-intrinsic-cache")
var uncurryThis = require("uncurry-x")

/**
 * Gets an intrinsic and returns its uncurried version
 * @param {string} intrinsicName - The name of the intrinsic (e.g., "Array.prototype.slice")
 * @param {boolean} [allowMissing=false] - Whether to allow missing intrinsics (returns null/undefined instead of throwing)
 * @returns {Function|null|undefined} The uncurried intrinsic function, or null/undefined if allowMissing is true and intrinsic doesn't exist
 * @throws {Error} If the intrinsic is not available and allowMissing is false, or if GetIntrinsic fails
 */
function uncurryIntrinsic(intrinsicName, allowMissing) {
  var intrinsic
  try {
    intrinsic = GetIntrinsic(intrinsicName, allowMissing)
  } catch (e) {
    throw new Error(
      'Failed to get intrinsic "' + intrinsicName + '": ' + e.message
    )
  }

  if (!intrinsic) {
    if (allowMissing) {
      return intrinsic
    }
    throw new Error('Intrinsic "' + intrinsicName + '" is not available')
  }

  return uncurryThis(intrinsic)
}

module.exports = uncurryIntrinsic

// Clamp a number into [min, max]. Throws on invalid bounds.
function clamp(value, min, max) {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) throw new TypeError('clamp: all arguments must be finite numbers');
  if (min > max) throw new RangeError('clamp: min must be <= max');
  return Math.min(Math.max(value, min), max);
}
module.exports = { clamp };

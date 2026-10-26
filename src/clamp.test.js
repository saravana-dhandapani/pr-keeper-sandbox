const assert = require('node:assert');
const { clamp } = require('./clamp');
assert.strictEqual(clamp(5, 0, 3), 3);
assert.strictEqual(clamp(-1, 0, 3), 0);
assert.strictEqual(clamp(2, 0, 3), 2);
assert.throws(() => clamp(1, 3, 0), RangeError);
assert.throws(() => clamp(NaN, 0, 3), TypeError);

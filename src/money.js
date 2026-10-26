// Amounts are integer cents.
function toCents(dollars) { return Math.round(dollars * 100); }
function format(cents) { return '$' + (cents / 100).toFixed(2); }
module.exports = { toCents, format };

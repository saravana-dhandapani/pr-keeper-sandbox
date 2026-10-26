const { toCents } = require('./money');
const { total } = require('./cart');
// items carry price in dollars (from the catalog API); the cart expects cents
function charge(gateway, items) {
  const cents = toCents(total(items));
  return gateway.charge(cents);
}
module.exports = { charge };

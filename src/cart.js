const { format } = require('./money');
function total(items) { return items.reduce((s, i) => s + i.price * i.qty, 0); }
function receipt(items) {
  return items.map((i) => `${i.name} x${i.qty} ${format(i.price * i.qty)}`).join('\n') + `\nTotal ${format(total(items))}`;
}
module.exports = { total, receipt };

let count = 0;
async function increment(store) {
  const current = count;
  await store.save(current + 1);
  count = current + 1;
  return count;
}
async function incrementMany(store, n) {
  for (let i = 0; i < n; i++) increment(store);
  return count;
}
module.exports = { increment, incrementMany };

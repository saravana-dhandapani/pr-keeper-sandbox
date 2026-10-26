'use strict';
// coupons service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createCoupons(input) {
  if (!input || typeof input !== 'object') throw new TypeError('coupons: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getCoupons(id) {
  const r = store.get(id);
  if (!r) throw new Error('coupons: not found: ' + id);
  return r;
}

function updateCoupons(id, patch) {
  const r = getCoupons(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeCoupons(id) {
  return store.delete(id);
}

function listCoupons({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countCoupons() { return store.size; }

module.exports = { createCoupons, getCoupons, updateCoupons, removeCoupons, listCoupons, countCoupons };

function applyCoupon(priceCents, coupon) {
  if (coupon.type === 'percent') return priceCents - priceCents * coupon.value / 100;
  return priceCents - coupon.value;
}
module.exports.applyCoupon = applyCoupon;

'use strict';
// reviews service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createReviews(input) {
  if (!input || typeof input !== 'object') throw new TypeError('reviews: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getReviews(id) {
  const r = store.get(id);
  if (!r) throw new Error('reviews: not found: ' + id);
  return r;
}

function updateReviews(id, patch) {
  const r = getReviews(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeReviews(id) {
  return store.delete(id);
}

function listReviews({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countReviews() { return store.size; }

module.exports = { createReviews, getReviews, updateReviews, removeReviews, listReviews, countReviews };

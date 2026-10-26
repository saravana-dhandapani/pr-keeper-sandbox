'use strict';
// notifications service: in-memory store with simple CRUD helpers.
const store = new Map();
let nextId = 1;

function createNotifications(input) {
  if (!input || typeof input !== 'object') throw new TypeError('notifications: input must be an object');
  const id = nextId++;
  const record = { id, ...input, createdAt: Date.now() };
  store.set(id, record);
  return record;
}

function getNotifications(id) {
  const r = store.get(id);
  if (!r) throw new Error('notifications: not found: ' + id);
  return r;
}

function updateNotifications(id, patch) {
  const r = getNotifications(id);
  const next = { ...r, ...patch, id: r.id };
  store.set(id, next);
  return next;
}

function removeNotifications(id) {
  return store.delete(id);
}

function listNotifications({ page = 1, pageSize = 20 } = {}) {
  const all = [...store.values()].sort((a, b) => a.id - b.id);
  const start = (page - 1) * pageSize;
  return { items: all.slice(start, start + pageSize), total: all.length };
}

function countNotifications() { return store.size; }

module.exports = { createNotifications, getNotifications, updateNotifications, removeNotifications, listNotifications, countNotifications };

import { v4 as uuid } from 'uuid';
import seed_fields from './fields.json';
import seed_case_types from './case-types.json';
import seed_cases from './cases.json';

let data = {};

function persist() { localStorage.setItem('store', JSON.stringify(data)); }

(function init() {
  data = JSON.parse(localStorage.getItem('store') || 'null');
  if (!data) seed();
})();

export function seed() {
  data = {
    fields: {
      entities: Object.fromEntries(Object.entries(seed_fields).map(([k, v]) => [k, { ...v, id: k }])),
      ids: Object.keys(seed_fields),
    },
    caseTypes: {
      entities: Object.fromEntries(Object.entries(seed_case_types).map(([k, v]) => [k, { ...v, id: k }])),
      ids: Object.keys(seed_case_types),
    },
    cases: {
      entities: Object.fromEntries(Object.entries(seed_cases).map(([k, v]) => [k, { ...v, id: k }])),
      ids: Object.keys(seed_cases),
    },
  };

  persist();
}

function entityApi(type) {
  function getEntities() { return data[type].entities; }
  function getIds() { return data[type].ids || []; }
  function getAll() { return (data[type].ids || []).map(id => getById(id)).filter(Boolean); }
  function getById(id) { return data[type].entities[id] || null; }
  function add(entity) {
    const id = uuid();
    data[type].entities[id] = { ...entity, id };
    data[type].ids.push(id);
    persist();
    return { id };
  }
  function update(id, entity) {
    if (!(id in data[type].entities)) return false;

    Object.assign(data[type].entities[id], entity);
    persist();
    return true;
  }
  function _delete(id) {
    delete data[type].entities[id];
    data[type].ids = data[type].ids.filter(x => x !== id);
    persist();
  }

  return {
    getEntities,
    getIds,
    getAll,
    getById,
    add,
    update,
    delete: _delete,
  };
}

export const fields = entityApi('fields');
export const caseTypes = entityApi('caseTypes');
export const cases = entityApi('cases');

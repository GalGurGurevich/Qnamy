import { rest } from 'msw';
import * as store from './store';

export const handlers = [
  rest.post('/reset', (req, res, ctx) => {
    store.seed();
    return res(ctx.status(200));
  }),
  rest.get('/fields', (req, res, ctx) => res(ctx.status(200), ctx.json(store.fields.getAll()))),
  rest.get('/caseTypes', (req, res, ctx) => res(ctx.status(200), ctx.json(store.caseTypes.getAll()))),
  rest.get('/cases', (req, res, ctx) => res(ctx.status(200), ctx.json(store.cases.getAll()))),
  rest.get('/cases/:caseId', (req, res, ctx) => {
    const _case = store.cases.getById(req.params.caseId);
    return !_case
      ? res(ctx.status(404), ctx.json({ errorMessage: 'Case not found' }))
      : res(ctx.status(200), ctx.json(_case));
  }),
  rest.put('/cases/:caseId', (req, res, ctx) => {
    const updated = store.cases.update(req.params.caseId, req.body);
    return !updated
      ? res(ctx.status(404), ctx.json({ errorMessage: 'Case not found' }))
      : res(ctx.status(200));
  }),
  rest.post('/cases', (req, res, ctx) => {
    const result = store.cases.add(req.body);
    return res(ctx.status(201), ctx.json(result));
  }),
  rest.delete('/cases/:caseId', (req, res, ctx) => {
    store.cases.delete(req.params.caseId);
    return res(ctx.status(200));
  })
];

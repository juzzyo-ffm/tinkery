const rando = require('./rando');

test('basic random choice tests', () => {
  const r = new rando.Choice(['a', 'b']);
  expect(r.list()).toEqual(['a', 'b']);

  // expect the result from get to be an item in list
  expect(r.list()).toContain(r.get());
});
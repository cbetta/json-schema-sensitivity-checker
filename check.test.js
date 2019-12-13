const check = require("./check");

test("no errors (plain)", async () => {
  const item = { value: "This doesn't have any errors" };
  const actual = await check(item, { text: true });
  expect(actual.errors).toEqual([]);
});

test("no errors (markdown)", async () => {
  const item = { value: "This doesn't have *any* errors" };
  const actual = await check(item);
  expect(actual.errors).toEqual([]);
});

test("errors (plain)", async () => {
  const item = { value: "This has a simple error" };
  const actual = await check(item, { text: true });
  expect(actual.value).toEqual(item.value);
  expect(actual.errors.length).toEqual(1);
  expect(actual.errors[0].source).toEqual("retext-equality");
  expect(actual.errors[0].ruleId).toEqual("simple");
});

test("errors (markdown)", async () => {
  const item = { value: "This *has* a simple error" };
  const actual = await check(item);
  expect(actual.value).toEqual(item.value);
  expect(actual.errors.length).toEqual(1);
  expect(actual.errors[0].source).toEqual("retext-equality");
  expect(actual.errors[0].ruleId).toEqual("simple");
});

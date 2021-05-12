const extract = require("./extract");

const json = [
  {
    title: "This is the first item",
    position: 1,
    description: "A longer description for the first item",
  },
  {
    title: "This is the second item",
    position: 2,
    description: "A longer description for the second item",
  },
];

test("matches a single field", () => {
  expect(extract(json, ["title"])).toEqual([
    { path: "$[0].title", value: "This is the first item" },
    { path: "$[1].title", value: "This is the second item" },
  ]);
});

test("matches a multiple fields", () => {
  expect(extract(json, ["title", "position"])).toEqual([
    { path: "$.value[0].title", value: "This is the first item" },
    { path: "$.value[0].position", value: 1 },
    { path: "$.value[1].title", value: "This is the second item" },
    { path: "$.value[1].position", value: 2 },
  ]);
});

test("respects the JSONPath ordering", () => {
  expect(extract(json, ["position", "title"])).toEqual([
    { path: "$.value[0].position", value: 1 },
    { path: "$.value[0].title", value: "This is the first item" },
    { path: "$.value[1].position", value: 2 },
    { path: "$.value[1].title", value: "This is the second item" },
  ]);
});

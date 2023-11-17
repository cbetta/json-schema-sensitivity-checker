import checker from "./index.mjs";

const json = [
  {
    title: "Simple mistake here (trigger: simple)",
    nested: {
      title: "No mistake here",
    },
  },
  {
    title: "No mistake here",
    nested: {
      title: "But there is one simple mistake here nested (trigger: simple)",
    },
  },
];

test("checker run one", async () => {
  const actual = await checker(json, ["title"]);
  expect(actual.length).toBe(2);
});

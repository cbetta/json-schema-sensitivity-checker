const checker = require(".");

const json = [
  {
    title: "Simple mistake here (trigger: simple)",
    nested: {
      title: "No mistake here"
    }
  },
  {
    title: "No mistake here",
    nested: {
      title: "But there is one simple mistake here nested (trigger: simple)"
    }
  }
];

test("checker run one", async () => {
  const actual = await checker(json, ["title"]);
  expect(actual).toEqual([
    {
      errors: [
        {
          message: "`Simple` may be insensitive, try not to use it",
          name: "1:1-1:7",
          reason: "`Simple` may be insensitive, try not to use it",
          line: 1,
          column: 1,
          location: {
            start: { line: 1, column: 1, offset: 0 },
            end: { line: 1, column: 7, offset: 6 }
          },
          source: "retext-equality",
          ruleId: "simple",
          fatal: false,
          actual: "Simple",
          expected: undefined,
          note:
            "It’s probably not that simple. Even if it is, you probably don’t need to specifically say it. (source: https://css-tricks.com/words-avoid-educational-writing/)"
        }
      ],
      plain: "Simple mistake here (trigger: simple)",
      path: "$[0].title",
      value: "Simple mistake here (trigger: simple)"
    },
    {
      errors: [
        {
          message: "`simple` may be insensitive, try not to use it",
          name: "1:18-1:24",
          reason: "`simple` may be insensitive, try not to use it",
          line: 1,
          column: 18,
          location: {
            start: { line: 1, column: 18, offset: 17 },
            end: { line: 1, column: 24, offset: 23 }
          },
          source: "retext-equality",
          ruleId: "simple",
          fatal: false,
          actual: "simple",
          expected: undefined,
          note:
            "It’s probably not that simple. Even if it is, you probably don’t need to specifically say it. (source: https://css-tricks.com/words-avoid-educational-writing/)"
        }
      ],
      plain: "But there is one simple mistake here nested (trigger: simple)",
      path: "$[1].nested.title",
      value: "But there is one simple mistake here nested (trigger: simple)"
    }
  ]);
});

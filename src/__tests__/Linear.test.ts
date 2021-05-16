// eslint-disable-next-line node/no-unpublished-import
import nock from "nock";
import { Linear } from "../Linear";
import { readFileSync } from "fs";

const basePath = "https://api.linear.app";
const endpoint = "/graphql";

describe(Linear, () => {
  let linear: Linear;

  beforeEach(() => {
    linear = new Linear("apiKey", "teamId", "stateId");
    nock.cleanAll();
  });

  describe("#createIssue", () => {
    test("create issue from input", async () => {
      nock(basePath)
        .post(endpoint, {
          query: /.+/,
          variables: {
            input: {
              teamId: "teamId",
              stateId: "stateId",
              title: "This is title",
              description: "hoge",
            },
          },
        })
        .reply(200, {
          data: {
            issueCreate: {
              success: true,
              issue: {
                id: "107823cc-xxxx-xxxx-xxxx-b4cfdb9a03b7",
                title: "This is title",
              },
            },
          },
        });

      const actual = await linear.createIssue({
        title: "This is title",
        description: "hoge",
      });
      // @ts-ignore
      const issue = actual?._issue;
      expect({ success: true, _issue: issue }).toEqual({
        _issue: {
          id: "107823cc-xxxx-xxxx-xxxx-b4cfdb9a03b7",
          title: "This is title",
        },
        success: true,
      });
    });

    test("create issue from markdown", async () => {
      nock(basePath)
        .post(endpoint, {
          query: /.+/,
          variables: {
            input: {
              teamId: "teamId",
              stateId: "stateId",
              title: "test issue",
              estimate: 1,
              description:
                "\n\n## Items\n* Item 1\n* Item 2\n* Item 3\n\n## CheckBoxes\n- [ ] CheckBox 1\n- [ ] CheckBox 2\n\n*created by [hoge](https://github.com)*\n",
            },
          },
        })
        .reply(200, {
          data: {
            issueCreate: {
              success: true,
              issue: {
                id: "107823cc-xxxx-xxxx-xxxx-b4cfdb9a03b7",
                title: "test issue",
                estimate: 1,
                description:
                  "\n\n## Items\n* Item 1\n* Item 2\n* Item 3\n\n## CheckBoxes\n- [ ] CheckBox 1\n- [ ] CheckBox 2\n\n*created by [hoge](https://github.com)*\n",
              },
            },
          },
        });

      const data = readFileSync("./src/__tests__/test.md");
      const issueData = linear.readData(data);
      expect(issueData).toEqual({
        title: "test issue",
        estimate: 1,
        description:
          "\n\n## Items\n* Item 1\n* Item 2\n* Item 3\n\n## CheckBoxes\n- [ ] CheckBox 1\n- [ ] CheckBox 2\n\n*created by [hoge](https://github.com)*\n",
      });

      const actual = await linear.createIssue();

      // @ts-ignore
      const issue = actual?._issue;
      expect({ success: true, _issue: issue }).toEqual({
        _issue: {
          id: "107823cc-xxxx-xxxx-xxxx-b4cfdb9a03b7",
          title: "test issue",
          estimate: 1,
          description:
            "\n\n## Items\n* Item 1\n* Item 2\n* Item 3\n\n## CheckBoxes\n- [ ] CheckBox 1\n- [ ] CheckBox 2\n\n*created by [hoge](https://github.com)*\n",
        },
        success: true,
      });
    });

    test("create issue with dryrun", async () => {
      linear.isDryrun = true;

      const actual = await linear.createIssue({
        title: "This is title",
        description: "hoge",
      });

      expect(actual).toEqual({
        title: "This is title",
        description: "hoge",
        teamId: "teamId",
        stateId: "stateId",
      });
    });
  });
});

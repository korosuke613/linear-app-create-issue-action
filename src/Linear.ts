import { LinearClient } from "@linear/sdk";
import { loadFront } from "yaml-front-matter";

// eslint-disable-next-line node/no-missing-import
import { IssueCreateInput } from "@linear/sdk/dist/_generated_documents";

export class UndefinedError extends Error {
  constructor(content: string) {
    super();
    this.name = "UndefinedError";
    this.message = `${content} is undefined`;
  }
}

type IssueData = { [key: string]: unknown; title: string };

export class Linear {
  private client: LinearClient;
  private issueData?: IssueData;

  constructor(
    private apiKey: string,
    private teamId: string,
    private stateId: string,
    public isDryrun: boolean = false
  ) {
    this.client = new LinearClient({ apiKey });
  }

  /**
   * create task for check renovate.
   */
  async createIssue(issueData?: IssueData) {
    let inputIssueData = issueData;
    if (inputIssueData === undefined) {
      inputIssueData = this.issueData;
    }

    if (inputIssueData === undefined) {
      throw new UndefinedError("IssueData");
    }

    const issueCreateInput: IssueCreateInput = {
      teamId: this.teamId,
      stateId: this.stateId,
      ...inputIssueData,
    };

    if (this.isDryrun) {
      return issueCreateInput;
    }
    return this.client.issueCreate(issueCreateInput);
  }

  readData(data: string | Buffer): IssueData {
    const front = loadFront(data);
    const { __content, title, description, ...other } = front;

    this.issueData = {
      title,
      description: __content,
      ...other,
    };

    return this.issueData;
  }
}

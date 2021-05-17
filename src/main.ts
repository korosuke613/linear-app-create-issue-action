import { getInput, setFailed, info } from "@actions/core";
import { Linear, UndefinedError } from "./Linear";
import { readFileSync } from "fs";

async function main(
  issueFilePath: string,
  apiKey: string,
  teamId: string,
  stateId: string,
  isDryrun: boolean
) {
  if (apiKey === undefined || apiKey === "") {
    throw new UndefinedError("apiKey");
  }
  if (teamId === undefined || teamId === "") {
    throw new UndefinedError("teamId");
  }
  if (stateId === undefined || stateId === "") {
    throw new UndefinedError("stateId");
  }

  if (
    issueFilePath === undefined ||
    issueFilePath === "" ||
    !issueFilePath.endsWith(".md")
  ) {
    throw new UndefinedError("issueFilePath");
  }

  const client = new Linear(apiKey, teamId, stateId, isDryrun);

  info(`--- create ${issueFilePath} ---`);
  const data = readFileSync(issueFilePath);
  const issueData = client.readData(data);
  info(JSON.stringify(issueData, null, 2));

  if (isDryrun) {
    info(`--- !!DRYRUN!! ---`);
  }
  const result = await client.createIssue();
  info(`--- result ${issueFilePath} ---`);
  info(JSON.stringify(result, null, 2));
  info(`--- done ${issueFilePath} ---`);
}

async function run(): Promise<void> {
  try {
    const issueFilePath: string = getInput("issueFilePath");
    const apiKey: string = getInput("apiKey");
    const teamId: string = getInput("teamId");
    const stateId: string = getInput("stateId");
    const isDryrun: boolean = Boolean(getInput("isDryrun"));

    await main(issueFilePath, apiKey, teamId, stateId, isDryrun);
  } catch (error) {
    setFailed(error.message);
  }
}

run();

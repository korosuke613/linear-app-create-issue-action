# linear-app-create-issue-action

GitHub Action to create an Issue for [Linear.app](https://linear.app/).

[![build-test](https://github.com/korosuke613/linear-app-create-issue-action/actions/workflows/ci.yml/badge.svg)](https://github.com/korosuke613/linear-app-create-issue-action/actions/workflows/ci.yml) [![codecov](https://codecov.io/gh/korosuke613/linear-app-create-issue-action/branch/main/graph/badge.svg?token=2XrAav9ZlE)](https://codecov.io/gh/korosuke613/linear-app-create-issue-action)

## Usage

### Input
See action.yml

### Pre-requisites

### Workflow
Create a workflow `.yml` file in your repositories `.github/workflows` directory. An example workflow is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Issue file
Create issue file in markdown format. Write the contents of [IssueCreateInput](https://github.com/linear/linear/blob/8553690da1455e2f6a109bed65223bc5400fa7c2/packages/sdk/src/schema.graphql#L2021) in YAML format on the line enclosed by ---. title is required.

#### Example workflow
[example-issue.md](./example/example-issue.md)
```markdown
---
title: Issue file example  # title is required
estimate: 1
---
This block is description.

## Items
* Item 1
* Item 2
* Item 3

## CheckBoxes
- [ ] CheckBox 1
- [ ] CheckBox 2

*created by [korosuke613/linear-app-create-issue-action](https://github.com/korosuke613/linear-app-create-issue-action)*
```


[create-issue-every-friday.yml](example/create-issue-every-friday.yml)
```yaml
name: Create Issue every friday
on:
  schedule:
    - cron: "0 8 * * 5"  # At 08:00 on Friday (UTC).

jobs:
  create-issue:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: korosuke613/linear-app-create-issue-action@v1
        with:
          issueFilePath: "./example/example-issue.md"
          apiKey: ${{ secrets.YOUR_API_TOKEN_OF_LINEAR_APP }}
          teamId: ${{ secrets.YOUR_TEAM_ID_OF_LINEAR_APP }}
          stateId: ${{ secrets.YOUR_STATE_ID_OF_LINEAR_APP }}
```

**result**
![](./images/result_example.png)

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)

# cz-jira-simple-changelog

Simple cz plugin with jira ID support based in branch name

Add this to your package JSON:

```
{
...
"config": {
    "jiraProject": "YOUR_JIRA_PROJECT_KEY"
}
...
}
```

Prompts for [conventional changelog](https://github.com/stevemao/conventional-changelog-angular/blob/master/index.js) standard but contains less questions: asks only for a topic and for a body; doesn't ask for a scope and a footer. Plus, contains less commit types: refactor, style and perf mean the same (refactor).

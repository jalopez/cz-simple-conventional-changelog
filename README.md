# cz-jira-simple-changelog

Simple cz plugin with jira ID support based in branch name

Add this to your package JSON:

```
{
...
"config": {
    "jiraProject": "MYPROJECT"
}
...
}
```

Prompts for [conventional changelog](https://github.com/stevemao/conventional-changelog-angular/blob/master/index.js).
Infers jira issue based on branch name:

```
MYPROJECT-2345 feat(home) Add new feature to home
```

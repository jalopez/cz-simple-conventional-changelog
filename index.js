const wrap = require('word-wrap');
const cp = require('child_process');
const fs = require('fs');

module.exports = {
    prompter(cz, commit) {
        var jiraIssue = '',
            jiraProject = '';

        var options = [{
            type: 'list',
            name: 'type',
            message: 'Select the type of change that you\'re committing:',
            choices: [{
                name: 'feat: A new feature',
                value: 'feat'
            }, {
                name: 'fix: A bug fix',
                value: 'fix'
            }, {
                name: 'refactor: A change that neither fixes a bug nor adds a feature',
                value: 'refactor'
            }, {
                name: 'perf: A change that improves performance',
                value: 'perf'
            }, {
                name: 'test: A change that adds or updates tests',
                value: 'test'
            }, {
                name: 'chore: A change to the build process, auxiliary tools, or documentation',
                value: 'chore'
            }]
        }, {
            type: 'input',
            name: 'scope',
            message: 'Denote the scope of this change (home, settings...):\n'
        }, {
            type: 'input',
            name: 'subject',
            message: 'Write a short, imperative present tense description of the change:\n'
        }];

        var packageJSON = fs.readFileSync('package.json');
        if (packageJSON) {
            packageJSON = JSON.parse(packageJSON);
            jiraProject = packageJSON.config && packageJSON.config.jiraProject;
        }

        if (jiraProject) {
            var res = cp.spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
            if (res && res.stdout) {
                var re = new RegExp(jiraProject + '-(\\d+)', 'g'),
                    match = re.exec(res.stdout.toString());
                jiraIssue = match && match[1] || '';
            }

            options.unshift({
                type: 'input',
                name: 'jiraIssue',
                message: `Jira issue (${jiraProject}-)`,
                default: jiraIssue
            });
        }

        cz.prompt(options).then(answers => {
            const maxLineWidth = 120;

            const wrapOptions = {
                trim: true,
                newline: '\n',
                indent: '',
                width: maxLineWidth
            };

            if (answers.jiraIssue) {
                jiraIssue = jiraProject + '-' + answers.jiraIssue;
            }

            var scope = answers.scope.trim();
            scope = scope ? '(' + answers.scope.trim() + ')' : '';

            // Hard limit this line
            const head = `${jiraIssue} ${answers.type}${scope}: ${answers.subject.trim()}`;
        

            commit(`${head}`);
        });
    }
};

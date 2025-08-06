# memes-table

Capturing Meme's recipes and converting them to a widely distributed time resistant format.

https://nohren.github.io/memes-table

## Contributors

...

## Architecture

This project is meant to be lightweight, simple, sustainable and free. As such there is no backend, no database, no server. It does as much as currently possible with static and freely hosted content using GitHub Pages to host the main bundle.

Setup is via
https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/

Project archive functionality uses:
JSX via React, CSS via global style sheet and styled components.

Future plans include:

- Archive all recipes.
- Add an AI agent, a knowledgeable protoge of Meme as a real time cooking assistant.

## Setup

1. Open a terminal at this directory
2. Check if you have npm, in the terminal type `npm -v`. If nothing, install npm globally via npm website instructions.
3. Install node modules - `npm install`

## Local development

1. Serve project - `npm run start`
2. Open the browser and navigate to http://localhost:3000. Note, I changed the port to 3000 since 8080 conflicts with Mac OS Sonoma and greater.
3. Start work - Locate ./SRC directory and modify JS/CSS files within there.

## Deployment

1. Predeploy `npm run predeploy`
2. Deploy `npm run deploy`
3. Check it out at https://nohren.github.io/memes-table

## Future designs

- CICD github actions to deploy pages workflow
- deploy to custom domain

### Git Workflow

Git is our version control system and a safeguard when writing code.

We will use a feature branch workflow.
At the beginning of a new feature:

- checkout the main branch and pull the latest code.
- Then checkout a new branch to work from.
- When finished with your work, commit your desired changes and push to this same branch you are working from.
- Then open a Pull Request (PR) in github.com comparing your new branch with main branch and ask for review.

### Git commands

- `git status` - checks the status of the workspace
- `git log` - checks the git history. You can see a list of commits in descending order for that branch.
- `git checkout -b <newbranchname>` - creates a new branch and changes the current git branch to this new branch.
- `git checkout <branchname>` - changes the current git branch to this existing branch.
- `git add <filename | .>` - adds file changes to the staging area of the current branch. Use `.` to stage all files.
- `git restore --staged <filename | .>` - removes file changes from the staging area of the current branch. Use `.` to remove all staged file changes. Your changes will now exist as unstaged changes.
- `git restore <filename | .>` - removes file changes from the current branch. Use `.` to remove all file changes. Any unstaged changes will be lost.
- `git commit -m "your message here"` - commits the staged changes to git history as a new commit with the -m message option.
- `git pull origin <branchname>` - fetches and merges the latest code with the specified branch. Do this from main branch when starting a new feature to incorporate others changes.
- `git push origin <branchname>` - pushes your code to the git server for all to share

# memes-table

Capturing Meme's recipes and converting them to a widely distributed time resistant format.

https://nohren.github.io/memes-table

## Contributors

- Kristina
- Oren
- Josh

## Architecture

This project is meant to be lightweight, simple, and sustainable.

Setup is via
https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/

Project uses:
JSX via React, CSS via global style sheet and styled components.

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
- Custom domain www.memes-table.com

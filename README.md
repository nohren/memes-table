# memes-table

Name reflects the inspiration for this project, my grandmother Meme. The scope has expanded to include all family recipes, but the name remains to honor the project's origin. Name of the actual site may change.

Capturing the families culinary history and converting them to a widely distributed time resistant format.

## Setup

1. Open a terminal at this directory
2. Check if you have npm, in the terminal type `npm -v`. If nothing, install npm globally via npm website instructions.
3. Install node modules - `npm install`

## Local development

1. Serve project - `npm run start`
2. Open the browser and navigate to http://localhost:3000. Note, I changed the port to 3000 since 8080 conflicts with Mac OS Sonoma and greater.
3. Start work - Locate src directory and modify JS/CSS files within there.

## Deployment

1. Push to main. See it built at https://memes-table.vercel.app/. Deployment is automatic via Vercel.

## Future designs

- Archive all recipes.
- Add an AI cooking assistant for real time cooking help.
  - assistant voices:
    - [Lola](https://elevenlabs.io/app/voice-library?voiceId=wqKtomEaI22L2mdOxll3)
    - [Salma](https://elevenlabs.io/app/voice-library?voiceId=aCChyB4P5WEomwRsOKRh)
    - [Sakina](https://elevenlabs.io/app/voice-library?voiceId=RzNYiYBiH7YrpC9QKXyc)
- (far down the road... or never) change from hash routing to browser routing and deploy to custom domain

## Contributors

...

## Architecture

This project is meant to be lightweight, simple, sustainable and free. As such there is no dedicated backend, and no database currently. It does as much as currently possible with static and freely hosted content using vercel to build and host the main bundle. With vercel we also get automatic deployment, free serverless functions, and a CDN to place the content closer to the user. The CDN is not really needed for this project but is a nice bonus.

Project initial setup is via
https://www.freecodecamp.org/news/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4/

Uses JSX via React, CSS via global style sheet and styled components.

## Technology Stack & Usage Guide

This project uses several key technologies. Here's how to work with each one:

### React Router
**Purpose**: Client-side routing for single-page application navigation

**Key Components Used**:
- `BrowserRouter` - Wraps the app for routing functionality
- `Routes` & `Route` - Define route paths and components
- `Link` - Navigation links between pages
- `useNavigate` - Programmatic navigation
- `useLocation` - Access current route and state

**Common Patterns**:
```jsx
// Navigation with state
<Link to="/recipe/123" state={{ recipe: recipeData }}>
  View Recipe
</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/archive');

// Access route state
const location = useLocation();
const recipe = location.state?.recipe;
```

**Best Practices**:
- Use `navigate('/path')` instead of `navigate(-1)` for reliable back navigation
- Pass data via `state` prop when navigating to detail pages
- Always handle cases where `state` might be undefined

### React Icons
**Purpose**: Icon library with thousands of icons from popular icon sets

**Setup**:
```bash
npm install react-icons
```

**Usage**:
```jsx
import { IoArrowBackCircleSharp } from 'react-icons/io5';

// Direct usage
<IoArrowBackCircleSharp size={24} color="blue" />

// In icon store pattern (used in this project)
export const iconStore = { 
  backButton: IoArrowBackCircleSharp 
};
```

**Icon Sets Available**:
- `react-icons/io5` - Ionicons 5
- `react-icons/fa` - Font Awesome
- `react-icons/md` - Material Design
- `react-icons/hi` - Heroicons
- `react-icons/bs` - Bootstrap Icons

**Finding Icons**:
Visit [react-icons.github.io](https://react-icons.github.io/react-icons/search/) to search and preview icons.

### Styled Components
**Purpose**: CSS-in-JS library for component-scoped styling

**Setup**:
```bash
npm install styled-components
```

**Basic Usage**:
```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background: darkblue;
  }
`;
```

**Advanced Patterns**:
```jsx
// Extending existing components
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

// Conditional styling
const Card = styled.div`
  background: ${props => props.highlighted ? 'yellow' : 'white'};
`;

// Using CSS variables
const Container = styled.div`
  color: var(--fg);
  background: var(--bg);
`;
```

**Best Practices**:
- Keep styled components close to where they're used
- Use CSS variables for theme colors
- Leverage `&:hover`, `&:focus` pseudo-selectors
- Use `props` for conditional styling

### CSS Variables (Custom Properties)
**Purpose**: Dynamic theming and consistent color management

**Definition** (in CSS or styled-components):
```css
:root {
  --fg: #ffffff;
  --bg: #1a1a1a;
  --accent: #66e3ff;
}
```

**Usage**:
```css
.text {
  color: var(--fg);
  background: var(--bg);
}

.highlight {
  color: var(--accent);
}
```

**Benefits**:
- Easy theme switching
- Consistent colors across components
- Runtime color changes possible

### JSON Data Management
**Purpose**: Static data storage without database

**Structure** (dummy_recipes.json):
```json
[
  {
    "id": 1,
    "title": "Recipe Name",
    "author": "Author Name",
    "description": "Recipe description",
    "prep_time": "15 minutes",
    "cook_time": "30 minutes",
    "ingredients": ["ingredient 1", "ingredient 2"],
    "steps": [
      {
        "step_number": 1,
        "instruction": "First step"
      }
    ],
    "image": "path/to/image.jpg"
  }
]
```

**Usage**:
```jsx
import recipes from '../store/dummy_recipes.json';

// Find specific recipe
const recipe = recipes.find(r => r.id === recipeId);

// Map over all recipes
{recipes.map(recipe => (
  <RecipeCard key={recipe.id} recipe={recipe} />
))}
```

### Utility Functions
**Purpose**: Reusable helper functions

**Time Parsing** (utilities.js):
```jsx
export const parseTime = (timeString) => {
  const match = timeString.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

// Usage
const totalTime = parseTime(recipe.prep_time) + parseTime(recipe.cook_time);
```

**Best Practices**:
- Keep utilities pure functions
- Export from centralized utility files
- Use descriptive function names
- Handle edge cases (null, undefined, invalid input)

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

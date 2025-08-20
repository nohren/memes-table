const ctx = require.context('../data/recipes', false, /\.json$/);
const recipes = ctx.keys().map(ctx);
export default recipes;

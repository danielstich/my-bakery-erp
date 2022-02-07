const express = require('express');
const cors = require('cors');
const UsersRouter = require('./Routers/UsersRouter');
const InventoryRouter = require('./Routers/InventoryRouter');
const IngredientsRouter = require('./Routers/IngredientsRouter');
const IngredientsUsedRouter = require('./Routers/IngredientsUsedRouter');
const RecipesRouter = require('./Routers/RecipesRouter');
const BatchesRouter = require('./Routers/BatchesRouter');
const TransactionRouter = require('./Routers/TransactionRouter');

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is Live')
})

app.use('/users', UsersRouter)
app.use('/inventory', InventoryRouter)
app.use('/ingredients', IngredientsRouter)
app.use('/recipes', RecipesRouter);
app.use('/batches', BatchesRouter);
app.use('/ingredients_used', IngredientsUsedRouter);
app.use('/transactions', TransactionRouter)



app.listen(8080, () => {
    console.log('listening on port 8080...')
})
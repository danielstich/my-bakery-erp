const express = require('express');
const cors = require('cors');
const UsersRouter = require('./Routers/UsersRouter');
const InventoryRouter = require('./Routers/InventoryRouter');
const IngredientsRouter = require('./Routers/IngredientsRouter');
const RecipesRouter = require('./Routers/RecipesRouter');
const BatchesRouter = require('./Routers/BatchesRouter');

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



app.listen(8080, () => {
    console.log('listening on port 8080...')
})
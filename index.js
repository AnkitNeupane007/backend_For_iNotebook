const connectToMongo = require('./database');
const express = require('express')
connectToMongo();

const app = express()
const port = 5000

app.use(express.json())

// Routes available
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

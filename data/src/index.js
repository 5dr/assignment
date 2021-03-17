const app = require('./app')

const User = require('./models/user')

const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
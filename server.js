var app = require('./app');

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor node em funcionamento na porta - ${PORT}`)
})
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const e = require('express')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://rodrigo:mongo1@rodrigosanchez.hdsdd.mongodb.net/?retryWrites=true&w=majority&appName=RodrigoSanchez`)
}

app.get ('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

app.post ('/filmes', async (req, res) => {
    //capturar as informações enviadas e trazer para o contexto
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um json novo com as informações recebidas
    // const filme_novo = {titulo: titulo, sinopse:sinopse}
    // //acrescenta o novo filme à base de dados
    // filmes.push(filme_novo)
    // //exibir a base atualizada
    const filme = new Filme({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find
    res.json(filmes)
})

app.listen (3000, () => {
    try{
        conectarAoMongo()
        console.log("server up & running & connection ok")
    }
    catch{
        console.log("erro de conexão", e)
    }
})
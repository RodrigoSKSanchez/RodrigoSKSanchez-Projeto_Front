const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

app.get('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Divertidamente",
        sinopse: "Com a mudança para uma nova cidade, as emoções de Riley, que tem apenas 11 anos de idade, ficam extremamente agitadas. Uma confusão na sala de controle do seu cérebro deixa a Alegria e a Tristeza de fora, afetando a vida de Riley radicalmente.",
    },
    {
        titulo: "Indiana Jones e o Chamado do Destino",
        sinopse: "O lendário herói arqueólogo está de volta neste aguardado capítulo final da icônica franquia, uma incrível e empolgante aventura cinematográfica."
    }
]

app.get ('/filmes', (req, res) => {
    res.json(filmes)
})

app.post ('/filmes', (req, res) => {
    //capturar as informações enviadas e trazer para o contexto
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar um json novo com as informações recebidas
    const filme_novo = {titulo: titulo, sinopse:sinopse}
    //acrescenta o novo filme à base de dados
    filmes.push(filme_novo)
    //exibir a base atualizada
    res.json(filmes)
})

app.listen (3000, () => console.log("server up & running"))
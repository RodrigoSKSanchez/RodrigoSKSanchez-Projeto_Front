const protocolo = 'http://'
const baseURL = 'localhost:3000'


function exibirFilmes(filmes) {
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
                alert.innerHTML = innerHTML
                alert.classList.add(...classesToAdd)
                alert.classList.remove(...classesToRemove)
                setTimeout(() => {
                    alert.classList.remove(...classesToAdd)
                    alert.classList.add(...classesToRemove)
                   
                }, timeout);
}

function escondeModal(seletor, timeout) {
    setTimeout(() => {
        let modalCadastro = bootstrap.Modal.getInstance(
            document.querySelector(seletor)
        )
        modalCadastro.hide()
    }, timeout);
}

async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    exibirFilmes(filmes)
}
async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let titulo = tituloInput.value 
    let sinopse = sinopseInput.value
    tituloInput.value = ""
    sinopseInput.value = ""
    if (titulo && sinopse) {
        const filmes = (await axios.post (URLcompleta, {titulo, sinopse})).data
        exibirAlerta('.alert-filme', "Filme cadastrado com sucesso!!!", ['show', 'alert-success'],
                    ['d-none'], 2000)
        exibirFilmes(filmes)
    }
    else {
        exibirAlerta('.alert-filme', "Preencha todos os campos", ['show', 'alert-danger'],
                    ['d-none'], 2000)
    }
}

async function cadastrarUsuario() {
    // 
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        try{
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            const cadastrarUsuarioEndpoint = '/signup'
            const URLcompleta = `${protocolo}${baseURL}${cadastrarUsuarioEndpoint}`
            await axios.post (
                URLcompleta,
                {login: usuarioCadastro, password: passwordCadastro}
            )
            exibirAlerta('.alert-modal-cadastro',"Usuário cadastrado com sucesso!!!", 
                         ['show', 'alert-success'], ['d-none'], 2000)
            escondeModal('#modalCadastro', 2000)
        }
        catch(e) {
            passwordCadastroInput = ""
            exibirAlerta('.alert-modal-cadastro',"Não foi possível cadastrar usuário", 
                         ['show', 'alert-danger'], ['d-none'], 2000)
            escondeModal('#modalCadastro', 2000)
        }

    }
    else{
        exibirAlerta('.alert-modal-cadastro',"Preencha todos os campos", 
                    ['show', 'alert-danger'], ['d-none'], 2000)
    }
}
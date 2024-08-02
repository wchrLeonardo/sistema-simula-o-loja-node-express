import express from "express"
const router = express.Router()
import Cliente from "../models/Cliente.js"

import Auth from "../middleware/Auth.js"

// ROTA CLIENTES
router.get('/clientes', Auth, (req, res) => {
    Cliente.findAll().then(clientes => {
        res.render('clientes', {
            clientes : clientes
        })
    })
})

// ROTA DE CADASTRO DE CLIENTE
router.post('/clientes/new', Auth, (req, res) => {
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.create({
        nome : nome,
        cpf: cpf,
        endereco: endereco
    }).then(()=>{
        res.redirect("/clientes")
    }).catch(erro => {
        console.log(erro)
    })
})

// ROTA DE EXCLUSÃO DE CLIENTE
router.get("/clientes/delete/:id", Auth, (req, res) => {
    const id = req.params.id
    Cliente.destroy({
        where: {
            id : id
        }
    }).then(()=>{
        res.redirect('/clientes')
    }).catch(erro => {
        console.log(erro)
    })
})

// ROTA DE EDIÇÃO DE CLIENTE
router.get('/clientes/edit/:id', Auth, (req, res) => {
    const id = req.params.id
    Cliente.findByPk(id).then(cliente =>{
        res.render('clienteEdit', {
            cliente: cliente
        })
    })
})

router.post('/clientes/update/:id', Auth, (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const cpf = req.body.cpf
    const endereco = req.body.endereco
    Cliente.update(
        {
        nome: nome,
        cpf: cpf,
        endereco: endereco
        },
        {where: {id:id}}
).then(()=>{
    res.redirect('/clientes')
    })
})
// EXPORTANDO O MÓDULO DE ROTAS
export default router

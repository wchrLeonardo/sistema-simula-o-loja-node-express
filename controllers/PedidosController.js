import express from 'express'
const router = express.Router()
import Pedido from "../models/Pedido.js"
import Auth from "../middleware/Auth.js"

// ROTA PEDIDOS
router.get('/pedidos', Auth, (req, res) => {
    Pedido.findAll().then(pedidos => {
        res.render('pedidos', {
            pedidos : pedidos
        })
    })
})

// ROTA DE CADASTRO DE PEDIDO
router.post('/pedidos/new', Auth, (req, res) => {
    const numero = req.body.numero
    const valor = req.body.valor
    Pedido.create({
        numero: numero,
        valor: valor
    }).then(()=>{
        res.redirect("/pedidos")
    }).catch(erro => {
        console.log(erro)
    })
})

// ROTA DE EXCLUSÃO DE PEDIDO
router.get("/pedidos/delete/:id", Auth, (req, res) => {
    const id = req.params.id
    Pedido.destroy({
        where: {
            id : id
        }
    }).then(()=>{
        res.redirect('/pedidos')
    }).catch(erro => {
        console.log(erro)
    })
})

// ROTA DE EDIÇÃO DE CLIENTE
router.get('/pedidos/edit/:id', Auth, (req, res) => {
    const id = req.params.id
    Pedido.findByPk(id).then(pedido =>{
        res.render('pedidoEdit', {
            pedido: pedido
        })
    })
})

router.post('/pedidos/update/:id', Auth, (req, res) => {
    const id = req.body.id
    const numero = req.body.numero
    const valor = req.body.valor
    Pedido.update(
        {
        numero: numero,
        valor: valor,
        },
        {where: {id:id}}
).then(()=>{
    res.redirect('/pedidos')
    })
})

// EXPORTANDO O MÓDULO DE ROTAS
export default router
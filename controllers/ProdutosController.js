import express from "express"
const router = express.Router()
import Produto from "../models/Produto.js"
import Auth from "../middleware/Auth.js"

// ROTA PRODUTOS
router.get('/produtos', Auth, (req, res) => {
    Produto.findAll().then(produtos => {
        res.render('produtos', {
            produtos : produtos
        })
    })
})

//ROTA CADASTRO DE PRODUTO
router.post('/produtos/new', Auth, (req, res)=>{
    const nome = req.body.nome
    const preco = req.body.preco
    const categoria = req.body.categoria
    Produto.create({
        nome: nome,
        preco: preco,
        categoria: categoria
    }).then(()=>{
        res.redirect('/produtos')
    }).catch(erro =>{
        console.log(erro)
    })
})

// ROTA DE EXCLUSÃO DE PRODUTO
router.get("/produtos/delete/:id", Auth, (req, res) => {
    const id = req.params.id
    Produto.destroy({
        where: {
            id : id
        }
    }).then(()=>{
        res.redirect('/produtos')
    }).catch(erro => {
        console.log(erro)
    })
})

// ROTA DE EDIÇÃO DE PRODUTO
router.get('/produtos/edit/:id', Auth, (req, res) => {
    const id = req.params.id
    Produto.findByPk(id).then(produto =>{
        res.render('produtoEdit', {
            produto: produto
        })
    })
})

router.post('/produtos/update/:id', Auth, (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const preco = req.body.preco
    const categoria = req.body.categoria
    Produto.update(
        {
        nome: nome,
        preco: preco,
        categoria: categoria
        },
        {where: {id:id}}
).then(()=>{
    res.redirect('/produtos')
    })
})
// EXPORTANDO O MÓDULO DE ROTAS
export default router
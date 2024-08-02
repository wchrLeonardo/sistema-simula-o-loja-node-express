import express from "express"
const router = express.Router()

import User from "../models/User.js"

import bcrypt from "bcrypt"

//ROTA DE LOGIN
router.get("/login", (req, res)=>{
    res.render("login", {
        loggedOut: true,
        messages: req.flash()
    })
})

//ROTA DE CADASTRO
router.get("/cadastro", (req, res)=>{
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    })
})

//ROTA DE CRIAÇÃO DE USUÁRIO NO BANCO
router.post("/createUser", (req, res)=>{
    //Coletando informações do corpo da requisição
    const email = req.body.email
    const password = req.body.password
    //Verificando se o usuário já está cadastrado
    User.findOne({where: {email: email}}).then(user => {
        //SENÃO HOUVER
        if(user == undefined){
            //HASH DE SENHA
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            // AQUI SERÁ CRIADO O USUÁRIO COM O HASH
            User.create({
                email: email,
                password: hash
            }).then(()=>{
                res.redirect("/login")
            })
        }else{
            req.flash('danger', 'Usuário já possui cadastro, faça o login!')
            res.redirect("/cadastro")
        }
    })
 
})

//ROTA DE AUTENTICAÇÃO
router.post("/authenticate",(req,res)=>{
    const email = req.body.email
    const password = req.body.password
 
    User.findOne({where:{email:email}}).then(user =>{
        if(user != undefined){
            //valida a senha
            const correct = bcrypt.compareSync(password,user.password)
            //se a senha for valida
            if(correct){
                //autoriza o login - criaremos a sessão do usuário
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                // res.send(`Usuário logado: <br> ID: ${req.session.user['id']} <br> E-mail: ${req.session.user['email']}`)
                //Criando uma Flash Message
                req.flash('success', `Bem vindo ${req.session.user['email']}`)
                res.redirect("/")

                //se a senha não for válida
            }else{
                // Exibe a mensagem
                req.flash('danger', 'Senha incorreta! Tente novamente.')
                res.redirect("/login")
            }
            //se o usuario nao existir
        }else{
            req.flash('danger', 'Usuário não cadastrado!')
            res.redirect("/login")
        }
    })
})

//Rota de logout
router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

export default router
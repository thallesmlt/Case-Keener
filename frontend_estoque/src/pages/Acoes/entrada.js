import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import api from '../../config/configApi'
import { Container, ConteudoTitulo, Titulo, Form, Input, Label, ButtomInfo, ButtomSuccess, AlertDanger, AlertSuccess} from '../../styles/custom_adm';
const moment = require('moment')

export const Entrada = (props) =>{
    const [id]= useState(props.match.params.id)
    const [nome, setNome] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [entrada, setEntrada] = useState('')
    const [valor, setValor] = useState('')
    const [valorTotal, setValorTotal] = useState('')
  
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })
    

    useEffect(() => {
        const getProduto = async () => {
            await api.get("/produtos/visualizar/" + id).then((response) => {
                console.log(response)
                setNome(response.data.produto.nome)
                setQuantidade(response.data.produto.quantidade)
                setValor(response.data.produto.valor)
                setValorTotal(response.data.produto.valorTotal)
            }).catch((err) => {
                if(err.response){
                    setStatus({
                        type: 'error', 
                        mensagem: err.response.data.mensagem
                    })
                }else{
                    setStatus({
                        type: 'error',
                        mensagem: "Error: Tente mais tarde"
                    })
                }
            })
        }
        getProduto()

    },[id])

    const entradaProduto = async e => {
        e.preventDefault() //evita recarregar a pagina 
        console.log(entrada)

        const headers = {
            'Content-Type': 'application/json',
            "x-access-token": localStorage.getItem("token")
        }

        await api.put("/produtos/entrada", {id,valor, valorTotal,quantidade,entrada}, {headers}).then((response) =>{
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            })
            
            const tipo = "Entrada"
            const quantidadeAlterada = entrada
            const produto = nome
            const data = moment().format('DD/MM/YYYY h:mm:ss')
            const email = localStorage.getItem("email")
           
            api.post("/log/entrada", {produto,quantidadeAlterada,data,email,tipo}, {headers}).then((response) =>{
                /*setStatus({
                    type: 'success',
                    mensagem: response.data.mensagem
                })*/
                
            }).catch((err) =>{
                /*if(err.response){
                    setStatus({
                        type: 'error',
                        mensagem: err.response.data.mensagem
                    })
                } else{
                    setStatus({
                        type: 'error',
                        mensagem: "Error: Tente mais tarde"
                    })
                }*/
                
            })

        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            } else{
                setStatus({
                    type: 'error',
                    mensagem: "Error: Tente mais tarde"
                })
            }
            
        })
        window.setTimeout(function(){window.location.reload()},1500)
    }
    return(
        <Container>
            <ConteudoTitulo>
                <Titulo>Entrada de Mercadoria</Titulo>
                <Link to="/produtos">
                    <ButtomInfo>Listar Produtos</ButtomInfo>
                </Link>
            </ConteudoTitulo>

            {status.type === 'error'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
            {status.type === 'success'?  <AlertSuccess>{status.mensagem}</AlertSuccess> : ""}
           
            <Form onSubmit={entradaProduto}>
            <Label>Nome: </Label>
            <Input type="text" name="nome" value={nome} readOnly/>

            <Label>Estoque Atual: </Label>
            <Input type="number" name="quantidade" value={quantidade} readOnly/>

            <Label>Entrada: </Label>
            <Input type="text" name="entrada" placeholder="Unidades para entrada" onChange={e => setEntrada(e.target.value)}/>
            
            <ButtomSuccess type="submit" onClick="window.location.reload();">Confirmar</ButtomSuccess>
            </Form>
        </Container>
        
    )
}
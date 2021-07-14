import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Container, ConteudoTitulo, Titulo, Form, Input, Label, ButtomInfo, ButtomSuccess, AlertDanger, AlertSuccess} from '../../styles/custom_adm';
import api from '../../config/configApi'


export const CadastrarProdutos = () =>{
    const [produto, setProduto] = useState({
        nome: '',
        quantidade: '',
        valor:'',
        valorTotal: ''
    })

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const valorInput = e => setProduto({...produto, [e.target.name]: e.target.value})
    produto.valorTotal = produto.quantidade * produto.valor
    const cadProduto = async e => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json'
        }
        
        await api.post("/produtos/cadastrar", produto, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }}).then((response) =>{
            console.log(response)
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            })
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            }else{
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                })
            }
            console.log(err.response)
        })
        window.setTimeout(function(){window.location.reload()},1500)
    }

    return(
        <Container>
             <ConteudoTitulo>
                <Titulo>Cadastrar Produto</Titulo>
                <Link to="/produtos">
                    <ButtomInfo>Listar Produtos</ButtomInfo>
                </Link>    
            </ConteudoTitulo>
            
            {status.type === 'error'? <AlertDanger>{status.mensagem}</AlertDanger> : ""}
            {status.type === 'success'? <AlertSuccess> {status.mensagem}</AlertSuccess> : ""}
            
            <Form onSubmit={cadProduto}>
                <Label>Nome: </Label>
                <Input type="text" name="nome" placeholder="Nome do produto" onChange={valorInput}/>
                <Label>Quantidade: </Label>
                <Input type="text" name="quantidade" placeholder="Unidades a serem inseridas no estoque" onChange={valorInput}/>  
                <Label>Valor: </Label>
                <Input type="text" name="valor" placeholder="Valor do Produto" onChange={valorInput}/>
                <ButtomSuccess type="submit">Cadastrar</ButtomSuccess>  
            </Form> 
        </Container>   
    )
}
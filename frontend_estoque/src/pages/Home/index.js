import React, { useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Container, ConteudoTitulo, Titulo, BotaoAcoes, BotaoAcoesLogin, Table } from '../../styles/custom_adm';

import api from '../../config/configApi'

export const Home = () => {
    const [data, setData] = useState([])

    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const listarProdutos = async (e) => {

        await api.get("/produtos/listar", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }}).then((response) =>{
            console.log(response)
            setData(response.data.produtos)
        }).catch((err) =>{
            if(err.response){
                setStatus({
                    type: 'erro',
                    mensagem: err.response.data.mensagem
                })
            } else{ // caso a api nao responda
                setStatus({
                    type: 'erro',
                    mensagem: 'Erro: Tente mais tarde!'
                })    
            }
        })
    }

    useEffect(() => {
        listarProdutos()
    }, [])


    return(
        <Container>
            <Titulo>Produtos Cadastrados no Estoque
            <Link to="/">
                <BotaoAcoesLogin>Login</BotaoAcoesLogin>
                </Link>
            </Titulo>

            <ConteudoTitulo>
                <Link to="/cadastrar">
                <BotaoAcoes>Cadastrar Produtos</BotaoAcoes>
                </Link>
                <Link to="/log">
                <BotaoAcoes>Movimentações de Estoque</BotaoAcoes>
                </Link>   
            </ConteudoTitulo>
            
            {status.type === 'erro'? <span>{status.mensagem}</span>: ""}

            <Table> 
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Estoque</th>
                        <th>Valor em Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {data.map(item => (
                       <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.nome}</td>
                           <td>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.valor)}</td>
                           <td>{item.quantidade}</td>
                           <td>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.valorTotal)}</td>
                           <td>
                               <Link to={"/entrada/" + item.id}><BotaoAcoes>Entrada</BotaoAcoes></Link>
                               <Link to={"/saida/" + item.id}><BotaoAcoes>Saida</BotaoAcoes></Link>
                           </td>
                       </tr>
                   ))} 
                </tbody>
              
            </Table>
        </Container>
    )
}
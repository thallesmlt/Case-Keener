import React, { useState , useEffect} from 'react';
import {Link} from 'react-router-dom'
import { Container, ConteudoTitulo, Titulo, BotaoAcoes, Table} from '../../styles/custom_adm';

import api from '../../config/configApi'

export const ListarLog = () => {
    const [data, setData] = useState([])
 
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    })

    const listar = async (e) => {

        await api.get("/log/listar", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }}).then((response) =>{
            setData(response.data.entradas)
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
        listar()
    }, [])


    return(
        <Container>
            <ConteudoTitulo>
                <Titulo>Listagem das Movimentações no Estoque</Titulo>
                <Link to="/produtos">
                <BotaoAcoes>Listar Produtos</BotaoAcoes>
                </Link>
                
            </ConteudoTitulo>
            
            {status.type === 'erro'? <span>{status.mensagem}</span>: ""}

            <Table> 
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email do modificador</th>
                        <th>Produto</th>
                        <th>Acao</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                   {data.map(item => (
                       <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.email}</td>
                           <td>{item.produto}</td>
                           <td>{item.tipo}</td>
                           <td>{item.quantidadeAlterada}</td>
                           <td>{item.data}</td>  
                       </tr>
                   ))} 
                </tbody>
                
            </Table>
        </Container>
    )
}
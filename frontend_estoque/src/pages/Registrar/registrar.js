import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { AlertDangerLogin, AlertSuccessLogin} from '../../styles/custom_adm';
import './registrar.css'
import api from '../../config/configApi'

import { MdEmail, MdLock } from "react-icons/md"

export const Registrar = () => {
   let history = useHistory();
   const [registrar, setRegistrar] = useState({
      email: '',
      senha: '',
      confirmarSenha: ''
   })

   const [show, setShow] = useState(false)

   const [status, setStatus] = useState({
      type: '',
      mensagem: ''
  })

  const valorInput = e => setRegistrar({...registrar, [e.target.name]: e.target.value})

  const cadUsuario = async e => {
      e.preventDefault()
      const headers = {
          'Content-Type': 'application/json'
      }
      await api.post("/register", registrar, {headers}).then((response) =>{
         
          setStatus({
              type: 'success',
              mensagem: "Registrado com sucesso!"
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
      })
  }

   return (
      <div className="registrar">
        
         <div className="registrar-right">
            <h1>Controle de Estoque</h1>

            <div className="registrar-registrarInputEmail">
               <MdEmail />
               <input
                  type="email"
                  placeholder="Digite um email"
                  name="email"
                  onChange={valorInput/*e => setEmail(e.target.value)*/}
               />
            </div>

            <div className="registrar-registrarInputPassword">
               <MdLock />
               <input
                  placeholder="Digite sua senha"
                  type={show ? "text" : "password"}
                  name="senha"
                  onChange={valorInput/*e => setSenha(e.target.value)*/}
               />
               
            </div>

            <div className="registrar-registrarInputPassword">
               <MdLock />
               <input
                  placeholder="Digite novamente sua senha"
                  type={show ? "text" : "password"}
                  name="confirmarSenha"
                  onChange={valorInput/*e => setConfirmarSenha(e.target.value)*/}
               />
               
            </div>
        
            <button type="submit" onClick={cadUsuario}>
               Cadastrar
            </button>
            
            {status.type === 'error'? <AlertDangerLogin>{status.mensagem}</AlertDangerLogin> : ""}
            {status.type === 'success'? <AlertSuccessLogin> {status.mensagem}</AlertSuccessLogin> : ""}
            <br />< br/>

            <button type="submit" onClick={() =>{
               history.push("/")
            }}>
               Login
            </button>
            
         </div>
      </div>
   )
}
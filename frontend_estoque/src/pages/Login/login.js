import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { AlertDangerLogin, AlertSuccessLogin} from '../../styles/custom_adm';
import './login.css'
import api from '../../config/configApi'

import { MdEmail, MdLock } from "react-icons/md"

export const Login = () => {
   
   const [login, setLogin] = useState({
      email: '',
      senha: ''
   })

   const [show, setShow] = useState(false)

   const [status, setStatus] = useState({
      type: '',
      mensagem: ''
  })

  const valorInput = e => setLogin({...login, [e.target.name]: e.target.value})

  const cadLogin = async e => {
      e.preventDefault()
      const headers = {
          'Content-Type': 'application/json'
      }
      await api.post("/login", login, {headers}).then((response) =>{
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("email", login.email)
          setStatus({
              type: 'success',
              mensagem: "Login bem sucedido e token armazenado"
          })
          history.push("/produtos")
      }).catch((err) =>{
          if(err.response){
              setStatus({
            type: 'error',
              mensagem: err.response.data.mensagem
              })
          }else{
              setStatus({
               type: 'error',
               mensagem: err.response.data.mensagem
              })
          }
      })
  }

  const usuarioAutenticado = async () => {
     await api.get("/autenticado", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        },
     }).then(response => {
        history.push("/produtos")
     })
  }

   let history = useHistory();
 
   return (
      <div className="login">
      
         <div className="login-right">
         
            <h1>Controle de Estoque</h1>

            <div className="login-loginInputEmail">
               <MdEmail />
               <input
                  type="email"
                  placeholder="Digite um email"
                  name="email"
                  onChange={valorInput/*e => setEmail(e.target.value)*/}
               />
            </div>

            <div className="login-loginInputPassword">
               <MdLock />
               <input
                  placeholder="Digite sua senha"
                  type={show ? "text" : "password"}
                  name="senha"
                  onChange={valorInput/*e => setPassword(e.target.value)*/}
               />
            </div>

            <button type="submit" onClick={cadLogin}>
               Entrar
            </button>

            {status.type === 'error'? <AlertDangerLogin>{status.mensagem}</AlertDangerLogin> : ""}
            {status.type === 'success'? <AlertSuccessLogin> {status.mensagem}</AlertSuccessLogin> : ""}

            <h4>Não tenho conta!</h4>

            <button type="submit" onClick={() =>{
               history.push("/Registrar")
            }}>
               Cadastrar
            </button>
         </div>

            

      </div>
   )
}


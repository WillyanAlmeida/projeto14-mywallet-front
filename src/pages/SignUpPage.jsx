import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useEffect } from "react";
import axios from 'axios';


export default function SignUpPage() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('')
  let [passwordCheck, setPasswordCheck] = useState('')
  let [name, setName] = useState('')
  let [btstats, setBtstats] = useState(false)

  const navigate = useNavigate()

  function sendCadastro(e) {

    e.preventDefault();
    setBtstats(true);

    if (password === passwordCheck) {
      console.log(name)
      console.log(email)
      console.log(password)
      const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, {
        email,
        name,
        password,
      })
      console.log(cadastro)
      cadastro.then(() => {
        navigate("/")
        setBtstats(false)
        console.log(cadastro)
      })

      cadastro.catch(erro => {
        alert(erro);
        setBtstats(false)
        console.log(cadastro)
      });
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={sendCadastro}>
        <MyWalletLogo />
        <input data-test="name" disabled={btstats} placeholder="Nome" type="text" id="name" required value={name} onChange={e => setName(e.target.value)} />
        <input data-test="email" disabled={btstats} id="email" required type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input data-test="password" disabled={btstats} placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input data-test="conf-password" disabled={btstats} placeholder="Confirme a senha" type="password" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)} />
        <button data-test="sign-up-submit" disabled={btstats} type="submit" >Cadastrar</button>
      </form>

      <Link to={'/'} >
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

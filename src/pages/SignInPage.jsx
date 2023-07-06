import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";




export default function SignInPage() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('')
  let [btstats, setBtstats] = useState(false)

  const navigate = useNavigate()

  function login(e) {

    e.preventDefault();
    setBtstats(true);
    console.log(email)
    console.log(password)
    console.log(import.meta.env.VITE_API_URL)
    const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/sign-in`, {
      email,
      password,
    })
    cadastro.then(() => {
      navigate("/home")
      setBtstats(false)
      console.log(cadastro)
    })

    cadastro.catch(erro => {
      alert(erro);
      setBtstats(false)
      console.log(cadastro)
    });
  }


    return (
      <SingInContainer>
        <form onSubmit={login}>
          <MyWalletLogo />
          <input data-test="email" disabled={btstats} placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          <input data-test="password" disabled={btstats} placeholder="Senha" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
          <button data-test="sign-in-submit" disabled={btstats} type="submit" >Entrar</button>
        </form>

        <Link to={`/cadastro`}>
          Primeira vez? Cadastre-se!
        </Link>
      </SingInContainer>
    )
  }

  const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

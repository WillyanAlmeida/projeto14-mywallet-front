import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignInPage() {

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('')
  let [btstats, setBtstats] = useState(false)

  function login(e) {

    e.preventDefault();
    setBtstats(true);
    console.log(email)
    console.log(password)
    const cadastro = axios.post("http://localhost:5000/sign-in", {
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

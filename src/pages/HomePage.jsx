import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { UserContext } from "../Context";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

export default function HomePage() {
  let total = 0
  let [etotal, setEtotal] = useState(total)
  const { user, setTransaction, alltransaction, setAlltransaction } = useContext(UserContext);
  const navigate = useNavigate()

  const config = {
    headers: {
      "Authorization": `Bearer ${user?.token}`
    }
  }

  useEffect(() => {
    const requisition = axios.get(`${import.meta.env.VITE_API_URL}/home`, config);

    requisition.then(resposta => {
      setAlltransaction((resposta.data))
      total = 0
      somartotal(resposta.data.reverse())
    })
    requisition.catch(error => {
      console.log(error)
      navigate("/")
    })
      ;
  }, []);

  function newtransactionrout(x) {
    setTransaction(x)
    navigate(`/nova-transacao/${x}`)
  }
  function somartotal(transaction) {
    transaction.forEach((e) => {
      if (e.type === "entrada") {
        total = total + e.value
      }
      if (e.type === "saida") {
        total = total - e.value
      }
    })
    setEtotal(total)
  }

  if (alltransaction === undefined) {
    return <div>Carregando.....</div>
  }

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">Olá, {user?.name}</h1>
        <Link data-test="logout" to={"/"}>
          <BiExit />
        </Link>
      </Header>

      <TransactionsContainer>
        <ul>
          {alltransaction.reverse()?.map((transaction) =>
            <ListItemContainer key={transaction._id} >
              <div>
                <span>{transaction.date}</span>
                <strong data-test="registry-name" >{transaction.description}</strong>
              </div>
              <Value data-test="registry-amount" color={transaction.type === "entrada" ? "positivo" : "negativo"} >{(transaction.value / 100).toFixed(2).replace(".", ",")}</Value>
            </ListItemContainer>
          )}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value data-test="total-amount" color={etotal > 0 ? "positivo" : "negativo"}>{(etotal / 100).toFixed(2).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button data-test="new-income" onClick={() => { setTransaction("entrada"), newtransactionrout("entrada") }}>

          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>

        </button>

        <button data-test="new-expense" onClick={() => { setTransaction("saida"), newtransactionrout("saida") }}>

          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>

        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
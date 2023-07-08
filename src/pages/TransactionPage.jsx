import styled from "styled-components"
import { UserContext } from "../Context";
import { useState, useEffect, useContext } from "react";
import CurrencyInput from "react-currency-input-field"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function TransactionsPage() {
  let [value, setValue] = useState('');
  let [description, setDescription] = useState('')
  let [btstats, setBtstats] = useState(false)
  const { user, setUser, transaction, setTransaction } = useContext(UserContext);

function newTransaction(e){
  e.preventDefault();
  setBtstats(true);
  const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${transaction}`, {
    value,
    description,
    id: user._id
  })
  cadastro.then((x) => {
    
   
    setBtstats(false)
    navigate("/home")
   
  })

  cadastro.catch(erro => {
    alert(erro);
    setBtstats(false)
    console.log(cadastro)
  });

}

  return (
    <TransactionsContainer>
      <h1>Nova {transaction}</h1>
      <form onSubmit={newTransaction} >
      <CurrencyInput disabled={btstats} data-test="registry-amount-input" placeholder="Valor" type="text" required decimalsLimit={2} decimalSeparator="." groupSeparator="," prefix="R$" allowNegativeValue={false} onChange={e => setValue(e.target.value)}/>
        <input disabled={btstats} data-test="registry-name-input" placeholder="Descrição" type="text" required onChange={e => setDescription(e.target.value)}/>
        <button data-test="registry-save" type="submit">Salvar {transaction}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

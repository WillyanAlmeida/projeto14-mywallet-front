import styled from "styled-components"
import { UserContext } from "../Context";
import { useState, useContext } from "react";
import CurrencyInput from "react-currency-input-field"
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TransactionsPage() {
  let [value, setValue] = useState('');
  let [description, setDescription] = useState('')
  let [btstats, setBtstats] = useState(false)
  const { user, transaction } = useContext(UserContext);


  const navigate = useNavigate()

  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }

  function newTransaction(e) {
    e.preventDefault();
    setBtstats(true);
    value = value?.replace("R$", "")
    value = value?.replace(",", "")
    value = value?.replace(".", "")

    const cadastro = axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${transaction}`, {
      value: Number(value),
      description,
      id: user.id
    }, config)
    cadastro.then((x) => {

      setBtstats(false)
      navigate("/home")
    })

    cadastro.catch(erro => {
      alert(erro);
      setBtstats(false)
    });
  }

  return (
    <TransactionsContainer>
      <h1>Nova {transaction === "saida" ? "saída" : transaction}</h1>
      <form onSubmit={newTransaction} >
        <CurrencyInput disabled={btstats} data-test="registry-amount-input" placeholder="Valor" type="text" required decimalSeparator="." decimalsLimit={2} groupSeparator="," prefix="R$" allowNegativeValue={false} onChange={e => setValue(e.target.value)} />
        <input disabled={btstats} data-test="registry-name-input" placeholder="Descrição" type="text" required onChange={e => setDescription(e.target.value)} />
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

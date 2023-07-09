import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { UserContext } from "./Context"
import React, { useState } from "react";
import axios from "axios"

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
}


export default function App() {

  const [user, setUser] = useState()
  const [transaction, setTransaction] = useState()
  const [alltransaction, setAlltransaction] = useState()
  if(user){
  axios.defaults.headers.common['Authorization'] = user?.token;
}

  return (
    <PagesContainer>
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser, transaction, setTransaction, alltransaction, setAlltransaction }}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`

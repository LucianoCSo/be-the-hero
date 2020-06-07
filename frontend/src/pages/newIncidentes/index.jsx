import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import './style.css'
import ImageLogon from '../../img/logo.svg'

export default function NovoIncidente() {
  const history = useHistory()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const ongId = localStorage.getItem('ongId')

  async function handleNewIncidentes(e){
    e.preventDefault()
    const data = {
      titulo,
      descricao,
      valor
    };
    try{
      await api.post('incidents', data, {
        headers: {
          altorizacao: ongId
        }
      })
      history.push('/profile')
    }catch(err){
      alert('erro ao cadastrar uma nova ocorrencia.')
    }
  }
  return (
    <div className="new-incidents">
      <div className="content">
        <section>
          <img src={ImageLogon} alt="Be the hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o cado detalhadamente.</p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" /> Voltar para Home
                    </Link>
        </section>
        <form onSubmit={handleNewIncidentes}>
          <input
            placeholder="Titulo do caso"
            value={titulo}
            onChange={e => setTitulo(e.target.value)} />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)} />

          <input
            placeholder="Valor em Reais"
            value={valor}
            onChange={e => setValor(e.target.value)} />

          <button className="button" type="submit">
            Cadastrar </button>
        </form>
      </div>
    </div>
  )
}
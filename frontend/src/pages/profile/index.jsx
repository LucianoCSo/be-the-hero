import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import Logo from '../../img/logo.svg'
import './style.css'

export default function Profile() {
  const history = useHistory()
  const [incidents, setIncidents] = useState([])
  const ongId = localStorage.getItem('ongId')
  const ongNome = localStorage.getItem('ongNome')

  useEffect(() => {
    api.get('profile', {
      headers: {
        altorizacao: ongId,
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  async function handleDeletIncidents(id){
    try{
      await api.delete(`incidents/${id}`, {
        headers:{
          altorizacao: ongId
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== id))
    }catch(err){
      alert("Erro ao deletar um caso")
    }
  }
  function handleLogalt(){
    localStorage.clear()
    history.push('/')
  }
  return (
    <div className="profile-container">
      <header>
        <img src={Logo} alt="Be The Hero" />
        <span>Bem vindo, {ongNome}</span>

        <Link className="button" to="/incidentes/new">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogalt}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.titulo}</p>

            <strong>Descrição:</strong>
            <p>{incident.descricao}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR',
              {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.valor)}</p>

            <button type="button" onClick={() => handleDeletIncidents(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        )
        )}
      </ul>
    </div>
  )
}
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './style.css'
import imageHero from '../../img/heroes.png'
import ImageLogon from '../../img/logo.svg'
import { FiLogIn } from 'react-icons/fi'

export default function Lobon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const resposta = await api.post('session', { id })
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongNome', resposta.data.nome)
            history.push('/profile')
        } catch (err) {
            alert('Falha no LOGIN')
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={ImageLogon} alt="Logo" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Informe seu Id"
                        value={id}
                        onChange={e => setId(e.target.value)} />

                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" /> Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={imageHero} alt="Heroes" />
        </div>
    )
}
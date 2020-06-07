import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './style.css'
import ImageLogon from '../../img/logo.svg'

export default function Register() {
    const history = useHistory()

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf
        }
        try {
            const resposta = await api.post('ongs', data)
            alert(`Seu Id cadastrado: ${resposta.data.id}`)
            history.push('/')
        }
        catch (err) {
            alert("Erro ao cadastrar Ongs\nTente Novamente.")
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={ImageLogon} alt="Be the hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" /> Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)} />

                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />

                    <div className="input-grupe">
                        <input placeholder="Cidade" style={{ width: 540 }}
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} />

                        <input placeholder="UF" style={{ width: 80, marginLeft: 8, float: "right" }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </div>

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}
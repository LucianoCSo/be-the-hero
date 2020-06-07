import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Logon from './pages/logon/index'
import Register from './pages/register/register'
import Profile from './pages/profile/index'
import NewIncidentes from './pages/newIncidentes/index'

export default function Routers(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register} />

                <Route path='/profile' component={Profile} />
                <Route path='/incidentes/new' component={NewIncidentes} />
                <Redirect from='*' to='/' /> 
            </Switch>
        </BrowserRouter>
    )
}
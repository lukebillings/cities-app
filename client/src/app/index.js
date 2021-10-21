import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { CitiesList, CitiesInsert, CitiesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/cities/list" exact component={CitiesList} />
                <Route path="/cities/create" exact component={CitiesInsert} />
                <Route
                    path="/cities/update/:id"
                    exact
                    component={CitiesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App

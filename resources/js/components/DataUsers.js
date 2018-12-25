import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import DataUsers from './DataUsers';
import DataUser from './DataUser';
import AddDataUser from './AddDataUser';
import Error404 from './Error404';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Link to="/">Главная</Link>
                    <Link to="/add">Добавить</Link>
                    <Switch>
                        <Route path="/" exact component={DataUsers}/>
                        <Route path="/add" exact component={AddDataUser}/>
                        <Route path="/404" exact component={Error404}></Route>
                        <Route path="/:id" exact render={p => <DataUser{...p}/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}

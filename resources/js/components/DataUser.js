import React from 'react';
import axios from 'axios';

export default class DataUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataUsers: [] };
        this.sort = this.sort.bind(this);
    }

    // Выполняется 1 раз при первой загрузке компонента
    componentWillMount() {
        // Получаем всех пользователей
        axios
            .get('/api/datausers')
            .then(response => this.setState({ dataUsers: response.data }));
    }

    // Переходит на нужного пользователя
    go(id) {
        this.props.history.push('/' + id);
    }

    // Получает новые отсортированные данные с сервера
    sort(field) {
        axios
            .post('/api/sort', { field: field })
            .then(response => this.setState({ dataUsers: response.data }));
        this.forceUpdate();
    }

    // Отрисовка компонента
    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => this.sort('id')}>Ид</th>
                        <th onClick={() => this.sort('full_name')}>ФИО</th>
                        <th onClick={() => this.sort('email')}>Почта</th>
                        <th onClick={() => this.sort('phone_number')}>Номер телефона</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.dataUsers.map(dataUser => (
                        <tr onClick={() => this.go(dataUser.id)}>
                            <td>{dataUser.id}</td>
                            <td>{dataUser.full_name}</td>
                            <td>{dataUser.email}</td>
                            <td>{dataUser.phone_number}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

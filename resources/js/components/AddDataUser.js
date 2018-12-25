import React from 'react';
import axios from 'axios';

export default class DataUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: '', full_name: '', email: '', phone_number: '' };
        this.inputChange = this.inputChange.bind(this);
        this.updateDataUser = this.updateDataUser.bind(this);
        this.deleteDataUser = this.deleteDataUser.bind(this);
    }

    componentWillMount() {
        axios
            .get('/api/datausers/' + this.props.match.params.id + '/edit')
            .then(response => {
                if (response.data.id) {
                    this.setState({
                        id: response.data.id,
                        full_name: response.data.full_name,
                        email: response.data.email,
                        phone_number: response.data.phone_number
                    });
                } else {
                    this.props.history.push('/404');
                }

            });
    }

    inputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateDataUser(e) {
        if (e.target.checkValidity()) {
            e.preventDefault();
            axios.put('/api/datausers/' + this.state.id, {
                full_name: this.state.full_name,
                email: this.state.email,
                phone_number: this.state.phone_number,
            });
            this.props.history.push('/');
        }
    }

    deleteDataUser(e) {
        e.preventDefault();
        axios.delete('/api/datausers/' + this.state.id);
        this.props.history.push('/');
    }

    render() {
        return (
            <form onSubmit={this.updateDataUser}>
                <div>
                    <label>
                        ФИО
                        <input
                            name="full_name" value={this.state.full_name}
                            onChange={this.inputChange} required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Почта
                        <input
                            name="email" value={this.state.email}
                            onChange={this.inputChange} required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Номер телефона
                        <input
                            name="phone_number" value={this.state.phone_number}
                            onChange={this.inputChange} required
                        />
                    </label>

                </div>
                <button>Изменить</button>
                <button onClick={this.deleteDataUser}>Удалить</button>
            </form>
        );
    }
}

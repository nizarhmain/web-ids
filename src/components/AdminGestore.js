import React, { Component } from 'react'
import axios from 'axios'
import { List, Avatar } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { host } from '../configs';
import { Redirect } from 'react-router';
import ModalEnteAdd from './ModalEnteAdd'

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


export default class AdminGestore extends Component {


    constructor(props) {
		super(props);
		this.disconnect = this.disconnect.bind(this);
    }

    state = {
        userName: this.props.location.state.userName,
        password: this.props.location.state.password,
		enti: [],
		loggedIn: true

    }

    fetchEnti() {
        axios({
            method: 'GET',
            url: `${host}/ente`,
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
        })
            .then(result => {
                this.setState({ enti: result.data })
            })
            .catch(this.setState({ falseCredentials: true }));
    }

    componentDidMount() {
        this.fetchEnti();
	}
	
	disconnect() {
        this.setState({loggedIn: false})
    }

    render() {

		if(!this.state.loggedIn) {
            return <Redirect to= {{
              pathname :'/',
             }} />
		 }
		 

        return (
            <div className = "admin">
				<Button type="primary" onClick={this.disconnect} >Uscire</Button>

				<ModalEnteAdd
                userName={this.state.userName}
                password={this.state.password}
                fetchStuff={this.fetchEnti}
                />

                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 10,
                    }}
                    dataSource={this.state.enti}
                    renderItem={item => (
                        <List.Item
                            key={item.nome}
                            extra={<div>
                                <img width={272} alt="logo" src={item.image} />
                                <div className="deleteCross"><Button onClick={() => this.deleteClicked(item)} shape="circle" icon="cross" /></div>
                            </div>}
                        >
							<div>{item.nome}</div>
							<div>{item.provincia}</div>
							
							
							<div>{item.regione}</div>

                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

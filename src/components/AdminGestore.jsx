import React, { Component } from 'react'
import axios from 'axios'
import { List } from 'antd';
import { Button } from 'antd';
import { host } from '../configs';
import { Redirect } from 'react-router';
import ModalEnteAdd from './ModalEnteAdd'

export default class AdminGestore extends Component {


    constructor(props) {
		super(props);
    }

    state = {
        userName: this.props.location.state.userName,
        password: this.props.location.state.password,
    }

    render() {

        return (
            <div className = "admin">
				<ModalEnteAdd
                userName={this.state.userName}
                password={this.state.password}
                fetchStuff={this.props.fetchData}
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
                    dataSource={this.props.data}
                    renderItem={item => (
                        <List.Item
                            key={item.nome}
                            extra={<div>
                                <img width={272} alt="logo" src={item.image} />
                                <div className="deleteCross"><Button onClick={() => this.props.deleteData(`${host}/ente/${item.name}`, item)} shape="circle" icon="cross" /></div>
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

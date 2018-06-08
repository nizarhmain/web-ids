import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import axios from 'axios';
import { host } from '../configs';
import { List, Avatar } from 'antd';
import ModalAdd from './ModalAdd';
import { Redirect } from 'react-router';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class Gestore extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        userName: this.props.location.state.userName,
        password: this.props.location.state.password,
    }

    render() {
        return (
            <div className="gestione">
                <ModalAdd
                userName={this.state.userName}
                password={this.state.password}
                fetchStuff={this.props.fetchData}
                />

                <h1>Hello {this.state.userName}</h1>
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
                            key={item.name}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<div>
                                <img width={272} alt="logo" src={item.image}/>
                                <div className="deleteCross"><Button onClick={() => this.props.deleteData(`${host}/poi/monument/${item.name}`, item)} shape="circle" icon="cross" /></div>
                            </div>}
                        >
                            <List.Item.Meta
                                image={<Avatar src={item.image} />}
                                name={<a href={item.href}>{item.name}</a>}
                                description={item.description}
                            />
                            {item.info}

                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default Gestore;
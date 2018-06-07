import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
        this.deleteClicked = this.deleteClicked.bind(this);
        this.disconnect = this.disconnect.bind(this);
        this.fetchMonuments = this.fetchMonuments.bind(this);
    }
    state = {
        monuments: [],
        loggedIn: true,
        userName: this.props.location.state.userName,
        password: this.props.location.state.password,
    }


    componentDidMount() {
        this.setState(this.state);
        this.fetchMonuments(this.state.userName);
    }

    fetchMonuments() {
        let link = this.state.userName
        axios({
            method: 'GET',
            url: `${host}/poi/${link}`,
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            })
            .then((result) => { this.setState({monuments: result.data}) } )
            .catch(this.setState({ falseCredentials: true }));
    }

    deleteClicked(item) {
        this.deleteMonument(item.name);
    }

    deleteMonument(name){
        axios({
            method: 'DELETE',
            url: `${host}/poi/monument/${name}`,
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            auth: {
                username: this.state.userName,
                password: this.state.password
              }
        })
            .then(result => { console.log(result);
                this.setState({ monuments: this.state.monuments.filter(element => element.name !== name) }); })
            .catch((err) => console.log(err));
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
            <div className="gestione">

                <Button type="primary" onClick={this.disconnect} >Uscire</Button>
                <ModalAdd
                userName={this.state.userName}
                password={this.state.password}
                fetchStuff={this.fetchMonuments}
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
                    dataSource={this.state.monuments}
                    footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<div>
                                <img width={272} alt="logo" src={item.image}/>
                                <div className="deleteCross"><Button onClick={() => this.deleteClicked(item)} shape="circle" icon="cross" /></div>
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
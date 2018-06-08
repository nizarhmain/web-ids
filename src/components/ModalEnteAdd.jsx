import React, { Component } from 'react'
import { Modal, Button, Input } from 'antd'
import { host } from '../configs';
import axios from 'axios'

const { TextArea } = Input;

class ModalEnteAdd extends Component {
  state = { visible: false }

  componentDidMount() {
      console.log(this.props);
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(this.state)
    this.postPoi();
  }

  postPoi() {
    const { nome, regione, provincia, password, image } = this.state;
    // GET profile info
    axios({
        method: 'POST',
        url: `${host}/ente`,
        auth: {
          username: this.props.userName,
          password: this.props.password
        },
        data: {
            nome: nome,
            regione: regione,
            provincia: provincia,
            password: password,
            image: image
          }
      })
      .then((response) => this.props.fetchStuff())
      .catch((err) => console.log(err));
  }


  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  onChangeNome = (e) => {this.setState({ nome: e.target.value });}
  onChangeRegione = (e) => {this.setState({ regione: e.target.value });}
  onChangeProvincia = (e) => {this.setState({ provincia: e.target.value });}
  onChangePassword = (e) => {this.setState({ password: e.target.value });}
  onChangeImage = (e) => {this.setState({image: e.target.value}) }  


  render() {
    const { nome, regione, provincia, password, image } = this.state;
    return (
      <div>
        <div className="plusCircle"><Button onClick={this.showModal} shape="circle" icon="plus" /></div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input className="myInput" placeholder="Nome" value={nome} onChange={this.onChangeNome}/>
          <Input className="myInput" placeholder="regione" value={regione} onChange={this.onChangeRegione}/>
          <Input className="myInput" placeholder="provincia" value={provincia} onChange={this.onChangeProvincia}/>
          <Input className="myInput" placeholder="password" value={password} onChange={this.onChangePassword}/>
          <Input className="myInput" placeholder="image" value={image} onChange={this.onChangeImage}/>
        </Modal>
      </div>
    );
  }
}

export default ModalEnteAdd;
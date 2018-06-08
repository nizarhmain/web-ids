import React, { Component } from 'react'
import { Modal, Button, Input } from 'antd'
import { host } from '../configs';
import axios from 'axios'

const { TextArea } = Input;

class ModalAdd extends Component {
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
    const { nome, tipo, coordinate, url, descrizione } = this.state;
    // GET profile info
    axios({
        method: 'POST',
        url: `${host}/poi`,
        auth: {
          username: this.props.userName,
          password: this.props.password
        },
        data: {
            name: nome,
            type: tipo,
            info: descrizione,
            ente: this.props.userName,
            coordinates: coordinate,
            image: url
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
  onChangeTipo = (e) => {this.setState({ tipo: e.target.value });}
  onChangeCoordinate = (e) => {this.setState({ coordinate: e.target.value });}
  onChangeUrl = (e) => {this.setState({ url: e.target.value });}
  onChangeDescrizione = (e) => {this.setState({ descrizione: e.target.value });}

  render() {
    const { nome, tipo, coordinate, url, descrizione } = this.state;
    return (
      <div>
        <div className="plusCircle"><Button onClick={this.showModal} icon="plus">Aggiungi un POI</Button> </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input className="myInput" placeholder="Nome" value={nome} onChange={this.onChangeNome}/>
          <Input className="myInput" placeholder="tipo" value={tipo} onChange={this.onChangeTipo}/>
          <Input className="myInput" placeholder="Coordinate" value={coordinate} onChange={this.onChangeCoordinate}/>
          <Input className="myInput" placeholder="url dell'imagine" value={url} onChange={this.onChangeUrl}/>
          <TextArea className="myInput" placeholder="Descrizione" value={descrizione} autosize={{ minRows: 4 }} onChange={this.onChangeDescrizione}/>
        </Modal>
      </div>
    );
  }
}

export default ModalAdd;
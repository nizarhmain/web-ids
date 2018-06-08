import React, { Component } from 'react'
import { host } from '../configs';
import { Button } from 'antd';
import axios from 'axios'
import { Redirect } from 'react-router';

export default function withCRUD(WrappedComponent) {
	return class extends Component {

		constructor(props) {
			super(props)
			this.state = {
				data: [],
				loggedIn: true,
				userName: this.props.location.state.userName,
				password: this.props.location.state.password,
			}

			this.disconnect = this.disconnect.bind(this)
			this.fetchData = this.fetchData.bind(this)
			this.deleteClicked = this.deleteClicked.bind(this)
			this.deleteData = this.deleteData.bind(this)
		}

		componentDidMount() {
			this.fetchData()
		}

		disconnect() {
			this.setState({ loggedIn: false })
		}

		fetchData() {
			axios({
				method: 'GET',
				url: this.props.location.state.url,
				mode: 'no-cors',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			})
				.then(result => {
					this.setState({ data: result.data })
				})
				.catch(this.setState({ falseCredentials: true }));
		}

		deleteClicked(item) {
			this.setState({ data: this.state.data.filter(element => element.name !== item.name) });
		}

		deleteData(url, item) {
			axios({
				method: 'DELETE',
				url: url,
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
				.then(result => {
					console.log(result);
					this.deleteClicked(item);
				})
				.catch((err) => console.log(err));
		}

		render() {
			if (this.state.loggedIn === false) {
				console.log("hii")
				return <Redirect to={{
					pathname: '/',
				}} />
			}

			return (
				<div>
					<Button className="hey" type="primary" onClick={this.disconnect}>Uscire</Button>
					<WrappedComponent 
						fetchData={this.fetchData}
						deleteData={this.deleteData}
						data={this.state.data}
						{...this.props} />

				</div>)
		}
	}
}


import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import { host } from '../configs';
import { Redirect } from 'react-router';

const FormItem = Form.Item;


class NormalLoginForm extends Component {

  state = {
	loggedIn: false,
	falseCredentials: false,
	userName: '',
	password: ''
  }

  handleSubmit = (e) => {
	e.preventDefault();
	this.props.form.validateFields((err, values) => {
	  if (!err) {
		//console.log('Received values of form: ', values);
		this.loginUser(values);
	  }
	});
  }

  loginUser(values) {
	// GET profile info
	axios({
	  method: 'GET',
	  url: `${host}/auth/profile`,
	  mode: 'no-cors',
	  headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	  },
	  auth: {
		username: values.userName,
		password: values.password
	  }
	})
	  .then(user => {
		//redirect to gestore page with data of the user
		this.setState({userName: values.userName, password: values.password, role: user.data.role});
		this.setState({loggedIn: true})

	  })
	  .catch(this.setState({falseCredentials: true}));
  };

  render() {
	const { getFieldDecorator } = this.props.form;

	if(this.state.loggedIn && this.state.role === "ROLE_ENTE") {
	   let link = this.state.userName
	   return <Redirect to= {{
		 pathname :'/dashboard',
		 state: {
							userName: this.state.userName, 
				  		password: this.state.password,
							role: this.state.role,
							url: `${host}/poi/${link}`,
						}
		}} />
	} else if(this.state.loggedIn && this.state.role === "ROLE_ADMIN") {
	  return <Redirect to = {{
	  pathname :'/admin',
	  state: {
					userName: this.state.userName, 
					password: this.state.password, 
					role: this.state.role,
					url: `${host}/ente` }
	  }} />
	}

	return (
	  <Form onSubmit={this.handleSubmit} className="login-form">
		Social Tourism - progetto UNICAM ids
		<FormItem>
		  {getFieldDecorator('userName', {
			rules: [{ required: true, message: 'Please input your username!' }],
		  })(
			<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
		  )}
		</FormItem>
		<FormItem>
		  {getFieldDecorator('password', {
			rules: [{ required: true, message: 'Please input your Password!' }],
		  })(
			<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
		  )}
		</FormItem>
		<FormItem>
		  {getFieldDecorator('remember', {
			valuePropName: 'checked',
			initialValue: true,
		  })(
			<Checkbox>Remember me</Checkbox>
		  )}
		  <a className="login-form-forgot" href="">Forgot password</a>

		  <Button type="primary" htmlType="submit" className="login-form-button">
			Log in
		  </Button>
		  Or <a href="">register now!</a>
		</FormItem>
	  </Form>
	);
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
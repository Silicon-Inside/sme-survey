import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { Container } from 'reactstrap';
import { Button, Spinner, Modal } from 'reactstrap';
import { Card, CardBody, CardTitle, CardHeader, CardFooter } from 'reactstrap';

import API from '../Utils/Api.js';

import FormUserDetails from './FormUserDetails';
import FormUserSelections from './FormUserSelections';

import '../App.css'

class FormEntry extends Component {
	constructor(  ) {
		super(  );

		this.collectValues = this.collectValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
		this.prevStep = this.prevStep.bind(this);
		this.nextStep = this.nextStep.bind(this);

		this.state = {
      info: {},
      values: {},
      postRequestCompleted: false,
      modal: false,
      page: 0
    };

    this.pages = [
      <FormUserDetails changeValue={this.collectValues} />,
      <FormUserSelections changeValue={this.collectValues} />
    ]

    this.buttons = [
      <Button style={{ float: 'right' }} onClick={this.nextStep}>Next</Button>,
      <Button style={{ width:'100%' }} onClick={this.handleSubmit} >Submit</Button>
    ]
	}

  collectValues (value, name) {
    if ( name === 'info' )
      this.setState(state => ({ info: value }))
    else if ( name === 'values' )
      this.setState(state => ({ values: value }))
  }

  // TODO: use componentDidMount() (i.e async await)
  handleSubmit () {
    let params = {
      info: this.state.info,
      values: this.state.values,
      time: new Date()
    };

    let apiVersion = 'v2.0.0';
    API.post(apiVersion, { params })
      .then(res => console.log(JSON.parse(res.config.data)))
      .then(() => this.setState({ postRequestCompleted: true }))
      .catch(err => console.log(err))

    this.setState({ modal: true })
  }

  prevStep () {
    this.setState({ page: this.state.page - 1 })
  }

	nextStep () {
    this.setState({ page: this.state.page + 1 })
	}
  
  render () {
    const stylish = {
      width: '5rem', 
      height: '5rem', 
      color: 'lightblue',
      marginLeft: '42%',
    }

    return (
      <React.Fragment>
        { this.state.postRequestCompleted ? (
          <Redirect from="/form" to="/result" />
        ) : (
          <Container>
            <Card>
              <CardHeader tag="h2">
                <CardTitle>Form</CardTitle>
              </CardHeader>
              <CardBody>{this.pages[this.state.page]}</CardBody>
              <CardFooter>{this.buttons[this.state.page]}</CardFooter>
            </Card>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <Spinner style={ stylish } />
            </Modal>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default FormEntry;
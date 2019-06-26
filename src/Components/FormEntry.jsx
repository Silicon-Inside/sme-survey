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
    
		this.nextStep = this.nextStep.bind(this);

		this.state = {
      info: {},
      values: {},
      apiVersion: 'v2.0.0',
      postRequestCompleted: false,
      modal: false,
      page: 0,
      entriesPending: true
    };

    this.pages = [
      <FormUserDetails changeValue={this.collectValues} info={this.state.info}/>,
      <FormUserSelections changeValue={this.collectValues} values={this.state.values}/>
    ]

    this.buttons = [
      <Button style={{ float: 'right' }} onClick={this.nextStep}>Next</Button>,
      <Button style={{ width:'100%' }} onClick={this.handleSubmit} >Submit</Button>
    ]
	}

  collectValues (name, value, entriesPendingStatus) {
    this.setState({ entriesPending: entriesPendingStatus })

    if ( name === 'info' )
      this.setState({ info: value })
    else if ( name === 'values' )
      this.setState({ values: value })
  }

  // TODO: use componentDidMount() (i.e async await)
  handleSubmit () {
    let params = {
      info: this.state.info,
      values: this.state.values,
      time: new Date()
    };

    this.setState({ modal: true })
    API.post(this.state.apiVersion, { params })
      .then(res => console.log(res))
      .then(() => this.setState({ postRequestCompleted: true }))
      .catch(err => console.log(err))
  }

	nextStep () {
    this.setState({ page: (this.state.page + 1) })
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
              <CardFooter>{!this.state.entriesPending && this.buttons[this.state.page]}</CardFooter>
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
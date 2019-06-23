import React, { Component } from 'react';

import datastore from '../datastore.json';
import Page from './Page.jsx';


export class FormUserSelections extends Component {
	constructor(  ) {
		super(  );

		this.handleInputChange = this.handleInputChange.bind(this);
		this.createPages = this.createPages.bind(this);

		this.prevStep = this.prevStep.bind(this);
		this.nextStep = this.nextStep.bind(this);

		this.state = {
			cardNumber: 0,
			values: {},
      allEntriesChecked: false
		};
	}

	handleInputChange ( sheetId, data ) {
		this.setState({
			values: { ...this.state.values, [sheetId]: data }
		}, () => {
			// Callback to FormEntry
			this.props.changeValue('values', this.state.values);
		})
	}

  createPages ( pages ) {
    return pages.map(page => {
      return <Page key={page.id} page={page} onPageEntry={this.handleInputChange} />
		})
  }
	
	prevStep () {
    this.setState({ cardNumber: this.state.cardNumber - 1 })
  }

	nextStep () {
    this.setState({ cardNumber: this.state.cardNumber - 1 })
	}

	render () {
		return <div>{this.createPages( datastore.pages )}</div>
	}
};

export default FormUserSelections;
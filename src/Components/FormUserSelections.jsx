import React, { Component } from 'react';

import datastore from '../datastore.json';
import Page from './Page.jsx';


export class FormUserSelections extends Component {
	constructor(  ) {
		super(  );

		this.handleInputChange = this.handleInputChange.bind(this);
		this.createPages = this.createPages.bind(this);

		this.state = {
			pageNumber: 0,
			allChecked: false,
			values: {}
		};
	}

	handleInputChange ( sheetId, data ) {
		this.setState({
			values: { ...this.state.values, [sheetId]: data }
		}, () => {
			// Callback to FormEntry
			this.props.changeValue(this.state.values, 'values');
		})
	}

  createPages ( pages ) {
    return pages.map(page => {
      return <Page key={page.id} page={page} onPageEntry={this.handleInputChange} />
		})
  }
  
	render () {
		return <div>{this.createPages( datastore.pages )}</div>
	}
};

export default FormUserSelections;
import React, { Component } from 'react';

import { Form, FormGroup, FormFeedback, Label, Input, CustomInput } from 'reactstrap';
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap';


export class FormUserDetails extends Component {
	constructor( props ) {
		super( props );
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			info: {},
			allEntriesPending: true,
      isNotFilled: {
				fname: true,
				iname: true,
				email: true,
				cnumber: true,
				xp: true
			}
		};
	}

	handleChange ( e ) {
		this.setState({
			info: { ...this.state.info, [e.target.name]: e.target.value },
			isNotFilled: { ...this.state.isNotFilled, [e.target.name]: false }
		}, () => {
			if (
				!this.state.isNotFilled.fname &&
				!this.state.isNotFilled.iname &&
				!this.state.isNotFilled.email &&
				!this.state.isNotFilled.cnumber &&
				!this.state.isNotFilled.xp
			) { this.setState({ allEntriesPending: false }) }

			// Callback to FormEntry
			this.props.changeValue('info', this.state.info, this.state.allEntriesPending);
		})

		if ( e.target.value === "" ) this.setState({ 
			allEntriesPending: true,
			isNotFilled: { ...this.state.isNotFilled, [e.target.name]: true } 
		})

	}

	render () {
		return (
			<Card>
				<CardHeader tag="h2">
					<CardTitle>Personal Details</CardTitle>
				</CardHeader>
				<CardBody>
					<Form>
						<FormGroup>
							<Label for="fname">Full Name</Label>
							<Input type="text" name="fname" id="fname" placeholder="Enter Full Name" value={this.state.fname} onChange={this.handleChange} invalid={this.state.isNotFilled.fname}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="iname">Industry Name</Label>
							<CustomInput type="select" id="iname" name="iname" value={this.state.iname} onChange={this.handleChange} invalid={this.state.isNotFilled.iname}>
								<option value="">Select Industry</option>
								<option value="1pbEG_HGrhKsh8seYF4-7h-5Wiq6PBVvKWqZjuitQmJw">Test Industry 1</option>
								<option value="1pbEG_HGrhKsh8seYF4-7h-5Wiq6PBVvKWqZjuitQmJw">Test Industry 2</option>
							</CustomInput>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} onChange={this.handleChange} invalid={this.state.isNotFilled.email}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="cnumber">Contact Number</Label>
							<Input type="number" name="cnumber" id="cnumber" placeholder="Enter Contact Number" min="0" value={this.state.cnumber} onChange={this.handleChange} invalid={this.state.isNotFilled.cnumber}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="xp">Experience</Label>
							<Input type="textarea" name="xp" id="xp" placeholder="Enter Your Experience" value={this.state.xp} onChange={this.handleChange} invalid={this.state.isNotFilled.xp}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="gender">Gender</Label>
							<div>
								<CustomInput type="radio" value="female" id="genderFemale" name="gender" label="Female" onChange={this.handleChange} inline/>
								<CustomInput type="radio" value="male" id="genderMale" name="gender" label="Male" onChange={this.handleChange} inline/>
								<CustomInput type="radio" value="other" id="genderOther" name="gender" label="Other" onChange={this.handleChange} inline defaultChecked/>
							</div>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
		);
	}
};

export default FormUserDetails;
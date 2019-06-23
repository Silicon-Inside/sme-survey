import React, { Component } from 'react';

import { Form, FormGroup, FormFeedback, Label, Input, CustomInput } from 'reactstrap';
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap';


export class FormUserDetails extends Component {
	constructor( props ) {
		super( props );
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			info: {},
      allEntriesChecked: false
		};
	}

	handleChange ( e ) {
		this.setState({
			info: { ...this.state.info, [e.target.name]: e.target.value }
		}, () => {
			// Callback to FormEntry
			this.props.changeValue('info', this.state.info);
		})



	}

	render () {
		return (
			<Card>
				<CardHeader tag="h2">
					<CardTitle>Personal Details</CardTitle>
				</CardHeader>
				<CardBody>
					<Form onChange={this.handleChange}>
						<FormGroup>
							<Label for="fname">Full Name</Label>
							<Input type="text" name="fname" id="fname" placeholder="Enter Full Name" value={this.state.fname} invalid={!this.state.allEntriesChecked}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="iname">Industry Name</Label>
							<CustomInput type="select" id="iname" name="iname" value={this.state.iname} invalid={!this.state.allEntriesChecked}>
								<option value="">Select Industry</option>
								<option value="1pbEG_HGrhKsh8seYF4-7h-5Wiq6PBVvKWqZjuitQmJw">Test Industry 1</option>
								<option value="1pbEG_HGrhKsh8seYF4-7h-5Wiq6PBVvKWqZjuitQmJw">Test Industry 2</option>
							</CustomInput>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="email">Email</Label>
							<Input type="email" name="email" id="email" placeholder="Enter Email" value={this.state.email} invalid={!this.state.allEntriesChecked}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="cnumber">Contact Number</Label>
							<Input type="number" name="cnumber" id="cnumber" placeholder="Enter Contact Number" min="0" value={this.state.cnumber} invalid={!this.state.allEntriesChecked}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="xp">Experience</Label>
							<Input type="textarea" name="xp" id="xp" placeholder="Enter Your Experience" value={this.state.xp} invalid={!this.state.allEntriesChecked}/>
							<FormFeedback invalid="true">Oh noes! this field is mandatory</FormFeedback>
						</FormGroup>
						<FormGroup>
							<Label for="gender">Gender</Label>
							<div>
								<CustomInput type="radio" value="female" id="genderFemale" name="gender" label="Female" inline invalid={!this.state.allEntriesChecked}/>
								<CustomInput type="radio" value="male" id="genderMale" name="gender" label="Male" inline invalid={!this.state.allEntriesChecked}/>
								<CustomInput type="radio" value="other" id="genderOther" name="gender" label="Other" inline invalid={!this.state.allEntriesChecked}/>
							</div>
						</FormGroup>
					</Form>
				</CardBody>
			</Card>
		);
	}
};

export default FormUserDetails;
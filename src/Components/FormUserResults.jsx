import React, { Component } from 'react'

import { Container } from 'reactstrap'
import { Card, CardBody, CardTitle, CardHeader } from 'reactstrap'

export class FormUserResults extends Component {
	constructor(  ) {
		super(  )

		this.state = {
			reponseMessage: '',
			submitSuccess: false
		}
	}

	render () {
		return (
			<Container>
				<Card>
					<CardHeader tag="h2">
						<CardTitle>Survey Report</CardTitle>
					</CardHeader>
					<CardBody>
						<h4>Successfull Submission!</h4>
						<p>We sincerely appreciate your time and co-operation for this feedback.</p>
						<p>Thank You</p>
					</CardBody>
				</Card>
			</Container>
		)
	}
}

export default FormUserResults
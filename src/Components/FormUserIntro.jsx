import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { Container } from 'reactstrap'
import { Button, Badge } from 'reactstrap'
import { Card, CardBody, CardTitle, CardHeader, CardFooter } from 'reactstrap'


export class FormUserIntro extends Component {
	constructor(  ) {
		super(  )
    
		this.handleOnClick = this.handleOnClick.bind(this)

		this.state = {
			termsAgreed: false
    }
	}

	handleOnClick () {
		this.setState({ termsAgreed: true })
	}
	
	render () {
		return (
      <React.Fragment>
				<Container>
					<Card>
						<CardHeader tag="h2">
							<CardTitle>QUESTIONNAIRE</CardTitle>
						</CardHeader>
						<CardBody>
							<p>
								Dear Respondent
								I Satnam Singh, Research scholar in the department of Industrial &amp; Production Engineering at Dr. B.R
								Ambedkar National Institute of Information Technology, Jalandhar pursuing research work Entitled,
								“Parametric study of occupational safety norms for SME’s in Punjab”. All the information provided by
								you would be used for academic purpose only and will be kept confidential.
							</p><hr />
							<p>Please give rating from 1 to 5.</p>
							<h6><Badge color="secondary">1</Badge> - Fully Disagree</h6>
							<h6><Badge color="secondary">2</Badge> - Disagree</h6>
							<h6><Badge color="secondary">3</Badge> - Neutral</h6>
							<h6><Badge color="secondary">4</Badge> - Agree</h6>
							<h6><Badge color="secondary">5</Badge> - Fully Agree</h6>
						</CardBody>
						<CardFooter>
							<Link to='/form'>
								<Button style={{ float: 'right' }} onClick={this.handleOnClick}>Agree and Continue</Button>
							</Link>
						</CardFooter>
					</Card>
				</Container>
      </React.Fragment>
		)
	}
}

export default FormUserIntro
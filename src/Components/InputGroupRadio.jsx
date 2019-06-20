import React, { Component } from 'react';

import { CustomInput } from 'reactstrap';

class InputGroupRadio extends Component {
  constructor(props) {
    super(props);
    
    this.handleInputChange = this.handleInputChange.bind(this);
    
    this.state = { [this.props.name]: 0 };
  }

	handleInputChange ( e ) {
    const value = Number(e.target.value)
    this.setState({ [this.props.name]: value })

    // Callback to Page
    this.props.onRadioSelect(this.props.name, value, this.props.id)
	}

	customInput (id, index, choices, name) {
    const customInputList = [];
		choices.map((choice, it) => {
      return customInputList.push(
        <CustomInput 
          key={it}
          type="radio"
          value={choice}
          id={`${id[id.length-1]}${index}${it}`}
          name={name}
          label={choice}
          onChange={this.handleInputChange}
        inline />
      )
    })
		return customInputList;
	}  

  render () {
    return (
      <div>
        {this.customInput(
          this.props.id, 
          this.props.index, 
          this.props.choices, 
          this.props.name
        )}
      </div>
    );
  }
}


export default InputGroupRadio;


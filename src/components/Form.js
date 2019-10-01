import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector,reset } from 'redux-form';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Row, Alert } from 'reactstrap';


class FormOrder extends React.Component {
  renderSelect({label, input,meta }){
    return(
      <FormGroup>
      <Label>{label}</Label>
      <Input bsSize="lg" type="select" value={input.value} onChange={input.onChange} invalid={meta.touched && meta.invalid}>
              <option />
              <option value="pizza">pizza</option>
              <option value="soup">soup</option>
              <option value="sandwich">sandwich</option>
      </Input>
      <FormFeedback>{meta.error}</FormFeedback>
      </FormGroup>
    )
  }

  renderInput({setStep, minimumValue, maximumValue , type, input, label, meta }){
    return(
      <FormGroup>
        <Label>{label}</Label>
        <Input bsSize="lg" type={type} step={setStep} min={minimumValue} max={maximumValue} {...input} invalid={meta.touched && meta.invalid}/>
        <FormFeedback>{meta.error}</FormFeedback>
      </FormGroup>
    )
  }
  renderConditional(dishTypeValue) {
    switch(dishTypeValue) {
      case 'pizza':
        return(
          <>
          <Field
            name="no_of_slices"
            label="Number of slices"
            type="number"
            minimumValue = "0"
            component={this.renderInput}
            parse={value => !value ? null : Number(value)}
          />
          <Field
            name="diameter"
            label="Pizza diameter"
            type="number"
            setStep = "0.01"
            minimumValue = "0"
            parse={value => !value ? null : Number(value)}
            component={this.renderInput}
          />
          </>
        )
      case 'soup':
          return(
            <Field
              name="spiciness_scale"
              label="Spiciness scale(1-10)"
              type="number"
              minimumValue = "1"
              maximumValue = "10"
              component={this.renderInput}
              parse={value => !value ? null : Number(value)}
            />
        )
      case 'sandwich':
          return(
            <Field
              name="slices_of_bread"
              label = "Number slices of bread"
              type="number"
              minimumValue = "0"
              component={this.renderInput}
              parse={value => !value ? null : Number(value)}
            />
        )
      default:
      return null;
    }
  }
  onSubmit = (formValues) => {
    const data = formValues;
    this.props.dispatch(reset('formOrder'));
    axios({
      method: 'post',
      url: 'https://frosty-wood-6558.getsandbox.com:443/dishes',
      data
    })
     .catch(function (error) {
       window.alert('Unfortunately, order was not accepted ')
     });
    
  }
  render(){
    return (
      <>
      {this.props.submitSucceeded && !this.props.dirty && <Alert>Your order was accepted!</Alert>}
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            name="name"
            label="Name"
            type="text"
            component={this.renderInput} 
          />
          <Field
            name="preparation_time"
            label="Preparation time"
            type="time"
            setStep = "10"
            minimumValue = "00:00:01"
            component={this.renderInput}
          />
          <Field
            name="type"
            label="Type of dish"
            component={this.renderSelect}
          />
          {this.renderConditional(this.props.dishTypeValue)}
          <Row className="justify-content-center">        
              <Button onClick={this.props.reset} type="button" disabled={!this.props.dirty || this.props.submitting} color="secondary" size="lg" className="mx-1">Reset</Button>
              <Button type="submit" disabled = {this.props.submitting} color="primary" size="lg" className="mx-1">Submit</Button>          
          </Row>     
      </Form>
      </>
  )
  }
  
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.name) {
        errors.name = 'You must enter a name';
    }
    if (!formValues.preparation_time) {
        errors.preparation_time = 'You must enter a preparation time'
    }
    if (!formValues.type) {
        errors.type = 'You must enter a type of dish'
    }
    if (!formValues.diameter) {
      errors.diameter = 'You must enter a pizza diameter'
    }
    if (!formValues.no_of_slices) {
      errors.no_of_slices = 'You must enter a number of slices'
    }
    if (!formValues.spiciness_scale) {
      errors.spiciness_scale = 'You must enter a spiciness scale'
    }
    if (!formValues.slices_of_bread) {
      errors.slices_of_bread = 'You must enter a number slices of bread'
    }
    return errors;
}

FormOrder = reduxForm({
  form: 'formOrder',
  validate
})(FormOrder)

const selector = formValueSelector('formOrder');
const mapStateToProps = (state) => {
  const dishTypeValue = selector(state, 'type');
  return { dishTypeValue }
}

export default connect(mapStateToProps)(FormOrder)
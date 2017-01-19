import React, { Component } from 'react';
import Button from '../Button';
import Brand from '../Brand';
import Title from '../Title';
import { TextFieldGroup, FormGrid, FormRow, FormColumn, PasswordStrength, CheckboxFieldGroup, FieldErrors } from '../form';
import './style.scss';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordStrength: '',
      errors: [],
    };
  }

  render() {
    return (
      <div className="s-signup">
        <Brand className="s-signup__brand" />
        <FormGrid className="s-signup__form" name="ac_form">
          <FormRow>
            <FormColumn className="s-signup__title" bottomSpace>
              <Title>Create your account</Title>
            </FormColumn>
          </FormRow>
          {this.state.errors.length !== 0 && (
          <FormRow>
            <FormColumn bottomSpace>
              <FieldErrors className="s-signup__global-errors" errors={this.state.errors} />
            </FormColumn>
          </FormRow>
          )}
          <FormRow>
            <FormColumn bottomSpace >
              <TextFieldGroup
                name="username"
                label="Username"
                placeholder="Username"
                // errors={['Something\'s buggy here']}
                showLabelforSr
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn bottomSpace>
              <TextFieldGroup
                name="password"
                label="Password"
                placeholder="Password"
                showLabelforSr
                type="password"
              />
            </FormColumn>
            {this.state.passwordStrength.length !== 0 && (
            <FormColumn bottomSpace>
              <PasswordStrength strength={this.state.passwordStrength} />
            </FormColumn>
            )}
          </FormRow>
          <FormRow>
            <FormColumn bottomSpace>
              <CheckboxFieldGroup label="I agree Terms and conditions" />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn className="m-im-form__action">
              <Button type="submit" expanded plain>Create</Button>
            </FormColumn>
          </FormRow>
        </FormGrid>
      </div>
    );
  }
}

export default SignupForm;

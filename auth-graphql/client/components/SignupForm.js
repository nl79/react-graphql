import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import {hashHistory} from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errors: []
    };
  }
  componentWillUpdate(nextProps) {
    if(!this.props.data.user && nextProps.data.user) {
      //redirect to dashboard.
      hashHistory.push('/dashboard');
    }
  }
  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{ query }]
    }).catch(e => {
      const errors = e.graphQLErrors.map(error => {
        return error.message;
      });
      this.setState({
        errors
      });
    })
  }
  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
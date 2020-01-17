import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';

import config from '../config/index'
import { useForm } from '../util/hooks'
import { loginValidation } from '../util/validators'


function Login(props){
  const [graphqlErrors, setGraphqlError] = useState([])

  const {
    onChange,
    onSubmit,
    values,
    errors
  } = useForm(LoginCallback, {
    email: "",
    password: ""
  }, loginValidation)

  const [login] = useMutation(LOGIN, {
    update(_, result) {
      props.history.push('/')
    },
    onError(err) {
      setGraphqlError(err.graphQLErrors)
    }
  });

  function LoginCallback() {
    login({
      variables: values
    });
  }

  //TODO: improve error handling/display to UI.

  return (
    <div>
      <form onSubmit = {onSubmit}>
        <input type="email" name="email" placeholder="email" onChange={onChange}></input>
        <input type="password" name="password" placeholder="password" onChange={onChange}></input>
        <button type="submit">Login</button>
      </form>

      {/* client validation error */}
      { Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul style={{color:"red"}} className="list">
						{
							Object.values(errors).map(value => (
								<li key={value}>{value}</li>
							))
						}
					</ul>
				</div>
			) }

      {/* graphql error response */}
      { graphqlErrors.length > 0 && (
				<div className="ui error message">
					<ul style={{color:"red"}} className="list">
						{
							graphqlErrors.map(({message},i) => (
								<li key={i}>{message}</li>
							))
						}
					</ul>
				</div>
			) }

    </div>
  );
}

const LOGIN = gql`
  mutation login($email: String! $password: String!) {
    login(email:$email password:$password) {
			username
		}
  }
`;

export default Login
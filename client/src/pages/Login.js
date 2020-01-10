import React from 'react'
import {
  gql,
  useMutation
} from '@apollo/client';

const LOGIN = gql`
  mutation{
    login(email:"yawa@gmail.com",password:"EKs%Y]sdfasd$dfE23)N,>&-aP7Mn"){
      username
    }
  }
`;

function Login(){
  const [login, { data }] = useMutation(LOGIN);
  console.log('data: ', data)
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          login();
        }}
      >
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login
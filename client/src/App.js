import React from 'react';
import {
  gql,
  useQuery
} from '@apollo/client';

const ADMINISTRATORS = gql`
  {
    administrators{
      username
    }
  }
`;
function App() {
  const { loading, error, data } = useQuery(ADMINISTRATORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('administrators: ', data)  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

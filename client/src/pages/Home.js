import React from 'react'
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

function Home(){
  const { loading, error, data } = useQuery(ADMINISTRATORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('administrators: ', data)  

	if (error) return <p>error</p>

	if (loading) return <p>Loading</p>

	return (
		<div>
			<h1>Home Page</h1>
		</div>
	)
}

export default Home
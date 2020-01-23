/* eslint-disable react/button-has-type */
import React from "react"
import { gql, useQuery } from "@apollo/client"

const ADMINISTRATORS = gql`
  {
    administrators {
      id
      username
      email
    }
  }
`

function AdmnistratorList({ administrators }) {
  return (
    <ul>
      {administrators &&
        administrators.map(({ id, username, email }) => (
          <li key={id}>
            <div>name: {username}</div>
            <div>email: {email}</div>
            <div>
              <button>Update</button>
              <button>Delete</button>
            </div>
          </li>
        ))}
    </ul>
  )
}

function Administrator() {
  const { loading, error, data } = useQuery(ADMINISTRATORS)
  const administrators = data && data.administrators
  if (loading) return <p>Loading...</p>
  return (
    <div>
      <h1>Administrator</h1>
      <button> Add new</button>
      <AdmnistratorList administrators={administrators} />
    </div>
  )
}

export default Administrator

// TODO: what are the difference between formik,semantic-ui-react and material ui.

// TODO: model or form for add/update/delete administrator
// TODO: explore formik and yup validations?

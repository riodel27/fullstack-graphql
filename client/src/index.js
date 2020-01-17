import React from 'react';
import ReactDOM from 'react-dom';
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import App from './App';
import browserHistory from './util/browserHistory'
import ErrorBoundary from './util/errorBoundary'

import config  from'./config/index'
import * as serviceWorker from './serviceWorker';

// handle graphql server or network error.
const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message, extensions}) => {
      if(extensions.code === 'UNAUTHENTICATED'){
        console.log('UNAUTHENTICATED')
        // TODO: setup proper client logger. maybe setup a hook or persist the logger for debug.
        browserHistory.push('/login')
      }
    });
  }
  
  if (networkError){
    console.log(`[Network error]: ${networkError}`);
  }
});

const httpLink = createHttpLink({
  uri: config.graphqlUri,
  credentials: 'include' //session based authentication
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink])
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

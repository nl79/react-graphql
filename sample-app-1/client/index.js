import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import SongList from './components/SongList';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

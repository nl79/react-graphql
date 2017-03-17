import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';

class SongList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('this.props', this.props);
    return (
      <div>
        SongList
      </div>
    );
  }
}

const query = gql`
  {
    songs {
      title
    }
  }
`;

export default graphql(query)(SongList);

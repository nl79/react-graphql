import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql} from 'react-apollo';

class SongList extends Component {
  constructor(props) {
    super(props);
  }

  renderSongs() {
    if(!this.props.data.songs) { return '';}
    return this.props.data.songs.map((item) => {
      return (
        <li key={item.id} className='collection-item'>
          {item.title}
        </li>
      )
    })
  }
  render() {
    if (this.props.data.loading) {
      return (<div>Loading....</div>);
    }
    return (
      <ul className='collection'>
        {this.renderSongs()}
      </ul>
    );
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);

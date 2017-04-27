import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import {Link} from 'react-router';

import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
  render() {
    let { song } = this.props.data;
    if(!song) { return (<div>Loading...</div>); }

    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  // Options objects the graphql to include the id as a variable value.
  options: (props) => {
    return {
      variables: {id: props.params.id }
    }
  }
})(SongDetail);

import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {Link, hashHistory} from 'react-router';
import fetchSongs from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }

  onSubmit(event) {
    // Prevent auto submit
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [
        {query: fetchSongs}
      ]
    }).then((res) => {
      hashHistory.push('/');
    }).catch((err) => {
    });
  }
  render() {
    return (
      <div>
      <Link to='/'>Back</Link>
      <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            value={this.state.title}
            onChange={event => this.setState({title: event.target.value})}
          />
        </form>
      </div>
    );
  }
}
const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }`;
export default graphql(mutation)(SongCreate);

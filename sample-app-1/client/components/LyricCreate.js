import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('event', event);
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    }).then(() => this.setState({content: '' }));

  }
  render() {
    return (
    <form onSubmit={this.onSubmit.bind(this)}>
      <label>Add a Lyric</label>
      <input
        value={this.state.content}
        onChange={event => this.setState({ content: event.target.value})}></input>
    </form>
  );
  }
}

// Assoccate the mutation with the component.
// This will give the component access to the mutation methods.
//(Similar to the actions for redux)
const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;
export default graphql(mutation)(LyricCreate);

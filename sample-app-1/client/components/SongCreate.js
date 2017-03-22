import React, {Component} from 'react';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }
  render() {
    return (
      <div>
      <h3>Create a New Song</h3>
        <form>
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

export default SongCreate;

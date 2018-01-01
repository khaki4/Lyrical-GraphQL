import React, { Component } from 'react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      content: '',
    }
  }
  onChangeLyric(e) {
    this.setState({ content: e.target.value})
  }
  onSubmit(e) {
    const { content } = this.state
    const { songId } = this.props
    e.preventDefault()
    
    console.log(content)
    this.props.mutate({
      content,
      songId,
    }).then(() => this.setState({ content: '' }))
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add a Lyric</label>
          <input
            value={this.state.content}
            onChange={this.onChangeLyric.bind(this)}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate)
import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import fetchSongLyrics from '../Queries/fetchSongLyrics';
import {Link} from 'react-router';
import LyricCreate from './LyricCreate';

class SongDetail extends Component{
  renderSongLyrics(lyrics){
    return (
      lyrics.map(
          l => <li
              key={l.id} className="collection-item">
            {l.content}
          </li>
        )
    );
  }

  render(){
    const {song} = this.props.data;
    if (song) {
        return (
            <div>
                <Link to="/">
                    <i className="material-icons">home</i>
                </Link>
                <h3>{song.title}</h3>
                <ul className="collection" >
                    {this.renderSongLyrics(song.lyrics)}
                    </ul>
                <LyricCreate songId={song.id}/>
          </div>
        );
      }
      return (<div>Loading...</div>);
      }
}

export default graphql(fetchSongLyrics, {
  options: (props) => {return {variables: {id: props.params.id}};}
})(SongDetail);

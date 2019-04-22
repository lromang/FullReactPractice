import React, {Component} from 'react';
import fetchQuery from '../Queries/fetchSongs';
import deleteSong from '../Queries/deleteSong';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component{

    onSongDelete(id){
        this.props.mutate({
            variables: {id}
            //refetchQueries: [{query: fetchQuery}]
        }).then(() => this.props.data.refetch());
    }


    renderSongs () {
     return this.props.data.songs.map(
         song => {
             return (

                 <li key={song.id} className="collection-item">
                     {song.title}
                     <i
                         className="material-icons"
                         onClick={() => this.onSongDelete(song.id)}
                     >delete_forever</i>
                 </li>

             )
         }
     )
    }

    render () {
        if (!this.props.data.loading) {
            return (
                <div>
                    <ul className="collection">{this.renderSongs()}</ul>
                    <Link
                        to="/songs/new"
                        className="btn-floating btn-large red right"
                    >
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            )
        }
        return (<div>Loading...</div>)

    }
}


export default graphql(deleteSong)(graphql(fetchQuery)(SongList));
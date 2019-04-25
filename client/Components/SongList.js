import React, {Component} from 'react';
import fetchQuery from '../Queries/fetchSongs';
import deleteSong from '../Queries/deleteSong';
import {graphql} from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component{

    onSongDelete(id){
        this.props.mutate({
          variables: {id},
          refetchQueries: [{query: fetchQuery}]
        });
    }

    renderSongs () {
     return this.props.data.songs.map(
       ({title, id}) => {
             return (
                 <li key={id} className="collection-item"><Link to={`/songs/${id}`}>
                 {title}
               </Link>
                     <i
                         className="material-icons"
                         onClick={() => this.onSongDelete(id)}
                     >delete_forever</i>
                 </li>
             );
         }
     );
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
            );
        }
      return (<div>Loading...</div>);
    }
}


export default graphql(deleteSong)(graphql(fetchQuery)(SongList));

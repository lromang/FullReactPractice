import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import addSong from '../Queries/addSong';
import fetchQuery from '../Queries/fetchSongs';
import {Link, hashHistory} from 'react-router';


class SongCreate extends Component{

    constructor(props){
      super(props);
        this.state = {
            title: ''
        };
    }

    onSubmit(e){
        e.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{
                query: fetchQuery
            }]
        }).then(() => {
          hashHistory.push('/');
        });
    }

    render() {
        return (
            <div>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                <label>Song Title: </label>
                    <input
                        onChange={e => this.setState({title: e.target.value})}
                        value={this.state.title}/>
                </form>
                <Link to="/">
                    <i className="material-icons">home</i>
                </Link>
            </div>
        );
    }
}

export default graphql(addSong)(SongCreate);

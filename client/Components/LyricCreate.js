import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import addLyric from '../Queries/addLyric';
import fetchQuery from "../Queries/fetchSongLyrics";


class LyricCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lyric: ''
        }
    };

    onSubmit(e){
        e.preventDefault();
        this.props.mutate({
            variables: {
                songId: this.props.songId,
                content: this.state.lyric
            },
            refetchQueries: [{
                query: fetchQuery,
                variables: {id: this.props.songId}
            }]
        }).then(() => {
            this.setState({lyric: ''});
        });
    };

    render() {
        return (
            <div>
                <h5 style={{color: 'pink', paddingTop:'50px'}}>Add lyrics to song</h5>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song fragment:</label>
                    <input
                    value={this.state.lyric}
                    onChange={(e) => this.setState({lyric: e.target.value})}></input>
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default graphql(addLyric)(LyricCreate);
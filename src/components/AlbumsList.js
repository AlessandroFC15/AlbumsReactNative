import React, {Component} from 'react';
import { FlatList } from 'react-native';
import AlbumCard from './AlbumCard'

class AlbumsList extends Component {
    render() {
        return (
            <FlatList data={this.props.data}
                      renderItem={({item}) => <AlbumCard data={item} />}
            />
        )
    }
}

export default AlbumsList;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    ActivityIndicator,
    View
} from 'react-native';
import {Container, Content, Root, Toast, Button, Text} from 'native-base';

import CenteredHeader from './src/components/CenteredHeader'
import AlbumsList from './src/components/AlbumsList'

export default class App extends Component {
    constructor(props){
        super(props);

        const albumsList = [
            {
                key: 'album1',
                albumName: 'Views',
                artistName: 'Drake',
                artistPicture: 'http://thefader-res.cloudinary.com/images/w_1440,c_limit,f_auto,q_auto:best/Fader_Drake_Peckmezian_high_res_v3-2015-08-31_010_auffnh/drake-views-from-the-6-cover-story-interview.jpg',
                albumPicture: 'https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg',
                albumLink: 'https://en.wikipedia.org/',
            },

            {
                key: 'album2',
                albumName: '21',
                artistName: 'Adele',
                artistPicture: 'https://scontent.ffor11-1.fna.fbcdn.net/v/t1.0-9/14900613_10154394404679279_1591655310427970240_n.jpg?oh=a7cb09e3f4b7d0eb9aeda6b2c3e6fc6a&oe=5A417C59',
                albumPicture: 'https://images.genius.com/b0ea0d0107d6f8fd1c7d320e99f47897.1000x1000x1.png',
                albumLink: 'https://en.wikipedia.org/',
            },

            {
                key: 'album3',
                albumName: 'WS in Miami',
                artistName: 'Wesley Safadão',
                artistPicture: 'https://pbs.twimg.com/profile_images/864122766810910721/MO80UMyS.jpg',
                albumPicture: 'http://sistemasertanejo.com/wp-content/uploads/2017/07/32656.jpg',
                albumLink: 'https://en.wikipedia.org/',
            }
        ];

        this.state = {
            loading: true,
            albums: []
        };
    }

    static shuffle (array) {
        let i = 0
            , j = 0
            , temp = null;

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    getDataFromApi() {
        this.setState({
            loading: true
        });

        fetch('https://rallycoding.herokuapp.com/api/music_albums')
            .then((response) => response.json())
            .then((responseJson) => {
                let albumsData = responseJson.map(function (album) {
                    return {
                        key: album.title,
                        albumName: album.title,
                        artistName: album.artist,
                        artistPicture: album.thumbnail_image,
                        albumPicture: album.image,
                        albumLink: "https://en.wikipedia.org/",
                    }
                });

                this.setState((prevState) => ({
                    albums: App.shuffle(prevState.albums.concat(albumsData)),
                    loading: false
                }));
            })
            .catch((error) => {
                this.setState({
                    loading: false
                });

                console.log(error);

                Toast.show({
                    text: 'Internet unavailable!',
                    position: 'bottom',
                    buttonText: 'Ok',
                    type: 'danger',
                    duration: 3000
                });
            });
    }

    componentWillMount() {
        this.getDataFromApi();
    }

    renderMainContent() {
        if (this.state.loading) {
            return this.renderLoadingScreen();
        } else if (this.state.albums.length === 0){
            return this.renderErrorScreen();
        } else {
            return this.renderAlbumsList();
        }
    }

    renderErrorScreen() {
        return (
            <View>
                <Button block light onPress={() => this.getDataFromApi()}>
                    <Text>Tentar novamente</Text>
                </Button>
            </View>
        )
    }

    renderLoadingScreen() {
        return <ActivityIndicator />;
    }

    renderAlbumsList() {
        return <AlbumsList data={this.state.albums}/>;
    }

    render() {
        return (
            <Root>
                <Container>
                    <CenteredHeader text="Albums"/>

                    <Content padder>
                        {this.renderMainContent()}
                    </Content>
                </Container>
            </Root>
        );
    }
}

AppRegistry.registerComponent('Albums', () => App);

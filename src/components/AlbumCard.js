import React, {Component} from 'react';
import {Image, Linking, View} from 'react-native';
import { Button, Card, CardItem, Left, Body, Text, Thumbnail} from 'native-base';

class AlbumCard extends Component {
    render() {
        const { artistPicture, albumName, artistName, albumPicture, albumLink} = this.props.data

        return (
            <View style={{ marginTop: 5, marginBottom: 5 }}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: artistPicture}} />
                            <Body>
                            <Text>{albumName}</Text>
                            <Text note>{artistName}</Text>
                            </Body>
                        </Left>
                    </CardItem>

                    <CardItem cardBody>
                        <Image source={{uri: albumPicture}} style={{height: 350, width: null, flex: 1}}/>
                    </CardItem>

                    <Button full info onPress={() => Linking.openURL(albumLink).catch(err => Alert.alert(err)) }>
                        <Text>Buy now</Text>
                    </Button>
                </Card>
            </View>


        )
    }
}

export default AlbumCard;
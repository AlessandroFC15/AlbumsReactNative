import React, {Component} from 'react';
import {Image, Linking} from 'react-native';
import { Button, Card, CardItem, Left, Body, Text, Thumbnail} from 'native-base';

class AlbumCard extends Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.props.data.artistPicture}} />
                        <Body>
                        <Text>{this.props.data.albumName}</Text>
                        <Text note>{this.props.data.artistName}</Text>
                        </Body>
                    </Left>
                </CardItem>

                <CardItem cardBody>
                    <Image source={{uri: this.props.data.albumPicture}} style={{height: 350, width: null, flex: 1}}/>
                </CardItem>

                <Button full info onPress={() => Linking.openURL(this.props.data.albumLink).catch(err => Alert.alert(err)) }>
                    <Text>Buy Now</Text>
                </Button>
            </Card>
        )
    }
}

export default AlbumCard;
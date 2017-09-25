import React, {Component} from 'react'
import {Header, Body, Title} from 'native-base'

class CenteredHeader extends Component {
    render() {
        return(
            <Header>
                <Body style={{justifyContent: 'center', flexDirection: 'row'}}>
                    <Title>
                        {this.props.text}
                    </Title>
                </Body>
            </Header>
        )
    }
}

export default CenteredHeader;
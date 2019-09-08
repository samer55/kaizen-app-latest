import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'

import Swiper from 'react-native-swiper'

const {width} = Dimensions.get('window')

const Slider = props => ( <View style={styles.container}>
        <Image style={styles.image} source={props.uri}/>
    </View>
)

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        marginBottom:15,
        width
    },

  wrapper: {
  },
}

export default class extends Component {
    constructor(props){
        super(props)

        this.state = {
           width: '99%',
            imagesSlider: [

              { uri:'https://blog.hubspot.com/hs-fs/hubfs/Sales_Blog/5-min.jpg?width=598&name=5-min.jpg' },


            ]
        }
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                width: '100%'
            });
        });
    }
    render(){
        return (
          <View>
            <Swiper  height={200}  width={this.state.width} autoplay>

            {
              this.state.imagesSlider.map((item, i) => <Slider
                uri={item}
                key={i}
                                                       />)
                }

                </Swiper>
            </View>
        )
    }
}

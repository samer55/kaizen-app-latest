import React, { Component } from 'react';
import { connect } from 'react-redux';
import {WebView, View, Platform} from 'react-native';
import { Spinner} from '../Reusables';
import { Actions } from 'react-native-router-flux'; // for routing
const source = require('./paypal.html'); // predesigned and styled html
class PayPal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sent: false
        }
        const patchPostMessageFunction = function() {
            var originalPostMessage = window.postMessage;

            var patchedPostMessage = function(message, targetOrigin, transfer) {
              originalPostMessage(message, targetOrigin, transfer);
            };

            patchedPostMessage.toString = function() {
              return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
            };

            window.postMessage = patchedPostMessage;
          };

          this.patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

      }
    componentWillMount(){
        this.setState({loading: true});
    }

    handleNavigation(event){
        console.log(event)
    }
    handleMessage(event){
        let data = event.nativeEvent.data;
        data = JSON.parse(data);
        if(data.status == 'success'){
            alert(data.reference);

        }else{
            this.setState({loading: false});
            alert('Failed, '+ data.message);

        }

    }
    passValues(){
        const { amount, paypalFundingDetails} = this.props;

        let data = {
            amount,
            orderID: paypalFundingDetails.result.id //orderID
        }

        if(!this.state.sent){
            this.refs.webview.postMessage(JSON.stringify(data));
            this.setState({loading: false, sent: true});
        }

    }
    render() {

        return (
            <View style={{flex: 1}}>
            {this.state.loading ? <Spinner/>: null}
             <WebView
               style={{overflow: 'scroll'}}
               source={source}
               originWhitelist={["*"]}
               mixedContentMode={'always'}
               useWebKit={Platform.OS == 'ios'}
               onError={() => {alert('Error Occured'); Actions.pop()}}
               onLoadEnd={() => this.passValues()}
               ref="webview"
               thirdPartyCookiesEnabled={true}
               scrollEnabled={true}
               domStorageEnabled={true}
               startInLoadingState={true}
               injectedJavaScript={this.patchPostMessageJsCode}
               allowUniversalAccessFromFileURLs={true}
               onMessage={(event) => this.handleMessage(event)}
               onNavigationStateChange={(event) => this.handleNavigation(event)}
               javaScriptEnabled={true}
             />
         </View>
        );

    }
}
const mapStateToProps = (state) => {
    const {amount, paypalFundingDetails} = state.fund;
    return {amount, paypalFundingDetails};
};
export default connect(mapStateToProps, {})(PayPal);

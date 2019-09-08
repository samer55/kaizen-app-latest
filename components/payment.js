import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TextInput
} from "react-native";

import InAppBilling from "react-native-billing";

const defaultState = {
  productDetails: null,
  transactionDetails: null,
  consumed: false,
  sub:true,
  error: null
};

export default class Payment extends Component {
  state = {
    productId: "kaizen.sub",
    ...defaultState
  };

  resetState = () => {
    this.setState(defaultState);
  };
componentDidMount(){
  this.subscribe()
}
  mycheck = async () =>  {
      try {
      await InAppBilling.open();
      // If subscriptions/products are updated server-side you
      // will have to update cache with loadOwnedPurchasesFromGoogle()
      await InAppBilling.loadOwnedPurchasesFromGoogle();
      const isSubscribed = await InAppBilling.isSubscribed(this.state.productId)
      console.log("Customer subscribed: ", isSubscribed);
    } catch (err) {
      console.log(err);
    } finally {
      await InAppBilling.close();
    }
  }
  subscribe = async () => {
    try {
      this.resetState();
      await InAppBilling.open();
      const details = await InAppBilling.getSubscriptionDetails(this.state.productId);
      await InAppBilling.close();
      this.setState({ transactionDetails: details });
    } catch (err) {
      this.setState({ error: JSON.stringify(err) });
      await InAppBilling.close();
    }
  };
  check = async () => {
    try {
      this.resetState();
      await InAppBilling.open();
      const details = await InAppBilling.isSubscribed(this.state.productId);
      await InAppBilling.close();
      this.setState({ sub: JSON.stringify(details) });
    } catch (err) {
      this.setState({ error: JSON.stringify(err) });
      await InAppBilling.close();
    }
  };

  render() {
    return (
      <View style={styles.container}>

<Text style={{fontSize:17}}>My subscriptions Details</Text>
        {this.state.transactionDetails && (
          <Text style={styles.text}>Title: {this.state.transactionDetails.title}</Text>

        )}
                {this.state.transactionDetails && (
        <Text style={styles.text}>Description: {this.state.transactionDetails.description}</Text>
)}

      {this.state.transactionDetails && (

        <Text style={styles.text}>Price: {this.state.transactionDetails.priceText}/Month</Text>
)}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  text: {
    textAlign: "center",
    fontSize:15,
    color: "#333333",
    marginBottom: 5
  }
});

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Button
} from "react-native";
import { Container, Header, Content, List, ListItem, Picker, Left, Body, Right, Card, CardItem,Fab , Thumbnail,  } from 'native-base';
import { NativeModules } from 'react-native'
const { InAppUtils } = NativeModules
const { RNIapModule } = NativeModules;

import iapReceiptValidator from 'iap-receipt-validator';
import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,
} from 'react-native-iap';
import InAppBilling from "react-native-billing";
const password = 'b212549818ff42ecb65aa45c'; // Shared Secret from iTunes connect
const production = false; // use sandbox or production url for validation
const validateReceipt = iapReceiptValidator(password, production);
const itemSkus = Platform.select({
  ios: [
    'com.opentiq.kaizenkarta',  // dooboolab
  ],
  android: [
    'android.test.purchased', 'android.test.canceled', 'android.test.refunded', 'android.test.item_unavailable',
    // 'point_1000', '5000_point', // dooboolab
  ],
});

const itemSubs = Platform.select({
  ios: [
    'tld.opentiq.kaizenkarta.subscribe',  // dooboolab
  ],
  android: [
    'test.sub1', // subscription
  ],
});
let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const defaultState = {
  productDetails: null,
  transactionDetails: null,
  consumed: false,
  checking:'',
  sub:false,
  error: null
};



export default class Check extends Component {
  constructor(props) {
   super(props);
   this.handleRestorePurchases = this.handleRestorePurchases.bind(this)

   this.state = {
     productList: [],
     receipt: '',
     availableItemsMessage: '',
   };
 }
 async componentDidMount() {
   const identifiers = [
      'com.opentiq.kaizenkarta',
   ];
   InAppUtils.loadProducts(identifiers, (error, products) => {
    console.log(products);
 });
}

componentWillMount() {

}

goNext = () => {
 Alert.alert('Receipt', this.state.receipt);
}
handleRestorePurchases = () => {
  this.setState(() => ({ isLoading: true }));
  var productIdentifier = 'com.opentiq.kaizenkarta';
  InAppUtils.loadProducts(identifiers, (error, products) => {
   console.log("product",products);
  });
InAppUtils.purchaseProduct(productIdentifier, (error, response) => {
   // NOTE for v3.0: User can cancel the payment which will be available as error object here.
   if(response && response.productIdentifier) {
     console.log('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
      Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
      //unlock store here.
   }
});

}

getItems = async() => {
 try {
   const products = await RNIapModule.getProducts(itemSkus);
   // const products = await RNIap.getSubscriptions(itemSkus);
   console.log('Products', products);
   this.setState({ productList: products });
 } catch (err) {
   console.warn(err.code, err.message);
 }
}

getSubscriptions = async() => {
 try {
   const products = await RNIapModule.getSubscriptions(itemSubs);
   console.log('Products', products);
   this.setState({ productList: products });
 } catch (err) {
   console.warn(err.code, err.message);
 }
}

getAvailablePurchases = async() => {
  try {
   await RNIapModule.prepare();
   const products = await RNIapModule.getProducts(itemSkus);
   this.setState({ items });
   console.log(items);

 } catch(err) {
   console.warn(err);
 }
}

// Version 3 apis
requestPurchase = async(sku) => {
 try {
   RNIapModule.requestPurchase(sku);
 } catch (err) {
   console.warn(err.code, err.message);
 }
}

requestSubscription = async(sku) => {
 try {
   RNIapModule.requestSubscription(sku);
 } catch (err) {
   Alert.alert(err.message);
 }
}

// Deprecated apis
buyItem = async() => {
console.log('rrrr')

   console.log(InAppUtils.canMakePayments())

}

buySubscribeItem = async(sku) => {
 try {
   console.log('buySubscribeItem: ' + sku);
   const purchase = await RNIapModule.buySubscription(sku);
   console.info(purchase);
   this.setState({ receipt: purchase.transactionReceipt }, () => this.goNext());
 } catch (err) {
   console.warn(err.code, err.message);
   Alert.alert(err.message);
 }
}

render() {
 const { productList, receipt, availableItemsMessage } = this.state;
 const receipt100 = receipt.substring(0, 100);

 return (
   <View style={ styles.container }>
     <View style={ styles.header }>
       <Text style={ styles.headerTxt} >react-native-iap V3</Text>
     </View>
     <View style={ styles.content }>
       <ScrollView
         style={{ alignSelf: 'stretch' }}
       >
         <View style={{ height: 50 }} />
         <Button
           onPress={this.getAvailablePurchases}
           activeOpacity={0.5}
           style={styles.btn}
           title="Get available purchases<"
           textStyle={styles.txt}
         />

         <Text style={{ margin: 5, fontSize: 15, alignSelf: 'center' }} >{availableItemsMessage}</Text>

         <Text style={{ margin: 5, fontSize: 9, alignSelf: 'center' }} >{receipt100}</Text>
         <Button
           onPress={this.handleRestorePurchases}
           activeOpacity={0.5}
           style={styles.btn}
           title="buy product"
           textStyle={styles.txt}
          />
         <Button
           onPress={() => this.getItems()}
           activeOpacity={0.5}
           style={styles.btn}
           title="Get Products ({productList.length})"
           textStyle={styles.txt}
          />
         {
           productList.map((product, i) => {
             return (
               <View key={i} style={{
                 flexDirection: 'column',
               }}>
                 <Text style={{
                   marginTop: 20,
                   fontSize: 12,
                   color: 'black',
                   minHeight: 100,
                   alignSelf: 'center',
                   paddingHorizontal: 20,
                 }} >{JSON.stringify(product)}</Text>
                 <Button
                   // onPress={() => this.requestPurchase(product.productId)}
                   onPress={() => this.requestSubscription(product.productId)}
                   // onPress={() => this.buyItem(product.productId)}
                   // onPress={() => this.buySubscribeItem(product.productId)}
                   title="Request purchase for above product"
                   activeOpacity={0.5}
                   style={styles.btn}
                   textStyle={styles.txt}
                 />
               </View>
             );
           })
         }
       </ScrollView>
     </View>
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
    color: "#333333",
    marginBottom: 5
  }
});

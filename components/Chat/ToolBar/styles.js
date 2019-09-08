/** @format */

import React, { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingVertical: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 3 },
    zIndex: 999,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
  },
  arrowBack: {
    // position: 'absolute',
    // top: 8,
    // left: 10,
    zIndex: 99999,
    height: 20,
    marginHorizontal: 10,
  },
  image: {
    resizeMode: 'contain',
    height: 16,
    width: 28,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 5,
  },
  vcall: {
    resizeMode: 'contain',
    height: 24,
    marginRight: 20,

  },
  call: {
    resizeMode: 'contain',
    height: 24,
    marginRight: 25,
  },
})

/** @format */

import React, {
  StyleSheet,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import { Color, Constants } from '@common'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginBottom: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: '#F9F9F9',
    paddingLeft: 10,
  },
  searchIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#999',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: Constants.fontFamily,
    paddingVertical: 15,
    paddingLeft: 5,
  },
})

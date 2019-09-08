/** @format */

import React, { PureComponent } from 'react'
import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import { Images, Languages } from '@common'
import styles from './styles'

export default class SearchChat extends PureComponent {
  _onSearch = (text) => {}

  render() {
    const { placeholder, style } = this.props
    return (
      <View style={[styles.container, style]}>
        <View style={styles.searchWrap}>
          <Image
            source={{ uri: Images.icons.search }}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={placeholder ? placeholder : Languages.search + '...'}
            placeholderTextColor="#999"
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            // value={searchText}
            onChangeText={this._onSearch}
            // onSubmitEditing={this._onSearch}
          />
        </View>
      </View>
    )
  }
}

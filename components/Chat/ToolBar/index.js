/** @format */

import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Images } from '@common'
import styles from './styles'

export default class ChatToolBar extends PureComponent {
  render() {
    const { label, onBack } = this.props
    return (
      <View style={[styles.navbar]}>
        <TouchableOpacity onPress={onBack} style={styles.arrowBack}>
          <Image
            source={Images.icons.LongBack}
            style={styles.image}
            tintColor={'#000'}
          />
        </TouchableOpacity>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.right}>
          <TouchableOpacity onPress={this._call}>
            <Image source={Images.icons.call} style={styles.call} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this._call}>
            <Image source={Images.icons.videocall} style={styles.vcall} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 'rgba(255, 255, 255, .85' },
          ]}
        />
      </View>
    )
  }
}

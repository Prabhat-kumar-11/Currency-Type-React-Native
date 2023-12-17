import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'

type CurrencyButtonProps = PropsWithChildren<{
  name:string;
  flag:string;

}>



export default function CurrencyButton() {
  return (
    <View>
      <Text>CurrencyButton</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
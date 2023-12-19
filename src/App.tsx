// Import necessary components and libraries
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CurrencyButton from './components/CurrencyButton';
import Snackbar from 'react-native-snackbar';
import {currencyByRupee} from './constants';

// Define the main App component
export default function App(): JSX.Element {
  // State variables for input value, result value, and target currency
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  // Function to handle button press for currency conversion
  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: 'Enter a value to convert',
        backgroundColor: '#FF6F61', // Red color for error
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: 'Not a valid number to convert',
        backgroundColor: '#FF6F61', // Red color for error
      });
    }
  };

  // Return the UI components
  return (
    <>
      <StatusBar />

      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
              maxLength={14}
              value={inputValue}
              clearButtonMode="always"
              onChangeText={setInputValue}
              style={styles.inputAmountField}
              placeholder="Enter amount in Rupees"
            />
          </View>
          {resultValue && <Text style={styles.resultTxt}>{resultValue}</Text>}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)}>
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
    </>
  );
}

// Define the styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498DB', // Sky Blue background color
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#61ff73', // Red color for result text
    fontWeight: '800',
  },
  rupee: {
    marginRight: 8,
    fontSize: 22,
    color: '#ca9d65', // Red color for rupee symbol
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    fontSize:20,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#ECF0F1', // Light gray background color
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,
    padding: 10, // Added padding to the buttons
    borderRadius: 12,
    backgroundColor: '#FF6F61', // Red color for button
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#FF8C7E', // Lighter red color for selected button
  },
});

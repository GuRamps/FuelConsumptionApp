// screens/InputScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function InputScreen({ navigation }) {
  const [kilometers, setKilometers] = useState('');
  const [liters, setLiters] = useState('');

  const handleCalculate = () => {
    if (kilometers && liters) {
      navigation.navigate('Result', {
        kilometers: parseFloat(kilometers),
        liters: parseFloat(liters),
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quilometragem (KM):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kilometers}
        onChangeText={setKilometers}
      />
      <Text style={styles.label}>Quantidade de Litros:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={liters}
        onChangeText={setLiters}
      />
      <Button title="Calcular" onPress={handleCalculate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

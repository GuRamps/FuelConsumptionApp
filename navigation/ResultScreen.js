// screens/ResultScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ResultScreen({ route }) {
  const { kilometers, liters } = route.params;
  const averageConsumption = kilometers / liters;
  let classification;

  if (averageConsumption > 12) {
    classification = 'A';
  } else if (averageConsumption > 10) {
    classification = 'B';
  } else if (averageConsumption > 8) {
    classification = 'C';
  } else if (averageConsumption > 4) {
    classification = 'D';
  } else {
    classification = 'E';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        Média de Consumo: {averageConsumption.toFixed(2)} Km/L
      </Text>
      <Text style={styles.classification}>
        Classificação: {classification}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  result: {
    fontSize: 24,
    marginBottom: 16,
  },
  classification: {
    fontSize: 20,
    color: 'blue',
  },
});

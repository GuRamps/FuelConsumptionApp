import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Animated } from 'react-native';

export default function App() {
  // Estados
  const [step, setStep] = useState('input');
  const [kilometers, setKilometers] = useState('');
  const [liters, setLiters] = useState('');
  const [result, setResult] = useState(null);
  const [animation] = useState(new Animated.Value(0)); // Inicializa a animação com valor 0

  // Função para calcular a média e a classificação
  const handleCalculate = () => {
    if (kilometers && liters) {
      const km = parseFloat(kilometers);
      const ltr = parseFloat(liters);
      const averageConsumption = km / ltr;

      let classification;
      let classificationColor;

      if (averageConsumption > 12) {
        classification = 'A';
        classificationColor = '#004d00'; // Verde escuro
      } else if (averageConsumption > 10) {
        classification = 'B';
        classificationColor = '#66ff66'; // Verde fraco
      } else if (averageConsumption > 8) {
        classification = 'C';
        classificationColor = '#ffeb3b'; // Amarelo
      } else if (averageConsumption > 4) {
        classification = 'D';
        classificationColor = '#ff9800'; // Laranja
      } else {
        classification = 'E';
        classificationColor = '#f44336'; // Vermelho
      }

      setResult({
        averageConsumption: averageConsumption.toFixed(2),
        classification,
        classificationColor,
      });
      setStep('result');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  // Função para limpar os campos
  const handleClear = () => {
    setKilometers('');
    setLiters('');
  };

  // Efeito para iniciar a animação quando a tela de resultado é exibida
  useEffect(() => {
    if (step === 'result') {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [step]);

  // Estilo animado
  const animatedStyle = {
    opacity: animation,
    transform: [{
      scale: animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1], // Aumenta o tamanho do texto de 50% a 100%
      }),
    }],
  };

  // Tela de entrada de dados
  if (step === 'input') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Calcule o Consumo de Combustível</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quilometragem (KM):</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={kilometers}
                onChangeText={setKilometers}
                placeholder="Digite a quilometragem"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantidade de Litros:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={liters}
                onChangeText={setLiters}
                placeholder="Digite a quantidade de litros"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
                <Text style={styles.calculateButtonText}>Calcular</Text>
              </TouchableOpacity>
              <View style={styles.space} />
              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.clearButtonText}>Limpar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Tela de resultado
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Resultado do Consumo</Text>
          <Text style={styles.result}>
            Média de Consumo: {result.averageConsumption} Km/L
          </Text>
          <Animated.View style={[styles.classificationContainer, { backgroundColor: result.classificationColor }, animatedStyle]}>
            <Text style={styles.classification}>
              Classificação: {result.classification}
            </Text>
          </Animated.View>
          <TouchableOpacity style={styles.backButton} onPress={() => setStep('input')}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
  },
  space: {
    width: 10,
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  calculateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FFC107',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007BFF',
    textAlign: 'center',
  },
  classificationContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classification: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#28A745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

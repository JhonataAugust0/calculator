import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const App = () => {
  // Mapeamento de teclas
  const buttons = [
    'LIMPAR',
    'DEL',
    '%',
    '/',
    7,
    8,
    9,
    'x',
    4,
    5,
    6,
    '-',
    1,
    2,
    3,
    '+',
    0,
    '.',
    '+/-',
    '=',
  ];
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  const calculator = () => {
    const splitNumbers = currentNumber.split(' ');
    const fistNumber = parseFloat(splitNumbers[0]) || 0;
    const lastNumber = parseFloat(splitNumbers[2]) || 0;
    const operator = splitNumbers[1];

    // Faz ação referente tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString());
        return;
      case '-':
        setCurrentNumber((fistNumber - lastNumber).toString());
        return;
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString());
        return;
      case '/':
        if (lastNumber !== 0) {
          setCurrentNumber((fistNumber / lastNumber).toString());
        } else {
          setCurrentNumber('Erro');
        }
        return;
      case '%':
        setCurrentNumber((fistNumber * (lastNumber / 100)).toString());
        return;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
    }
  };

  const handleInput = (buttonPressed: string) => {
    console.log(buttonPressed); // Mostra no Console a tecla pressionada
    if (
      buttonPressed === '+' ||
      buttonPressed === '-' ||
      buttonPressed === 'x' ||
      buttonPressed === '/' ||
      buttonPressed === '%' ||
      buttonPressed === '+/-'
    ) {
      setCurrentNumber(
        currentNumber.trim() === ''
          ? buttonPressed + ' '
          : currentNumber + ' ' + buttonPressed + ' ',
      );
      return;
    }

    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  };

  return (
    <View style={styles.container}>
      {/* Área onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
        <View>
          {/* Área onde os botões são exibidos */}
          <View style={styles.buttons}>
            {buttons.map(button =>
              button === '=' ? (
                <TouchableOpacity
                  onPress={() => handleInput(button)}
                  key={button}
                  style={[styles.button, {backgroundColor: '#1E1240'}]}>
                  <Text
                    style={[styles.textButton, {color: 'white', fontSize: 30}]}>
                    {button}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleInput(button as string)}
                  key={button}
                  style={styles.button}>
                  <Text
                    style={[
                      styles.textButton,
                      {color: typeof button === 'number' ? '#b496c8' : '#b496c8'},
                    ]}>
                    {button}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#1E1240',
  },
  resultText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
    marginBottom: 92,
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#3D0075',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: '#b496c8',
    fontSize: 20,
  },
});

export default App;

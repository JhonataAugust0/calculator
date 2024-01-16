import React from 'react';
import {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, 'x', 6, 5, 4, '-', 3, 2, 1, '+', 0, '.', '+/-', '='];
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  function calculator(){
    const splitNumbers = currentNumber.split(' ');
    const fistNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    // Faz ação referente tecla pressionada
    switch(operator){
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
    }
  }

  function handleInput(buttonPressed: string){
    console.log(buttonPressed); // Mostra no Console a tecla pressionada
    if (
      buttonPressed === '+' ||
      buttonPressed === '-' ||
      buttonPressed === 'x' ||
      buttonPressed === '/' ||
      buttonPressed === '%'
    ) {
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ');
      return;
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 2));
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
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  return (
    <View style={styles.container}>
      {/* Área onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
        <View>
          {/* Área onde os botões são exibidos */}
          <View style={styles.buttons}>
            {buttons.map((button) =>
              button === '=' ? (
                <TouchableOpacity
                  onPress={() => handleInput(button)}
                  key={button}
                  style={[styles.button, {backgroundColor: '#3dd0e3'}]}>
                  <Text style={[styles.textButton, {color: 'white', fontSize: 30}]}>
                    {button}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleInput(button)}
                  key={button}
                  style={styles.button}
                >
                  <Text
                    style={[
                      styles.textButton,
                      {color: typeof button === 'number' ? 'black' : '#0093a6'},
                    ]}
                  >
                    {button}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </View>
    </View>
  )}


// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  resultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right',
  },
  historyText: {
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: '#7c7c7c',
    fontSize: 20,
  }
});

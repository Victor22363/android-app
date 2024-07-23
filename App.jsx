import Rive from 'rive-react-native';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

import {
  getRandomQuestion,
  filterByType,
  get3Questions,
} from './components/qLoader.jsx';

import questions from './assets/data.json';

//loading the data
function loadQuestions() {
  return questions;
}
const data = loadQuestions();
//get only the easy questions and select a random one
const easyQuestions = filterByType(data, 'type', 'Easy');
const question = getRandomQuestion(easyQuestions);

const { width, height } = Dimensions.get('window');

const App = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const qAnswer = question.correctAnswer;
  const answers = [
    question.options.a, //0
    question.options.b, //1
    question.options.c, //2
    question.options.d, //3
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2C2C2C" barStyle="light-content" />
      <View style={styles.topBar}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <View
            key={num}
            style={[styles.circle, num === 4 && styles.activeCircle]}>
            <Text style={styles.circleText}>{num}</Text>
          </View>
        ))}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.questionBox}>
          <Text style={styles.instruction}>Посочи един отговор.</Text>
          <Text style={styles.question}>{question.question}</Text>
        </View>

        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === index && styles.selectedAnswer,
            ]}
            onPress={() => setSelectedAnswer(index)}>
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.checkButton} 
        onPress={() => {
          console.log(question.options[qAnswer]);
          console.log(answers[selectedAnswer]);
          if (question.options[qAnswer] === answers[selectedAnswer]) {
            console.log('Correct!');
            Alert.alert('ANSWER RESULT', '---CORRECT---', [{ text: 'OK' }]);
          } else {
            console.log('Wrong answer!');
            Alert.alert('ANSWER RESULT', '---WRONG---', [{ text: 'OK' }]);
          }
        }}>
        <Text style={styles.checkButtonText}>Провери</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    paddingTop: StatusBar.currentHeight || 0, // Add padding for status bar
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 5, // Add some margin at the top
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A4A4A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#FFA500',
  },
  circleText: {
    color: 'white',
    fontSize: 16,
  },
  questionBox: {
    backgroundColor: '#4A4A4A',
    borderRadius: 15,
    padding: 15,
    marginTop: 10, // Add some margin at the top
    marginBottom: 20,
    width: width * 0.9,
    height: height * 0.33,
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 5,
  },
  instruction: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  question: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  answerButton: {
    backgroundColor: '#4A4A4A',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: width * 0.9,
    alignSelf: 'center',
    alignItems: 'center', // Add this line to center the text horizontally
    justifyContent: 'center', // Add this line to center the text vertically
  },
  selectedAnswer: {
    backgroundColor: '#FFA500',
  },
  answerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center', // Add this line to ensure text is centered
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 15,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default App;

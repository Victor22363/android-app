import Rive from 'rive-react-native';
import {StyleSheet, Text, View} from 'react-native';
import {
  getRandomQuestion,
  filterByType,
  get3Questions,
} from './questionLoader.js';
import questions from './data.json';
//loading the data
function loadQuestions() {
  return questions;
}
const data = loadQuestions();
//get only the easy questions and select a random one
const easyQuestions = filterByType(data, 'type', 'Easy');
const q = getRandomQuestion(easyQuestions);

function RiveDemo() {
  return (
    <View>
      {/* <Rive
        resourceName="button_3"
        stateMachineName="State Machine 1"
        style={{width: 50, height: 50}}
      /> */}
      <Text>{q.question}</Text>
      <Text>{q.options.a}</Text>
      <Text>{q.options.b}</Text>
      <Text>{q.options.c}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <RiveDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

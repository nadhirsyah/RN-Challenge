import * as React from 'react';
import { StyleSheet, FlatList, TouchableHighlight , Text } from 'react-native';
import { View } from '../components/Themed';
import { Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'react-native-uuid';

export interface ActiveScreenProps {

}

export interface ActiveScreenState{
  todos: Array<{ key: string, done: boolean, text: string; }>,
  textInput: string,
}
export default class ActiveScreen extends React.Component<ActiveScreenProps, ActiveScreenState>{
  constructor(props:ActiveScreenProps) {
    super(props);
    this.state = {
      todos: [
        { key: uuid.v4(), done: true, text: 'Host this workshop' },
        { key: uuid.v4(), done: false, text: 'Do something else' },
      ],
      textInput: '',
    };
  }
  submitTodo = () => {
    this.setState(({todos, textInput}) => ({
      todos: [...todos, { key: uuid.v4(), done: false, text: textInput }],
      textInput: '',
    }))
  } 
  render(){
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.todos}
          renderItem={({item}) => <Text>{item.text}</Text>}
        />
        <View style={styles.textBox}>
        <Input
            placeholder='Add task!'
            value={this.state.textInput}
            onChangeText={(value:string) => this.setState({textInput:value})}
            onSubmitEditing={this.submitTodo}
            rightIcon={
              <TouchableHighlight
                activeOpacity={1}
                underlayColor="#DDDDDD" 
                onPress={this.submitTodo}
              >
                <TabBarIcon
                  name='ios-add'
                  color='black'
                />
              </TouchableHighlight>
            }
            />
            </View>
        </View>
    );
  }
}
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textBox: {
    flexDirection: 'row',
  },
  textInput: {
    flexGrow: 1,
  },
});

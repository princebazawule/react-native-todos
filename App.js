import React, { useState } from "react"
import { FlatList, StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard } from "react-native"

import AddTodo from "./components/addTodo"
import Header from "./components/header"
import Sandbox from "./components/sandbox"
import TodoItem from "./components/todoItem"

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ])

  const pressHandler = key => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.key !== key))
  }

  const submitHandler = todo => {
    
    if(todo.length > 3) {
      setTodos(prevTodos => {
        return [
          { text: todo, key: Math.random().toString() },
          ...prevTodos
        ]
      })
    } else {
      Alert.alert('WHOOPS!', 'Todo must be over 3 chars long', [
        {text: 'Understood', onPress: () => console.log('alert closed')}
      ])
    }
  }

  return (
    // <Sandbox />
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* header */}
        <Header />
        
        {/* content */}
        <View style={styles.content}>
          
          {/* addTodo form */}
          <AddTodo submitHandler={submitHandler} />
          
          {/* list */}
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    padding: 40,
    // backgroundColor: 'pink',
    flex: 1,
  },
  list: {
    marginTop: 20,
    // backgroundColor: 'yellow',
    flex: 1,
  },
})

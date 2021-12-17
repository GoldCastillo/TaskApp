import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  ListViewBase,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";
import Swipeout from "react-native-swipeout";

export default class TaskModal extends React.Component {

  // State adds
  state = {
    newTask: "",
  };


  // ToggleTaskCompleted method (Done, Undone)
  toggleTaskCompleted = (index) => {
    let list = this.props.list;
    list.tasks[index].completed = !list.tasks[index].completed;
    this.props.updateList(list);
  };


  // Add task method
  addTask = () => {
    if (this.state.newTask != "") {
      let list = this.props.list;
      list.tasks.push({ title: this.state.newTask, completed: false });

      this.props.updateList(list);
      this.setState({ newTask: "" });
      Keyboard.dismiss();
    } else {
      // If task name is empty
      Alert.alert("Invalid input");

    }
  };

  // deleteTask method
  deleteTask = (index) => {
    let list = this.props.list;
    list.tasks.splice(index, 1);
    this.props.updateList(list);
  };


  // render to task swibeBtns
  renderTask = (task, index) => {
    let swipeBtns = [
      {
        text: "Delete",
        backgroundColor: Colors.red,
        underLayColor: "rgba(0, 0, 0, 1, 0.6)",
        padding: 40,
        onPress: () => {
          this.deleteTask(index);
        },
      },
    ];

    return (
      // Swipe right
      <Swipeout
        // Calls swipeBtns deleteTask method
        right={swipeBtns}
        backgroundColor="transparent"
      >
        <View style={styles.taskContainer}>

          {/* onPress calls toggleTaskCompleted method */}
          <TouchableOpacity onPress={() => this.toggleTaskCompleted(index)}>
            <Ionicons
              name={task.completed ? "checkbox" : "square-outline"}
              size={24}
              color={this.state.color}
              style={{ width: 32 }}
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.task,
              {
                textDecorationLine: task.completed ? "line-through" : "none",
                color: task.completed ? Colors.gray : Colors.black,
              },
            ]}
          >
            {task.title}
          </Text>
        </View>
      </Swipeout>
    );
  };
  render() {
    const list = this.props.list;

    const taskCount = list.tasks.length;
    const completedCount = list.tasks.filter((task) => task.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          {/* Exit button */}
          <TouchableOpacity
            style={{ position: "absolute", top: 32, right: 32, zIndex: 10 }}
            onPress={this.props.closeModal}
          >
            <Ionicons name="close" size={24} color={Colors.black} />
          </TouchableOpacity>

          <View
            style={[
              styles.section,
              styles.header,
              { borderBottomColor: list.color },
            ]}
          >
            <View>
              <Text style={styles.title}>{list.name}</Text>
              <Text style={styles.taskCount}>
                {/*Subheader of completes*/}
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            {/* FlatList of all tasks inside tasklist */}
            <FlatList
              data={list.tasks}
              // Renders task
              renderItem={({ item, index }) => this.renderTask(item, index)}
              keyExtractor={(item) => item.title}
              contentContainerStyle={{
                paddingHorizontal: 32,
                paddingVertical: 64,
              }}
              showsVerticalScrollIndicator={true}
            />
          </View>
          <View style={[styles.section, styles.footer]}>
            {/* New task text input*/}
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTask: text })}
              value={this.state.newTask}
            />
            {/* New task add button */}
            <TouchableOpacity
              style={[styles.addTask, { backgroundColor: list.color }]}
              onPress={() => this.addTask()}
            >
              <Ionicons name="add-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    flex: 1,
    alignSelf: "stretch",
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: Colors.gray,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTask: {
    borderRadius: 6,
    padding: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    color: Colors.black,
    fontWeight: "400",
    fontSize: 16,
  },
});

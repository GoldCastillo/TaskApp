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
  Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";

export default class TaskModal extends React.Component {
  state = {
    newTask: "",
  };

  toggleTaskCompleted = (index) => {
    let list = this.props.list;
    list.tasks[index].completed = !list.tasks[index].completed;
    this.props.updateList(list);
  };

  addTask = () => {
    let list = this.props.list;
    list.tasks.push({title: this.state.newTask, completed: false});

    this.props.updateList(list);
    this.setState({newTask: ""});

    Keyboard.dismiss();
  }

  renderTask = (task, index) => {
    return (
      <View style={styles.taskContainer}>
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
    );
  };
  render() {
    const list = this.props.list;

    const taskCount = list.tasks.length;
    const completedCount = list.tasks.filter((task) => task.completed).length;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={{ position: "absolute", top: 12, right: 32, zIndex: 10 }}
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
                {completedCount} of {taskCount} tasks
              </Text>
            </View>
          </View>

          <View style={[styles.section, { flex: 3 }]}>
            <FlatList
              data={list.tasks}
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
            <TextInput
              style={[styles.input, { borderColor: list.color }]}
              onChangeText={(text) => this.setState({ newTask: text })}
              value={this.state.newTask}
            />
            <TouchableOpacity
              style={[styles.addTask, { backgroundColor: list.color }]} onPress={() => this.addTask()}
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

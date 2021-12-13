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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";

export default class TaskModal extends React.Component {
  state = {
    name: this.props.list.name,
    color: this.props.list.color,
    tasks: this.props.list.tasks,
  };

  renderTask = (task) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity>
          <Ionicons
            name={task.completed ? "checkbox" : "square-outline"}
            size={24}
            color={this.state.color}
            style={{ width: 32 }}
          />
        </TouchableOpacity>

        <Text style={[styles.task, { textDecorationLine: task.completed ? "line-through" : "none", color: task.completed ? Colors.gray : Colors.black }]}>{task.title}</Text>
      </View>
    );
  };
  render() {
    const taskCount = this.state.tasks.length;
    const completedCount = this.state.tasks.filter(
      (task) => task.completed
    ).length;
    return (
      <SafeAreaView style={styles.container}>
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
            { borderBottomColor: this.state.color },
          ]}
        >
          <View>
            <Text style={styles.title}>{this.state.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={this.state.tasks}
            renderItem={({ item }) => this.renderTask(item)}
            keyExtractor={(item) => item.title}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={true}
          />
        </View>
        <KeyboardAvoidingView
          style={[styles.section, styles.footer]}
          behavior="padding"
        >
          <TextInput
            style={[styles.input, { borderColor: this.state.color }]}
          />
          <TouchableOpacity
            style={[styles.addTask, { backgroundColor: this.state.color }]}
          >
            <Ionicons name="add-outline" size={24} color={Colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
  }
});

import { Color } from "chalk";
import React from "react";
import { render } from "react-dom";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from "react-native";
import Colors from "../Colors";
import TaskModal from "./TaskModal";
import DoubleClick from "react-native-double-click";
import { TouchableHighlight } from "react-native-gesture-handler";
import tempData from "../tempData";

export default class TaskList extends React.Component {

  // TaskList state adds
  state = {
    showListVisible: false,
    lists: tempData
  };


  // DeleteList method
  deleteList = (list) => {
    this.setState({lists: this.state.lists.splice(list, 1)})

    // Alert when task is being deleted
    Alert.alert("Tasklist deleted")  
  }


  // Shows all tasks inside TaskList
  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  // Tasks render
  render() {
    const list = this.props.list;
    const completedCount = list.tasks.filter((task) => task.completed).length;
    const remainingCount = list.tasks.length - completedCount;

    return (
      <View>
        {/* Tasks modal */}
        <Modal
          animationType="slide"
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TaskModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
          />
        </Modal>

        {/* Tasks lists with delete */}
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}
          onLongPress={() => this.deleteList(list)}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          {/* Completed number */}
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>

          {/* Remaining number */}
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    borderRadius: 8,
    marginHorizontal: 15,
    alignItems: "center",
    width: 250,
  },
  listTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 20,
  },
  count: {
    fontSize: 36,
    fontWeight: "200",
    color: Colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.white,
  },
});

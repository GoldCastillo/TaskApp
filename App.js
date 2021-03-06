import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./Colors";
import tempData from "./tempData";
import TaskList from "./components/TaskList";
import AddListModal from "./components/AddListModal";
console.disableYellowBox = true;


export default class App extends React.Component {

  // App state adds
  state = {
    addTaskVisible: false,
    lists: tempData,
  };

  //onPress task 
  toggleAddToModal() {
    this.setState({ addTaskVisible: !this.state.addTaskVisible });
  }

  // Renders TaskLists and calls updateList method
  renderList = (list) => {
    return <TaskList list={list} updateList={this.updateList} />;
  };

  // Adds list to lists
  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, tasks: [] },
      ],
    });
  };
  // Method to update lists
  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

 

  render() {
    return (
      <View style={styles.container}>

        {/*Add to lists modal */}
        <Modal
          animationType="slide"
          visible={this.state.addTaskVisible}
          onRequestClose={() => this.toggleAddToModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddToModal()}
            addList={this.addList}
          />
        </Modal>

        {/* Title */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.liner} />
          <Text style={styles.title}>
            Task <Text style={styles.highlight}>List</Text>
          </Text>
          <View style={styles.liner} />
        </View>

        <StatusBar style="auto" />
        <View style={{ marginVertical: 50 }}>
          {/* onPress AddToList button */}
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddToModal()}
          >
            <Ionicons name="add-outline" size={32} color={Colors.yellow} />
          </TouchableOpacity>

          
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 260, paddingLeft: 30 }}>

        {/* FlatList of tasks */}
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  liner: {
    backgroundColor: Colors.lightYellow,
    height: 1.5,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.black,
    paddingHorizontal: 65,
  },
  highlight: {
    fontWeight: "100",
    color: Colors.yellow,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightYellow,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: Colors.yellow,
    fontWeight: "500",
    fontSize: 20,
    marginTop: 10,
  },
});

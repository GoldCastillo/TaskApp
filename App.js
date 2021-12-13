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

export default class App extends React.Component {
  state = {
    addTaskVisible: false,
  };

  toggleAddToModal() {
    this.setState({ addTaskVisible: !this.state.addTaskVisible });
  }

  renderList = list => {
    return <TaskList list={list} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={this.state.addTaskVisible} onRequestClose={() => this.toggleAddToModal()}>
          <AddListModal closeModal={() => this.toggleAddToModal()} />
        </Modal>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.liner} />
          <Text style={styles.title}>
            Task <Text style={styles.highlight}>List</Text>
          </Text>
          <View style={styles.liner} />
        </View>

        <StatusBar style="auto" />
        <View style={{ marginVertical: 50 }}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddToModal() }>
            <Ionicons name="add-outline" size={32} color={Colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 260, paddingLeft: 30 }}>
          <FlatList
            data={tempData}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            renderItem={({ item }) => this.renderList(item)}
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
    backgroundColor: Colors.lightBlue,
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
    color: Colors.blue,
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: Colors.blue,
    fontWeight: "500",
    fontSize: 20,
    marginTop: 10,
  },
});

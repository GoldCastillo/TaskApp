import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Colors";


export default class AddListModal extends React.Component {

  // State colors add
  backgroundColors = [
    "#ffab8f",
    "#eeff8f",
    "#61faa3",
    "#8fe1ff",
    "#938fff",
    "#ec8fff",
    "#ff8fbc",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };


  // createTask method
  createTask = () => {
    const { name, color } = this.state;

    const list = { name, color };

    this.props.addList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };


  // rendersColors
  renderColors() {
    return this.backgroundColors.map((color) => {
      return (

        // Renders them to buttons
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Exit button */}
        <TouchableOpacity
          style={{ position: "absolute", top: 32, right: 32 }}
          onPress={this.props.closeModal}
        >
          <Ionicons name="close" size={24} color={Colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          {/* Title */}
          <Text style={styles.title}>Create Task List</Text>

          {/* Task input */}

          <TextInput
            style={styles.input}
            placeholder={"List name?"}
            onChangeText={(text) => this.setState({ name: text })}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            {/* Makes colors visible to user */}
            {this.renderColors()}
          </View>

          {/* Create task button */}
          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createTask}
          >
            <Text style={{ color: Colors.white, fontWeight: "600" }}>
              Create!
            </Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: 8,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 32,
    height: 30,
    borderRadius: 4,
  },
});

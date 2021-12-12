import { Color } from "chalk";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../Colors";

export default TaskList = ({ list }) => {
  const completedCount = list.tasks.filter((task) => task.completed).length;
  const remainingCount = list.tasks.length - completedCount;
  return (
    <View style={[styles.listContainer, { backgroundColor: list.color }]}>
      <Text style={styles.listTitle} numberOfLines={1}>
        {list.name}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.count}>{remainingCount}</Text>
        <Text style={styles.subtitle}>Completed</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.count}>{completedCount}</Text>
        <Text style={styles.subtitle}>Remaining</Text>
      </View>
    </View>
  );
};

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

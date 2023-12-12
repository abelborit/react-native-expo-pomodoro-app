import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const optionsTabs = ["Pomodoro", "Short Break", "Long Break"];

export const HeaderComponent = ({
  setTime,
  currentActionTime,
  setCurrentActionTime,
}) => {
  const handlePressOptionTab = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentActionTime(index);
    setTime(newTime * 60);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleApp}>Pomodoro</Text>

      <View style={styles.containerTabs}>
        {optionsTabs.map((element, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={element + index}
            onPress={() => handlePressOptionTab(index)}
            style={[
              styles.itemStyle,
              currentActionTime !== index && { borderColor: "transparent" },
            ]}
          >
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>{element}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleApp: {
    fontSize: 32,
    fontWeight: "bold",
  },
  containerTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginVertical: 20,
  },
});

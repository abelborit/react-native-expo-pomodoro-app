import { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderComponent } from "./src/components/HeaderComponent";
import { TimerComponent } from "./src/components/TimerComponent";
import { Audio } from "expo-av";

const colorsOptions = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25min * 60seg para tener los segundos
  const [currentActionTime, setCurrentActionTime] = useState(
    "POMO" | "SHORT" | "BREAK"
  ); // este es como un enum de TypeScript que nos regresa un número según la posición y en este caso nos dará 0 y será de tipo "POMO"
  const [isActive, setIsActive] = useState(false);

  const playSoundStart = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require(`./assets/click.mp3`)
    );
    await sound.playAsync();
  };

  const playSoundFinish = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require(`./assets/alarm-tone.mp3`)
    );
    await sound.playAsync();
  };

  const handleStartStop = () => {
    playSoundStart();
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      playSoundFinish();
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500); // 5 minutes for short break, 25 minutes for pomodoro
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colorsOptions[currentActionTime] },
      ]}
    >
      <View
        style={{
          flex: 1,
          paddingVertical: (Platform.OS = "android" && 35),
          paddingHorizontal: (Platform.OS = "android" ? 20 : 5),
        }}
      >
        <HeaderComponent
          setTime={setTime}
          currentActionTime={currentActionTime}
          setCurrentActionTime={setCurrentActionTime}
        />

        <TimerComponent time={time} />

        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleStartStop()}
            style={styles.btnStyle}
          >
            <Text style={styles.btnText}>{isActive ? "Stop" : "Start"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 25,
  },
  btnStyle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    paddingVertical: 12,
    // height: 50,
    // width: 180,
    borderRadius: 15,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

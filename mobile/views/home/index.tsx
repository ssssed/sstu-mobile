import {StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import {useEffect} from "react";
import {RaspStore} from "@/entities/rasp";

export default function HomeView() {

  useEffect(() => {
    RaspStore.instance.fetchGroups()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeView</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

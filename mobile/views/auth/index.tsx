import {StyleSheet} from 'react-native';
import {View} from '@/components/Themed';
import {useState} from "react";
import AuthForm from "@/views/auth/ui/auth-form";

export default function AuthView() {
  const [tab, setTab] = useState<'auth' | 'register'>('auth');
  return (
    <View style={styles.container}>
      {tab === 'auth' && (<AuthForm/>)}
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

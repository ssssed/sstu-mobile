import {StyleSheet} from 'react-native';
import {View} from '@/components/Themed';
import {useState} from "react";
import AuthForm from "@/views/auth/ui/auth-form";
import {Tabs} from "@/views/auth/ui/tabs";
import {RegisterForm} from "@/views/auth/ui/register-form";

type TabNamesType = 'auth' | 'register';

export default function AuthView() {
  const [tab, setTab] = useState<TabNamesType>('auth');
  return (
    <View style={styles.container}>
      <Tabs<TabNamesType> value={tab} onTabChange={setTab} contents={[
        {
          name: 'auth',
          label: 'Вход',
          component: <AuthForm/>
        },
        {
          name: 'register',
          label: 'Регистрация',
          component: <RegisterForm/>
        }
      ]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

import {StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {AuthStore} from "@/entities/auth";
import {router} from "expo-router";
import {UserSignInParamsType} from "@/entities/auth/types";

export default function AuthForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: {isValid, isLoading, isSubmitting,}
  } = useForm({
    mode: 'onTouched'
  });

  const handleLogin: SubmitHandler<any> = async (values: UserSignInParamsType) => {
    await AuthStore.instance.authenticate(values);
    reset();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
      <View style={styles.inputContainer}>
      <Input name={'phone'} placeholder={'Номер телефона'} control={control} defaultValue={''} rules={{
        required: {
          message: 'Телефон это обязательное поле',
          value: true,
        },
        minLength: {
          message: 'Минимальная длинна телефона 11 символов',
          value: 11,
        },
      }}/>
      <Input name={'password'} placeholder={'Пароль'} control={control} defaultValue={''} rules={{
        required: {
          message: 'Пароль это обязательное поле',
          value: true,
        },
      }} secureTextEntry/>
      </View>
      <Button style={styles.button} onPress={handleSubmit(handleLogin)}
              disabled={!isValid || isSubmitting}>Войти</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
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
  button: {
    display: 'flex',
    width: '100%'
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
});

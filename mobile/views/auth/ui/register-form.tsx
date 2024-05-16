import {StyleSheet, Text, View} from "react-native";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {UserParamsType} from "@/entities/auth/types";
import {AuthStore} from "@/entities/auth";
import {router} from "expo-router";
import {Picker} from "@react-native-picker/picker";
import {RaspStore} from "@/entities/rasp";
import {useState} from "react";

export const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: {isValid, isLoading, isSubmitting,}
  } = useForm({
    mode: 'onTouched'
  });

  const groups = RaspStore.instance.groups;
  const [selectGroup, setSelectGroup] = useState<string>(groups[0]?.name);

  const handleRegister: SubmitHandler<any> = async (values: UserParamsType) => {
    console.log('values', values);
    await AuthStore.instance.register(values);
    reset();
    router.replace('/');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <View style={styles.inputContainer}>
        <Input name={'firstName'} control={control} defaultValue={''} placeholder={'Имя'}/>
        <Input name={'lastName'} control={control} defaultValue={''} placeholder={'Фамилия'}/>
        <Input name={'studentNumber'} control={control} defaultValue={''} placeholder={'Номер зачетки'}/>
        <Controller render={({field: {onChange, value}}) => (
          <Picker selectedValue={value} onValueChange={onChange}>
            {groups.map(group => (
              <Picker.Item key={group.groupId} label={group.name} value={group.name}/>
            ))}
          </Picker>
        )} name={'groupName'} control={control} defaultValue={''}/>
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
      <Button style={styles.button} onPress={handleSubmit(handleRegister)}
              disabled={!isValid || isSubmitting}>Зарегистрироваться</Button>
    </View>
  )
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
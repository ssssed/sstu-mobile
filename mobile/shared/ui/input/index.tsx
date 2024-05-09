import {StyleSheet, Text, TextInput, View} from "react-native";
import {FieldValues, useController, UseControllerProps} from 'react-hook-form';

type InputType<T extends FieldValues> = UseControllerProps<T> & {
  secureTextEntry?: boolean;
  placeholder?: string
}

export function Input<T extends FieldValues>(props: InputType<T>) {
  const {field, fieldState, formState} = useController(props)
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} {...props} value={field.value} onChangeText={field.onChange}/>
      {fieldState.invalid && <Text>{fieldState.error?.message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: 5,
  },
  input: {
    display: 'flex',
    width: '100%',
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: 'black'
  }
});
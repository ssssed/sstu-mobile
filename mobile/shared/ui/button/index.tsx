import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {FC} from "react";

type ButtonProps = TouchableOpacityProps;

export const Button: FC<ButtonProps> = (props) => {
  const {children, ...p} = props;
  return (
    <TouchableOpacity {...p} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
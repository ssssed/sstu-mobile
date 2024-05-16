import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {FC} from "react";

type ButtonProps = TouchableOpacityProps;

export const Button: FC<ButtonProps> = (props) => {
  const {children, ...p} = props;
  return (
    <TouchableOpacity {...p} style={[styles.button, p.style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2f95dc',
    padding: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
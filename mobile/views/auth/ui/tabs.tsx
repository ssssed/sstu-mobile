import {Dispatch, Fragment, ReactNode, SetStateAction} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

type TabContentType<T extends string> = {
  name: T;
  label: string;
  component: ReactNode;
}

type TabsProps<T extends string> = {
  value: T;
  onTabChange: Dispatch<SetStateAction<T>>;
  contents: TabContentType<T>[]
}

export function Tabs<T extends string>(props: TabsProps<T>) {
  const {value, contents, onTabChange} = props;
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {contents.map((content, index) => (
          <TouchableOpacity
            key={content.name}
            style={[
              styles.button,
              content.name === value ? styles.selected : {},
              index === 0 ? styles.buttonFirstChild : {},
              index === contents.length - 1 ? styles.buttonLastChild : {}
            ]}
            onPress={() => onTabChange(content.name)}
          >
            <Text style={[styles.label, content.name === value ? styles.labelSelected : {}]}>{content.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {contents.filter(el => el.name === value).map((content) => (
        <Fragment key={content.name}>
          {content.component}
        </Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 20,
    marginVertical: 15
  },
  tabs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
  button: {
    opacity: 0.6,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  buttonFirstChild: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  buttonLastChild: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  selected: {
    opacity: 1,
    backgroundColor: '#2f95dc',
  },
  label: {},
  labelSelected: {
    color: '#fff'
  }
});

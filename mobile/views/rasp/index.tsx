import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from '@/components/Themed';
import React, {Fragment, useEffect, useState} from "react";
import {RaspStore} from "@/entities/rasp";
import {Loader} from "@/shared/ui/loader";

export default function RaspView() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const rasp = RaspStore.instance.calendar;
  const loading = RaspStore.instance.calendarLoading;

  useEffect(() => {
    RaspStore.instance.fetchCalendar('б1-ПИНФ-32');
  }, [selectedValue]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Raps</Text>
      <Loader loading={loading}/>
      {/*<Picker*/}
      {/*  selectedValue={selectedValue}*/}
      {/*  onValueChange={handleChange}*/}
      {/*  style={styles.picker}*/}
      {/*>*/}
      {/*  {groups.map(group => (*/}
      {/*    <Picker.Item key={group.name} label={group.name} value={group.groupId}/>*/}
      {/*  ))}*/}
      {/*</Picker>*/}
      <ScrollView style={styles.calendar}>
        {rasp.map((day, index) => (
          <Fragment key={day.day + index}>
            <View style={styles.day}>
              <View style={styles.separator}/>
              <Text style={styles.textCenter}>{day.day}</Text>
              {day.lessons.length <= 0 && (<Text style={styles.textCenter}>Поздравляю занятий в этот день нет</Text>)}
              {day.lessons.length > 0 && day.lessons.map((lesson, index) => (
                <View key={index} style={styles.lessonContainer}>
                  <Text style={styles.textCenter}>{lesson.hour}</Text>
                  <Text style={styles.textCenter}>Кабинет: {lesson.room}</Text>
                  <Text style={styles.lessonName}>{lesson.name}</Text>
                  <Text style={styles.textCenter}>{lesson.type}</Text>
                  <Text style={styles.textCenter}>{lesson.teacher.name}</Text>
                </View>
              ))}
            </View>
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    marginTop: 20,
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    backgroundColor: 'black',
    height: 1,
    width: '100%',
  },
  picker: {
    width: 200,
  },
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 10,
    marginBottom: 10
  },
  day: {
    padding: 10,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  textCenter: {
    textAlign: 'center'
  },
  lessonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  lessonName: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

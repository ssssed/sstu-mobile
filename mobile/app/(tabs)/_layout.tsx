import React from 'react';
import {Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';

import FontAwesome from "@expo/vector-icons/FontAwesome";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

type TabsName = 'index' | 'chat' | 'profile' | 'rasp';

type TabOptionType = {
  title?: string;
  tabBarIcon?: ({color}: { color: string }) => React.ReactNode;
  headerShown?: boolean;
}

type TabProps = {
  name: TabsName;
  options?: TabOptionType;
}

export const TABS: TabProps[] = [
  {
    name: 'index',
    options: {
      title: 'Home',
      tabBarIcon: ({color}) => <TabBarIcon name="home" color={color}/>,
      headerShown: false,
    }
  },
  {
    name: 'chat',
    options: {
      title: 'Chat',
      tabBarIcon: ({color}) => <TabBarIcon name={'comment'} color={color}/>,
      headerShown: false,
    }
  },
  {
    name: 'rasp',
    options: {
      title: 'rasp',
      tabBarIcon: ({color}) => <TabBarIcon name={'calendar'} color={color}/>,
      headerShown: false,
    }
  },
  {
    name: 'profile',
    options: {
      title: 'profile',
      tabBarIcon: ({color}) => <TabBarIcon name={'user'} color={color}/>,
      headerShown: false,
    }
  }
];

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      {TABS.map(tab => (
        <Tabs.Screen
          key={tab.name}
          {...tab}
        />
      ))}
    </Tabs>
  );
}

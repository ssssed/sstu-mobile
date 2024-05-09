import React, {useEffect} from 'react';
import {Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {createStore, useStore} from "quark-store";
import {AuthStore} from "@/entities/auth";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

type TabsName = 'index' | 'chat' | 'profile' | 'rasp' | 'auth';

type TabOptionType = {
  title?: string;
  tabBarIcon?: ({color}: { color: string }) => React.ReactNode;
  headerShown?: boolean;
  href?: string | null
}

type TabProps = {
  name: TabsName;
  options?: TabOptionType;
}

const PRIVATE_TABS: TabProps[] = [
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
  }, {
    name: 'auth',
    options: {
      title: 'Authentication',
      tabBarIcon: ({color}) => <TabBarIcon name={'unlock-alt'} color={color}/>,
      headerShown: false,
      href: null
    }
  }
]
const PUBLIC_TABS: TabProps[] = [
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
      href: null
    }
  },
  {
    name: 'rasp',
    options: {
      title: 'rasp',
      tabBarIcon: ({color}) => <TabBarIcon name={'calendar'} color={color}/>,
      headerShown: false,
      href: null
    }
  },
  {
    name: 'profile',
    options: {
      title: 'profile',
      tabBarIcon: ({color}) => <TabBarIcon name={'user'} color={color}/>,
      headerShown: false,
      href: null
    }
  }, {
    name: 'auth',
    options: {
      title: 'Authentication',
      tabBarIcon: ({color}) => <TabBarIcon name={'unlock-alt'} color={color}/>,
      headerShown: false,
    }
  }
]

export const TABS = createStore<TabProps[]>(PUBLIC_TABS);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabs = useStore(TABS);
  const isAuth = AuthStore.instance.isAuthenticated();

  useEffect(() => {
    AuthStore.instance.checkAuthenticatedInAsyncStorage();
  }, []);

  useEffect(() => {
    if (!isAuth) {
      TABS.set(PUBLIC_TABS)
    } else {
      TABS.set(PRIVATE_TABS)
    }

  }, [isAuth]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        lazy: true,
      }}>
      {tabs.map(tab => (
        <Tabs.Screen
          key={tab.name}
          {...tab}
        />
      ))}
    </Tabs>
  );
}

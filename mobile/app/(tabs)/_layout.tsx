import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

import { useStore } from 'quark-store';
import { AuthStore } from '@/entities/auth';
import { PRIVATE_TABS, PUBLIC_TABS, TABS } from '@/entities/auth/tabs.store';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const tabs = useStore(TABS);
    const isAuth = AuthStore.instance.status === 'authenticated';

    useEffect(() => {
        if (!isAuth) {
            TABS.set(PUBLIC_TABS);
        } else {
            TABS.set(PRIVATE_TABS);
        }
    }, [isAuth]);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
                lazy: true
            }}
        >
            {tabs.map(tab => (
                <Tabs.Screen
                    key={tab.name}
                    {...tab}
                />
            ))}
        </Tabs>
    );
}

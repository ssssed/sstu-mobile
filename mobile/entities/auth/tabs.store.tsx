import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createStore } from 'quark-store';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return (
        <FontAwesome
            size={28}
            style={{ marginBottom: -3 }}
            {...props}
        />
    );
}

type TabsName = 'index' | 'chat' | 'profile' | 'rasp' | 'auth';

type TabOptionType = {
    title?: string;
    tabBarIcon?: ({ color }: { color: string }) => React.ReactNode;
    headerShown?: boolean;
    href?: string | null;
};

type TabProps = {
    name: TabsName;
    options?: TabOptionType;
};

export const PRIVATE_TABS: TabProps[] = [
    {
        name: 'index',
        options: {
            title: 'Home',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name='home'
                    color={color}
                />
            ),
            headerShown: false
        }
    },
    {
        name: 'chat',
        options: {
            title: 'Chat',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'comment'}
                    color={color}
                />
            ),
            headerShown: false
        }
    },
    {
        name: 'rasp',
        options: {
            title: 'rasp',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'calendar'}
                    color={color}
                />
            ),
            headerShown: false
        }
    },
    {
        name: 'profile',
        options: {
            title: 'profile',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'user'}
                    color={color}
                />
            ),
            headerShown: false
        }
    },
    {
        name: 'auth',
        options: {
            title: 'Authentication',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'unlock-alt'}
                    color={color}
                />
            ),
            headerShown: false,
            href: null
        }
    }
];
export const PUBLIC_TABS: TabProps[] = [
    {
        name: 'index',
        options: {
            title: 'Home',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name='home'
                    color={color}
                />
            ),
            headerShown: false
        }
    },
    {
        name: 'chat',
        options: {
            title: 'Chat',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'comment'}
                    color={color}
                />
            ),
            headerShown: false,
            href: null
        }
    },
    {
        name: 'rasp',
        options: {
            title: 'rasp',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'calendar'}
                    color={color}
                />
            ),
            headerShown: false,
            href: null
        }
    },
    {
        name: 'profile',
        options: {
            title: 'profile',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'user'}
                    color={color}
                />
            ),
            headerShown: false,
            href: null
        }
    },
    {
        name: 'auth',
        options: {
            title: 'Authentication',
            tabBarIcon: ({ color }) => (
                <TabBarIcon
                    name={'unlock-alt'}
                    color={color}
                />
            ),
            headerShown: false
        }
    }
];

export const TABS = createStore<TabProps[]>(PUBLIC_TABS);

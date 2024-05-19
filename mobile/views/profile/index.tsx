import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { AuthStore } from '@/entities/auth';
import { Logout } from '@/features/(auth)';

export default function ProfileView() {
    const user = AuthStore.instance.user;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    Профиль {user?.lastName} {user?.firstName}
                </Text>
                <Logout />
            </View>
            <View>
                <Text>Группа: {user?.groupName}</Text>
                <Text>Номер телефона: {user?.phone}</Text>
                <Text>№ {user?.studentNumber}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40
    }
});

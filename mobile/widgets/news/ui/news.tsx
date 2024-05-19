import { NewsType } from '@/entities/news';
import { Text, View, StyleSheet, Image } from 'react-native';

type NewsProps = {
    item: NewsType;
};

export const NewsCard = ({ item }: NewsProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.tag}>{item.tag}</Text>
                <Text>|</Text>
                <Text>{item.date}</Text>
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 'bold'
    },
    description: {},
    tag: {
        color: 'blue'
    }
});

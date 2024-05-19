import { Text, View } from '@/components/Themed';
import { NewsStore } from '@/entities/news/model/model';
import { RaspStore } from '@/entities/rasp';
import { NewsCard } from '@/widgets/news';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

export default function HomeView() {
    const news = NewsStore.instance.news;
    const page = NewsStore.instance.currentPage;
    const isLastPage = NewsStore.instance.isLastPage;

    useEffect(() => {
        Promise.all([RaspStore.instance.fetchGroups()]);
    }, []);

    useEffect(() => {
        NewsStore.instance.fetch();
    }, [page]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeView</Text>
            <FlatList
                /* @ts-ignore */
                data={news}
                renderItem={NewsCard}
                keyExtractor={item => item.id.toString()}
                onEndReachedThreshold={0.5} // Когда пользователь приблизился к концу списка
                onEndReached={() => {
                    NewsStore.instance.nextPage();
                    return news;
                }} // Загрузить еще данные
                ListFooterComponent={() =>
                    !isLastPage ? (
                        <ActivityIndicator
                            size='large'
                            color='#0000ff'
                        /> // Анимация загрузки
                    ) : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    }
});

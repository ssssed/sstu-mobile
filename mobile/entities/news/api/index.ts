import { request } from '@/shared/lib/axios';
import { NewsParamsType, NewsType } from '../model/types';
import { Pagination } from '@/shared/config/types';

export class NewsService {
    private constructor() {}

    getNews(params?: NewsParamsType) {
        return request.get<Pagination<NewsType>>('/news', {
            params
        });
    }

    static instance = new NewsService();
}

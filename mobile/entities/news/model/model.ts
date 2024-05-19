import { Clearable } from '@/entities/public';
import { createStore, useStore } from 'quark-store';
import { NewsService } from '../api';

export class NewsStore implements Clearable {
    private constructor() {}

    private _loading = createStore<boolean>(false);
    private _news = createStore<NewsStore[]>([]);
    private _currentPage = createStore<number>(1);
    private _totalPages = createStore<number>(100);
    private _totalElements = createStore<number>(1);

    private _variables: Clearable[] = [
        this._news,
        this._loading,
        this._currentPage,
        this._totalPages,
        this._totalElements
    ];

    get news() {
        return useStore(this._news);
    }

    get currentPage() {
        return useStore(this._currentPage);
    }

    get loading() {
        return useStore(this._loading);
    }

    private get totalPages() {
        return useStore(this._totalPages);
    }

    set news(value) {
        this._news.set([...value]);
    }

    set currentPage(value) {
        this._currentPage.set(value);
    }

    set loading(value) {
        this._loading.set(value);
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }

    async fetch() {
        console.log(
            this._currentPage.get() >= this._totalPages.get(),
            this._currentPage.get(),
            '/',
            this._totalPages.get()
        );
        if (this._currentPage.get() >= this._totalPages.get()) {
            return;
        }

        try {
            this._loading.set(true);
            const {
                data: { data, meta }
            } = await NewsService.instance.getNews({
                page: this._currentPage.get(),
                limit: 7
            });

            this._news.set([...this._news.get(), ...data]);
            this._totalPages.set(meta.totalPages);
            this._totalElements.set(meta.totalElements);
        } catch (e) {
            console.log(e);
        } finally {
            this._loading.set(false);
        }
    }

    nextPage() {
        if (this._currentPage.get() + 1 <= this._totalPages.get()) {
            this._currentPage.set(this._currentPage.get() + 1);
        } else {
            this._currentPage.set(this._totalPages.get());
        }
    }

    prevPage() {
        if (this._currentPage.get() - 1 >= 1) {
            this._currentPage.set(this._currentPage.get() - 1);
        } else {
            this._currentPage.clear();
        }
    }

    clear(): void {
        this._variables.forEach(store => store.clear());
    }

    static instance = new NewsStore();
}

import { Clearable } from '@/entities/public';
import { createStore, useStore } from 'quark-store';
import { request } from '@/shared/lib/axios';
import { AuthStatus, UserParamsType, UserResponseType, UserSignInParamsType, UserType } from '@/entities/auth/types';
import { HttpStatus } from '@/shared/config/status';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

enum AsyncStorageKey {
    USER = 'STORAGE_USER_KEY',
    TOKEN = 'STORAGE_TOKEN'
}

export class AuthStore implements Clearable {
    private _loading = createStore<boolean>(false);
    private _status = createStore<AuthStatus>('unauthenticated');
    private _user = createStore<UserType | null>(null);
    private _token = createStore<string | null>(null);

    private _variables: Clearable[] = [this._status, this._loading, this._token, this._user];

    private constructor() {}

    get status() {
        return useStore(this._status);
    }

    isAuthenticated(): boolean {
        return this.status === 'authenticated';
    }

    get user() {
        return useStore(this._user);
    }

    async checkAuthenticatedInAsyncStorage(): Promise<void> {
        const userString = await AsyncStorage.getItem(AsyncStorageKey.USER);
        const token = await AsyncStorage.getItem(AsyncStorageKey.TOKEN);

        console.log('USER DATA IN ASYNC STORAGE ::', userString, token);

        if (userString && token) {
            this._user.set(JSON.parse(userString));
            this._token.set(token);
            this._status.set('authenticated');
        }
    }

    async authenticate(params: UserSignInParamsType): Promise<void> {
        try {
            this._loading.set(true);

            const { data, status } = await request.post<UserResponseType>('/auth/signin', params);

            console.log('data ::', data);

            if (status === HttpStatus.OK) {
                this._status.set('authenticated');
                this._user.set(data.user);
                this._token.set(data.token);
                await AsyncStorage.setItem(AsyncStorageKey.USER, JSON.stringify(data.user));
                await AsyncStorage.setItem(AsyncStorageKey.TOKEN, JSON.stringify(data.token));
            }
        } catch (e) {
            console.error(e);
            this._status.set('unauthenticated');
        } finally {
            this._loading.set(false);
        }
    }

    async register(params: UserParamsType): Promise<void> {
        try {
            this._loading.set(true);
            const { data, status } = await request.post<UserResponseType>('/auth/signup', params);

            if (status === HttpStatus.CREATED) {
                this._status.set('authenticated');
                this._user.set(data.user);
                this._token.set(data.token);
            }
        } catch (e) {
            console.error(e);
            this._status.set('unauthenticated');
        } finally {
            this._loading.set(false);
        }
    }

    async logout() {
        await Promise.all([
            AsyncStorage.removeItem(AsyncStorageKey.USER),
            AsyncStorage.removeItem(AsyncStorageKey.TOKEN)
        ]);
        router.replace('/auth');
        this._status.set('unauthenticated');
        this.clear();
    }

    clear(): void {
        this._variables.forEach(store => store.clear());
    }

    static instance = new AuthStore();
}

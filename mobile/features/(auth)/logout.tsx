import { Button } from '@/shared/ui/button';
import React from 'react';
import { AuthStore } from '@/entities/auth';
import { router } from 'expo-router';

export const Logout = () => {
    return (
        <Button
            onPress={() => {
                AuthStore.instance.logout();
                router.push('/auth');
            }}
        >
            Выйти
        </Button>
    );
};

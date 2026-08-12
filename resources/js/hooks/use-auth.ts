import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

export function useAuth() {
    return usePage<PageProps>().props.auth;
}
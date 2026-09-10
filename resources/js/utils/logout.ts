import { router } from "@inertiajs/react";
export function handleLogout() {
    router.post('/logout');
}
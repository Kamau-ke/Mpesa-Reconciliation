import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div
            className="relative flex min-h-svh items-center justify-center overflow-hidden p-5 sm:p-8"
            style={{ background: '#101010', color: '#F5F5F5' }}
        >
            <div className="absolute -left-16 top-16 h-36 w-36 rounded-full border-[3px]" style={{ borderColor: '#353538', background: '#1D1D1F' }} aria-hidden="true" />
            <div className="absolute -right-10 bottom-12 h-28 w-28 rounded-full border-[3px]" style={{ borderColor: '#353538', background: '#1D1D1F' }} aria-hidden="true" />

            <div
                className="relative w-full max-w-md rounded-[2rem] border p-6 shadow-2xl sm:p-8"
                style={{ background: '#1D1D1F', borderColor: '#353538' }}
            >
                <div className="flex flex-col gap-7">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Link
                            href={home()}
                            className="flex items-center gap-2 transition-transform hover:-rotate-2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-extrabold" style={{ background: '#43B47E', color: '#101010', fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}>
                                K
                            </div>
                            <span className="text-xl font-extrabold" style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}>Kadogo</span>
                        </Link>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-extrabold leading-none" style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}>{title}</h1>
                            <p className="text-sm" style={{ color: '#A7A7AB', fontFamily: '"IBM Plex Mono", ui-monospace, monospace' }}>
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

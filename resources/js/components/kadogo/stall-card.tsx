import type { ReactNode } from 'react';

const CHAR = '#2B2B2B';

type Props = {
    icon: ReactNode;
    title: string;
    body: string;
    bg: string;
    color?: string;
    rotate: number;
    delay?: number;
};

export default function StallCard({
    icon,
    title,
    body,
    bg,
    color = CHAR,
    rotate,
    delay = 0,
}: Props) {
    return (
        <div
            className="rounded-2xl p-6 transition-transform hover:!rotate-0 hover:-translate-y-1 motion-safe:[animation:riseIn_0.7s_cubic-bezier(0.34,1.56,0.64,1)_both]"
            style={{
                background: bg,
                color,
                transform: `rotate(${rotate}deg)`,
                boxShadow: `4px 4px 0 ${CHAR}`,
                animationDelay: `${delay}s`,
                fontFamily: '"Nunito", ui-sans-serif, sans-serif',
            }}
        >
            <div className="mb-3">{icon}</div>
            <h3
                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
                className="font-bold text-xl mb-2"
            >
                {title}
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">{body}</p>
        </div>
    );
}
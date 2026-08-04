const CHAR = '#2B2B2B';

type Props = {
    className?: string;
    color?: string;
};

export default function CoinDoodle({ className = '', color = '#F2B84B' }: Props) {
    return (
        <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
            <circle cx="28" cy="28" r="24" fill={color} stroke={CHAR} strokeWidth="3" />
            <text
                x="28"
                y="34"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={CHAR}
                style={{ fontFamily: '"Baloo 2", ui-rounded, sans-serif' }}
            >
                KES
            </text>
        </svg>
    );
}
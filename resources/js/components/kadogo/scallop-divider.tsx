type Props = {
    fill?: string;
};

export default function ScallopDivider({ fill = '#2B2B2B' }: Props) {
    return (
        <svg viewBox="0 0 1200 40" className="w-full block" preserveAspectRatio="none" aria-hidden="true">
            <path
                d="M0,20 Q30,0 60,20 T120,20 T180,20 T240,20 T300,20 T360,20 T420,20 T480,20 T540,20 T600,20 T660,20 T720,20 T780,20 T840,20 T900,20 T960,20 T1020,20 T1080,20 T1140,20 T1200,20 V40 H0 Z"
                fill={fill}
            />
        </svg>
    );
}
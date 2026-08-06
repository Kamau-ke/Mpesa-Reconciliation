import { useState } from 'react';

const CHAR = '#2B2B2B';
const CREAM = '#FFF4DA';
const AVOCADO = '#4E7D67';
const TOMATO = '#E85D5D';
const MUTED = '#8A8578';
const RULE = '#E6DAB8';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const DISPLAY = '"Baloo 2", ui-rounded, sans-serif';

type StaffMember = {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'deactivated';
    addedOn: string;
};

const DUMMY_STAFF: StaffMember[] = [
    {
        id: 1,
        name: 'Ian Kamau',
        email: 'ian@example.com',
        status: 'active',
        addedOn: '02 Aug 2026',
    },
    {
        id: 2,
        name: 'Grace Wanjiru',
        email: 'grace@example.com',
        status: 'active',
        addedOn: '30 Jul 2026',
    },
    {
        id: 3,
        name: 'Daniel Otieno',
        email: 'daniel@example.com',
        status: 'deactivated',
        addedOn: '18 Jul 2026',
    },
];

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function initials(name: string): string {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts[parts.length - 1]?.[0] ?? '')).toUpperCase();
}

function AddStaffForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function submit(e: React.FormEvent) {
        e.preventDefault();
        alert(`Dummy add: ${name} (${email})`);
        setName('');
        setEmail('');
    }

    return (
        <div
            className="rounded-2xl p-5 border"
            style={{ background: CREAM, borderColor: CHAR, boxShadow: '3px 3px 0 #2B2B2B' }}
        >
            <h3 style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold text-lg mb-4">
                Add a staff member
            </h3>

            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                    <label htmlFor="staff-name" className="sr-only">
                        Name
                    </label>
                    <input
                        id="staff-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                        style={{
                            fontFamily: MONO,
                            borderColor: RULE,
                            background: '#FFFBF2',
                            color: CHAR,
                        }}
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="staff-email" className="sr-only">
                        Email
                    </label>
                    <input
                        id="staff-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                        style={{
                            fontFamily: MONO,
                            borderColor: RULE,
                            background: '#FFFBF2',
                            color: CHAR,
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shrink-0 transition-opacity hover:opacity-90"
                    style={{ background: AVOCADO, color: CREAM, fontFamily: DISPLAY }}
                >
                    <PlusIcon />
                    Add staff
                </button>
            </form>
        </div>
    );
}

function StaffRow({ member }: { member: StaffMember }) {
    const isActive = member.status === 'active';

    function deactivate() {
        alert(`Dummy remove: ${member.name}`);
    }

    return (
        <div
            className="flex items-center gap-4 px-4 py-3.5 border-b last:border-b-0"
            style={{ borderColor: RULE, background: isActive ? CREAM : '#F9F9F7' }}
        >
            <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
                style={{
                    background: isActive ? AVOCADO : '#DDD',
                    color: isActive ? CREAM : MUTED,
                    fontFamily: MONO,
                }}
            >
                {initials(member.name)}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: CHAR }}>
                    {member.name}
                </p>
                <p className="text-[12px] truncate" style={{ fontFamily: MONO, color: MUTED }}>
                    {member.email}
                </p>
            </div>

            <span
                className="hidden sm:inline text-[12px] shrink-0"
                style={{ fontFamily: MONO, color: MUTED }}
            >
                Since {member.addedOn}
            </span>

            <div className="flex items-center gap-2 shrink-0">
                <span
                    className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                        fontFamily: MONO,
                        background: isActive ? '#D4EDDA' : '#EEE',
                        color: isActive ? AVOCADO : MUTED,
                    }}
                >
                    {member.status}
                </span>

                {isActive && (
                    <button
                        onClick={deactivate}
                        className="flex items-center gap-1 text-[12px] font-medium px-2 py-1 rounded-lg border transition-opacity hover:opacity-70"
                        style={{ color: TOMATO, borderColor: TOMATO, fontFamily: MONO }}
                        title="Revoke access immediately"
                    >
                        <XIcon />
                        <span className="hidden md:inline">Remove</span>
                    </button>
                )}
            </div>
        </div>
    );
}

export default function StaffPanel() {
    const staff = DUMMY_STAFF;

    const active = staff.filter((s) => s.status === 'active');
    const inactive = staff.filter((s) => s.status === 'deactivated');

    return (
        <div className="flex flex-col gap-6">
            <AddStaffForm />

            <div
                className="rounded-2xl overflow-hidden border"
                style={{ borderColor: CHAR, boxShadow: '3px 3px 0 #2B2B2B' }}
            >
                <div
                    className="px-4 py-3 border-b flex items-center justify-between"
                    style={{ background: '#F0EAD6', borderColor: RULE }}
                >
                    <h3 style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold">
                        On till
                    </h3>

                    <span style={{ fontFamily: MONO, color: MUTED }} className="text-[12px]">
                        {active.length} active · {inactive.length} deactivated
                    </span>
                </div>

                {staff.length === 0 ? (
                    <div className="px-4 py-10 text-center" style={{ background: CREAM }}>
                        <p style={{ fontFamily: DISPLAY, color: CHAR }} className="font-bold">
                            No staff yet.
                        </p>
                        <p style={{ fontFamily: MONO, color: MUTED }} className="text-[13px] mt-1">
                            Add a staff member above to get started.
                        </p>
                    </div>
                ) : (
                    staff.map((m) => <StaffRow key={m.id} member={m} />)
                )}
            </div>

            <p style={{ fontFamily: MONO, color: MUTED }} className="text-[12px] leading-relaxed">
                Removing a staff member revokes their dashboard access immediately by invalidating
                their active sessions. Past transactions recorded under their account are kept for
                your records.
            </p>
        </div>
    );
}
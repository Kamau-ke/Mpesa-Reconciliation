import { Head } from '@inertiajs/react';
import {
    CheckCircle2,
    Clock,
    Receipt,
    Send,
    ShieldCheck,
    Smartphone,
    TrendingUp,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { StaffBottomNav } from '@/components/kadogo/staff-bottom-nav';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { dashboard } from '@/routes';

/**
 * Staff Dashboard — Kadogo
 *
 * View-only summary for shop staff, plus the ability to trigger an STK
 * push ("Prompt client") so a customer can complete a Lipa na M-Pesa
 * payment on their own phone. Per project rules, staff never see
 * management controls and never compute totals client-side — all figures
 * below are placeholder "server response" data shaped exactly like what
 * the real StaffDashboardController would return, so wiring this up later
 * is a drop-in prop swap.
 *
 * Money is treated as whole KES shillings (integers) throughout — never
 * floats — matching the project's monetary-handling rule.
 */

type StaffTransaction = {
    id: number;
    mpesaReceipt: string;
    amount: number;
    payerPhoneMasked: string;
    time: string;
};

type StaffDashboardProps = {
    staffName: string;
    shopName: string;
    tillNumber: string;
    shiftStatus: 'active' | 'ended';
    clockedInAt: string;
    today: {
        totalAmount: number;
        transactionCount: number;
    };
    thisWeek: {
        totalAmount: number;
        transactionCount: number;
    };
    recentTransactions: StaffTransaction[];
};

const DUMMY_DATA: StaffDashboardProps = {
    staffName: 'Faith',
    shopName: 'Mama Faith Duka',
    tillNumber: '4021990',
    shiftStatus: 'active',
    clockedInAt: '8:02 AM',
    today: {
        totalAmount: 18450,
        transactionCount: 27,
    },
    thisWeek: {
        totalAmount: 96200,
        transactionCount: 142,
    },
    recentTransactions: [
        { id: 1, mpesaReceipt: 'SGH4K9L2QX', amount: 1200, payerPhoneMasked: '•••• 214', time: '2:41 PM' },
        { id: 2, mpesaReceipt: 'SGH4K9M7RT', amount: 350, payerPhoneMasked: '•••• 872', time: '2:22 PM' },
        { id: 3, mpesaReceipt: 'SGH4K9J1WY', amount: 2500, payerPhoneMasked: '•••• 065', time: '1:58 PM' },
        { id: 4, mpesaReceipt: 'SGH4K9H4NC', amount: 600, payerPhoneMasked: '•••• 431', time: '1:15 PM' },
        { id: 5, mpesaReceipt: 'SGH4K9F0LD', amount: 150, payerPhoneMasked: '•••• 903', time: '12:47 PM' },
        { id: 6, mpesaReceipt: 'SGH4K9D6BQ', amount: 4000, payerPhoneMasked: '•••• 558', time: '11:59 AM' },
    ],
};

function formatKES(amount: number): string {
    return `KSh ${amount.toLocaleString('en-KE')}`;
}

const PHONE_PATTERN = /^(?:254|0)7\d{8}$/;

type PromptStatus = 'idle' | 'sending' | 'sent' | 'error';

function PromptClientDialog({
    open,
    onOpenChange,
    tillNumber,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tillNumber: string;
}) {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState<PromptStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    const resetAndClose = () => {
        onOpenChange(false);

        // Give the close animation a moment before wiping the form.
        setTimeout(() => {
            setPhone('');
            setAmount('');
            setNote('');
            setStatus('idle');
            setError(null);
        }, 200);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);

        const normalizedPhone = phone.replace(/\s+/g, '');
        const parsedAmount = Number(amount);

        if (!PHONE_PATTERN.test(normalizedPhone)) {
            setError('Enter a valid Safaricom number, e.g. 0712 345 678.');

            return;
        }

        if (!Number.isInteger(parsedAmount) || parsedAmount <= 0) {
            setError('Enter a whole KES amount greater than 0.');

            return;
        }

        setStatus('sending');

        try {
            const response = await fetch('/stk-push', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') ?? '',
                },
                body: JSON.stringify({ phone: normalizedPhone, amount: parsedAmount, note }),
            });

            if (!response.ok) {
                const body = await response.json().catch(() => null);
                setError(body?.message ?? 'Could not send the payment prompt. Please try again.');
                setStatus('idle');

                return;
            }

            const { id } = (await response.json()) as { id: number };

            // Poll for the customer's response rather than trusting a
            // client-side timer — the actual result only exists once
            // Safaricom's callback has landed and been processed.
            const finalStatus = await pollForResult(id);

            if (finalStatus === 'success') {
                setStatus('sent');
                setTimeout(resetAndClose, 1800);
            } else {
                setError(
                    finalStatus === 'failed'
                        ? 'The customer declined or the prompt timed out.'
                        : 'Still waiting on the customer — you can close this and check Recent transactions shortly.',
                );
                setStatus('idle');
            }
        } catch {
            setError('Network error — please try again.');
            setStatus('idle');
        }
    };

    const pollForResult = async (id: number): Promise<'success' | 'failed' | 'pending'> => {
        const maxAttempts = 15;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const res = await fetch(`/stk-push/${id}`, {
                headers: { Accept: 'application/json' },
            });

            if (!res.ok) {
                continue;
            }

            const body = (await res.json()) as { status: 'pending' | 'success' | 'failed' };

            if (body.status !== 'pending') {
                return body.status;
            }
        }

        return 'pending';
    };

    return (
        <Dialog open={open} onOpenChange={(next) => (!next ? resetAndClose() : onOpenChange(next))}>
            <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-md">
                {status === 'sent' ? (
                    <div className="flex flex-col items-center gap-3 py-6 text-center">
                        <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10">
                            <CheckCircle2 className="size-7 text-emerald-400" />
                        </div>
                        <DialogTitle className="text-white">Prompt sent</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            {phone} should see a Lipa na M-Pesa prompt for{' '}
                            <span className="font-mono text-zinc-200">
                                {formatKES(Number(amount) || 0)}
                            </span>{' '}
                            on their phone now.
                        </DialogDescription>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <DialogHeader>
                            <DialogTitle className="text-white">Prompt client to pay</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Sends an STK push to the customer's phone for till{' '}
                                <span className="font-mono text-zinc-300">{tillNumber}</span>. They
                                confirm the payment on their own device.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="prompt-phone">Customer phone number</Label>
                                <Input
                                    id="prompt-phone"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    placeholder="0712 345 678"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoFocus
                                    className="border-zinc-800 bg-zinc-900"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="prompt-amount">Amount (KES)</Label>
                                <Input
                                    id="prompt-amount"
                                    inputMode="numeric"
                                    placeholder="1500"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                                    className="border-zinc-800 bg-zinc-900 font-mono"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="prompt-note">
                                    Note <span className="text-zinc-500">(optional)</span>
                                </Label>
                                <Input
                                    id="prompt-note"
                                    placeholder="e.g. 2kg rice + cooking oil"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="border-zinc-800 bg-zinc-900"
                                />
                            </div>

                            {error && <p className="text-sm text-red-400">{error}</p>}
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={resetAndClose}
                                disabled={status === 'sending'}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={status === 'sending'}
                                className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400"
                            >
                                {status === 'sending' ? <Spinner className="text-zinc-950" /> : <Send />}
                                {status === 'sending' ? 'Sending prompt…' : 'Send prompt'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default function StaffDashboard(props: Partial<StaffDashboardProps> = {}) {
    const data: StaffDashboardProps = { ...DUMMY_DATA, ...props };
    const avgTicket = Math.round(data.thisWeek.totalAmount / Math.max(data.thisWeek.transactionCount, 1));
    const [promptOpen, setPromptOpen] = useState(false);

    return (
        <>
            <Head title="Today's Till" />

            <div className="min-h-svh bg-[#0a0a0a] font-[Nunito,sans-serif] text-zinc-100">
                <div className="mx-auto flex max-w-md flex-col gap-4 px-4 pt-6 pb-28 sm:max-w-2xl lg:max-w-6xl lg:px-8">
                    {/* Header */}
                    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-sm text-zinc-500">Hi, {data.staffName}</p>
                            <h1 className="font-[Baloo_2,sans-serif] text-2xl font-bold tracking-tight text-white lg:text-3xl">
                                {data.shopName}
                            </h1>
                            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                                <span>
                                    Till <span className="font-mono text-zinc-400">{data.tillNumber}</span>
                                </span>
                                <span className="text-zinc-700">·</span>
                                <span className="inline-flex items-center gap-1.5">
                                    <span className="relative flex size-1.5">
                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                                    </span>
                                    <span className="text-emerald-400">On shift</span>
                                </span>
                            </div>
                        </div>

                        <Button
                            onClick={() => setPromptOpen(true)}
                            className="w-full gap-2 bg-emerald-500 text-zinc-950 hover:bg-emerald-400 sm:w-auto"
                            size="lg"
                        >
                            <Smartphone className="size-4" />
                            Prompt client
                        </Button>
                    </header>

                    {/* Shift info strip */}
                    <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-400">
                        <Clock className="size-4 text-zinc-500" />
                        Clocked in at <span className="font-medium text-zinc-200">{data.clockedInAt}</span>
                    </div>

                    {/* Hero total + secondary stats */}
                    <div className="grid gap-4 lg:grid-cols-3">
                        {/* Today's total — hero card */}
                        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/50 to-zinc-900/60 p-6 lg:col-span-2 lg:flex lg:flex-col lg:justify-center">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-emerald-300/80">Today's till</p>
                                <Wallet className="size-5 text-emerald-400/70" />
                            </div>
                            <p className="mt-2 font-mono text-4xl font-bold tracking-tight text-white tabular-nums lg:text-5xl">
                                {formatKES(data.today.totalAmount)}
                            </p>
                            <p className="mt-1 text-sm text-zinc-400">
                                {data.today.transactionCount} transactions so far
                            </p>
                        </div>

                        {/* Secondary stats */}
                        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                    <TrendingUp className="size-3.5" />
                                    This week
                                </div>
                                <p className="mt-1.5 font-mono text-xl font-semibold text-white tabular-nums">
                                    {formatKES(data.thisWeek.totalAmount)}
                                </p>
                                <p className="text-xs text-zinc-500">{data.thisWeek.transactionCount} sales</p>
                            </div>
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                    <Receipt className="size-3.5" />
                                    Avg. ticket
                                </div>
                                <p className="mt-1.5 font-mono text-xl font-semibold text-white tabular-nums">
                                    {formatKES(avgTicket)}
                                </p>
                                <p className="text-xs text-zinc-500">last 7 days</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent transactions */}
                    <section className="mt-2">
                        <div className="mb-2 flex items-center justify-between px-1">
                            <h2 className="text-sm font-semibold text-zinc-300">Recent transactions</h2>
                            <span className="text-xs text-zinc-500">{data.recentTransactions.length} shown</span>
                        </div>

                        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60">
                            {data.recentTransactions.map((tx, index) => (
                                <div
                                    key={tx.id}
                                    className={`flex items-center justify-between gap-3 px-4 py-3.5 lg:px-6 ${
                                        index !== data.recentTransactions.length - 1
                                            ? 'border-b border-zinc-800/70'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                                            <Wallet className="size-4 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200">
                                                {tx.payerPhoneMasked}
                                            </p>
                                            <p className="font-mono text-xs text-zinc-500">
                                                {tx.mpesaReceipt} · {tx.time}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-mono text-sm font-semibold text-emerald-400 tabular-nums">
                                        +{formatKES(tx.amount)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* View-only notice */}
                    <div className="mt-2 flex items-start gap-2.5 rounded-2xl border border-zinc-800/70 bg-zinc-900/30 px-4 py-3 text-xs text-zinc-500">
                        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-zinc-600" />
                        <p>
                            You have view-only access to today's transactions. Staff management and shop
                            settings are handled by your owner. Prompting a client only sends a payment
                            request — it never edits totals directly.
                        </p>
                    </div>
                </div>
            </div>

            <PromptClientDialog
                open={promptOpen}
                onOpenChange={setPromptOpen}
                tillNumber={data.tillNumber}
            />

            <StaffBottomNav />
        </>
    );
}

StaffDashboard.layout = {
    breadcrumbs: [
        {
            title: "Today's Till",
            href: dashboard(),
        },
    ],
};
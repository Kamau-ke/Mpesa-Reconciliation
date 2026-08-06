export type Shop = {
    id: number;
    name: string;
    tillNumber: string;
    location: string | null;
    currency: string;
};

export type Transaction = {
    id: string;       // mpesa_receipt_number — unique, used as React key
    time: string;     // 'HH:mm'
    payer: string;    // phone number / payer name
    amount: number;   // integer KES — never float
    status: 'paid' | 'flagged';
};

export type StaffMember = {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'deactivated';
    addedOn: string;
};

export type DashboardProps = {
    shop: Shop | null;
    todayTotal: number;
    yesterdayTotal: number;
    weekTotal: number;
    monthTotal: number;
    txnCount: number;
    avgSale: number;
    flagged: number;
    transactions: Transaction[];
    staff: StaffMember[];
    isOwner: boolean;
};

export type TabKey = 'overview' | 'transactions' | 'staff' | 'shop';
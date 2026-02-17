import { NextResponse } from 'next/server';
import { runFullCheck } from '@/lib/scheduler';

export async function POST() {
    try {
        // Run the check
        const updatedRecords = await runFullCheck();

        return NextResponse.json({
            message: 'Check completed successfully',
            data: updatedRecords
        });
    } catch (error) {
        console.error('Manual check failed:', error);
        return NextResponse.json({ error: 'Failed to run check' }, { status: 500 });
    }
}

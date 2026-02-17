import { NextResponse } from 'next/server';
import { getUrlsFromCsv } from '@/lib/csvService';
import { initScheduler } from '@/lib/scheduler';

// Initialize scheduler on server startup (or first API call in serverless/dev env)
// Note: In a true persistent server (like VPS), this runs once. 
// In Next.js dev or serverless, this might re-run, but our initScheduler handles idempotency.
initScheduler();

export async function GET() {
    try {
        const urls = await getUrlsFromCsv();
        return NextResponse.json(urls);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch URLs' }, { status: 500 });
    }
}

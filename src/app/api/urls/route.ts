import { NextResponse } from 'next/server';
import { getUrlsFromCsv } from '@/lib/csvService';
import { initScheduler } from '@/lib/scheduler';

// Initialize scheduler on server startup (or first API call in serverless/dev env)
initScheduler();

export async function GET() {
    try {
        const urls = await getUrlsFromCsv();
        return NextResponse.json(urls);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch URLs' }, { status: 500 });
    }
}

"use client";

import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { DashboardHeader } from '@/components/organisms/DashboardHeader';
import { RunCheckPanel } from '@/components/organisms/RunCheckPanel';
import { UrlTable } from '@/components/organisms/UrlTable';
import { useUrlStore } from '@/store/useUrlStore';

export default function DashboardPage() {
  const { urls, isLoading, fetchUrls } = useUrlStore();

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="flex flex-col gap-6">
        <div className="card bg-base-100  ">
          <div className="card-body">
            <h2 className="card-title mb-4">Control Panel</h2>
            <RunCheckPanel />
          </div>
        </div>

        <div className="card bg-base-100  ">
          <div className="card-body">
            <h2 className="card-title mb-4">
              Monitor Results
              <div className="badge badge-secondary ml-2">{urls.length} URLs</div>
            </h2>
            <UrlTable urls={urls} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

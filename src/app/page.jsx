import React from 'react';
import OverviewMainPage from '@/views/dashboard';
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "OpenFXRates Dashboard - Foreign Exchange Rates Management",
  description:
    "Manage and monitor foreign exchange rates with OpenFXRates comprehensive dashboard. Access real-time currency data and analytics.",
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <MasterLayout>
        {/* Overview */}
        <OverviewMainPage />
      </MasterLayout>
    </>
  );
}
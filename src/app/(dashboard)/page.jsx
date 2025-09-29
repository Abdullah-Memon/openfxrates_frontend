"use client";

import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import DashboardMainPage from "@/views/dashboard";

export const metadata = {
  title: "OpenFXRates - Foreign Exchange Rates & Currency API",
  description:
    "Professional foreign exchange rates API platform providing real-time currency data and conversion services for developers and businesses worldwide.",
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <>
      <MasterLayout>
        {/* DashBoardLayerFour */}
        <DashboardMainPage />
      </MasterLayout>
    </>
  );
};

export default Page;


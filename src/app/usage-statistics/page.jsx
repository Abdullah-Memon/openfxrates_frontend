import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import UsageLimitsMainPage from "@/views/usage-statistics";

export const metadata = {
  title: "Usage Statistics - OpenFXRates API Monitoring",
  description:
    "Monitor your OpenFXRates API usage statistics, track requests, analyze consumption patterns, and manage your exchange rate API quotas.",
};

const Page = () => {
  return (
    <>
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Usage & Limits' />
        {/* DashBoardLayerFour */}
        <UsageLimitsMainPage    />
      </MasterLayout>
    </>
  );
};

export default Page;

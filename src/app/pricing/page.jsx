import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import PlansPricingMainPage from "@/views/pricing";

export const metadata = {
  title: "OpenFXRates Pricing Plans - Choose Your Exchange Rate API Plan",
  description:
    "Explore OpenFXRates flexible pricing plans for foreign exchange rate APIs. From free trials to enterprise solutions for currency data access.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Plans & Pricing' />

        {/* PlansPricingLayer */}
        <PlansPricingMainPage />
      </MasterLayout>
    </>
  );
};

export default Page;

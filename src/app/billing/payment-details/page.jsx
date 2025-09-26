import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import AppIdsMainPage from "@/views/app-ids";
import PaymentDetailsMainPage from "@/views/billing/payment-details";

export const metadata = {
  title: "OpenFXRates - Foreign Exchange Rates & Currency API",
  description:
    "Professional foreign exchange rates API platform providing real-time currency data and conversion services for developers and businesses worldwide.",
};

const Page = () => {
  return (
    <>
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Payment Details' />
        {/* DashBoardLayerFour */}
        <PaymentDetailsMainPage />
      </MasterLayout>
    </>
  );
};

export default Page;


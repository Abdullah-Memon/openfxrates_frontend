import Breadcrumb from "@/components/Breadcrumb";
import DashBoardLayerFour from "@/components/DashBoardLayerFour";
import MasterLayout from "@/masterLayout/MasterLayout";
import AppIdsMainPage from "@/views/app-ids";
import InvoiceMainPage from "@/views/billing/history";

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
        <Breadcrumb title='Invoice' />
        {/* DashBoardLayerFour */}
        <InvoiceMainPage />

      </MasterLayout>
    </>
  );
};

export default Page;


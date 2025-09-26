import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import ApiKeysMainPage from "@/views/app-ids";

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
        <Breadcrumb title='API Keys' />
        <ApiKeysMainPage/>   
      </MasterLayout>
    </>
  );
};

export default Page;


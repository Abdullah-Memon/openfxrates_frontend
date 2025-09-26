import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import VerificationMainPage from "@/views/verification";

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
        <VerificationMainPage/>
      </MasterLayout>
    </>
  );
};

export default Page;


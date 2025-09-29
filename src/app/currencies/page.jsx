import Breadcrumb from "@/components/Breadcrumb";
import CurrenciesMainPage from "@/views/currencies";
import MasterLayout from "@/masterLayout/MasterLayout";

export const metadata = {
  title: "Currencies - OpenFXRates Supported Currency List",
  description:
    "Browse all currencies supported by OpenFXRates API. Access exchange rates for over 200+ global currencies including major and minor pairs.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Settings - Currencies' />

        {/* CurrenciesMainPage */}
        <CurrenciesMainPage />
      </MasterLayout>
    </>
  );
};

export default Page;

import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import AlertsNotificationsMainPage from "@/views/notification";

export const metadata = {
  title: "OpenFXRates - Foreign Exchange Rates & Currency API",
  description:
    "Professional foreign exchange rates API platform providing real-time currency data and conversion services for developers and businesses worldwide.",
};

const Page = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Alerts & Notifications' />

        {/* AlertsNotificationsLayer */}
        <AlertsNotificationsMainPage/> 
      </MasterLayout>
    </>
  );
};

export default Page;


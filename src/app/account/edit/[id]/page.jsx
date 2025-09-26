import Breadcrumb from "@/components/Breadcrumb";
import MasterLayout from "@/masterLayout/MasterLayout";
import EditAccountMainPage from "@/views/account/edit";

export const metadata = {
  title: "Edit Account - OpenFXRates Account Management",
  description:
    "Edit your OpenFXRates account settings, update profile information, and manage your foreign exchange API preferences.",
};

const Page = ({ params }) => {
  const { id } = params;
  
  return (
    <>
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title='Edit Account' />
        {/* EditAccountMainPage with user ID */}
        <EditAccountMainPage userId={id} />   
      </MasterLayout>
    </>
  );
};

export default Page;

import SignInMainPage from "@/views/sign-in";

export const metadata = {
  title: "Sign In - OpenFXRates Account Access",
  description:
    "Sign in to your OpenFXRates account to access foreign exchange rate APIs, manage subscriptions, and monitor usage statistics.",
};

const Page = () => {
  return (
    <>
      {/* SignInMainPage */}
      <SignInMainPage />
    </>
  );
};

export default Page;

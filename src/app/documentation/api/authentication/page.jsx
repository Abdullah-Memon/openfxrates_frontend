import DocumentationLayout from "@/masterLayout/DocumentationLayout";
import AuthenticationDoc from "@/views/documentation/api/authentication";

export const metadata = {
  title: "API Authentication - FX Rates API Documentation",
  description: "Learn how to authenticate your API requests using API keys and access tokens for FX Rates API.",
};

const Page = () => {
  return (
    <DocumentationLayout>
      <AuthenticationDoc />
    </DocumentationLayout>
  );
};

export default Page;

import DocumentationLayout from "@/masterLayout/DocumentationLayout";
import EndpointsDoc from "@/views/documentation/api/endpoints";

export const metadata = {
  title: "API Endpoints - FX Rates API Documentation",
  description: "Explore all available API endpoints for retrieving foreign exchange rates, historical data, and currency information.",
};

const Page = () => {
  return (
    <DocumentationLayout>
      <EndpointsDoc />
    </DocumentationLayout>
  );
};

export default Page;

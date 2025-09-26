import DocumentationLayout from "@/masterLayout/DocumentationLayout";
import ExamplesDoc from "@/views/documentation/examples";

export const metadata = {
  title: "Code Examples - FX Rates API Documentation",
  description: "Ready-to-use code snippets and examples for integrating FX Rates API in multiple programming languages.",
};

const Page = () => {
  return (
    <DocumentationLayout>
      <ExamplesDoc />
    </DocumentationLayout>
  );
};

export default Page;

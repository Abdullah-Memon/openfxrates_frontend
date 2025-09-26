import DocumentationLayout from "@/masterLayout/DocumentationLayout";
import DevelopersHub from "@/views/documentation";

export const metadata = {
  title: "FX Rates API - Developer Documentation Hub",
  description:
    "Comprehensive documentation for FX Rates API including guides, tutorials, SDK references, and code examples to help you integrate our foreign exchange rates API.",
};

const Page = () => {
  return (
    <DocumentationLayout>
      <DevelopersHub />
    </DocumentationLayout>
  );
};

export default Page;

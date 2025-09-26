"use client";
import Card from "@/components/cards/CardWrapper";
import FAQs from "@/components/faq/FAQs";
import React from "react";
import ColumnChart from "@/components/charts/ColumnChart";
import ActiveAppIdsTable from "@/views/app-ids/pages/table/active-ids/table";

const Overview = () => {
  // Sample data for Sales column chart
  const salesData = [
    {
      name: "Sales",
      data: [
        { x: "Jan", y: 85000 },
        { x: "Feb", y: 70000 },
        { x: "Mar", y: 40000 },
        { x: "Apr", y: 50000 },
        { x: "May", y: 60000 },
        { x: "Jun", y: 50000 },
        { x: "Jul", y: 40000 },
        { x: "Aug", y: 50000 },
        { x: "Sep", y: 40000 },
        { x: "Oct", y: 60000 },
        { x: "Nov", y: 30000 },
        { x: "Dec", y: 50000 },
      ],
    },
  ];

  const salesCategories = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div>
      <h4 className="mb-16">Dashboard</h4>

      <div className="col-lg-12 col-sm-12">
        <div className="p-16 bg-info-50 radius-8 border-start-width-3-px border-info-main border-top-0 border-end-0 border-bottom-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h6 className="text-primary-light text-md mb-8">
                Welcome to your account!
              </h6>

              <p className="mb-16">Please Complete your Subscription.</p>
            </div>
            <button
              type="button"
              className="btn btn-primary-600 radius-8 mb-16"
            >
              Click Here
            </button>
          </div>
        </div>
      </div>

      <div className="row g-16 mb-16">
        <div className="col-lg-9 col-sm-12">
          <Card
            title="API Overview"
            body={
              <ColumnChart
                id="salesColumnChart"
                series={salesData}
                categories={salesCategories}
                height={264}
                colors={["#487FFF"]}
                title=""
                yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tooltipFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
              />
            }
          />
        </div>
        <div className="col-lg-3 col-sm-12">
          <Card
            title="Statistics"
            body={
              <>
                <div className="d-flex">
                  <p className="col-8">Total Active APIs:</p>
                  <p className="col-4 text-primary text-align-right">10</p>
                </div>
                <hr />
                <div className="d-flex mt-12">
                  <p className="col-8">Total In Active APIs:</p>
                  <p className="col-4 text-primary text-align-right">20</p>
                </div>
                <hr />
                <div className="d-flex mt-12">
                  <p className="col-8">Package:</p>
                  <p className="col-4 text-primary text-align-right">FREE</p>
                </div>
                <hr />
                <div className="d-flex mt-12">
                  <p className="col-8">Limit:</p>
                  <p className="col-4 text-primary text-align-right">50</p>
                </div>

                <div>
                  <button
                    type="button"
                    className="btn btn-primary-600 radius-8 w-100 mt-16 mb-10"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </>
            }
          />
        </div>
      </div>

      <Card
        title="Active API Keys"
        body={
          <>
            <ActiveAppIdsTable />
          </>
        }
      />
      <FAQs title={"FAQs"} />
    </div>
  );
};

export default Overview;

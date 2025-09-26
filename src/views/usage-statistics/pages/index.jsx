import Card from "@/components/cards/CardWrapper";
import SimpleLineChart from "@/components/charts/SimpleLineChart";
import FAQs from "@/components/faq/FAQs";
import LinearProgressBar from "@/components/progressBar/LinearProgressBar";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const UsageLimits = () => {

  const usageData = {
    dailyUsage: [
      { date: "2023-08-01", requests: 150 },
      { date: "2023-08-02", requests: 200 },
      { date: "2023-08-03", requests: 180 },
      { date: "2023-08-04", requests: 220 },
      { date: "2023-08-05", requests: 170 },
      { date: "2023-08-06", requests: 190 },
      { date: "2023-08-07", requests: 210 },],
    monthToDateTotal: 1320,
    dailyAverage: 188,
    monthlyAllowance: 10000,
  };

  const simpleFAQ = [
    {
      question: "What counts as one API request?",
      answer: (
        <ul className="list-disc ps-16">
          <li>
            Each HTTP request to our latest.json, historical/*.json and /convert
            API endpoints counts as a single request towards your usage quota
            (regardless of the number of currencies or data points returned.
          </li>
          <li>
            Requests to our currencies.json and usage.json API endpoints are
            'free', and don't count towards your quota.
          </li>
          <li>
            Requests to our time-series.json API endpoint count as a single
            request for each day of data returned. (For example, a time-series
            request for two weeks of historical exchange rate information will
            count as 14 API requests.)
          </li>
        </ul>
      ),
    },
    {
      question: "What happens if I go over my allowance?",
      answer: (
        <>
          <p>
            If you exceed your API request allowance in a given period, we'll
            get in touch via email to discuss ways we can keep supporting you.
            You may choose to lower your usage or subscribe to a plan with a
            higher monthly request volume. Your app ID and any connected
            integrations will remain active (we won't restrict access without
            attempting to make contact several times first).
          </p>
          <p>
            If we don't hear back from you after reaching out several times (or
            if your usage volume stays over the quota for two months or more) we
            may then restrict your access. You can restore your access by
            contacting us.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-24">
      
      {/* Stats Cards Row */}
      <div className="row g-20 mb-16">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-20 text-center">
              <div className="p-12 bg-success-100 rounded-circle d-inline-flex align-items-center justify-content-center mb-12">
                <Icon icon="solar:chart-2-outline" className="text-success-600 text-lg" />
              </div>
              <h3 className="mb-8 text-success-600 fw-bold">{usageData.monthToDateTotal.toLocaleString()}</h3>
              <p className="mb-0 text-sm text-secondary-light">Total Requests This Month</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-20 text-center">
              <div className="p-12 bg-primary-100 rounded-circle d-inline-flex align-items-center justify-content-center mb-12">
                <Icon icon="solar:calendar-outline" className="text-primary-600 text-lg" />
              </div>
              <h3 className="mb-8 text-primary-600 fw-bold">{usageData.dailyAverage}</h3>
              <p className="mb-0 text-sm text-secondary-light">Daily Average Requests</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-20 text-center">
              <div className="p-12 bg-warning-100 rounded-circle d-inline-flex align-items-center justify-content-center mb-12">
                <Icon icon="solar:bolt-outline" className="text-warning-600 text-lg" />
              </div>
              <h3 className="mb-8 text-warning-600 fw-bold">{(usageData.monthlyAllowance - usageData.monthToDateTotal).toLocaleString()}</h3>
              <p className="mb-0 text-sm text-secondary-light">Remaining This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Progress Section */}
      <div className="card border-0 shadow-sm overflow-hidden mb-16">
        <div className="card-header bg-gradient-to-r from-indigo-600 to-purple-600 py-20 px-24">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-12">
              <Icon icon="solar:graph-outline" className=" text-xl" />
              <h5 className="mb-0 fw-semibold">Current Usage Overview</h5>
            </div>
            <span className="badge bg-white bg-opacity-20 px-12 py-6 rounded-8">
              {Math.round((usageData.monthToDateTotal / usageData.monthlyAllowance) * 100)}% Used
            </span>
          </div>
        </div>
        <div className="card-body p-24">
          <div className="row align-items-center gy-4">
            <div className="col-lg-8">
              <div className="mb-16">
                <div className="d-flex justify-content-between align-items-center mb-8">
                  <span className="text-sm fw-medium text-neutral-700">Monthly Progress</span>
                  <span className="text-sm text-secondary-light">
                    {usageData.monthToDateTotal.toLocaleString()} / {usageData.monthlyAllowance.toLocaleString()} requests
                  </span>
                </div>
                <LinearProgressBar
                  percentage={`${Math.round((usageData.monthToDateTotal / usageData.monthlyAllowance) * 100)}%`}
                  height="1.5rem"
                  percentagePosition="bottom,right"
                />
              </div>
              <p className="mb-0 text-secondary-light">
                <Icon icon="solar:info-circle-outline" className="text-info-600 me-8" />
                You started this billing cycle on <strong>August 1st, 2023</strong> with a daily average of <strong>{usageData.dailyAverage} requests</strong>.
              </p>
            </div>
            <div className="col-lg-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-20 rounded-12 text-center border border-green-200">
                <Icon icon="solar:shield-check-outline" className="text-green-600 text-2xl mb-8" />
                <p className="mb-4 text-green-700 fw-semibold">Healthy Usage</p>
                <p className="mb-0 text-sm text-green-600">Well within limits</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card border-0 shadow-sm mb-16">
        <div className="card-header bg-white py-20 px-24 border-bottom">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-12">
              <div className="p-8 bg-indigo-100 rounded-8">
                <Icon icon="solar:graph-up-outline" className="text-indigo-600" />
              </div>
              <div>
                <h5 className="mb-0 fw-semibold text-neutral-900">API Activity Trends</h5>
                <p className="mb-0 text-sm text-secondary-light">7-day usage pattern analysis</p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-8">
              <span className="badge bg-indigo-100 text-indigo-600 px-8 py-4 rounded-6">
                <Icon icon="solar:eye-outline" className="me-4" />
                Live Data
              </span>
            </div>
          </div>
        </div>
        <div className="card-body p-24">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-16 rounded-8 mb-20">
            <p className="mb-0 text-sm text-indigo-700">
              <Icon icon="solar:chart-outline" className="me-8" />
              Interactive chart showing your API request patterns over the last 7 days. 
              Hover over data points for detailed information or use the toolbar to zoom and explore trends.
            </p>
          </div>

          <SimpleLineChart 
            series={[
              {
                name: "API Requests",
                data: usageData.dailyUsage.map(item => item.requests)
              }
            ]}
            categories={usageData.dailyUsage.map(item => {
              const date = new Date(item.date);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            })}
            height={350}
            strokeColor="#6366F1"
            title=""
            showGrid={true}
            fillGradient={true}
            showToolbar={true}
          />
        </div>
      </div>

      {/* Enhanced FAQ Section */}
      <div className="card border-0 shadow-sm mb-16">
        <div className="card-header bg-gradient-to-r from-slate-50 to-gray-50 py-20 px-24 border-bottom">
          <div className="d-flex align-items-center gap-12">
            <div className="p-8 bg-slate-200 rounded-8">
              <Icon icon="solar:question-circle-outline" className="text-slate-600" />
            </div>
            <div>
              <h5 className="mb-0 fw-semibold text-neutral-900">Frequently Asked Questions</h5>
              <p className="mb-0 text-sm text-secondary-light">Common questions about API usage and billing</p>
            </div>
          </div>
        </div>
        <div className="card-body p-24">
          <FAQs data={simpleFAQ} title={""} />
        </div>
      </div>
    </div>
  );
};

export default UsageLimits;

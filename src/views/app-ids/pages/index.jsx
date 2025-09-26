import React from "react";
import ActiveAppIdsTable from "./table/active-ids/table";
import InactiveAppIdsTable from "./table/inactive-ids/table";
import Card from "@/components/cards/CardWrapper";
import { Icon } from "@iconify/react/dist/iconify.js";

const ApiKeys = () => {
  return (
    <div className="space-y-24">        
        <Card 
        title={<>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-12">
            <div className="w-4 h-20 bg-success-600 rounded-2"></div>
            <h6 className="mb-0 fw-semibold text-neutral-900">Active API Keys</h6>
            <span className="badge bg-success-100 text-success-600 fw-medium px-8 py-4 rounded-6">Live</span>
          </div>
          <button className="btn btn-primary-600 btn-sm d-flex align-items-center gap-6 px-12 py-6 rounded-6">
            <Icon icon="solar:add-circle-outline" className="text-sm" />
            Generate New Key
          </button>
        </div>
        </>}
        body={<>
          <ActiveAppIdsTable />
        </>}/>

      {/* Inactive API Keys Section */}
      <div>
        <div className="d-flex align-items-center justify-content-between mb-20">
          <div className="d-flex align-items-center gap-12">
            <div className="w-4 h-20 bg-warning-600 rounded-2"></div>
            <h6 className="mb-0 fw-semibold text-neutral-900">Inactive API Keys</h6>
            <span className="badge bg-warning-100 text-warning-600 fw-medium px-8 py-4 rounded-6">Dormant</span>
          </div>
        </div>
        
        <div className="bg-warning-50 p-16 rounded-8 border border-warning-200 mb-16">
          <div className="d-flex align-items-start gap-12">
            <Icon icon="solar:info-circle-outline" className="text-warning-600 text-lg mt-2" />
            <div>
              <p className="mb-0 text-warning-700 fw-medium text-sm">
                <strong>Notice:</strong> Keys inactive for 90+ days are automatically disabled for security. 
                You can reactivate them anytime or create new ones.
              </p>
            </div>
          </div>
        </div>

        <Card body={<>
          <InactiveAppIdsTable />
        </>}/>
      </div>

      {/* Quick Actions Section */}
      <div className="row g-20">
        <div className="col-md-4">
          <div className="p-20 bg-neutral-50 rounded-8 border border-neutral-200 text-center">
            <Icon icon="solar:shield-check-outline" className="text-success-600 text-2xl mb-12" />
            <h6 className="mb-8 text-neutral-900">Secure Access</h6>
            <p className="mb-0 text-sm text-secondary-light">
              All API keys use industry-standard encryption
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-20 bg-neutral-50 rounded-8 border border-neutral-200 text-center">
            <Icon icon="solar:chart-outline" className="text-primary-600 text-2xl mb-12" />
            <h6 className="mb-8 text-neutral-900">Usage Tracking</h6>
            <p className="mb-0 text-sm text-secondary-light">
              Monitor your API usage in real-time
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-20 bg-neutral-50 rounded-8 border border-neutral-200 text-center">
            <Icon icon="solar:refresh-outline" className="text-info-600 text-2xl mb-12" />
            <h6 className="mb-8 text-neutral-900">Easy Management</h6>
            <p className="mb-0 text-sm text-secondary-light">
              Create, rotate, and disable keys instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;

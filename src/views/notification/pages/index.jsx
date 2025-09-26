"use client"

import Card from "@/components/cards/CardWrapper";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const AlertsNotifications = () => {
  const [notifications, setNotifications] = useState({
    productUpdates: true,
    serviceUpdates: true,
    usage80: true,
    usage90: true,
    statusPage: false,
    marketing: false,
    security: true
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-24">
      
      <form className="needs-validation" noValidate="">
        {/* Email Notifications Section */}
        <div className="card border-0 shadow-sm mb-16">
          <div className="card-header bg-white py-20 px-24 border-bottom">
            <div className="d-flex align-items-center gap-12">
              <div className="p-8 bg-blue-100 rounded-8">
                <Icon icon="solar:letter-outline" className="text-blue-600" />
              </div>
              <div>
                <h5 className="mb-0 fw-semibold text-neutral-900">Email Communications</h5>
                <p className="mb-0 text-sm text-secondary-light">Manage your email notification preferences</p>
              </div>
            </div>
          </div>
          <div className="card-body p-24 space-y-20">
            {/* Product Updates */}
            <div className="p-20 bg-gradient-to-r from-green-50 to-emerald-50 rounded-12 border border-green-200">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-start gap-12 flex-grow-1">
                  <Icon icon="solar:star-outline" className="text-green-600 text-lg mt-2" />
                  <div>
                    <h6 className="mb-8 fw-semibold text-neutral-900">Product & Feature Updates</h6>
                    <p className="mb-0 text-sm text-secondary-light">
                      Get notified about new features, improvements, and API enhancements. 
                      Typically 1-2 emails per month with valuable updates.
                    </p>
                  </div>
                </div>
                <div className="form-switch switch-primary ms-16">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="productFeature"
                    checked={notifications.productUpdates}
                    onChange={() => handleToggle('productUpdates')}
                  />
                </div>
              </div>
            </div>

            {/* Service Updates */}
            <div className="p-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-12 border border-orange-200">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-start gap-12 flex-grow-1">
                  <Icon icon="solar:settings-outline" className="text-orange-600 text-lg mt-2" />
                  <div>
                    <h6 className="mb-8 fw-semibold text-neutral-900">Critical Service Updates</h6>
                    <p className="mb-0 text-sm text-secondary-light">
                      Important notifications about API changes that may affect your integration. 
                      Essential for maintaining service continuity.
                    </p>
                  </div>
                </div>
                <div className="form-switch switch-primary ms-16">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="importantService"
                    checked={notifications.serviceUpdates}
                    onChange={() => handleToggle('serviceUpdates')}
                  />
                </div>
              </div>
            </div>

            {/* Security Alerts */}
            <div className="p-20 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-12 border border-purple-200">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-start gap-12 flex-grow-1">
                  <Icon icon="solar:shield-check-outline" className="text-purple-600 text-lg mt-2" />
                  <div>
                    <h6 className="mb-8 fw-semibold text-neutral-900">Security & Account Alerts</h6>
                    <p className="mb-0 text-sm text-secondary-light">
                      Critical security notifications and account-related updates. 
                      Highly recommended for account protection.
                    </p>
                  </div>
                </div>
                <div className="form-switch switch-primary ms-16">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="securityAlerts"
                    checked={notifications.security}
                    onChange={() => handleToggle('security')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Monitoring Section */}
        <div className="card border-0 shadow-sm mb-16">
          <div className="card-header bg-white py-20 px-24 border-bottom">
            <div className="d-flex align-items-center gap-12">
              <div className="p-8 bg-warning-100 rounded-8">
                <Icon icon="solar:chart-square-outline" className="text-warning-600" />
              </div>
              <div>
                <h5 className="mb-0 fw-semibold text-neutral-900">Usage Monitoring</h5>
                <p className="mb-0 text-sm text-secondary-light">Automated alerts to help manage your API consumption</p>
              </div>
            </div>
          </div>
          <div className="card-body p-24">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-16 rounded-8 mb-20 border border-amber-200">
              <p className="mb-0 text-sm text-amber-700">
                <Icon icon="solar:info-circle-outline" className="me-8" />
                Stay ahead of usage limits with proactive notifications. We'll alert you before you reach critical thresholds.
              </p>
            </div>

            <div className="space-y-16">
              <div className="p-16 border border-neutral-200 rounded-8 bg-neutral-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-12">
                    <div className="p-8 bg-warning-100 rounded-circle">
                      <Icon icon="solar:danger-outline" className="text-warning-600" />
                    </div>
                    <div>
                      <h6 className="mb-4 fw-medium text-neutral-900">80% Usage Alert</h6>
                      <p className="mb-0 text-sm text-secondary-light">Get notified when you reach 80% of your monthly limit</p>
                    </div>
                  </div>
                  <div className="form-switch switch-primary">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="usageNotifications80"
                      checked={notifications.usage80}
                      onChange={() => handleToggle('usage80')}
                    />
                  </div>
                </div>
              </div>

              <div className="p-16 border border-neutral-200 rounded-8 bg-neutral-50">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-12">
                    <div className="p-8 bg-danger-100 rounded-circle">
                      <Icon icon="solar:danger-triangle-outline" className="text-danger-600" />
                    </div>
                    <div>
                      <h6 className="mb-4 fw-medium text-neutral-900">90% Usage Alert</h6>
                      <p className="mb-0 text-sm text-secondary-light">Critical alert when approaching your monthly limit</p>
                    </div>
                  </div>
                  <div className="form-switch switch-primary">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="usageNotifications90"
                      checked={notifications.usage90}
                      onChange={() => handleToggle('usage90')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services Section */}
        <div className="card border-0 shadow-sm mb-16">
          <div className="card-header bg-white py-20 px-24 border-bottom">
            <div className="d-flex align-items-center gap-12">
              <div className="p-8 bg-info-100 rounded-8">
                <Icon icon="solar:planet-outline" className="text-info-600" />
              </div>
              <div>
                <h5 className="mb-0 fw-semibold text-neutral-900">External Services</h5>
                <p className="mb-0 text-sm text-secondary-light">Optional third-party notification services</p>
              </div>
            </div>
          </div>
          <div className="card-body p-24">
            <div className="p-20 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-12 border border-cyan-200">
              <div className="d-flex align-items-start justify-content-between">
                <div className="d-flex align-items-start gap-12 flex-grow-1">
                  <Icon icon="solar:server-outline" className="text-cyan-600 text-lg mt-2" />
                  <div>
                    <h6 className="mb-8 fw-semibold text-neutral-900">Status Page Notifications</h6>
                    <p className="mb-12 text-sm text-secondary-light">
                      Subscribe to real-time platform status updates via email. 
                      Get immediate notifications about service incidents or maintenance windows.
                    </p>
                    <div className="d-flex align-items-center gap-8">
                      <Icon icon="solar:link-outline" className="text-info-600" />
                      <a href="#" className="text-info-600 text-sm text-decoration-none fw-medium">
                        Visit Status Page
                      </a>
                    </div>
                  </div>
                </div>
                <div className="form-switch switch-primary ms-16">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="statusPage"
                    checked={notifications.statusPage}
                    onChange={() => handleToggle('statusPage')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-20 rounded-12 border border-slate-200 mb-16">
          <div className="d-flex align-items-start gap-12">
            <Icon icon="solar:info-circle-outline" className="text-slate-600 text-lg mt-2" />
            <div>
              <h6 className="mb-8 fw-medium text-slate-700">Important Notice</h6>
              <p className="mb-0 text-sm text-slate-600">
                <strong>Transactional emails cannot be disabled.</strong> These include critical account notifications 
                such as usage overages, payment reminders, security alerts, and legal updates that are required 
                for account management and compliance purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center justify-content-between bg-white p-20 rounded-12 border border-neutral-200 shadow-sm">
          <div className="d-flex align-items-center gap-8">
            <Icon icon="solar:diskette-outline" className="text-success-600" />
            <span className="text-sm text-secondary-light">Changes are saved automatically</span>
          </div>
          <div className="d-flex align-items-center gap-12">
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center gap-8 px-16 py-8">
              <Icon icon="solar:refresh-outline" />
              Reset to Defaults
            </button>
            <button type="submit" className="btn btn-primary d-flex align-items-center gap-8 px-20 py-8">
              <Icon icon="solar:check-circle-outline" />
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AlertsNotifications;

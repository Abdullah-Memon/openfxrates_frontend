"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "@/components/cards/CardWrapper";
import { getPaymentPlansAction } from "@/redux/payment/action";
import { getPlanCategory } from "@/utils/enums";

const PlansPricing = () => {
  const dispatch = useDispatch();
  const { plans, isLoading, error } = useSelector((state) => state.payment);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    dispatch(getPaymentPlansAction());
  }, [dispatch]);

  // Helper function to format update frequency
  const formatUpdateFrequency = (type, value) => {
    if (type === "HOUR") {
      return value === 1 ? "Hourly" : `${value}-hour`;
    } else if (type === "MINUTE") {
      return `${value}-minute`;
    }
    return `${value} ${type.toLowerCase()}`;
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return price === 0 ? "FREE" : `$${price}`;
  };

  // Helper function to get current price based on toggle
  const getCurrentPrice = (plan) => {
    return isYearly ? plan.annual_price : plan.monthly_price;
  };

  // Helper function to format duration based on pricing type
  const getPricingDuration = () => {
    return isYearly ? "Per Year" : "Per Month";
  };

  // Helper function to format duration
  const formatDuration = (durationType, durationValue) => {
    if (durationType === "DAY") {
      return `${durationValue} Days`;
    } else if (durationType === "MONTH") {
      return "Per Month";
    }
    return `${durationValue} ${durationType.toLowerCase()}s`;
  };

  if (isLoading) {
    return (
      <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
        <div className="card-body p-40">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading pricing plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
        <div className="card-body p-40">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <Icon icon="mingcute:warning-line" className="fs-4 me-2" />
              Error loading pricing plans: {error}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(getPaymentPlansAction())}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
        <div className="card-body p-40">
          <div className="row justify-content-center">
            <div className="col-xxl-12">
              <div className="text-center">
                <h4 className="mb-16">Best Pricing Package</h4>
                <p className="mb-0 text-lg text-secondary-light">
                  All accounts have access to the Open Exchange Rates API, with
                  live and historical rates for over 200 currencies.
                </p>
              </div>

              <ul
                className="nav nav-pills button-tab mt-32 pricing-tab justify-content-center"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link px-24 py-10 text-md rounded-pill text-secondary-light fw-medium ${!isYearly ? 'active' : ''}`}
                    onClick={() => setIsYearly(false)}
                    type="button"
                  >
                    Monthly
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link px-24 py-10 text-md rounded-pill text-secondary-light fw-medium ${isYearly ? 'active' : ''}`}
                    onClick={() => setIsYearly(true)}
                    type="button"
                  >
                    Yearly
                  </button>
                </li>
              </ul>

              <div className="row gy-4 mt-4">
                {plans.map((plan, index) => {
                  const isStandard = plan.plan_key === "STANDARD";
                  const cardClass = isStandard
                    ? "pricing-plan position-relative radius-24 overflow-hidden border bg-primary-600 text-white z-1"
                    : "pricing-plan position-relative radius-12 overflow-hidden border shadow bg-base";

                  return (
                    <div key={plan.plan_key} className="col-xxl-4 col-sm- h-100">
                      <div className={cardClass}>
                        {isStandard && (
                          <>
                            <img
                              src="assets/images/pricing/pricing-shape.png"
                              alt=""
                              className="position-absolute end-0 top-10 z-n1"
                            />
                            <span className="bg-white bg-opacity-25 text-white radius-24 py-8 px-24 text-sm position-absolute end-0 top-0 z-1 rounded-start-top-0 rounded-end-bottom-0">
                              Featured
                            </span>
                          </>
                        )}

                        <div className="align-items-center gap-16">
                          <span
                            className={`fw-medium text-md ${
                              isStandard ? "text-white" : ""
                            }`}
                          >
                            {getPlanCategory(plan.plan_key)}
                          </span>
                          <h6
                            className={`mb-0 ${isStandard ? "text-white" : ""}`}
                          >
                            {plan.title}
                          </h6>
                        </div>

                        <p
                          className={`mt-16 mb-0 mb-28 ${
                            isStandard ? "text-white" : "text-secondary-light"
                          }`}
                        >
                          {plan.description}
                        </p>

                        <hr className="my-16" />

                        <ul>
                          <li>
                            <b>
                              {formatUpdateFrequency(
                                plan.update_type,
                                plan.update_value
                              )}
                            </b>{" "}
                            updates
                          </li>
                          <li>
                            <b>{plan.monthly_api_requests}</b> monthly API
                            requests
                          </li>
                          {plan.all_base_currencies && (
                            <li>
                              + All <b>base currencies</b> available
                            </li>
                          )}
                          {plan.currency_conversion && (
                            <li>
                              + <b>Currency conversion</b> requests
                            </li>
                          )}
                          {plan.time_series && (
                            <li>
                              + <b>Time series</b> data
                            </li>
                          )}
                        </ul>

                        <hr className="my-16" />

                        <h3
                          className={`${
                            isStandard ? "text-white" : "text-secondary"
                          }`}
                        >
                          {plan.discount_percentage > 0 &&
                          getCurrentPrice(plan) > 0 ? (
                            <>
                              <span className="text-decorxt-2xl">
                                ${getCurrentPrice(plan)}ation-line-through te
                              </span>
                              &nbsp;$
                              {(
                                getCurrentPrice(plan) *
                                (1 - plan.discount_percentage / 100)
                              ).toFixed(2)}
                            </>
                          ) : (
                            formatPrice(getCurrentPrice(plan))
                          )}
                        </h3>

                        <h5
                          className={`fw-medium text-md ${
                            isStandard ? "text-white" : "text-secondary-light"
                          }`}
                        >
                          {getCurrentPrice(plan) === 0 
                            ? formatDuration(plan.duration_type, plan.duration_value)
                            : getPricingDuration()
                          }
                        </h5>

                        <button
                          className={`${
                            isStandard
                              ? "bg-white text-primary-600 border-white"
                              : "bg-primary-600 bg-hover-primary-700 text-white border-primary-600"
                          } text-center text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28`}
                        >
                          Get started
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card
        body={
          <>
            <div className="d-flex align-items-center w-100">
              <p className="mb-0 flex-grow-1">
                You can also downgrade your account to the Forever Free plan
                here:
              </p>
              <button className="bg-secondary bg-hover-primary-700 text-white text-center text-sm btn-sm px-12 py-10 radius-8 mt-0 ms-auto">
                Downgrade Account
              </button>
            </div>
          </>
        }
      />
    </>
  );
};

export default PlansPricing;

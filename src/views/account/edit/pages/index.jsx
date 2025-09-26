import Card from "@/components/cards/CardWrapper";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const EditAccountDetails = () => {
  return (
    <div>
      <p>
        These are the details we have on file for you. Please make any changes
        below and click 'Save' before exiting this page.
      </p>

      <p>
        There are also options to view/download your data, and/or delete your
        account, at the bottom of this page.
      </p>

      <form className="needs-validation" noValidate="">
        <Card
          title="User Information"
          body={
            <div className="row gy-2">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter First Name"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide first name
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:person" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Last Name"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide last name
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="mage:email" />
                  </span>
                  <input
                    type="email"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Email"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide email address
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Website</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="f7:globe" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Website"
                    required=""
                  />
                  <div className="invalid-feedback">Please provide website</div>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="solar:phone-calling-linear" />
                  </span>
                  <input
                    type="text"
                    name="#0"
                    className="form-control"
                    placeholder="+1 (555) 000-0000"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide phone number
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Card
          title="Backup Contact"
          body={
            <div className="row gy-2">
              <div className="col-md-12">
                <label className="form-label">Secondary/Backup Email</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="mage:email" />
                  </span>
                  <input
                    type="email"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Email"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide secondary or backup email address
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Card
          title="Billing Details"
          body={
            <div className="row gy-2">
              <div className="col-md-12">
                <label className="form-label">Billing Email</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="mage:email" />
                  </span>
                  <input
                    type="email"
                    name="#0"
                    className="form-control"
                    placeholder="Enter Email"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide Billing email address
                  </div>
                </div>
              </div>
            </div>
          }
        />
        <Card
          title="Change Password"
          body={
            <div className="row gy-2">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type="password"
                    name="#0"
                    className="form-control"
                    placeholder="*******"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please provide password
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <div className="icon-field has-validation">
                  <span className="icon">
                    <Icon icon="solar:lock-password-outline" />
                  </span>
                  <input
                    type="password"
                    name="#0"
                    className="form-control"
                    placeholder="*******"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please confirm password
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <div className="d-flex align-items-center mb-16">
          <button className="btn btn-primary">Save Changes</button>
          <button className="btn btn-outline-secondary ms-8">Cancel</button>
        </div>
      </form>

      <hr />
      <Card
        title="Download your data"
        body={
          <>
            <p>
              If you wish to download a copy of all of the data we hold about
              you (a Data Subject Access Request), you can request this at any
              time in either a single page format (which can be printed or saved
              as a PDF file), or as a CSV file, using the buttons below. This
              will not affect your account or API access.
            </p>
            <button className="btn btn-outline-primary me-8">
              Download as PDF
            </button>
            <button className="btn btn-outline-primary">Download as CSV</button>
          </>
        }
      />

      <Card
        title="Don't need your Open Exchange Rates account any more?"
        body={
          <>
            <p>
              If you no longer need your Open Exchange Rates account and wish to
              delete it, please click below and confirm on the next page.
            </p>

            <p>
              We will delete all of your account information from our system
              immediately, and any active integrations and App IDs will stop
              working.
            </p>
            <button className="btn btn-outline-danger me-8">
              Delete Account
            </button>
          </>
        }
      />
    </div>
  );
};

export default EditAccountDetails;

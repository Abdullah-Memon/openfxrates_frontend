import React from 'react';

const Invoice = () => {
  return (
    <>
      <p>You can view and download your account invoices below.</p>

      <div className="col-lg-12 col-sm-12">
        <div className="p-16 bg-info-50 radius-8 border-start-width-3-px border-info-main border-top-0 border-end-0 border-bottom-0">
          <h6 className="text-primary-light text-md mb-8">
            Looks like you don't have any previous invoices yet!
          </h6>

          <p className="mb-16">
            Were you expecting to see something here? Please contact us if so.
          </p>
          </div>
      </div>
    </>
  );
}

export default Invoice;


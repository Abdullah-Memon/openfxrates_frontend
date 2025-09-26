import React from "react";
import Card from "@/components/cards/CardWrapper";

const PaymentDetails = () => {
  return (
    
    <Card
      title="No Payment Details"
      body={
        <p>
          We are not holding anything payments details for you. Please finish
          setting up your subscription by going here.
        </p>
      }
    />
  );
};

export default PaymentDetails;

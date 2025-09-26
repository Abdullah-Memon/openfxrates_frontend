
export const getOtpPurposeOptions = () => ({
  EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD'
});

export const getPlanCategory = (planKey) => {
  // switch (planKey) {
  //   case "FREE":
  //     return "For Trial";
  //   case "STANDARD":
  //     return "Standard";
  //   case "PRO":
  //     return "Premium";
  //   default:
  //     return "Plan";
  // }

  return planKey // Just return the planKey as is for now
};


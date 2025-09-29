import VerificationMainPage from "@/views/verification";
import { getOtpPurposeOptions } from "@/utils/enums";

export const metadata = {
  title: "OpenFXRates - Email Verification",
  description:
    "Verify your email address to complete your OpenFXRates account setup and access our foreign exchange rates API platform.",
};

const VerificationPage = ({ params }) => {
  // Extract purpose from URL parameter and validate it
  const { purpose } = params;
  const validPurposes = Object.values(getOtpPurposeOptions());
  
  // Convert URL parameter to enum format (e.g., 'email' -> 'EMAIL_VERIFICATION')
  let otpPurpose;
  switch (purpose?.toLowerCase()) {
    case 'email':
      otpPurpose = getOtpPurposeOptions().EMAIL_VERIFICATION;
      break;
    case 'forgot-password':
      otpPurpose = getOtpPurposeOptions().FORGOT_PASSWORD;
      break;
    case 'update-password':
      otpPurpose = getOtpPurposeOptions().UPDATE_PASSWORD;
      break;
    default:
      // Default to email verification if purpose is invalid
      otpPurpose = getOtpPurposeOptions().EMAIL_VERIFICATION;
      break;
  }

  return (
    <>
      <VerificationMainPage purpose={otpPurpose} />
    </>
  );
};

export default VerificationPage;
// ForgotPassword.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import TextInput from "../components/common/TextInput";
import { MdMailOutline } from "react-icons/md";
import { Formik, Form } from "formik";
import * as Yup from "yup";

type ForgotPasswordFormValues = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email address is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    )
    .email("Enter a valid email address"),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const initialValues: ForgotPasswordFormValues = {
    email: "",
  };

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: any
  ) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Password reset requested for:", values.email);

      // TODO: Replace with actual API call
      // await axios.post('/api/forgot-password', { email: values.email });

      setSubmittedEmail(values.email);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending reset link:", error);
      // Handle error (show toast notification, etc.)
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (isSubmitted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md px-10 py-12 shadow-xl text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Check Your Email
          </h1>

          <p className="text-gray-600 mb-2">
            We've sent password reset instructions to:
          </p>
          <p className="text-blue-600 font-medium mb-6">{submittedEmail}</p>

          <p className="text-sm text-gray-500 mb-8">
            If you don't see the email, check your spam folder or try again.
          </p>

          <Button fullWidth onClick={handleBackToLogin}>
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md px-10 py-12 shadow-xl bg-primary/8">
        {/* Lock Icon */}
        <div className="w-20 h-20 mx-auto mb-6">
          <img src="/public/svg/forgot-password-lock.svg" alt="Lock" className="w-full h-full" />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-start text-gray-800 mb-3">
          Forgot Your Password
        </h1>

        {/* Description */}
        <p className="text-start font-medium text-primary text-sm mb-8">
          Enter your email address, and we'll send you instructions to reset
          your password.
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Email address
                </label>
                <TextInput
                  name="email"
                  placeholder="Enter your email"
                  leftIcon={<MdMailOutline size={20} />}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : undefined}
                />
              </div>

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                disabled={isSubmitting}
                className="bg-primary"
              >
                {isSubmitting ? "Sending..." : "Request reset link"}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline"
                >
                  Back to login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}

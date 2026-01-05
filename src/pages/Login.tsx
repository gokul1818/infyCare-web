import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import TextInput from "../components/ui/TextInput";
import Checkbox from "../components/ui/Checkbox";

import { CiUser } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";

import { Formik, Form } from "formik";
import * as Yup from "yup";

type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    remember: false,
  };

  const handleSubmit = (values: LoginFormValues) => {
    console.log("FORM DATA 👉", values);

    dispatch(
      loginSuccess({
        user: { name: "Admin User" },
        token: "fake-jwt-token",
        role: "admin",
      })
    );

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="h-screen w-screen flex bg-background">
      {/* LEFT IMAGE */}
      <div className="hidden md:block md:w-3/5 h-full">
        <img
          src="/images/loginBg.png"
          alt="Infycare"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-2/5 h-full flex items-center justify-center">
        <Card className="w-full max-w-md px-8 py-10 shadow-xl">
          <h1 className="text-xl font-bold text-center text-primary">
            <div className="w-16 h-16 p-4 justify-center flex items-center self-center mx-auto rounded-full bg-neutral-300 mb-4 ">
              <img src="/svg/logo.svg" className="" />
            </div>
            Infycare Management
          </h1>

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
              setFieldValue,
            }) => (
              <Form className="mt-8 px-12 space-y-5">
                {/* Email */}
                <TextInput
                  name="email"
                  label="Email"
                  placeholder="nurse.alen@gmail.com"
                  leftIcon={<CiUser size={18} />}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : undefined}
                />

                {/* Password */}
                <TextInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  leftIcon={<MdLockOutline size={18} />}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : undefined}
                />

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <Checkbox
                    label="Remember me"
                    checked={values.remember}
                    onChange={(checked) =>
                      setFieldValue("remember", checked)
                    }
                  />

                  <button
                    type="button"
                    className="text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <Button fullWidth type="submit">
                  LOGIN
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
}

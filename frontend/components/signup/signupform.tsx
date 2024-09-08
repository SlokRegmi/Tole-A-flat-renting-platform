import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { PasswordInput } from "../ui/passwordinput";
import { PhoneInput } from "../ui/phoneinput";
import { FormField } from "./formfield";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignupForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    marketing: false,
    terms: false,
  });

  const handleChange = (e: any) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register/", {
        first_name: formData.fName,
        last_name: formData.lName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.status === 201) {
        // Registration successful, redirect to login or home page
        router.push("/login");
      }
    } catch (error) {
      console.error("Error registering user", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
        <FormField id="fName" label="First Name" type="text" value={formData.fName} onChange={handleChange} />

        <FormField id="lName" label="Last Name" type="text" value={formData.lName} onChange={handleChange} />

        <FormField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />

        <PhoneInput id="phone" label="Phone" value={formData.phone} onChange={handleChange} />

        <FormField id="password" label="Password" type="password" value={formData.password} onChange={handleChange} />

        <PasswordInput id="cpassword" label="Confirm Password" value={formData.cpassword} onChange={handleChange} />

        <div className="col-span-1 md:col-span-2 space-y-[1rem]">
          <div className="flex items-start">
            <Checkbox id="marketing" checked={formData.marketing} onChange={handleChange} />
            <Label htmlFor="marketing" className="ml-2">
              Yes, I want to receive emails.
            </Label>
          </div>
          <div className="flex items-start mt-2">
            <Checkbox id="terms" checked={formData.terms} onChange={handleChange} />
            <Label htmlFor="terms" className="ml-2">
              I agree to all the{" "}
              <a href="/terms" className="underline text-blue-600">
                Terms
              </a>
              ,{" "}
              <a href="/privacy" className="underline text-blue-600">
                Privacy Policy
              </a>
              , and{" "}
              <a href="/fees" className="underline text-blue-600">
                Fees
              </a>
              .
            </Label>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>

        <div className="col-span-1 md:col-span-2 text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="underline text-blue-600">
              Log in
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

import { validate } from "@/lib/utils";
import { Field, useForm } from "react-final-form";
import validator from "validator";
import z from "zod";
import { Error } from "./error";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import React from "react";

interface PersonalInformationProps {
  nextStep: () => void;
}

export const PersonalInformation = z.object({
  name: z.string().min(8, "name must be at least  8 character"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid phone number." }),
});

export const PersonalInformationSection: React.FC<PersonalInformationProps> = ({
  nextStep,
}) => {
  const form = useForm();
  const handleNextStep = () => {
    const { values } = form.getState();
    const { name, email, phone } = values;

    const isFieldsFilled = name && email && phone;

    if (isFieldsFilled) {
      nextStep();
    } else {
      return;
    }
  };

  return (
    <div className="space-y-4 flex flex-col">
      <div className="flex flex-col mt4">
        <h1 className="text-xl font-bold">Personal Information</h1>
        <span className="text-sm text-muted-foreground max-w-xs w-full">
          Enter your name, email and phone below
        </span>
      </div>
      <Field
        name="name"
        validate={(values) => validate({ name: values }, PersonalInformation)}
        render={({ input }) => (
          <div className="flex flex-col w-full">
            <Label>Name</Label>
            <Input className="w-full mt-2" {...input} />
            <Error name="name" />
          </div>
        )}
      />
      <Field
        name="email"
        validate={(values) => validate({ email: values }, PersonalInformation)}
        render={({ input }) => (
          <div className="flex flex-col">
            <Label>Email</Label>
            <Input type="email" className="w-full mt-2" {...input} />
            <Error name="email" />
          </div>
        )}
      />
      <Field
        name="phone"
        validate={(values) => validate({ phone: values }, PersonalInformation)}
        render={({ input }) => (
          <div className="flex flex-col">
            <Label>Phone</Label>
            <Input type="text" className="w-full mt-2" {...input} />
            <Error name="phone" />
          </div>
        )}
      />
      <Button onClick={handleNextStep}>Next</Button>
    </div>
  );
};

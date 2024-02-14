import { deliveryTimes } from "@/lib/constants";
import { validate } from "@/lib/utils";
import { Field, useForm } from "react-final-form";
import z from "zod";
import { Error } from "./error";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React from "react";

interface TripDetailsProps {
  nextStep: () => void;
}

interface ConditionProps {
  when: string;
  is: string;
  children: JSX.Element;
}

export const DeliveryDetailsSchema = z.object({
  pickupTime: z.string(),
  address: z
    .string()
    .min(5, { message: "address must be a minimum of 5 characters long" }),
});

export const Condition: React.FC<ConditionProps> = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);

export const DeliveryDetails = ({ nextStep }: TripDetailsProps) => {
  const form = useForm();
  const handleNextStep = () => {
    const { values } = form.getState();
    const { pickupTime, address } = values;

    const isFieldsFilled = pickupTime || address;

    if (isFieldsFilled) {
      nextStep();
    } else {
      return;
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col mt-4">
        <h1 className="text-xl font-bold">Delivery Details</h1>
        <span className="text-sm text-muted-foreground max-w-xs w-full">
          Select delivery type
        </span>
      </div>
      <div className="flex flex-col space-y-2">
        <Label>Delivery type</Label>
        <label>
          <Field
            name="deliveryType"
            component="input"
            type="radio"
            value="delivery"
          />{" "}
          Delivery
        </label>
        <label>
          <Field
            name="deliveryType"
            component="input"
            type="radio"
            value="pickup"
          />{" "}
          Pickup
        </label>
        <Condition when="deliveryType" is="delivery">
          <div className="flex flex-col space-y-3">
            <Label>Address</Label>
            <Field
              name="address"
              type="text"
              validate={(values) =>
                validate({ address: values }, DeliveryDetailsSchema)
              }
              render={({ input }) => <Input placeholder="Address" {...input} />}
            />
            <Error name="address" />
          </div>
        </Condition>
        <Condition when="deliveryType" is="pickup">
          <div className="flex flex-col space-y-2">
            <Label>Pickup Time</Label>
            <Field
              name="pickupTime"
              validate={(values) =>
                validate({ pickupTime: values }, DeliveryDetailsSchema)
              }
              render={({ input }) => (
                <Select onValueChange={input.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Pickup time" />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryTimes.map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item}
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                        onFocus={input.onFocus}
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Error name="pickupTime" />
          </div>
        </Condition>
        <Button onClick={handleNextStep}>Next</Button>
      </div>
    </div>
  );
};

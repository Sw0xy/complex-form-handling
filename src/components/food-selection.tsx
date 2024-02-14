import { apiRequestMemoize, sleep } from "@/lib/utils";
import React from "react";
import { Field } from "react-final-form";
import { GiHamburger, GiPizzaSlice, GiSushis } from "react-icons/gi";
import { Error } from "./error";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

export const FoodSelectionStep: React.FC = () => {
  const checkFoodAvailability = apiRequestMemoize(async (foodItem: string) => {
    if (!foodItem) {
      return "Required";
    }

    await sleep(400); // api call

    const availableFoods = ["pizza", "burger", "salad"];

    if (!availableFoods.includes(foodItem.toLowerCase())) {
      return { food: `We're out of ${foodItem} for the time being.` };
    }

    return undefined;
  });

  return (
    <div className="flex gap-4 mt-4 flex-col">
      <Label>Food</Label>
      <div className="flex items-center gap-x-2 text-center w-full">
        <Label className="p-5 rounded-lg border border-border">
          <GiPizzaSlice size={48} className="mx-auto" />
          <Field
            name="food"
            component="input"
            type="radio"
            value="pizza"
            validate={(val) => checkFoodAvailability(val)}
          />{" "}
          Pizza
        </Label>
        <Label className="p-5 rounded-lg border border-border">
          <GiHamburger size={48} className="mx-auto" />
          <Field
            name="food"
            component="input"
            type="radio"
            value="burger"
          />{" "}
          Burger
        </Label>
        <Label className="p-5 rounded-lg border border-border">
          <GiSushis size={48} className="mx-auto" />
          <Field
            name="food"
            component="input"
            type="radio"
            value="sushi"
          />{" "}
          Sushi
        </Label>
      </div>

      <Error name="food" />
      <Button type="submit">Order</Button>
    </div>
  );
};

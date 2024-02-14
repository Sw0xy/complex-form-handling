import { useForm } from "react-final-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import React from "react";

interface ResultModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}
export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const form = useForm();

  const values = form.getState().values;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order</DialogTitle>
          <DialogDescription className="max-w-xs w-full flex flex-col ">
            {Object.entries(values).map((item, index) => (
              <span key={index}>
                {" "}
                <strong className="capitalize">{`${item[0]}`}:</strong>{" "}
                {item[1]}
              </span>
            ))}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center w-full gap-x-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant={"default"}
            onClick={() => (location.href = "/")}
          >
            Finish
          </Button>{" "}
        </div>
      </DialogContent>
    </Dialog>
  );
};

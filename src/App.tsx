import { Form } from "react-final-form";

import { DeliveryDetails } from "./components/delivery-details";
import { PersonalInformationSection } from "./components/personal-information";
import { Step, StepConfig, Steps } from "./components/ui/stepper";
import { useSteps } from "./components/ui/use-steps";
import { FoodSelectionStep } from "./components/food-selection";
import { ResultModal } from "./components/result-modal";
import { useState } from "react";

const steps = [
  { label: "Personal Information" },
  { label: "Trip Details" },
  { label: "Activities Selection" },
] satisfies StepConfig[];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeStep, nextStep } = useSteps({
    initialStep: 0,
    steps,
  });

  return (
    <main className="bg-background min-h-screen w-full flex justify-center items-center">
      <div className="bg-card m-auto shadow-md h-max max-w-2xl w-full p-5 rounded-xl flex flow-row border border-border">
        <div className="flex flex-col w-full flex-1 p-5 gap-y-5">
          <Form
            onSubmit={(val) => {
              console.log(val);
              setIsOpen(!isOpen);
            }}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Steps activeStep={activeStep}>
                  <Step index={0} label="Personal Details">
                    <PersonalInformationSection nextStep={nextStep} />
                  </Step>
                  <Step index={1} label="Delivery Details">
                    <DeliveryDetails nextStep={nextStep} />
                  </Step>
                  <Step index={2} label="Food Selection">
                    <FoodSelectionStep />
                  </Step>
                </Steps>
                <ResultModal isOpen={isOpen} setIsOpen={setIsOpen} />
                {/*   <div className="flex items-center gap-4 mt-4">
                  <Button type="submit" disabled={submitting}>
                    Submit
                  </Button>
                  <Button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </div> */}
              </form>
            )}
          />
        </div>
      </div>
    </main>
  );
}

export default App;

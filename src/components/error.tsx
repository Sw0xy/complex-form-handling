import { Field } from "react-final-form";

type ErrorProps = {
  name: string;
};

export const Error = ({ name }: ErrorProps) => (
  <Field
    name={name}
    subscription={{ error: true, touched: true }}
    render={({ meta: { error, touched } }) => {
      return touched && error ? (
        <span className="text-red-500 text-sm font-semibold mt-1">
          {error[name]}{" "}
        </span>
      ) : (
        <></>
      );
    }}
  />
);

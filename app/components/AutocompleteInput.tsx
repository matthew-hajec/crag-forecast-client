import { useId } from "react";
import Autocomplete from "react-google-autocomplete";
import type { ComponentProps } from "react";

type AutocompleteInputProps = {
  labelText?: string;
  placeholder?: string;
  additionalClasses?: string;
} & ComponentProps<typeof Autocomplete>;

// Style wrapper around react-google-autocomplete
export default function AutocompleteInput({
  labelText,
  additionalClasses,
  ...props
}: AutocompleteInputProps) {
  const inputId = useId(); // label => input association

  return (
    <div>
      {labelText && (
        <label
          htmlFor={inputId}
          className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {labelText}
        </label>
      )}
      <Autocomplete
        apiKey="AIzaSyDPenkC18xDMOHIZt1VfkShJySherTZs5g"
        className={`
          w-full px-3 py-2
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          bg-white text-gray-900
          ${additionalClasses ?? ""}
        `}
        {...props}
      />
    </div>
  )
}
import { useId } from "react"

type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Triggered on input change
  type?: string; // Input type, e.g., "text", "password" (passed to input element)
  error?: string; // Error message to display
  labelText?: string; // Optional label text
  placeholder?: string; // Placeholder text for the input
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Triggered when Enter key is pressed
}

export default function TextInput(props: TextInputProps) {
  const inputId = useId() // associates label and input elements

  return (
    <div>
      {props.labelText && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {props.labelText}
        </label>
      )}
      <input
        id={inputId}
        type={props.type || "text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder || ""}
        onKeyDown={(e) => {
          if(e.key === "Enter" && props.onPressEnter) {
            props.onPressEnter(e)
          }
        }}
        className={`
          w-full px-3 py-2
          border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${props.error ? "border-red-500" : ""}
        `}
      />
      {props.error && (
        <p className="mt-1 text-sm text-red-600">{props.error}</p>
      )}
    </div>
  )
}
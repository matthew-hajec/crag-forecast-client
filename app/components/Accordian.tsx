import { useState } from "react";
import { ChevronDown } from "./icons/ChevronDown";

type AccordianProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  additionalClasses?: string;
};

export default function Accordian(props: AccordianProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border border-gray-300 dark:border-gray-700 rounded-md ${props.additionalClasses ?? ""}`}>
      <button
        className="
          cursor-pointer
          w-full flex justify-between items-center 
          px-4 py-2 
          bg-gray-100 dark:bg-gray-800 
          hover:bg-gray-200 dark:hover:bg-gray-700 
          rounded-t-md 
          focus:outline-none
        "
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.title}

        <ChevronDown
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-2">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
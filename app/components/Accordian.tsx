import { useState } from "react";

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
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-t-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {props.title}
        
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && <div className="px-4 py-2">{props.children}</div>}
    </div>
  );
}
type Props = {
  className?: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  leftOption?: string;
  rightOption?: string;
  leftColor?: string;
  rightColor?: string;
}

export function Toggle({ className, enabled, onToggle, leftOption, rightOption, leftColor, rightColor }: Props) {
  return (
    <label className={`inline-flex items-center cursor-pointer select-none ${className}`}>
      <span className={`me-1 ${leftColor || 'text-gray-900 dark:text-gray-300'}`}>{leftOption}</span>
      <input type="checkbox" checked={enabled} onChange={() => onToggle(!enabled)} className="sr-only peer"></input>
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span className={`ms-1 ${rightColor || 'text-gray-900 dark:text-gray-300'}`}>{rightOption}</span>
    </label>
  );
}
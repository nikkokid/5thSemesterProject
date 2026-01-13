type YearDropdownProps = {
  years: number[];
  value: number;
  onChange: (year: number) => void;
};

export function YearDropdown({ years, value, onChange }: YearDropdownProps) {
  return (
    <select className="border"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
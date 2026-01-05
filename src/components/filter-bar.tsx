import { SlidersHorizontal } from "lucide-react";

type FilterConfig<T = any> = {
  key: string;
  component: React.ComponentType<{
    value: T;
    onChange: (value: T) => void;
  }>;
  value: T;
  onChange: (value: T) => void;
};

type FilterBarProps = {
  filters: FilterConfig[];
};

const FilterBar = ({ filters }: FilterBarProps) => {
  return (
    <>
      <div className="lg:hidden">
        <SlidersHorizontal />
      </div>

      <div className="hidden gap-2 lg:flex">
        {filters.map(({ key, component: Component, value, onChange }) => (
          <Component
            key={key}
            value={value}
            onChange={onChange}
          />
        ))}
      </div>
    </>
  );
};

export default FilterBar;

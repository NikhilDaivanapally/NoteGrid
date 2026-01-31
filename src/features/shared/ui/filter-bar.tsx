import { SlidersHorizontal } from "lucide-react";
import React from "react";

export type FilterConfig = {
  key: string;
  label: string;
  component: React.ComponentType<any>;
  value: unknown;
  onChange: (value: unknown) => void;
  options?: { label: string; value: string }[];
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
        {filters.map(({ component: Component, key, ...props }) => (
          <Component key={key} {...props} />
        ))}
      </div>
    </>
  );
};

export default FilterBar;

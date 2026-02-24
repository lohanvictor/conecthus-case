"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

type Props = {
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  debounceTimeout?: number;
};

export function SearchInput(props: Props) {
  const handleChange = useDebounce((value: string) => {
    props.onChange?.(value.trim());
  }, props.debounceTimeout || 500);

  return (
    <div className="relative flex-1 w-full bg-white rounded-md">
      <Search
        size="20px"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <Input
        type="text"
        placeholder="Buscar..."
        defaultValue={props.defaultValue}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}

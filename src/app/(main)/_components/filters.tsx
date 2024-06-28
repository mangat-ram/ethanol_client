import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FiltersProps{
  selectName:string,
  selectLabel: string, 
  options: string[]
}

const Filters = ({
  selectName,
  selectLabel,
  options
}: FiltersProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectName} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {
            options.map((option) => (
              <div key={option}>
                <SelectItem value={option}>{option}</SelectItem>
              </div>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default Filters
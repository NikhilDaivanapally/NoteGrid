"use client";
import { UserAuthenticatedMethods } from "@/types/users/users-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

const AuthenticateFilter = ({
  value,
  onChange,
}: {
  value: UserAuthenticatedMethods;
  onChange: (value: UserAuthenticatedMethods) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted-foreground ">Provider</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="google">Google</SelectItem>
          <SelectItem value="credential">Credential</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AuthenticateFilter;

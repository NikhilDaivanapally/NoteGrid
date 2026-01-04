"use client";

import { UserStatus } from "@/types/users/users-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

const RoleFilter = ({
  value,
  onChange,
}: {
  value: UserStatus;
  onChange: (value: UserStatus) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted-foreground ">Role</span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-28">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleFilter;

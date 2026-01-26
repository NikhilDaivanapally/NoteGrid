import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NewNote = () => {
  return (
    <Button
      className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 rounded-full"
      asChild
    >
      <Link href={"/dashboard/notes/new"}>
        <PlusIcon className="size-5 md:size-6" />
        <span>New Note</span>
      </Link>
    </Button>
  );
};

export default NewNote;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  console.log("value", value);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    // create new url for the browser
    let url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true }
    );
    // Search val= ans
    // localhost:3000/ans
    router.push(url);
  };
  const clearSearchInput = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        placeholder="Search..."
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-r-none 
         focus-visible:ring-0 focus-visible:ring-transparent focus:outline-none focus:ring-offset-0 border-none"
      />
      {value && (
        <X
          onClick={clearSearchInput}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 cursor-pointer
          hover:opacity-75 transition
          text-gray-400"
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
};

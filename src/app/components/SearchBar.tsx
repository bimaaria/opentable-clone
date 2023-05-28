"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [location, setLocation] = React.useState("");

  const handleSearch = () => {
    if(location === "") return;
    router.push(`/search?city=${location}`);
    setLocation("");
    console.log(location)
  }

  return (
    <div className="flex justify-center py-3 m-auto text-lg text-left">
      <input
        className="rounded  mr-3 p-2 w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="py-2 text-white bg-red-600 rounded px-9" onClick={handleSearch}>
        Let's go
      </button>
    </div>
  )
}

export default SearchBar

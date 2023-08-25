"use client";
import { Suspense, useState } from "react";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";

export default function Home() {
  const [searchParam, setsearchParam] = useState("");
  const [searchQuery, setsearchQuery] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <div className="container">
        <div className="mb-12 flex flex-col items-center  space-y-5 md:flex-row md:justify-between md:gap-x-16 md:space-y-0 ">
          <h1 className="text-3xl font-bold">Cocktails</h1>

          <div className="grow">
            <Search
              searchParam={searchParam}
              setsearchParam={setsearchParam}
              setsearchQuery={setsearchQuery}
            />
          </div>
        </div>

        <SearchResults searchParam={searchQuery} />
      </div>
    </main>
  );
}

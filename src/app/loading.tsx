import React from "react";
import Header from "./components/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="flex flex-wrap justify-center py-3 mt-10 px-36">
        {Array.from({ length: 12 }, (_, i) => i).map(num => (
          <div key={num} className="w-64 m-3 overflow-hidden border rounded cursor-pointer animate-pulse bg-slate-200 h-72"></div>
        ))}
      </div>
    </main>
  )
}

export default Loading

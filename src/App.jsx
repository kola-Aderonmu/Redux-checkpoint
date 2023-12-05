import React from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import ListTask from "./components/ListTask";
import Greeting from "./components/TopInfo";


function App() {
  return (
    <>
      <section className="justify-center flex items-center h-screen overflow-hidden">
        <div className="bg-red-50 p-5 rounded-md shadow-lg">
          <Greeting />
          <AddTask />
          <ListTask />
        </div>
      </section>
    </>
  );
}

export default App;

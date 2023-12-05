import React, { useState } from "react";

const Greeting = () => {
  const [name, setName] = useState("");
  const [isModalOpen, setModalOpen] = useState(true);

  const openModal = () => {
    const enteredName = prompt("Enter your name:");
    if (enteredName || enteredName === "") {
      const capitalizedName =
        enteredName.charAt(0).toUpperCase() + enteredName.slice(1);
      setName(capitalizedName || "Guest");
      setModalOpen(false);
    }
  };

  const reloadPrompt = () => {
    setName("");
    setModalOpen(true);
  };

  return (
    <div className="shadow-2xl p-3 font-mono">
      {isModalOpen ? (
        <div>
          <button
            onClick={openModal}
            className="hover:bg-slate-100 text-red-300 text:hover"
          >
            Click Me:
          </button>
        </div>
      ) : (
        <div>
          <p className="text-center text-lg italic">
            Hello,<span className=""> {name}!</span>{" "}
          </p>
          <button
            onClick={reloadPrompt}
            className="text-red-300 text-slate-300"
          >
            Reload and Enter Name Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Greeting;

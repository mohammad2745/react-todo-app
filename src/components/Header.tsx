import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-2xl mx-auto px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-accent tracking-wider py-8">
        todos
      </h1>
    </header>
  );
};

export default Header;

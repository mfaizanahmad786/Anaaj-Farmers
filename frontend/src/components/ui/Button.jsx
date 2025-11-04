import React from "react";

/**
 * Minimal button component compatible with Tailwind.
 * This is a lightweight scaffold similar to a shadcn `Button` component.
 * Replace with the official shadcn-generated component after running the CLI.
 */
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

"use client";
import React, { useMemo, useState } from "react";
import Cookies from "js-cookie";
import clsx from "clsx";
import Sun from "@/icons/Sun";
import Moon from "@/icons/Moon";

function ThemeSwitcher({ defaultTheme }: { defaultTheme: string }) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    const currentTheme = Cookies.get("theme");
    if (currentTheme === "light") {
      Cookies.set("theme", "dark");
      setTheme("dark");
      document.querySelector("html")?.classList.remove("light");
      document.querySelector("html")?.classList.add("dark");
    } else {
      Cookies.set("theme", "light");
      document.querySelector("html")?.classList.remove("dark");
      document.querySelector("html")?.classList.add("light");
      setTheme("light");
    }
  };

  const icon = useMemo(() => {
    if (theme === "dark") {
      return <Sun className="h-6 w-6 text-yellow-300"/>;
    }
    return <Moon className="h-6 w-6 text-gray-500"/>;
  }, [theme]);

  return (
    <div className="w-full container mx-auto px-6 md:px-0">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
        >
          <span
            className={clsx(
              theme === "light"
                ? "from-gray-400 via-gray-500 to-gray-600"
                : "from-white via-palered-500 to-palepink-500",
              "text-transparent  bg-gradient-to-r  bg-clip-text"
            )}
          >
            {icon}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ThemeSwitcher;

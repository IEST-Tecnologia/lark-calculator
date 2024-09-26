import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  text: string;
  orientation: "top" | "bottom";
}

export default function Tooltip({ children, text, orientation }: Props) {
  return (
    <div className="relative group inline-block">
      <div
        className={`${
          orientation === "top"
            ? "bottom-[125%] left-1/2 translate-x-[-50%] transition"
            : orientation === "bottom"
            ? "top-[180%] left-1/2 translate-x-[-50%] transition"
            : ""
        } invisible scale-0 group-hover:scale-100 duration-100 delay-150 group-hover:visible absolute z-20 overflow-visible `}
      >
        {orientation === "bottom" && (
          <div
            className={`${
              orientation === "bottom"
                ? "border-x-[10px] border-x-transparent border-b-[10px]  border-b-gray-900 left-1/2 translate-x-[-50%] top-[-8px]"
                : ""
            } w-0 h-0 absolute`}
          ></div>
        )}
        <p className="bg-gray-900 text-white border border-white px-3 py-2 rounded-xl whitespace-nowrap shadow-xl">
          {text}
        </p>
        {orientation === "top" && (
          <div
            className={`${
              orientation === "top"
                ? "border-x-[10px] border-x-transparent border-t-[10px]  border-t-gray-900 left-1/2 translate-x-[-50%] bottom-[-9px]"
                : ""
            } w-0 h-0 absolute`}
          ></div>
        )}
      </div>
      {children}
    </div>
  );
}

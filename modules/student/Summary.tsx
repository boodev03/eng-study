import React from "react";

export default function Summary() {
  // Mock data
  const summary = {
    remaining: 23,
    total: 112,
    original: 84,
    incentive: 28,
    excused: "4/6",
  };

  return (
    <div className="bg-white rounded-[4px] shadow-sm border border-border-gray px-6 py-4 flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-0 mb-8">
      {/* Remaining/All */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-xl md:text-2xl font-extrabold text-gray-900">
          {summary.remaining}
          <span className="text-base md:text-lg font-bold text-gray-400">
            /{summary.total}
          </span>
        </div>
        <div className="text-xs text-gray-400 mt-1">Remaining classes/all</div>
      </div>
      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-200 mx-4" />
      {/* Original classes */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-xl md:text-2xl font-extrabold text-gray-900">
          {summary.original}
        </div>
        <div className="text-xs text-gray-400 mt-1">Original classes</div>
      </div>
      <div className="hidden md:block w-px bg-gray-200 mx-4" />
      {/* Incentive classes */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-xl md:text-2xl font-extrabold text-gray-900">
          {summary.incentive}
        </div>
        <div className="text-xs text-gray-400 mt-1">Incentive classes</div>
      </div>
      <div className="hidden md:block w-px bg-gray-200 mx-4" />
      {/* Excused absence */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-xl md:text-2xl font-extrabold text-gray-900">
          {summary.excused}
        </div>
        <div className="text-xs text-gray-400 mt-1">Excused absence</div>
      </div>
    </div>
  );
}

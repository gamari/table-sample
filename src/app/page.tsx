"use client";

import { CustomerFormModal } from "@/components/CustomerFormModal";
import { CustomerTable } from "@/components/CustomerTable";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { FaPlus } from "react-icons/fa6";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RecoilRoot>
      <div className="mb-64">
        <CustomerTable />
      </div>

      <CustomerFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div
        className="h-16 w-16 border p-2 rounded-full fixed bottom-10 right-10 z-30 bg-blue-600 flex items-center justify-center shadow-lg cursor-pointer hover:bg-blue-400"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-white h-4 w-4" />
      </div>
    </RecoilRoot>
  );
}

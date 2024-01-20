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
    </RecoilRoot>
  );
}

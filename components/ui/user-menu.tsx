"use client";

import Dropdown, { DropdownItem } from "./dropdown";
import React from "react";

export default function UserMenu() {
  return (
    <Dropdown
      align="right"
      width="md"
      trigger={
        <div
          className="
            flex items-center gap-2 cursor-pointer 
            px-2 py-1 rounded-md 
            hover:bg-gray-100 dark:hover:bg-gray-800 
            transition-all duration-200
          "
        >
          {/* Avatar */}
          <div
            className="
              w-8 h-8 rounded-full 
              bg-[var(--color-primary)] 
              text-white flex items-center justify-center 
              font-semibold
            "
          >
            ن
          </div>

          {/* Name */}
          <span className="text-sm font-medium text-[var(--color-fg)]">
            نشوان علي
          </span>
        </div>
      }
    >
      <DropdownItem>الملف الشخصي</DropdownItem>
      <DropdownItem>الإعدادات</DropdownItem>
      <DropdownItem danger>تسجيل الخروج</DropdownItem>
    </Dropdown>
  );
}

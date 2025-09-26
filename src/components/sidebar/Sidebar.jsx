"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = ({
  sidebarActive,
  mobileMenu,
  mobileMenuControl,
  currentUser,
}) => {
  const pathname = usePathname();
  const location = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location ||
            link.getAttribute("to") === location
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location]);

  return (
    <aside
      className={
        sidebarActive
          ? "sidebar active "
          : mobileMenu
          ? "sidebar sidebar-open"
          : "sidebar"
      }
    >
      <button
        onClick={mobileMenuControl}
        type="button"
        className="sidebar-close-btn"
      >
        <Icon icon="radix-icons:cross-2" />
      </button>
      <div>
        <Link href="/" className="sidebar-logo">
          <img 
            src="/assets/logo/fxrates-logo.svg" 
            alt="FX Rates Logo" 
            style={{ width: '120px', height: 'auto' }} 
          />
        </Link>
      </div>
      <div className="sidebar-menu-area">
        <ul className="sidebar-menu" id="sidebar-menu">
          <li>
            <Link href="/" className={pathname === "/" ? "active-page" : ""}>
              <Icon
                icon="solar:home-smile-angle-outline"
                className="menu-icon"
              />
              <span>Overview</span>
            </Link>
          </li>

          <li>
            <Link
              href="/documentation"
              target="_blank"
              rel="noopener noreferrer"
              className={pathname === "/documentation" ? "active-page" : ""}
            >
              <Icon icon="solar:document-text-outline" className="menu-icon" />
              <span>Developers Hub</span>
            </Link>
          </li>
          
          <li>
            <Link
              href="/app-ids"
              className={pathname === "/app-ids" ? "active-page" : ""}
            >
              <Icon icon="mage:email" className="menu-icon" />
              <span>API Keys</span>
            </Link>
          </li>

          <li>
            <Link
              href="/usage-statistics"
              className={pathname === "/usage-statistics" ? "active-page" : ""}
            >
              <Icon icon="mage:email" className="menu-icon" />
              <span>Usage & Limits</span>
            </Link>
          </li>

          <li>
            <Link
              href="/pricing"
              className={pathname === "/pricing" ? "active-page" : ""}
            >
              <Icon icon="hugeicons:money-send-square" className="menu-icon" />
              <span>Plans & Pricing</span>
            </Link>
          </li>

          <li>
            <Link
              href="/notification"
              className={pathname === "/notification" ? "active-page" : ""}
            >
              <Icon icon="mage:email" className="menu-icon" />
              <span>Alerts & Notifications</span>
            </Link>
          </li>

          <li>
            <Link
              href="/billing/payment-details"
              className={
                pathname === "/billing/payment-details" ? "active-page" : ""
              }
            >
              <Icon icon="mage:email" className="menu-icon" />
              <span>Payment Details</span>
            </Link>
          </li>

          <li>
            <Link
              href="/billing/history"
              className={pathname === "/billing/history" ? "active-page" : ""}
            >
              <Icon icon="hugeicons:invoice-03" className="menu-icon" />
              <span>Invoice</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

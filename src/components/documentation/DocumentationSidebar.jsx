"use client";
import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DocumentationSidebar = ({ sidebarActive, mobileMenu, mobileMenuControl }) => {
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
          submenu.style.maxHeight = "0px";
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`;
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
              submenu.style.maxHeight = `${submenu.scrollHeight}px`;
            }
          }
        });
      });
    };

    openActiveDropdown();

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
          ? "sidebar active"
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
        <Link href="/documentation" className="sidebar-logo">
          <img 
            src="/assets/logo/fxrates-logo.svg" 
            alt="FX Rates Docs" 
            style={{ width: '120px', height: 'auto' }} 
          />
        </Link>
      </div>
      
      <div className="sidebar-menu-area">
        <ul className="sidebar-menu" id="sidebar-menu">
          
          <li className="sidebar-menu-group-title">Documentation</li>
          
          {/* Getting Started */}
          <li>
            <Link 
              href="/documentation" 
              className={pathname === "/documentation" ? "active-page" : ""}
            >
              <Icon icon="solar:home-smile-angle-outline" className="menu-icon" />
              <span>Getting Started</span>
            </Link>
          </li>

          {/* API Reference Dropdown */}
          <li className="dropdown">
            <Link href="#">
              <Icon icon="solar:code-outline" className="menu-icon" />
              <span>API Reference</span>
            </Link>
            <ul className="sidebar-submenu">
              <li>
                <Link
                  href="/documentation/api/authentication"
                  className={pathname === "/documentation/api/authentication" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                  Authentication
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/api/endpoints"
                  className={pathname === "/documentation/api/endpoints" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                  API Endpoints
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/api/rate-limits"
                  className={pathname === "/documentation/api/rate-limits" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                  Rate Limits
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/api/error-codes"
                  className={pathname === "/documentation/api/error-codes" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-danger-main w-auto" />
                  Error Codes
                </Link>
              </li>
            </ul>
          </li>

          {/* SDK & Libraries Dropdown */}
          <li className="dropdown">
            <Link href="#">
              <Icon icon="solar:library-outline" className="menu-icon" />
              <span>SDK & Libraries</span>
            </Link>
            <ul className="sidebar-submenu">
              <li>
                <Link
                  href="/documentation/sdk/javascript"
                  className={pathname === "/documentation/sdk/javascript" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                  JavaScript SDK
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/sdk/python"
                  className={pathname === "/documentation/sdk/python" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                  Python SDK
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/sdk/php"
                  className={pathname === "/documentation/sdk/php" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                  PHP SDK
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/sdk/ruby"
                  className={pathname === "/documentation/sdk/ruby" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-danger-main w-auto" />
                  Ruby SDK
                </Link>
              </li>
            </ul>
          </li>

          {/* Tutorials Dropdown */}
          <li className="dropdown">
            <Link href="#">
              <Icon icon="solar:book-outline" className="menu-icon" />
              <span>Tutorials</span>
            </Link>
            <ul className="sidebar-submenu">
              <li>
                <Link
                  href="/documentation/tutorials/quick-start"
                  className={pathname === "/documentation/tutorials/quick-start" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                  Quick Start Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/tutorials/integration"
                  className={pathname === "/documentation/tutorials/integration" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                  Integration Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation/tutorials/best-practices"
                  className={pathname === "/documentation/tutorials/best-practices" ? "active-page" : ""}
                >
                  <i className="ri-circle-fill circle-icon text-info-main w-auto" />
                  Best Practices
                </Link>
              </li>
            </ul>
          </li>

          {/* Examples */}
          <li>
            <Link 
              href="/documentation/examples" 
              className={pathname === "/documentation/examples" ? "active-page" : ""}
            >
              <Icon icon="solar:code-square-outline" className="menu-icon" />
              <span>Code Examples</span>
            </Link>
          </li>

          {/* FAQ */}
          <li>
            <Link 
              href="/documentation/faq" 
              className={pathname === "/documentation/faq" ? "active-page" : ""}
            >
              <Icon icon="solar:question-circle-outline" className="menu-icon" />
              <span>FAQ</span>
            </Link>
          </li>

          {/* Support */}
          <li>
            <Link 
              href="/documentation/support" 
              className={pathname === "/documentation/support" ? "active-page" : ""}
            >
              <Icon icon="solar:support-outline" className="menu-icon" />
              <span>Support</span>
            </Link>
          </li>

          <li className="sidebar-menu-group-title">Main Dashboard</li>

          {/* Back to Dashboard */}
          <li>
            <Link 
              href="/"
            >
              <Icon icon="solar:arrow-left-outline" className="menu-icon" />
              <span>Back to Dashboard</span>
            </Link>
          </li>

        </ul>
      </div>
    </aside>
  );
};

export default DocumentationSidebar;

"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "@/redux/user/slice";

import Sidebar from "../components/sidebar/Sidebar";
import Header from "../components/header/Header";

const MasterLayout = ({ children }) => {
  let pathname = usePathname();
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = usePathname(); // Hook to get the current route
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.authUser);

  // Get current user data from Redux state
  const currentUser = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const handleLogout = () => {
    try {
      // Dispatch Redux logout action which will clear all auth data
      dispatch(logoutAction());
      
      // Clear any additional localStorage items that might exist
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      
      // Force a complete page reload to clear all application state
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error, force navigation to login
      window.location.href = "/sign-in";
    }
  };

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
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      {/* sidebar */}
      <Sidebar 
        sidebarActive={sidebarActive}
        mobileMenu={mobileMenu}
        mobileMenuControl={mobileMenuControl}
        currentUser={currentUser}
      />

      <main
        className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
      >
        <Header
          sidebarActive={sidebarActive}
          sidebarControl={sidebarControl}
          mobileMenuControl={mobileMenuControl}
          currentUser={currentUser}
          handleLogout={handleLogout}
        />

        {/* dashboard-main-body */}
        <div className="dashboard-main-body">{children}</div>

        {/* Footer section */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">© 2025. All Rights Reserved.</p>
            </div>
            <div className="col-auto">
              <p className="mb-0">
                Made by <span className="text-primary-600">Webperts</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;

"use client";
import React, { useState } from "react";
import DocumentationSidebar from "../components/documentation/DocumentationSidebar";

const DocumentationLayout = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
    <section className={mobileMenu ? "overlay active" : "overlay"} style={{ backgroundColor: '#f8fafc' }}>
      {/* Documentation Sidebar */}
      <DocumentationSidebar 
        sidebarActive={sidebarActive}
        mobileMenu={mobileMenu}
        mobileMenuControl={mobileMenuControl}
      />
      
      {/* Main Content Area */}
      <main className={sidebarActive ? "dashboard-main active" : "dashboard-main"} style={{ backgroundColor: '#f8fafc' }}>
        {/* Mobile Menu Button for Documentation */}
        <button
          onClick={mobileMenuControl}
          className="d-lg-none d-block text-primary-600 sidebar-toggle-btn"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1000,
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 12h18m-9 9V3"/>
          </svg>
        </button>

        {/* Documentation Main Body */}
        <div className="dashboard-main-body" style={{ 
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          margin: '20px',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          minHeight: 'calc(100vh - 40px)'
        }}>
          {children}
        </div>

        {/* Documentation Footer */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">© 2025 FX Rates API. All Rights Reserved.</p>
            </div>
            <div className="col-auto">
              <p className="mb-0">
                Made with ❤️ by <span className="text-primary-600">Webperts</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default DocumentationLayout;

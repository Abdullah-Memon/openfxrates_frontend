"use client";
import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const DevelopersHub = () => {
  const quickStartCards = [
    {
      title: "Authentication",
      description: "Learn how to authenticate your API requests using API keys and tokens.",
      icon: "solar:shield-check-outline",
      href: "/documentation/api/authentication",
      color: "#10b981"
    },
    {
      title: "API Endpoints",
      description: "Explore all available endpoints and their parameters for fetching exchange rates.",
      icon: "solar:routing-outline",
      href: "/documentation/api/endpoints",
      color: "#3b82f6"
    },
    {
      title: "Rate Limits",
      description: "Understand API rate limits, quotas, and best practices for efficient usage.",
      icon: "solar:speedometer-outline",
      href: "/documentation/api/rate-limits",
      color: "#f59e0b"
    },
    {
      title: "Error Handling",
      description: "Learn about error codes, status responses, and how to handle API errors.",
      icon: "solar:bug-outline",
      href: "/documentation/api/error-codes",
      color: "#ef4444"
    }
  ];

  const sdkCards = [
    {
      title: "JavaScript SDK",
      description: "Official JavaScript library for Node.js and browser environments.",
      icon: "logos:javascript",
      href: "/documentation/sdk/javascript",
      language: "JavaScript"
    },
    {
      title: "Python SDK",
      description: "Python library with async support and comprehensive error handling.",
      icon: "logos:python",
      href: "/documentation/sdk/python",
      language: "Python"
    },
    {
      title: "PHP SDK",
      description: "PHP library compatible with modern PHP versions and frameworks.",
      icon: "logos:php",
      href: "/documentation/sdk/php",
      language: "PHP"
    },
    {
      title: "Ruby SDK",
      description: "Ruby gem with ActiveRecord integration and Rails compatibility.",
      icon: "logos:ruby",
      href: "/documentation/sdk/ruby",
      language: "Ruby"
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          FX Rates API Documentation
        </h1>
        <p style={{ 
          fontSize: '20px', 
          color: '#64748b', 
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Everything you need to integrate real-time foreign exchange rates into your applications.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Quick Start Guide
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          {quickStartCards.map((card, index) => (
            <Link 
              key={index} 
              href={card.href}
              style={{ 
                textDecoration: 'none',
                display: 'block',
                height: '100%'
              }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: card.color, 
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Icon icon={card.icon} style={{ fontSize: '24px', color: 'white' }} />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#1e293b',
                  marginBottom: '12px'
                }}>
                  {card.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '14px',
                  lineHeight: '1.5',
                  flex: 1
                }}>
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* SDK Section */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Official SDKs & Libraries
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '24px'
        }}>
          {sdkCards.map((card, index) => (
            <Link 
              key={index} 
              href={card.href}
              style={{ 
                textDecoration: 'none',
                display: 'block',
                height: '100%'
              }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '32px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}
              >
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Icon icon={card.icon} style={{ fontSize: '48px' }} />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#1e293b',
                  marginBottom: '12px'
                }}>
                  {card.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '14px',
                  lineHeight: '1.5',
                  flex: 1
                }}>
                  {card.description}
                </p>
                <div style={{
                  marginTop: '16px',
                  padding: '8px 12px',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#475569',
                  alignSelf: 'flex-start'
                }}>
                  {card.language}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div style={{ marginBottom: '64px' }}>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Additional Resources
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px'
        }}>
          <Link 
            href="/documentation/tutorials/quick-start"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Icon icon="solar:book-outline" style={{ fontSize: '24px', color: '#2563eb' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  Tutorials & Guides
                </h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                Step-by-step tutorials and integration guides for common use cases.
              </p>
            </div>
          </Link>

          <Link 
            href="/documentation/examples"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Icon icon="solar:code-square-outline" style={{ fontSize: '24px', color: '#10b981' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  Code Examples
                </h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                Ready-to-use code snippets and examples in multiple programming languages.
              </p>
            </div>
          </Link>

          <Link 
            href="/documentation/support"
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Icon icon="solar:support-outline" style={{ fontSize: '24px', color: '#f59e0b' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                  Support & Help
                </h3>
              </div>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                Get help from our support team and community resources.
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Getting Started CTA */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        border: '1px solid #e2e8f0'
      }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Ready to get started?
        </h2>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          marginBottom: '32px',
          maxWidth: '500px',
          margin: '0 auto 32px'
        }}>
          Create your API key and start integrating real-time exchange rates in minutes.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/app-ids"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            <Icon icon="solar:key-outline" />
            Get API Key
          </Link>
          <Link 
            href="/documentation/tutorials/quick-start"
            style={{
              backgroundColor: 'transparent',
              color: '#2563eb',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              border: '1px solid #2563eb',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#2563eb';
            }}
          >
            <Icon icon="solar:play-outline" />
            Quick Start
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DevelopersHub;

"use client";
import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const EndpointsDoc = () => {
  const endpoints = [
    {
      method: 'GET',
      path: '/v1/latest',
      title: 'Latest Exchange Rates',
      description: 'Get the most recent exchange rates for all supported currencies.',
      parameters: [
        { name: 'base', type: 'string', required: false, description: 'Base currency (default: USD)' },
        { name: 'symbols', type: 'string', required: false, description: 'Comma-separated list of target currencies' },
      ],
      example: `curl -X GET "https://api.fxrates.com/v1/latest?base=USD&symbols=EUR,GBP,JPY" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "timestamp": 1640995200,
  "base": "USD",
  "date": "2024-01-01",
  "rates": {
    "EUR": 0.85234,
    "GBP": 0.73891,
    "JPY": 110.234
  }
}`
    },
    {
      method: 'GET',
      path: '/v1/historical/{date}',
      title: 'Historical Exchange Rates',
      description: 'Get historical exchange rates for a specific date.',
      parameters: [
        { name: 'date', type: 'string', required: true, description: 'Date in YYYY-MM-DD format' },
        { name: 'base', type: 'string', required: false, description: 'Base currency (default: USD)' },
        { name: 'symbols', type: 'string', required: false, description: 'Comma-separated list of target currencies' },
      ],
      example: `curl -X GET "https://api.fxrates.com/v1/historical/2023-12-01?base=USD&symbols=EUR,GBP" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "historical": true,
  "date": "2023-12-01",
  "timestamp": 1701388800,
  "base": "USD",
  "rates": {
    "EUR": 0.85891,
    "GBP": 0.74123
  }
}`
    },
    {
      method: 'GET',
      path: '/v1/timeseries',
      title: 'Time Series Data',
      description: 'Get exchange rate data for a range of dates.',
      parameters: [
        { name: 'start_date', type: 'string', required: true, description: 'Start date in YYYY-MM-DD format' },
        { name: 'end_date', type: 'string', required: true, description: 'End date in YYYY-MM-DD format' },
        { name: 'base', type: 'string', required: false, description: 'Base currency (default: USD)' },
        { name: 'symbols', type: 'string', required: false, description: 'Comma-separated list of target currencies' },
      ],
      example: `curl -X GET "https://api.fxrates.com/v1/timeseries?start_date=2023-12-01&end_date=2023-12-07&symbols=EUR" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "timeseries": true,
  "start_date": "2023-12-01",
  "end_date": "2023-12-07",
  "base": "USD",
  "rates": {
    "2023-12-01": { "EUR": 0.85891 },
    "2023-12-02": { "EUR": 0.85734 },
    "2023-12-03": { "EUR": 0.85456 }
  }
}`
    },
    {
      method: 'GET',
      path: '/v1/currencies',
      title: 'Supported Currencies',
      description: 'Get a list of all supported currencies with their details.',
      parameters: [],
      example: `curl -X GET "https://api.fxrates.com/v1/currencies" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      response: `{
  "success": true,
  "currencies": {
    "USD": {
      "name": "United States Dollar",
      "symbol": "$"
    },
    "EUR": {
      "name": "Euro",
      "symbol": "€"
    },
    "GBP": {
      "name": "British Pound Sterling",
      "symbol": "£"
    }
  }
}`
    }
  ];

  const [activeEndpoint, setActiveEndpoint] = React.useState(0);

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return '#10b981';
      case 'POST': return '#3b82f6';
      case 'PUT': return '#f59e0b';
      case 'DELETE': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      {/* Navigation Breadcrumb */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px', 
        marginBottom: '32px',
        fontSize: '14px',
        color: '#64748b'
      }}>
        <Link href="/documentation" style={{ color: '#2563eb', textDecoration: 'none' }}>
          Documentation
        </Link>
        <Icon icon="solar:alt-arrow-right-outline" style={{ fontSize: '12px' }} />
        <Link href="/documentation/api" style={{ color: '#2563eb', textDecoration: 'none' }}>
          API Reference
        </Link>
        <Icon icon="solar:alt-arrow-right-outline" style={{ fontSize: '12px' }} />
        <span>API Endpoints</span>
      </div>

      {/* Page Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '40px', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          API Endpoints
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Explore all available API endpoints for retrieving foreign exchange rates, historical data, and currency information.
        </p>
      </div>

      {/* Base URL */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Base URL
        </h2>
        <div style={{
          backgroundColor: '#f1f5f9',
          border: '1px solid #cbd5e1',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px'
        }}>
          <code style={{ 
            fontSize: '16px',
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
            color: '#1e293b'
          }}>
            https://api.fxrates.com
          </code>
        </div>
        <p style={{ 
          fontSize: '14px', 
          color: '#64748b',
          lineHeight: '1.5'
        }}>
          All API requests should be made to this base URL with the appropriate endpoint path appended.
        </p>
      </div>

      {/* Endpoints List */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        {/* Left Sidebar - Endpoint List */}
        <div>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: '700', 
            color: '#1e293b',
            marginBottom: '20px'
          }}>
            Available Endpoints
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {endpoints.map((endpoint, index) => (
              <button
                key={index}
                onClick={() => setActiveEndpoint(index)}
                style={{
                  backgroundColor: activeEndpoint === index ? '#eff6ff' : '#ffffff',
                  border: `1px solid ${activeEndpoint === index ? '#2563eb' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    backgroundColor: getMethodColor(endpoint.method),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {endpoint.method}
                  </span>
                  <code style={{
                    fontSize: '14px',
                    fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
                    color: '#1e293b'
                  }}>
                    {endpoint.path}
                  </code>
                </div>
                <h3 style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: '#1e293b',
                  margin: '0 0 4px 0'
                }}>
                  {endpoint.title}
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: '#64748b',
                  margin: 0,
                  lineHeight: '1.4'
                }}>
                  {endpoint.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right Content - Endpoint Details */}
        <div>
          {endpoints[activeEndpoint] && (
            <div>
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span style={{
                    backgroundColor: getMethodColor(endpoints[activeEndpoint].method),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {endpoints[activeEndpoint].method}
                  </span>
                  <code style={{
                    backgroundColor: '#f1f5f9',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
                    color: '#1e293b'
                  }}>
                    {endpoints[activeEndpoint].path}
                  </code>
                </div>
                <h2 style={{ 
                  fontSize: '28px', 
                  fontWeight: '700', 
                  color: '#1e293b',
                  marginBottom: '8px'
                }}>
                  {endpoints[activeEndpoint].title}
                </h2>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {endpoints[activeEndpoint].description}
                </p>
              </div>

              {/* Parameters */}
              {endpoints[activeEndpoint].parameters.length > 0 && (
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: '#1e293b',
                    marginBottom: '16px'
                  }}>
                    Parameters
                  </h3>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'collapse',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f8fafc' }}>
                          <th style={{ 
                            padding: '12px 16px', 
                            textAlign: 'left',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            Name
                          </th>
                          <th style={{ 
                            padding: '12px 16px', 
                            textAlign: 'left',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            Type
                          </th>
                          <th style={{ 
                            padding: '12px 16px', 
                            textAlign: 'left',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            Required
                          </th>
                          <th style={{ 
                            padding: '12px 16px', 
                            textAlign: 'left',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#374151',
                            borderBottom: '1px solid #e2e8f0'
                          }}>
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoints[activeEndpoint].parameters.map((param, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ 
                              padding: '12px 16px',
                              fontSize: '14px',
                              fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
                              color: '#1e293b'
                            }}>
                              {param.name}
                            </td>
                            <td style={{ 
                              padding: '12px 16px',
                              fontSize: '14px',
                              color: '#64748b'
                            }}>
                              <code style={{
                                backgroundColor: '#f1f5f9',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '12px'
                              }}>
                                {param.type}
                              </code>
                            </td>
                            <td style={{ 
                              padding: '12px 16px',
                              fontSize: '14px'
                            }}>
                              <span style={{
                                backgroundColor: param.required ? '#fef3c7' : '#f0fdf4',
                                color: param.required ? '#92400e' : '#166534',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}>
                                {param.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td style={{ 
                              padding: '12px 16px',
                              fontSize: '14px',
                              color: '#64748b'
                            }}>
                              {param.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Example Request */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>
                  Example Request
                </h3>
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '8px',
                  padding: '20px',
                  overflow: 'auto'
                }}>
                  <pre style={{
                    color: '#e2e8f0',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: 0,
                    fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace"
                  }}>
                    {endpoints[activeEndpoint].example}
                  </pre>
                </div>
              </div>

              {/* Example Response */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: '#1e293b',
                  marginBottom: '16px'
                }}>
                  Example Response
                </h3>
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '8px',
                  padding: '20px',
                  overflow: 'auto'
                }}>
                  <pre style={{
                    color: '#e2e8f0',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    margin: 0,
                    fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace"
                  }}>
                    {endpoints[activeEndpoint].response}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '32px',
        border: '1px solid #e2e8f0',
        marginTop: '48px'
      }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Ready to Start?
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Now that you know the available endpoints, learn about rate limits and error handling, or jump into our code examples.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link 
            href="/documentation/api/rate-limits"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon icon="solar:speedometer-outline" />
            Rate Limits
          </Link>
          <Link 
            href="/documentation/examples"
            style={{
              backgroundColor: 'transparent',
              color: '#2563eb',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              border: '1px solid #2563eb',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon icon="solar:code-square-outline" />
            Code Examples
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EndpointsDoc;

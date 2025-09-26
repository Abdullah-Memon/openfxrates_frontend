"use client";
import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const AuthenticationDoc = () => {
  const codeExamples = {
    curl: `curl -X GET "https://api.fxrates.com/v1/latest" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    
    javascript: `const response = await fetch('https://api.fxrates.com/v1/latest', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();`,

    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.fxrates.com/v1/latest', headers=headers)
data = response.json()`,

    php: `<?php
$headers = [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.fxrates.com/v1/latest');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);
?>`
  };

  const [activeTab, setActiveTab] = React.useState('curl');

  return (
    <div style={{ maxWidth: '1000px' }}>
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
        <span>Authentication</span>
      </div>

      {/* Page Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '40px', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          API Authentication
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Learn how to authenticate your API requests using API keys and access tokens to securely access FX Rates API endpoints.
        </p>
      </div>

      {/* Authentication Methods */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Authentication Methods
        </h2>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          The FX Rates API uses API key authentication. You need to include your API key in the request headers for all API calls.
        </p>

        <div style={{
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Icon icon="solar:info-circle-outline" style={{ color: '#2563eb', fontSize: '20px' }} />
            <strong style={{ color: '#1e40af' }}>Getting Your API Key</strong>
          </div>
          <p style={{ color: '#1e40af', margin: 0, fontSize: '14px' }}>
            You can get your API key from the{' '}
            <Link href="/app-ids" style={{ color: '#1d4ed8', textDecoration: 'underline' }}>
              API Keys section
            </Link>
            {' '}in your dashboard. Make sure to keep your API key secure and never expose it in client-side code.
          </p>
        </div>
      </div>

      {/* API Key Authentication */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Bearer Token Authentication
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Include your API key in the <code style={{ 
            backgroundColor: '#f1f5f9', 
            padding: '2px 6px', 
            borderRadius: '4px',
            color: '#1e293b',
            fontSize: '14px'
          }}>Authorization</code> header as a Bearer token:
        </p>

        {/* Code Example Tabs */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            display: 'flex', 
            gap: '2px', 
            marginBottom: '16px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            {Object.keys(codeExamples).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveTab(lang)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: activeTab === lang ? '#f8fafc' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === lang ? '2px solid #2563eb' : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: activeTab === lang ? '#2563eb' : '#64748b',
                  textTransform: 'uppercase'
                }}
              >
                {lang}
              </button>
            ))}
          </div>

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
              {codeExamples[activeTab]}
            </pre>
          </div>
        </div>
      </div>

      {/* Authentication Response */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Authentication Response
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          If authentication is successful, you'll receive a normal API response. If authentication fails, you'll get an error response:
        </p>

        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <pre style={{
            color: '#e2e8f0',
            fontSize: '14px',
            lineHeight: '1.5',
            margin: 0,
            fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace"
          }}>
{`{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid API key provided",
    "details": "The API key is either missing, invalid, or expired"
  }
}`}
          </pre>
        </div>
      </div>

      {/* Security Best Practices */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ 
          fontSize: '24px', 
          fontWeight: '600', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Security Best Practices
        </h3>

        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Icon icon="solar:shield-check-outline" style={{ color: '#10b981', fontSize: '20px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Keep Your API Key Secret
              </h4>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Never expose your API key in client-side code, public repositories, or logs. Use environment variables or secure configuration files.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Icon icon="solar:refresh-outline" style={{ color: '#3b82f6', fontSize: '20px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Rotate API Keys Regularly
              </h4>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Regularly rotate your API keys and immediately revoke any keys that may have been compromised.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <Icon icon="solar:lock-outline" style={{ color: '#f59e0b', fontSize: '20px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Use HTTPS Only
              </h4>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Always make API requests over HTTPS to ensure your API key and data are transmitted securely.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '32px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Next Steps
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Now that you understand authentication, explore the available API endpoints and start building your integration.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link 
            href="/documentation/api/endpoints"
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
            <Icon icon="solar:routing-outline" />
            API Endpoints
          </Link>
          <Link 
            href="/documentation/tutorials/quick-start"
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
            <Icon icon="solar:play-outline" />
            Quick Start Guide
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationDoc;

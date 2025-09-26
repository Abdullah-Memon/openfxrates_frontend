"use client";
import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const ExamplesDoc = () => {
  const examples = [
    {
      title: "Get Latest Exchange Rates",
      description: "Fetch the most current exchange rates for all currencies",
      languages: {
        javascript: `// Using fetch API
const response = await fetch('https://api.fxrates.com/v1/latest', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Latest rates:', data.rates);

// Using axios
import axios from 'axios';

const config = {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
};

const response = await axios.get('https://api.fxrates.com/v1/latest', config);
console.log('Latest rates:', response.data.rates);`,
        
        python: `import requests
import json

# Basic request
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.fxrates.com/v1/latest', headers=headers)
data = response.json()

if data['success']:
    print('Latest rates:', data['rates'])
else:
    print('Error:', data.get('error', 'Unknown error'))

# Using requests session for multiple calls
session = requests.Session()
session.headers.update(headers)

response = session.get('https://api.fxrates.com/v1/latest')
rates = response.json()['rates']`,

        php: `<?php
// Using cURL
function getLatestRates($apiKey) {
    $headers = [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.fxrates.com/v1/latest');
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        return json_decode($response, true);
    }
    
    return false;
}

$rates = getLatestRates('YOUR_API_KEY');
if ($rates && $rates['success']) {
    echo 'Latest rates: ' . json_encode($rates['rates']);
}
?>`,

        ruby: `require 'net/http'
require 'json'
require 'uri'

# Simple GET request
def get_latest_rates(api_key)
  uri = URI('https://api.fxrates.com/v1/latest')
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Get.new(uri)
  request['Authorization'] = "Bearer #{api_key}"
  request['Content-Type'] = 'application/json'
  
  response = http.request(request)
  
  if response.code == '200'
    JSON.parse(response.body)
  else
    nil
  end
end

rates = get_latest_rates('YOUR_API_KEY')
puts "Latest rates: #{rates['rates']}" if rates && rates['success']`
      }
    },
    {
      title: "Convert Currency",
      description: "Convert an amount from one currency to another",
      languages: {
        javascript: `// Currency conversion function
async function convertCurrency(from, to, amount, apiKey) {
  try {
    const response = await fetch(\`https://api.fxrates.com/v1/latest?base=\${from}&symbols=\${to}\`, {
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
      }
    });
    
    const data = await response.json();
    
    if (data.success && data.rates[to]) {
      const convertedAmount = amount * data.rates[to];
      return {
        original: { amount, currency: from },
        converted: { amount: convertedAmount, currency: to },
        rate: data.rates[to],
        timestamp: data.timestamp
      };
    }
    
    throw new Error('Currency not found or API error');
  } catch (error) {
    console.error('Conversion error:', error);
    return null;
  }
}

// Usage
const result = await convertCurrency('USD', 'EUR', 100, 'YOUR_API_KEY');
if (result) {
  console.log(\`\${result.original.amount} \${result.original.currency} = \${result.converted.amount.toFixed(2)} \${result.converted.currency}\`);
}`,

        python: `import requests

def convert_currency(from_currency, to_currency, amount, api_key):
    """Convert amount from one currency to another"""
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    params = {
        'base': from_currency,
        'symbols': to_currency
    }
    
    try:
        response = requests.get(
            'https://api.fxrates.com/v1/latest', 
            headers=headers, 
            params=params
        )
        response.raise_for_status()
        
        data = response.json()
        
        if data['success'] and to_currency in data['rates']:
            rate = data['rates'][to_currency]
            converted_amount = amount * rate
            
            return {
                'original': {'amount': amount, 'currency': from_currency},
                'converted': {'amount': converted_amount, 'currency': to_currency},
                'rate': rate,
                'timestamp': data['timestamp']
            }
        
        return None
        
    except requests.RequestException as e:
        print(f"Error: {e}")
        return None

# Usage
result = convert_currency('USD', 'EUR', 100, 'YOUR_API_KEY')
if result:
    print(f"{result['original']['amount']} {result['original']['currency']} = "
          f"{result['converted']['amount']:.2f} {result['converted']['currency']}")`,

        php: `<?php
function convertCurrency($fromCurrency, $toCurrency, $amount, $apiKey) {
    $url = 'https://api.fxrates.com/v1/latest?' . http_build_query([
        'base' => $fromCurrency,
        'symbols' => $toCurrency
    ]);
    
    $headers = [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        
        if ($data['success'] && isset($data['rates'][$toCurrency])) {
            $rate = $data['rates'][$toCurrency];
            $convertedAmount = $amount * $rate;
            
            return [
                'original' => ['amount' => $amount, 'currency' => $fromCurrency],
                'converted' => ['amount' => $convertedAmount, 'currency' => $toCurrency],
                'rate' => $rate,
                'timestamp' => $data['timestamp']
            ];
        }
    }
    
    return false;
}

// Usage
$result = convertCurrency('USD', 'EUR', 100, 'YOUR_API_KEY');
if ($result) {
    echo $result['original']['amount'] . ' ' . $result['original']['currency'] . 
         ' = ' . round($result['converted']['amount'], 2) . ' ' . $result['converted']['currency'];
}
?>`,

        ruby: `require 'net/http'
require 'json'
require 'uri'

def convert_currency(from_currency, to_currency, amount, api_key)
  uri = URI('https://api.fxrates.com/v1/latest')
  uri.query = URI.encode_www_form({
    base: from_currency,
    symbols: to_currency
  })
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Get.new(uri)
  request['Authorization'] = "Bearer #{api_key}"
  
  response = http.request(request)
  
  if response.code == '200'
    data = JSON.parse(response.body)
    
    if data['success'] && data['rates'][to_currency]
      rate = data['rates'][to_currency]
      converted_amount = amount * rate
      
      return {
        original: { amount: amount, currency: from_currency },
        converted: { amount: converted_amount, currency: to_currency },
        rate: rate,
        timestamp: data['timestamp']
      }
    end
  end
  
  nil
end

# Usage
result = convert_currency('USD', 'EUR', 100, 'YOUR_API_KEY')
if result
  puts "#{result[:original][:amount]} #{result[:original][:currency]} = " \
       "#{result[:converted][:amount].round(2)} #{result[:converted][:currency]}"
end`
      }
    },
    {
      title: "Get Historical Rates",
      description: "Fetch exchange rates for a specific date in the past",
      languages: {
        javascript: `// Get historical rates for a specific date
async function getHistoricalRates(date, base = 'USD', symbols = null, apiKey) {
  try {
    let url = \`https://api.fxrates.com/v1/historical/\${date}?base=\${base}\`;
    if (symbols) {
      url += \`&symbols=\${symbols}\`;
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': \`Bearer \${apiKey}\`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      return {
        date: data.date,
        base: data.base,
        rates: data.rates,
        timestamp: data.timestamp
      };
    }
    
    throw new Error('Failed to fetch historical rates');
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Usage - Get EUR and GBP rates for December 1, 2023
const historicalRates = await getHistoricalRates('2023-12-01', 'USD', 'EUR,GBP', 'YOUR_API_KEY');
if (historicalRates) {
  console.log(\`Rates for \${historicalRates.date}:\`, historicalRates.rates);
}

// Compare rates between two dates
async function compareRates(date1, date2, base, symbols, apiKey) {
  const [rates1, rates2] = await Promise.all([
    getHistoricalRates(date1, base, symbols, apiKey),
    getHistoricalRates(date2, base, symbols, apiKey)
  ]);
  
  if (rates1 && rates2) {
    const comparison = {};
    Object.keys(rates1.rates).forEach(currency => {
      const rate1 = rates1.rates[currency];
      const rate2 = rates2.rates[currency];
      const change = ((rate2 - rate1) / rate1) * 100;
      
      comparison[currency] = {
        from: rate1,
        to: rate2,
        change: change.toFixed(2) + '%'
      };
    });
    
    return comparison;
  }
  
  return null;
}`,

        python: `import requests
from datetime import datetime, timedelta

def get_historical_rates(date, base='USD', symbols=None, api_key=None):
    """Get historical exchange rates for a specific date"""
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    params = {
        'base': base
    }
    
    if symbols:
        params['symbols'] = symbols
    
    url = f'https://api.fxrates.com/v1/historical/{date}'
    
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        
        data = response.json()
        
        if data['success']:
            return {
                'date': data['date'],
                'base': data['base'],
                'rates': data['rates'],
                'timestamp': data['timestamp']
            }
        
        return None
        
    except requests.RequestException as e:
        print(f"Error: {e}")
        return None

# Usage
historical_rates = get_historical_rates('2023-12-01', 'USD', 'EUR,GBP', 'YOUR_API_KEY')
if historical_rates:
    print(f"Rates for {historical_rates['date']}:", historical_rates['rates'])

# Get rates for the last 7 days
def get_week_rates(base='USD', symbols=None, api_key=None):
    """Get rates for the past week"""
    rates_history = {}
    
    for i in range(7):
        date = (datetime.now() - timedelta(days=i+1)).strftime('%Y-%m-%d')
        rates = get_historical_rates(date, base, symbols, api_key)
        
        if rates:
            rates_history[date] = rates['rates']
    
    return rates_history

# Usage
week_rates = get_week_rates('USD', 'EUR,GBP', 'YOUR_API_KEY')
for date, rates in week_rates.items():
    print(f"{date}: {rates}")`,

        php: `<?php
function getHistoricalRates($date, $base = 'USD', $symbols = null, $apiKey) {
    $url = 'https://api.fxrates.com/v1/historical/' . $date;
    
    $params = ['base' => $base];
    if ($symbols) {
        $params['symbols'] = $symbols;
    }
    
    $url .= '?' . http_build_query($params);
    
    $headers = [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200) {
        $data = json_decode($response, true);
        
        if ($data['success']) {
            return [
                'date' => $data['date'],
                'base' => $data['base'],
                'rates' => $data['rates'],
                'timestamp' => $data['timestamp']
            ];
        }
    }
    
    return false;
}

// Usage
$historicalRates = getHistoricalRates('2023-12-01', 'USD', 'EUR,GBP', 'YOUR_API_KEY');
if ($historicalRates) {
    echo "Rates for {$historicalRates['date']}: " . json_encode($historicalRates['rates']);
}

// Get average rate over multiple days
function getAverageRate($startDate, $endDate, $fromCurrency, $toCurrency, $apiKey) {
    $start = new DateTime($startDate);
    $end = new DateTime($endDate);
    $interval = new DateInterval('P1D');
    $period = new DatePeriod($start, $interval, $end);
    
    $rates = [];
    foreach ($period as $date) {
        $dateStr = $date->format('Y-m-d');
        $data = getHistoricalRates($dateStr, $fromCurrency, $toCurrency, $apiKey);
        
        if ($data && isset($data['rates'][$toCurrency])) {
            $rates[] = $data['rates'][$toCurrency];
        }
    }
    
    return count($rates) > 0 ? array_sum($rates) / count($rates) : false;
}
?>`,

        ruby: `require 'net/http'
require 'json'
require 'uri'
require 'date'

def get_historical_rates(date, base = 'USD', symbols = nil, api_key)
  uri = URI("https://api.fxrates.com/v1/historical/#{date}")
  
  params = { base: base }
  params[:symbols] = symbols if symbols
  
  uri.query = URI.encode_www_form(params)
  
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  
  request = Net::HTTP::Get.new(uri)
  request['Authorization'] = "Bearer #{api_key}"
  
  response = http.request(request)
  
  if response.code == '200'
    data = JSON.parse(response.body)
    
    if data['success']
      return {
        date: data['date'],
        base: data['base'],
        rates: data['rates'],
        timestamp: data['timestamp']
      }
    end
  end
  
  nil
end

# Usage
historical_rates = get_historical_rates('2023-12-01', 'USD', 'EUR,GBP', 'YOUR_API_KEY')
if historical_rates
  puts "Rates for #{historical_rates[:date]}: #{historical_rates[:rates]}"
end

# Get rates for a range of dates
def get_rate_trend(start_date, end_date, base, target_currency, api_key)
  start_date = Date.parse(start_date)
  end_date = Date.parse(end_date)
  
  trend = {}
  
  (start_date..end_date).each do |date|
    date_str = date.strftime('%Y-%m-%d')
    rates = get_historical_rates(date_str, base, target_currency, api_key)
    
    if rates && rates[:rates][target_currency]
      trend[date_str] = rates[:rates][target_currency]
    end
  end
  
  trend
end`
      }
    }
  ];

  const [selectedExample, setSelectedExample] = React.useState(0);
  const [selectedLanguage, setSelectedLanguage] = React.useState('javascript');

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
        <span>Code Examples</span>
      </div>

      {/* Page Header */}
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '40px', 
          fontWeight: '800', 
          color: '#1e293b',
          marginBottom: '16px'
        }}>
          Code Examples
        </h1>
        <p style={{ 
          fontSize: '18px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Ready-to-use code snippets and examples for integrating FX Rates API in multiple programming languages.
        </p>
      </div>

      {/* Example Navigation */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setSelectedExample(index)}
              style={{
                padding: '12px 20px',
                backgroundColor: selectedExample === index ? '#2563eb' : '#ffffff',
                color: selectedExample === index ? 'white' : '#64748b',
                border: `1px solid ${selectedExample === index ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

      {/* Example Content */}
      {examples[selectedExample] && (
        <div>
          {/* Example Description */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#1e293b',
              marginBottom: '8px'
            }}>
              {examples[selectedExample].title}
            </h2>
            <p style={{ 
              fontSize: '16px', 
              color: '#64748b',
              lineHeight: '1.6'
            }}>
              {examples[selectedExample].description}
            </p>
          </div>

          {/* Language Tabs */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ 
              display: 'flex', 
              gap: '2px', 
              marginBottom: '16px',
              borderBottom: '1px solid #e2e8f0',
              flexWrap: 'wrap'
            }}>
              {Object.keys(examples[selectedExample].languages).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: selectedLanguage === lang ? '#f8fafc' : 'transparent',
                    border: 'none',
                    borderBottom: selectedLanguage === lang ? '2px solid #2563eb' : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: selectedLanguage === lang ? '#2563eb' : '#64748b',
                    textTransform: 'capitalize',
                    minWidth: '80px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {lang === 'javascript' && <Icon icon="logos:javascript" style={{ fontSize: '16px' }} />}
                    {lang === 'python' && <Icon icon="logos:python" style={{ fontSize: '16px' }} />}
                    {lang === 'php' && <Icon icon="logos:php" style={{ fontSize: '16px' }} />}
                    {lang === 'ruby' && <Icon icon="logos:ruby" style={{ fontSize: '16px' }} />}
                    {lang}
                  </div>
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '12px',
              padding: '24px',
              overflow: 'auto',
              position: 'relative'
            }}>
              <button
                onClick={() => navigator.clipboard.writeText(examples[selectedExample].languages[selectedLanguage])}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: '#374151',
                  color: '#e5e7eb',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Icon icon="solar:copy-outline" />
                Copy
              </button>
              <pre style={{
                color: '#e2e8f0',
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace",
                paddingRight: '80px'
              }}>
                {examples[selectedExample].languages[selectedLanguage]}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div style={{ marginTop: '64px', marginBottom: '48px' }}>
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#1e293b',
          marginBottom: '24px'
        }}>
          Integration Tips
        </h2>
        
        <div style={{ display: 'grid', gap: '20px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Icon icon="solar:shield-check-outline" style={{ color: '#10b981', fontSize: '24px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Error Handling
              </h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
              Always implement proper error handling for API requests. Check the response status and handle network errors, 
              rate limits, and invalid API keys gracefully in your application.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Icon icon="solar:speedometer-outline" style={{ color: '#f59e0b', fontSize: '24px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Rate Limiting
              </h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
              Be mindful of API rate limits. Implement caching for frequently requested data and consider using 
              batch requests when possible to optimize your API usage.
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Icon icon="solar:database-outline" style={{ color: '#3b82f6', fontSize: '24px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                Data Caching
              </h3>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
              Cache exchange rate data when appropriate to improve performance and reduce API calls. 
              Consider the frequency of rate updates for your use case.
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
          Need More Help?
        </h3>
        <p style={{ 
          fontSize: '16px', 
          color: '#64748b',
          lineHeight: '1.6',
          marginBottom: '24px'
        }}>
          Check out our SDKs for easier integration, or explore more detailed tutorials and API documentation.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link 
            href="/documentation/sdk/javascript"
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
            <Icon icon="solar:library-outline" />
            Browse SDKs
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
            <Icon icon="solar:book-outline" />
            Read Tutorials
          </Link>
          <Link 
            href="/documentation/support"
            style={{
              backgroundColor: 'transparent',
              color: '#64748b',
              padding: '10px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              border: '1px solid #cbd5e1',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Icon icon="solar:support-outline" />
            Get Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamplesDoc;

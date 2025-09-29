"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from "@/components/cards/CardWrapper";

const CurrenciesPage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample currencies data - in a real app, this would come from an API
  const sampleCurrencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "DKK", name: "Danish Krone", symbol: "kr" },
    { code: "PLN", name: "Polish Zloty", symbol: "zł" },
    { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchCurrencies = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch from your API here
        // const response = await fetch('/api/currencies');
        // const data = await response.json();
        
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setCurrencies(sampleCurrencies);
        setError(null);
      } catch (err) {
        setError("Failed to load currencies");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  // Filter currencies based on search term
  const filteredCurrencies = currencies.filter(
    currency =>
      currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
        <div className="card-body p-40">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading supported currencies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
        <div className="card-body p-40">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <Icon icon="mingcute:warning-line" className="fs-4 me-2" />
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
        <div className="card-body p-40">
          <div className="row justify-content-center">
            <div className="col-xxl-12">
              <div className="text-center mb-40">
                <h4 className="mb-16">Supported Currencies</h4>
                <p className="mb-0 text-lg text-secondary-light">
                  Browse all currencies supported by OpenFXRates API. Access exchange rates for over 200+ global currencies including major and minor pairs.
                </p>
              </div>

              {/* Search Bar */}
              <div className="row mb-32">
                <div className="col-md-6 mx-auto">
                  <div className="position-relative">
                    <Icon 
                      icon="mingcute:search-line" 
                      className="position-absolute top-50 start-0 translate-middle-y ms-16 text-secondary-light"
                    />
                    <input
                      type="text"
                      className="form-control ps-48 h-48 radius-8"
                      placeholder="Search currencies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Currency Grid */}
              <div className="row">
                {filteredCurrencies.map((currency) => (
                  <div key={currency.code} className="col-xl-3 col-lg-4 col-md-6 mb-24">
                    <Card className="h-100">
                      <div className="card-body p-24 text-center">
                        <div className="mb-16">
                          <div className="w-56 h-56 bg-primary-50 radius-12 d-flex align-items-center justify-content-center mx-auto mb-16">
                            <span className="text-primary-600 fw-bold fs-24">
                              {currency.symbol}
                            </span>
                          </div>
                          <h6 className="mb-4 fw-semibold text-primary-light">
                            {currency.code}
                          </h6>
                          <p className="mb-0 text-secondary-light text-sm">
                            {currency.name}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {filteredCurrencies.length === 0 && (
                <div className="text-center py-40">
                  <Icon icon="mingcute:search-line" className="fs-48 text-secondary-light mb-16" />
                  <h6 className="mb-8">No currencies found</h6>
                  <p className="text-secondary-light">
                    Try adjusting your search terms
                  </p>
                </div>
              )}

              {/* Statistics */}
              <div className="row mt-40">
                <div className="col-12">
                  <div className="bg-primary-50 radius-12 p-24 text-center">
                    <div className="row">
                      <div className="col-md-4">
                        <h4 className="text-primary-600 mb-4">{currencies.length}+</h4>
                        <p className="mb-0 text-secondary-light">Supported Currencies</p>
                      </div>
                      <div className="col-md-4">
                        <h4 className="text-primary-600 mb-4">Real-time</h4>
                        <p className="mb-0 text-secondary-light">Exchange Rates</p>
                      </div>
                      <div className="col-md-4">
                        <h4 className="text-primary-600 mb-4">99.9%</h4>
                        <p className="mb-0 text-secondary-light">Uptime Guarantee</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrenciesPage;
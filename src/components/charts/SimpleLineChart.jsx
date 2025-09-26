"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SimpleLineChart = ({
  id = "simpleLineChart",
  series = [],
  height = 264,
  strokeWidth = 3,
  strokeColor = "#487FFF",
  fillGradient = true,
  showGrid = true,
  showDataLabels = false,
  showToolbar = false,
  categories = [],
  title = "",
  className = "",
}) => {
  const chartOptions = {
    chart: {
      height: height,
      type: "line",
      toolbar: {
        show: showToolbar,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: false,
      },
    },
    title: {
      text: title,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#1f2937",
      },
    },
    fill: {
      type: fillGradient ? "gradient" : "solid",
      gradient: fillGradient
        ? {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.3,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          }
        : {},
    },
    dataLabels: {
      enabled: showDataLabels,
    },
    stroke: {
      curve: "smooth",
      colors: [strokeColor],
      width: strokeWidth,
    },
    grid: {
      show: showGrid,
      borderColor: "#D1D5DB",
      strokeDashArray: 4,
      position: "back",
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: series.length > 1,
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#374151",
      },
    },
    colors: [strokeColor],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className={className}>
      <ReactApexChart
        id={id}
        options={chartOptions}
        series={series}
        type="line"
        height={height}
      />
    </div>
  );
};

export default SimpleLineChart;

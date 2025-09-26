"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ColumnChart = ({
  id = "columnChart",
  series = [],
  height = 264,
  columnWidth = "23%",
  borderRadius = 8,
  showGrid = true,
  showDataLabels = false,
  showToolbar = false,
  categories = [],
  title = "",
  className = "",
  colors = ["#487FFF"],
  horizontal = false,
  yAxisFormatter = null,
  tooltipFormatter = null,
}) => {
  const chartOptions = {
    chart: {
      type: "bar",
      height: height,
      toolbar: {
        show: showToolbar,
      },
    },
    plotOptions: {
      bar: {
        horizontal: horizontal,
        borderRadius: borderRadius,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        columnWidth: columnWidth,
        endingShape: "rounded",
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
    dataLabels: {
      enabled: showDataLabels,
    },
    fill: {
      type: "gradient",
      colors: colors,
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: colors,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    grid: {
      show: showGrid,
      borderColor: "#D1D5DB",
      strokeDashArray: 4,
      position: "back",
    },
    xaxis: {
      type: "category",
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
        formatter: yAxisFormatter || function (value) {
          return (value / 1000).toFixed(0) + "k";
        },
      },
    },
    tooltip: {
      y: {
        formatter: tooltipFormatter || function (value) {
          return (value / 1000).toFixed(1) + "k";
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
    colors: colors,
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
          plotOptions: {
            bar: {
              columnWidth: "40%",
            },
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
        type="bar"
        height={height}
      />
    </div>
  );
};

export default ColumnChart;

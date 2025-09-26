"use client"

import React, { useState, useEffect } from "react";
import SimpleTable from "@/components/shared/tables/SimpleTable";
import TableColumns from "./table-columns";

const ActiveAppIdsTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableFormattedData, setTableFormattedData] = useState({ headers: [], rows: [] });
  const [tableActions, setTableActions] = useState([]);

  // Original raw data
  const data = [
    {
      id: 3,
      name: "Mobile App iOS",
      appId: "63aa5e112k524op79f044b68dd6d9876",
      createdDate: "2025-09-05",
      LastUsed: "2025-09-10",
    },
    {
      id: 4,
      name: "Web Dashboard",
      appId: "63aa5e112k524op79f044b68dd6d1234",
      createdDate: "2025-09-01",
      LastUsed: null,
    }
  ];

  // Action handlers
  const handleView = (app) => {
    console.log("View app:", app);
    alert(`View details for: ${app.name}`);
  };

  const handleEdit = (app) => {
    console.log("Edit app:", app);
    alert(`Edit: ${app.name}`);
  };

  const handleRegenerate = (app) => {
    console.log("Regenerate App ID for:", app);
    alert(`Regenerating App ID for: ${app.name}`);
  };

  const handleDelete = (appId) => {
    console.log("Delete app with ID:", appId);
    alert(`Deleted app with ID: ${appId}`);
  };

  // Get column definitions
  const columns = TableColumns({ 
    handleDelete, 
    handleEdit, 
    handleView, 
    handleRegenerate 
  });

  // Format data for SimpleTable
  const formatDataForTable = (rawData) => {
    const headers = columns.map(col => ({
      label: col.header,
      key: col.accessorKey,
      className: col.className || ""
    }));

    const rows = rawData.map(item => 
      columns.map(col => {
        if (col.cell) {
          // Use the cell renderer
          return col.cell({ getValue: () => item[col.accessorKey], row: { original: item } });
        }
        return item[col.accessorKey];
      })
    );

    return { headers, rows };
  };

  // Simulate loading and format data
  useEffect(() => {
    const loadAndFormatData = async () => {
      setIsLoading(true);
      
      // Simulate API loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Format data using column definitions
      const formattedData = formatDataForTable(data);
      setTableFormattedData(formattedData);
      setIsLoading(false);
    };

    loadAndFormatData();
  }, []);

  // Handle row click
  const handleRowClick = (rowData, rowIndex) => {
    console.log("App row clicked:", rowData);
    console.log("Row index:", rowIndex);
    
    // You can add navigation logic here
    // For example: router.push(`/app-details/${rowData.id}`);
  };

  return (
    <div className="row">
      <div className="col-12">
        <SimpleTable
          data={tableFormattedData}
          onRowClick={handleRowClick}
          pagination={true}
          pageLength={10}
          lengthChange={true}
          searching={false}
          ordering={true}
          info={true}
          isLoading={isLoading}
        //   title="App IDs Management"
        //   showCheckbox={true}
          tableId="appIdsTable"
          className="app-ids-table"
        />
      </div>
    </div>
  );
};

export default ActiveAppIdsTable;

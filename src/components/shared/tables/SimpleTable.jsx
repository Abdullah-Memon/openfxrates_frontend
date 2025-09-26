"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const loadJQueryAndDataTables = async () => {
  const $ = (await import("jquery")).default;
  await import("datatables.net-dt/js/dataTables.dataTables.js");
  return $;
};

const SimpleTable = ({
  data = { headers: [], rows: [] },
  onRowClick = null,
  pagination = true,  
  pageLength = 10,
  pagingType = "simple_numbers",
  lengthChange = true,
  searching = true,
  ordering = true,
  info = true,
  isLoading = false,
  title = "",
  className = "",
  tableId = "simpleTable",
  showCheckbox = false,
  actions = null, // Array of action objects: [{ icon: 'iconamoon:eye-light', onClick: (row) => {}, className: 'bg-primary-light text-primary-600' }]
}) => {
  const tableRef = useRef(null);
  const [dataTable, setDataTable] = useState(null);

  useEffect(() => {
    if (!isLoading && data.rows.length > 0) {
      let table;
      loadJQueryAndDataTables()
        .then(($) => {
          window.$ = window.jQuery = $;
          
          // Destroy existing DataTable if it exists
          if (dataTable) {
            dataTable.destroy(true);
          }

          // Initialize DataTable with custom options
          table = $(`#${tableId}`).DataTable({
            pageLength: pageLength,
            paging: pagination,
            pagingType: pagingType,
            // lengthChange: lengthChange, // Commented out - hides "entries per page" dropdown
            lengthChange: false, // Force hide entries per page section
            searching: searching,
            ordering: ordering,
            info: info,
            autoWidth: false,
            responsive: true,
            language: {
              paginate: {
                previous: '<i class="ri-arrow-left-line"></i>',
                next: '<i class="ri-arrow-right-line"></i>'
              }
            }
          });

          setDataTable(table);

          // Add row click handler if provided
          if (onRowClick) {
            $(`#${tableId} tbody`).on('click', 'tr', function() {
              const rowData = table.row(this).data();
              if (rowData) {
                // Convert row data array to object using headers as keys
                const rowObject = {};
                data.headers.forEach((header, index) => {
                  rowObject[header.key || header.label] = data.rows[table.row(this).index()][index];
                });
                onRowClick(rowObject, table.row(this).index());
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error loading jQuery or DataTables:", error);
        });

      return () => {
        // Cleanup DataTable instance
        if (table) {
          table.destroy(true);
        }
      };
    }
  }, [data, isLoading, pageLength, pagination, onRowClick, tableId]);

  // Handle action clicks
  const handleActionClick = (actionFn, rowData, rowIndex, event) => {
    event.stopPropagation(); // Prevent row click when action is clicked
    if (actionFn) {
      const rowObject = {};
      data.headers.forEach((header, index) => {
        rowObject[header.key || header.label] = rowData[index];
      });
      actionFn(rowObject, rowIndex);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <span className="ms-3">Loading data...</span>
    </div>
  );

  return (
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className={`table-responsive ${className}`}>
            <table
              ref={tableRef}
              className="table bordered-table mb-0"
              id={tableId}
              data-page-length={pageLength}
            >
              <thead>
                <tr>
                  {showCheckbox && (
                    <th scope="col">
                      <div className="form-check style-check d-flex align-items-center">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">S.L</label>
                      </div>
                    </th>
                  )}
                  {data.headers.map((header, index) => (
                    <th 
                      key={index} 
                      scope="col"
                      className={header.className || ""}
                    >
                      {header.label}
                    </th>
                  ))}
                  {actions && actions.length > 0 && (
                    <th scope="col">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className={onRowClick ? "cursor-pointer" : ""}
                  >
                    {showCheckbox && (
                      <td>
                        <div className="form-check style-check d-flex align-items-center">
                          <input className="form-check-input" type="checkbox" />
                          <label className="form-check-label">{rowIndex + 1}</label>
                        </div>
                      </td>
                    )}
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        {typeof cell === 'object' && cell !== null ? (
                          // Handle complex cell content (JSX, objects, etc.)
                          cell
                        ) : (
                          // Handle simple text content
                          cell
                        )}
                      </td>
                    ))}
                    {actions && actions.length > 0 && (
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {actions.map((action, actionIndex) => (
                            <button
                              key={actionIndex}
                              type="button"
                              className={`w-32-px h-32-px rounded-circle d-inline-flex align-items-center justify-content-center border-0 ${action.className || 'bg-primary-light text-primary-600'}`}
                              onClick={(e) => handleActionClick(action.onClick, row, rowIndex, e)}
                              title={action.title || ""}
                            >
                              <Icon icon={action.icon} />
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  );
};

export default SimpleTable;
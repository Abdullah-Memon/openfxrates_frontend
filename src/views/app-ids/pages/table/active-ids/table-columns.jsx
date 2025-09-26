import React, { useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const TableColumns = ({
  handleDelete,
  handleEdit,
  handleView,
  handleRegenerate,
}) => {
  const columns = useMemo(
    () => [
      // {
      //   header: "ID",
      //   accessorKey: "id",
      //   cell: ({ getValue }) => <span className="fw-medium">{getValue()}</span>,
      // },
      {
        header: "App Name",
        accessorKey: "name",
        cell: ({ getValue, row }) => (
          <div className="d-flex align-items-center">
            <p className="text-md mb-0 fw-medium">{getValue()}</p>
          </div>
        ),
      },
      {
        header: "App ID",
        accessorKey: "appId",
        cell: ({ getValue }) => (
          <div className="d-flex align-items-center">
            <code className="bg-neutral-50 text-neutral-600 px-8 py-4 rounded text-sm me-8">
              {getValue()}
            </code>
            <button
              type="button"
              className="btn btn-sm btn-outline-primary border-0 p-1"
              onClick={() => {
                navigator.clipboard.writeText(getValue());
                // You can add toast notification here
              }}
              title="Copy App ID"
            >
              <Icon icon="solar:copy-outline" className="text-sm" />
            </button>
          </div>
        ),
      },
      {
        header: "Created Date",
        accessorKey: "createdDate",
        cell: ({ getValue }) => (
          <span>
            {new Date(getValue()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        ),
      },
      {
        header: "Last Used",
        accessorKey: "LastUsed",
        cell: ({ getValue }) =>
          getValue() ? (
            <span>
              {new Date(getValue()).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          ) : (
            <span className="text-secondary-light">Never used</span>
          ),
      },
      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   cell: ({ row }) => {
      //     const lastUsed = row.original.LastUsed;
      //     return lastUsed ? (
      //       <span className="bg-success-focus text-success-main px-16 py-4 rounded-pill fw-medium text-sm">
      //         <Icon icon="solar:check-circle-outline" className="me-4" />
      //         Active
      //       </span>
      //     ) : (
      //       <span className="bg-warning-focus text-warning-main px-16 py-4 rounded-pill fw-medium text-sm">
      //         <Icon icon="solar:clock-circle-outline" className="me-4" />
      //         Inactive
      //       </span>
      //     );
      //   },
      // },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to delete "${row.original.name}"? This action cannot be undone.`
                  )
                ) {
                  handleDelete && handleDelete(row.original.id);
                }
              }}
              title="Delete App"
            >
              <Icon icon="solar:trash-bin-trash-outline" />
              Deactivate
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit, handleView, handleRegenerate]
  );

  return columns;
};

export default TableColumns;

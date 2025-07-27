import React, { useState, useEffect, useMemo } from 'react';
import Swal from 'sweetalert2';
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Shared/Loading/Loading';

const STATUS_OPTIONS = ['pending', 'inprogress', 'done', 'canceled'];

const MyDonationRequests = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [data, setData] = useState([]);
    const [statusFilter, setStatusFilter] = useState(''); // '' means no filter
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    // Fetch data function
    const fetchData = async () => {
        if (!user?.email) return;

        setLoading(true);
        try {
            // Get all donation requests by this user (you can adjust limit if backend supports)
            const res = await axiosSecure.get('/donation-requests', {
                params: { email: user.email },
            });
            setData(res.data);
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to fetch donation requests', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user?.email]);

    // Filter data based on status filter
    const filteredData = useMemo(() => {
        if (!statusFilter) return data;
        return data.filter((d) => d.status === statusFilter);
    }, [data, statusFilter]);

    // Table columns - adjust columns based on your "recent donation request" section
    const columns = useMemo(
        () => [
            {
                header: 'Recipient',
                accessorKey: 'recipientName',
            },
            {
                header: 'District',
                accessorKey: 'recipientDistrict',
            },
            {
                header: 'Upazila',
                accessorKey: 'recipientUpazila',
            },
            {
                header: 'Hospital',
                accessorKey: 'hospitalName',
            },
            {
                header: 'Blood Group',
                accessorKey: 'bloodGroup',
            },
            {
                header: 'Donation Date',
                accessorKey: 'donationDate',
            },
            {
                header: 'Donation Time',
                accessorKey: 'donationTime',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: info => info.getValue().toUpperCase(),
            },
            {
                header: 'Requested At',
                accessorKey: 'createdAt',
                cell: info => new Date(info.getValue()).toLocaleString(),
            },
        ],
        []
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / pageSize),
        state: {
            pagination: { pageIndex, pageSize },
        },
        onPaginationChange: (updater) => {
            const newPagination = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(newPagination.pageIndex);
            setPageSize(newPagination.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="max-w-6xl mx-auto p-6 bg-base-100 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">My Donation Requests</h2>

            {/* Status Filter */}
            <div className="mb-4 flex items-center gap-4">
                <label htmlFor="statusFilter" className="font-semibold">
                    Filter by Status:
                </label>
                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => {
                        setPageIndex(0); // reset to first page on filter change
                        setStatusFilter(e.target.value);
                    }}
                    className="select select-bordered max-w-xs"
                >
                    <option value="">All</option>
                    {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <Loading />
            ) : filteredData.length === 0 ? (
                <p>No donation requests found.</p>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => (
                                    <tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4 space-x-2">
                        <button
                            className="btn btn-sm"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<<'}
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            {'<'}
                        </button>
                        <span>
                            Page{' '}
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </strong>
                        </span>
                        <button
                            className="btn btn-sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>'}
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                            disabled={!table.getCanNextPage()}
                        >
                            {'>>'}
                        </button>

                        <select
                            className="select select-bordered select-sm max-w-xs"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPageIndex(0);
                            }}
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyDonationRequests;
import React, { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';
import useDistricts from '../../hooks/useDistricts';
import Loading from '../Shared/Loading/Loading'; 
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SearchDonors = () => {
    const { register, handleSubmit, watch, reset } = useForm();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const axiosInstance = useAxios();
    const { data: districts = [], isLoading: loadingDistricts, isError: errorDistricts } = useDistricts();
    const [upazilas, setUpazilas] = useState([]);

    // Watch for changes in the selected district name from the form
    const selectedDistrictName = watch('district');

    // Handle change in district selection to update upazilas
    const handleDistrictChange = (e) => {
        register('district').onChange(e);

        const selectedDistrictValue = e.target.value;
        const foundDistrict = districts.find(d => d.district === selectedDistrictValue);
        setUpazilas(foundDistrict?.upazilas || []);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setError(null);
        setSearchPerformed(true);
        setSearchResults([]); // Clear previous results

        try {
            const params = {};
            if (data.bloodGroup) params.bloodGroup = data.bloodGroup;
            if (data.district) params.district = data.district;
            if (data.upazila) params.upazila = data.upazila;

            const response = await axiosInstance.get('/donors/search', { params });
            setSearchResults(response.data);
        } catch (err) {
            console.error("Error fetching donor data:", err);
            setError("Failed to fetch donor data. Please try again.");
            setSearchResults([]); // Ensure no old data remains on error
        } finally {
            setLoading(false);
        }
    };

    // Define columns for Tanstack Table (used for display in HTML)
    const columns = useMemo(
        () => [
            {
                accessorFn: (row, index) => index + 1,
                header: '#',
                cell: (info) => info.row.index + 1,
            },
            {
                accessorKey: 'name',
                header: 'Name',
                cell: (info) => info.row.original.name || 'N/A',
            },
            {
                accessorKey: 'bloodGroup',
                header: 'Blood Group',
                cell: (info) => <span className="font-bold text-primary">{info.row.original.bloodGroup || 'N/A'}</span>,
            },
            {
                accessorKey: 'district',
                header: 'District',
                cell: (info) => info.row.original.district || 'N/A',
            },
            {
                accessorKey: 'upazila',
                header: 'Upazila',
                cell: (info) => info.row.original.upazila || 'N/A',
            },
            {
                accessorKey: 'contactNumber',
                header: 'Contact',
                cell: (info) => info.row.original.contactNumber || 'N/A',
            },
            {
                accessorKey: 'createdAt',
                header: 'Date',
                cell: (info) => new Date(info.row.original.createdAt).toLocaleDateString() || 'N/A',
            },
        ],
        []
    );

    const table = useReactTable({
        data: searchResults,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    // Function to generate PDF from search results using jsPDF
    const generatePDF = () => {
        const doc = new jsPDF();

        // Check if autoTable is available
        if (typeof doc.autoTable === 'function') {
            console.log('autoTable is available');
        } else {
            console.log('autoTable is NOT available');
        }

        doc.setFontSize(18);
        doc.text('Test PDF', 14, 22);

        // Define columns and data for the table
        const tableColumns = ['#', 'Name', 'Blood Group', 'District', 'Upazila'];
        const tableData = [
            [1, 'John Doe', 'A+', 'District A', 'Upazila 1'],
            [2, 'Jane Smith', 'O+', 'District B', 'Upazila 2'],
        ];

        // Generate table in the PDF using autoTable
        doc.autoTable({
            head: [tableColumns],
            body: tableData,
            startY: 30,  // Where the table starts
        });

        // Save the generated PDF
        doc.save('test.pdf');
    };


    return (
        <div className="container mx-auto py-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">Find Donors</h1>

            {/* Search Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="bg-base-100 p-8 rounded-lg shadow-xl mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 mb-6">
                    {/* Blood Group Selector */}
                    <div>
                        <label className="label">
                            <span className="label-text text-lg font-medium">Blood Group</span>
                        </label>
                        <select
                            {...register('bloodGroup')}
                            className="select select-bordered w-full rounded-lg focus:ring focus:ring-primary focus:border-primary"
                        >
                            <option value="">Select Blood Group</option>
                            {bloodGroups.map((group) => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>

                    {/* District Selector */}
                    <div>
                        <label className="label">
                            <span className="label-text text-lg font-medium">District</span>
                        </label>
                        <select
                            {...register('district')}
                            onChange={handleDistrictChange}
                            className="select select-bordered w-full rounded-lg focus:ring focus:ring-primary focus:border-primary"
                            disabled={loadingDistricts}
                        >
                            <option value="">
                                {loadingDistricts ? 'Loading Districts...' : 'Select District'}
                            </option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.district}>{district.district}</option>
                            ))}
                        </select>
                        {errorDistricts && <p className="text-error text-sm mt-1">Failed to load districts.</p>}
                    </div>

                    {/* Upazila Selector */}
                    <div>
                        <label className="label">
                            <span className="label-text text-lg font-medium">Upazila</span>
                        </label>
                        <select
                            {...register('upazila')}
                            className="select select-bordered w-full rounded-lg focus:ring focus:ring-primary focus:border-primary"
                            disabled={!selectedDistrictName || upazilas.length === 0}
                        >
                            <option value="">{selectedDistrictName && upazilas.length === 0 ? 'No Upazilas for this District' : 'Select Upazila'}</option>
                            {upazilas.map((u, idx) => (
                                <option key={idx} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>

                    {/* Search Button */}
                    <div className="">
                        <button
                            type="submit"
                            className="btn btn-primary w-full sm:w-auto btn-lg rounded-sm px-12 py-3 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    Searching <Loading />
                                </>
                            ) : (
                                'Search Donors'
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Search Results Display */}
            <div className="mt-8">
                {/* Loading spinner for search results */}
                {loading && (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <p className="ml-2 text-lg">Loading donor data <Loading /></p>
                    </div>
                )}

                {/* Error message display */}
                {error && (
                    <div className="text-center text-error-content bg-error p-4 rounded-lg">
                        <p className="text-lg">{error}</p>
                    </div>
                )}

                {/* Initial message when no search performed */}
                {!searchPerformed && !loading && (
                    <div className="text-center text-gray-600 text-lg p-8 bg-base-200 rounded-lg shadow-md">
                        <p>No donor data available. Please use the search form above to find donors.</p>
                    </div>
                )}

                {/* Message when search performed but no results found */}
                {searchPerformed && !loading && !error && searchResults.length === 0 && (
                    <div className="text-center text-info-content bg-info p-4 rounded-lg">
                        <p className="text-lg">No donors found matching your criteria. Please try a different search.</p>
                    </div>
                )}

                {/* Display search results */}
                {searchPerformed && !loading && !error && searchResults.length > 0 && (
                    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl">
                        <table className="table w-full">
                            {/* Tanstack Table Head */}
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id} className="bg-base-200 text-base-content">
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id}>
                                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            {/* Tanstack Table Body */}
                            <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr key={row.id} className="hover">
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Generate PDF Button */}
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-success rounded-sm"
                                onClick={generatePDF}
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonors;
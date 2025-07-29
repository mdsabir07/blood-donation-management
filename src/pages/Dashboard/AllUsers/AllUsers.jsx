import { useEffect, useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Shared/Loading/Loading';
import { Navigate } from 'react-router';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const { loading: authLoading } = useAuth();

    const [users, setUsers] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchUsers = async () => {
        try {
            const res = await axiosSecure.get('/users');
            let filteredUsers = res.data;

            // Apply status filter
            if (statusFilter !== 'all') {
                filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
            }

            // Optional: Sort by createdAt
            filteredUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setUsers(filteredUsers);
        } catch (err) {
            console.error('Error fetching users', err);
        }
    };

    useEffect(() => {
        if (role === 'admin') fetchUsers();
    }, [role, statusFilter]);

    if (authLoading || isRoleLoading) return <Loading />;
    console.log("Role:", role);
    if (role !== 'admin') return <Navigate to="/forbidden"></Navigate>;

    const handleUpdate = async (id, data) => {
        try {
            await axiosSecure.patch(`/users/${id}`, data);
            fetchUsers();
            Swal.fire('Success', 'User updated successfully', 'success');
        } catch (err) {
            Swal.fire('Error', 'Failed to update user', 'error');
        }
    };

    const paginatedUsers = users.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(users.length / limit);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>

            {/* Filter Dropdown */}
            <div className="flex items-center justify-between mb-4">
                <label className="flex gap-2 items-center">
                    Filter:
                    <select
                        className="select select-bordered select-sm"
                        value={statusFilter}
                        onChange={(e) => {
                            setPage(1); // Reset page when filter changes
                            setStatusFilter(e.target.value);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </label>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <img
                                            src={user.avatar || '/placeholder-avatar.png'}
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td>{user.name || 'N/A'}</td>
                                    <td>{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td className="capitalize">{user.status}</td>
                                    <td>
                                        <div className="dropdown dropdown-end">
                                            <label tabIndex={0} className="btn btn-ghost btn-xs">
                                                <FaEllipsisV />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box w-52 z-10">
                                                {user.status === 'active' && (
                                                    <li>
                                                        <button onClick={() => handleUpdate(user._id, { status: 'blocked' })}>
                                                            Block
                                                        </button>
                                                    </li>
                                                )}
                                                {user.status === 'blocked' && (
                                                    <li>
                                                        <button onClick={() => handleUpdate(user._id, { status: 'active' })}>
                                                            Unblock
                                                        </button>
                                                    </li>
                                                )}
                                                {user.role !== 'volunteer' && (
                                                    <li>
                                                        <button onClick={() => handleUpdate(user._id, { role: 'volunteer' })}>
                                                            Make Volunteer
                                                        </button>
                                                    </li>
                                                )}
                                                {user.role !== 'admin' && (
                                                    <li>
                                                        <button onClick={() => handleUpdate(user._id, { role: 'admin' })}>
                                                            Make Admin
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-6">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {[...Array(totalPages)].map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setPage(idx + 1)}
                            className={`btn btn-sm ${page === idx + 1 ? 'btn-primary' : 'btn-outline'}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllUsers;
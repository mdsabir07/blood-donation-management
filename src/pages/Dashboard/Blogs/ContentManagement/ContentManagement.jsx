import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUserRole from '../../../../hooks/useUserRole';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Loading from '../../../Shared/Loading/Loading';

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [filter, setFilter] = useState('all'); // all, draft, published
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 6;

    const isAdmin = role === 'admin';

    const fetchBlogs = async () => {
        try {
            const statusFilter = filter === 'all' ? '' : `&status=${filter}`;
            const res = await axiosSecure.get(`/blogs?page=${page}&limit=${limit}${statusFilter}`);
            setBlogs(res.data.blogs || []);
            setTotal(res.data.total || 0);
        } catch (err) {
            console.error('Error fetching blogs:', err);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [filter, page]);

    if (authLoading || isRoleLoading) return <Loading />;

    const totalPages = Math.ceil(total / limit);

    const handlePublishToggle = async (blog) => {
        if (!isAdmin) {
            return Swal.fire('Access Denied', 'Only admins can publish or unpublish blogs.', 'error');
        }

        const newStatus = blog.status === 'published' ? 'draft' : 'published';

        const confirm = await Swal.fire({
            title: `${newStatus === 'published' ? 'Publish' : 'Unpublish'} this blog?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.patch(`/blogs/${blog._id}`, { status: newStatus });
                Swal.fire('Success', `Blog ${newStatus} successfully`, 'success');
                fetchBlogs();
            } catch (error) {
                console.error('Publish toggle error:', error);
                Swal.fire('Error', 'Failed to update blog status.', 'error');
            }
        }
    };

    const handleDelete = async (id) => {
        if (!isAdmin) {
            return Swal.fire('Access Denied', 'Only admins can delete blogs.', 'error');
        }

        const confirm = await Swal.fire({
            title: 'Delete this blog?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/blogs/${id}`);
                Swal.fire('Deleted', 'Blog deleted successfully.', 'success');
                fetchBlogs();
            } catch (error) {
                Swal.fire('Error', 'Failed to delete blog.', 'error');
            }
        }
    };

    return (
        <div className="p-2 sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Content Management 📝</h2>
                <button
                    onClick={() => navigate('/dashboard/content-management/add-blog')}
                    className="btn btn-primary"
                >
                    Add Blog
                </button>
            </div>

            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter:</label>
                <select
                    value={filter}
                    onChange={(e) => {
                        setPage(1);
                        setFilter(e.target.value);
                    }}
                    className="select select-bordered"
                >
                    <option value="all">All</option>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>

            {blogs.length === 0 ? (
                <p>No blogs found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="card bg-base-100 shadow-md p-2 md:p-4">
                            <img
                                src={blog.thumbnailUrl}
                                alt={blog.title}
                                className="w-full h-40 object-cover rounded"
                            />
                            <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
                            <p className="text-sm mb-2">
                                Status: <span className="capitalize">{blog.status}</span>
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => handlePublishToggle(blog)}
                                            className={`btn btn-sm ${
                                                blog.status === 'draft' ? 'btn-success' : 'btn-warning'
                                            }`}
                                        >
                                            {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}

                                {/* Both admin and volunteer can edit */}
                                <button
                                    onClick={() =>
                                        navigate(`/dashboard/content-management/edit-blog/${blog._id}`)
                                    }
                                    className="btn btn-sm btn-outline"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx + 1}
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

export default ContentManagement;
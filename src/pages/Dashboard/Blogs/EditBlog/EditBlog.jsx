import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUserRole from '../../../hooks/useUserRole';
import Loading from '../../Shared/Loading/Loading';

const EditBlog = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [content, setContent] = useState('');
    const editor = useRef(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosSecure.get(`/blogs/${id}`);
                const blogData = res.data;
                setBlog(blogData);
                setTitle(blogData.title);
                setThumbnail(blogData.thumbnail);
                setContent(blogData.content);
            } catch (err) {
                console.error('Error fetching blog:', err);
            }
        };

        if (role === 'admin') {
            fetchBlog();
        }
    }, [id, role]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !thumbnail || !content) {
            Swal.fire('Error', 'All fields are required', 'error');
            return;
        }

        try {
            const blogUpdate = {
                title,
                thumbnail,
                content
            };

            await axiosSecure.patch(`/blogs/${id}`, blogUpdate);
            Swal.fire('Success', 'Blog updated successfully!', 'success');
            navigate('/dashboard/content-management');
        } catch (error) {
            console.error('Update failed:', error);
            Swal.fire('Error', 'Failed to update blog', 'error');
        }
    };

    if (isRoleLoading || !blog) return <Loading />;
    if (role !== 'admin') {
        return <p className="text-error text-center py-10">Access Denied. Admins only.</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-base-content">Edit Blog ✏️</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="label">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="label">Thumbnail URL</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="label">Content</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Update Blog</button>
            </form>
        </div>
    );
};

export default EditBlog;
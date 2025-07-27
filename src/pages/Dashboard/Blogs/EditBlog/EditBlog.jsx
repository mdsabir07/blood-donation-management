import { useEffect, useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useUserRole from '../../../../hooks/useUserRole';
import Loading from '../../../Shared/Loading/Loading';
import axios from 'axios';

const EditBlog = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { role, isRoleLoading } = useUserRole();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState(''); // current thumbnail URL
    const [newImageFile, setNewImageFile] = useState(null); // store newly selected file
    const [isSubmitting, setIsSubmitting] = useState(false);
    const editor = useRef(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axiosSecure.get(`/blogs/${id}`);
                const data = res.data;
                setBlog(data);
                setTitle(data.title);
                setContent(data.content);
                setThumbnail(data.thumbnail);
            } catch (err) {
                console.error('Error fetching blog:', err);
            }
        };

        if (role === 'admin' || role === 'volunteer') fetchBlog();

    }, [id, role]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            Swal.fire('Error', 'Title and content are required', 'error');
            return;
        }

        setIsSubmitting(true);
        let updatedThumbnail = thumbnail;

        // Upload new image if selected
        if (newImageFile) {
            try {
                const formData = new FormData();
                formData.append('image', newImageFile);

                const response = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
                    formData
                );

                updatedThumbnail = response.data.data.url;
            } catch (uploadErr) {
                console.error('Image upload failed:', uploadErr);
                setIsSubmitting(false);
                return Swal.fire('Error', 'Image upload failed', 'error');
            }
        }

        try {
            await axiosSecure.patch(`/blogs/${id}`, {
                title,
                content,
                thumbnailUrl: updatedThumbnail,
            });

            Swal.fire('Success', 'Blog updated successfully!', 'success');
            navigate('/dashboard/content-management');
        } catch (error) {
            console.error('Update failed:', error);
            Swal.fire('Error', 'Failed to update blog', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isRoleLoading || !blog) return <Loading />;
    if (role !== 'admin' && role !== 'volunteer') {
        return <p className="text-error text-center py-10">Access Denied. Only Admins or Volunteers can edit blogs.</p>;
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
                    <label className="label">Thumbnail (Upload New Optional)</label>

                    <input
                        type="file"
                        className="file-input input-bordered w-full"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setNewImageFile(e.target.files[0]);
                            }
                        }}
                    />

                    {thumbnail && !newImageFile && (
                        <div className="mt-2">
                            <p className="text-sm text-base-content/70">Current Thumbnail:</p>
                            <img src={thumbnail} alt="Current" className="w-32 rounded border mt-1" />
                        </div>
                    )}

                    {newImageFile && (
                        <div className="mt-2">
                            <p className="text-sm text-base-content/70">New Thumbnail Preview:</p>
                            <img
                                src={URL.createObjectURL(newImageFile)}
                                alt="New Preview"
                                className="w-32 rounded border mt-1"
                                onLoad={() => URL.revokeObjectURL(newImageFile)} // free memory
                            />
                        </div>
                    )}
                </div>


                <div>
                    <label className="label">Content</label>
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Update Blog'}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
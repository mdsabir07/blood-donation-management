import { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';

const AddBlog = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const editor = useRef(null);

    const [title, setTitle] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [content, setContent] = useState('');

    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setThumbnailUrl(data.data.display_url);
                Swal.fire('Success', 'Image uploaded', 'success');
            } else {
                Swal.fire('Error', 'Failed to upload image', 'error');
            }
        } catch (error) {
            Swal.fire(`Error ${error}`, 'Failed to upload image', 'error');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !thumbnailUrl || !content) {
            return Swal.fire('Validation Error', 'Please fill all fields and upload a thumbnail.', 'warning');
        }

        try {
            await axiosSecure.post('/blogs', {
                title,
                thumbnailUrl,
                content,
            });

            Swal.fire('Created', 'Blog created successfully!', 'success');
            navigate('/dashboard/content-management');
        } catch (error) {
            console.error('Create blog error:', error);
            Swal.fire('Error', 'Failed to create blog.', 'error');
        }
    };

    return (
        <div className="p-2 sm:p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="thumbnail">Thumbnail Image</label>
                    <input
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-3 py-2 rounded-md input input-bordered"
                    />
                    {uploading && <p>Uploading...</p>}
                    {thumbnailUrl && (
                        <img
                            src={thumbnailUrl}
                            alt="Thumbnail preview"
                            className="mt-2 w-48 h-32 object-cover rounded"
                        />
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Content</label>
                    <JoditEditor
                        className='text-base-content bg-base-content'
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={() => { }}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
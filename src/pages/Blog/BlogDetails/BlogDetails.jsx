import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import useAxios from '../../../hooks/useAxios';
import Loading from '../../Shared/Loading/Loading';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosInstance = useAxios();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axiosInstance.get(`/public-blogs/${id}`);
                setBlog(response.data);
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                if (err.response && err.response.status === 404) {
                    setError("Blog not found or not published.");
                } else {
                    setError("Failed to load blog. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        }
    }, [id, axiosInstance]);

    if (loading) return <Loading />

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-error-content bg-error p-4 rounded-lg">
                <p className="text-lg mb-4">{error}</p>
                <Link to="/blog" className="btn btn-primary">Back to Blogs</Link>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-info-content bg-info p-4 rounded-lg">
                <p className="text-lg mb-4">Blog data is unavailable or not published.</p>
                <Link to="/blog" className="btn btn-primary">Back to Blogs</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="bg-base-100 shadow-xl rounded-lg p-8 mb-8">
                {blog.thumbnailUrl && (
                    <figure className="mb-6 rounded-lg mx-auto max-w-2xl flex justify-center items-center">
                        <img
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            className="w-full h-auto object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=No+Image"; }}
                        />
                    </figure>
                )}
                <div className="text-sm mb-6">

                    <h1 className="text-4xl font-bold text-center mb-6 text-primary">{blog.title}</h1>
                    <div>
                        <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span><br />
                        <span>Updated: {new Date(blog.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {blog.authorId && <span>Author: {blog.authorId}</span>} {/* Display author if available */}
                </div>
                <div className="prose lg:prose-xl max-w-none leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
            </div>
            <div className="text-center">
                <Link to="/blog" className="btn btn-primary rounded-sm px-8 py-3 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
                    Back to All Blogs
                </Link>
            </div>
        </div>
    );
};

export default BlogDetails;
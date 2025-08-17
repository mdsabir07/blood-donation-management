// src/components/Blog/HomepageBlogPreview.jsx

import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router';

const ReUseBlogCard = ({
  limit = 3,
  sortOrder = 'desc',       // 'asc' or 'desc'
  featuredOnly = false      // only featured blogs if true
}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/public-blogs', {
          params: {
            limit,
            sort: sortOrder,
            featured: featuredOnly
          }
        });

        setBlogs(response.data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [axiosInstance, limit, sortOrder, featuredOnly]);

  if (loading) return <p className="text-center">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog) => (
        <div key={blog._id} className="card bg-base-100 shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <figure className="h-48 w-full overflow-hidden">
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=No+Image";
              }}
            />
          </figure>
          <div className="card-body p-6">
            <h2 className="card-title text-xl font-semibold mb-3">
              {blog.title}
            </h2>
            <p
              className="text-base mb-4 line-clamp-3"
              dangerouslySetInnerHTML={{
                __html: (blog.content || '').substring(0, 80) + '...'
              }}
            ></p>
            <div className="card-actions justify-between">
              <div>
                <p className="text-sm">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                <p className="text-sm mb-4">Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
              </div>
              <Link
                to={`/blog/${blog._id}`}
                className="btn btn-primary rounded-sm px-6 py-2 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReUseBlogCard;
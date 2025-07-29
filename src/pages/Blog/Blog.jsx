import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of blogs per page
  const [totalBlogs, setTotalBlogs] = useState(0); // Total number of published blogs
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get('/public-blogs', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setBlogs(response.data.blogs);
        setTotalBlogs(response.data.total); // Set total blogs from the API response
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [axiosInstance, currentPage, itemsPerPage]);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-error-content bg-error p-4 rounded-lg">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-8">
        <h1 className="text-4xl font-bold text-center text-primary">Our Blog</h1>

        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search blogs by title..."
            className="input input-bordered w-full rounded-lg shadow-md focus:ring focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-lg text-gray-600">No published blogs found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <figure className="h-48 w-full overflow-hidden">
              <img
                src={blog.thumbnailUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=No+Image"; }}
              />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-semibold mb-3">
                {blog.title}
              </h2>
              {/* Display a snippet of the content */}
              <p className="text-base mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 80) + '...' }}></p>

              <div className="card-actions justify-between">
                <div>
                  <p className="text-sm">Created: {new Date(blog.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm mb-4">Updated: {new Date(blog.updatedAt).toLocaleDateString()}</p>
                </div>
                <Link to={`/blog/${blog._id}`} className="btn btn-primary rounded-sm px-6 py-2 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            className="btn btn-outline btn-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className={`btn ${currentPage === page + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          <button
            className="btn btn-outline btn-primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
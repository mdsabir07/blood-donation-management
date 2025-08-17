import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../Shared/Loading/Loading';
import BlogCard from './BlogCard';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const [filterType, setFilterType] = useState('latest'); // latest | older | featured

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = {
          page: currentPage,
          limit: itemsPerPage,
        };

        if (filterType === 'latest') {
          queryParams.sort = 'desc';
        } else if (filterType === 'older') {
          queryParams.sort = 'asc';
        } else if (filterType === 'featured') {
          queryParams.featured = true;
        }

        const response = await axiosInstance.get('/public-blogs', {
          params: queryParams,
        });

        setBlogs(response.data.blogs);
        setTotalBlogs(response.data.total);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [axiosInstance, currentPage, itemsPerPage, filterType]);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalBlogs / itemsPerPage);

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
    <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mb-8">
        <h1 className="text-4xl font-bold text-center text-primary">Our Blog</h1>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search blogs by title..."
            className="input input-bordered rounded-lg shadow-md focus:ring focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Filter Dropdown */}
          <select
            className="select select-bordered"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="latest">Latest</option>
            <option value="older">Older</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No published blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
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
import { Link } from 'react-router';

const BlogCard = ({ blog }) => {
    const { _id, thumbnailUrl, title, content, createdAt, updatedAt } = blog || {};
    return (
        <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <figure className="h-48 w-full overflow-hidden">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=No+Image"; }}
                />
            </figure>
            <div className="card-body p-6">
                <h2 className="card-title text-xl font-semibold mb-3">
                    {title}
                </h2>
                {/* Display a snippet of the content */}
                <p className="text-base mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: (content || '').substring(0, 80) + '...' }}></p>

                <div className="card-actions justify-between">
                    <div>
                        <p className="text-sm">Created: {new Date(createdAt).toLocaleDateString()}</p>
                        <p className="text-sm mb-4">Updated: {new Date(updatedAt).toLocaleDateString()}</p>
                    </div>
                    <Link to={`/blog/${_id}`} className="btn btn-primary rounded-sm px-6 py-2 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
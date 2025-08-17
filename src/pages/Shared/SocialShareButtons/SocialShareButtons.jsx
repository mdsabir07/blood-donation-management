import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

/**
 * A reusable component for social media sharing buttons.
 *
 * @param {object} props - The component props.
 * @param {string} props.shareUrl - The URL to be shared.
 * @param {string} props.shareTitle - The title/text to be shared.
 */
const SocialShareButtons = ({ shareUrl, shareTitle }) => {
    // Encode URL and title for safe use in query parameters
    const encodedShareUrl = encodeURIComponent(shareUrl);
    const encodedShareTitle = encodeURIComponent(shareTitle || 'Check out this post!');

    // Function to generate social share links for various platforms
    const getShareLink = (platform) => {
        switch (platform) {
            case 'facebook':
                return `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`;
            case 'twitter':
                return `https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedShareTitle}`;
            case 'linkedin':
                return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedShareUrl}&title=${encodedShareTitle}`;
            case 'whatsapp':
                return `https://api.whatsapp.com/send?text=${encodedShareTitle}%20${encodedShareUrl}`;
            default:
                return '#'; // Fallback for unsupported platforms
        }
    };

    // Function to open share window in a new tab/popup
    const openShareWindow = (url) => {
        window.open(url, '_blank', 'width=600,height=400');
    };

    return (
        <div className="mb-8 p-4 bg-base-200 rounded-lg shadow-md flex flex-wrap items-center justify-center gap-4">
            <span className="text-lg font-semibold text-base-content mr-2">Share this post:</span>
            <button
                onClick={() => openShareWindow(getShareLink('facebook'))}
                className="btn btn-circle btn-primary text-white text-base sm:text-xl hover:scale-110 transition-transform duration-200"
                aria-label="Share on Facebook"
            >
                <FaFacebook />
            </button>
            <button
                onClick={() => openShareWindow(getShareLink('twitter'))}
                className="btn btn-circle btn-info text-white text-base sm:text-xl hover:scale-110 transition-transform duration-200"
                aria-label="Share on Twitter"
            >
                <FaTwitter />
            </button>
            <button
                onClick={() => openShareWindow(getShareLink('linkedin'))}
                className="btn btn-circle btn-accent text-white text-base sm:text-xl hover:scale-110 transition-transform duration-200"
                aria-label="Share on LinkedIn"
            >
                <FaLinkedin />
            </button>
            <button
                onClick={() => openShareWindow(getShareLink('whatsapp'))}
                className="btn btn-circle btn-success text-white text-base sm:text-xl hover:scale-110 transition-transform duration-200"
                aria-label="Share on WhatsApp"
            >
                <FaWhatsapp />
            </button>
        </div>
    );
};

export default SocialShareButtons;
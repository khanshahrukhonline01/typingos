
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    author?: string;
    publishedTime?: string;
    modifiedTime?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title = "TypingOS - Master Your Typing Speed",
    description = "The ultimate TypingOS for speed mastery. Practice typing tests for government exams (SSC, Railway, Banking), enjoy monospaced minimalist UI, and track your progress with AI insights.",
    keywords = "typing test, typing speed, ssc typing, railway typing exam, typing practice, touch typing, hindi typing",
    image = "https://typingos.com/og-image.png",
    url = typeof window !== 'undefined' ? window.location.href : "https://typingos.com",
    type = "website",
    author = "TypingOS",
    publishedTime,
    modifiedTime
}) => {
    const siteTitle = title.includes("TypingOS") ? title : `${title} | TypingOS`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Article Specific Tags */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

            {/* Canonical Link */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

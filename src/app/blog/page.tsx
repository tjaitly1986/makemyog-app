import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Make My OG',
  description: 'Learn about OG images, social cards, meta tags, and best practices for social media sharing.',
};

const posts = [
  {
    slug: 'og-image-guide',
    title: 'What Are OG Images? The Complete Guide to Open Graph Images',
    excerpt: 'Understand what OG images are, why they matter, and how to implement them correctly for better social media sharing.',
    date: '2024-03-15',
    readTime: '8 min read',
  },
  {
    slug: 'social-card-best-practices',
    title: 'Social Card Design Best Practices: Sizes, Formats & Tips',
    excerpt: 'Master the technical requirements and design principles for creating social cards that get clicks and engagement.',
    date: '2024-03-10',
    readTime: '10 min read',
  },
  {
    slug: 'meta-tags-for-seo',
    title: 'Essential Meta Tags for SEO: Open Graph, Twitter Cards & More',
    excerpt: 'Complete reference guide to all the meta tags that matter for SEO and social sharing—og:image, twitter:card, and beyond.',
    date: '2024-03-05',
    readTime: '12 min read',
  },
  {
    slug: 'og-image-design-tips',
    title: 'How to Design OG Images That Get Clicks: 7 Proven Tips',
    excerpt: 'Practical design tips and strategies to make your OG images stand out and drive more traffic from social media.',
    date: '2024-02-28',
    readTime: '9 min read',
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="hover:text-white/80 transition">
            <h1 className="text-2xl font-bold">Make My OG</h1>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600">
            Learn about OG images, social cards, meta tags, and best practices for social media sharing.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-orange-500"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mt-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition whitespace-nowrap"
                >
                  Read Post
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

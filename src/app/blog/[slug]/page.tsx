import Link from 'next/link';
import type { Metadata } from 'next';

interface BlogPost {
  title: string;
  description: string;
  date: string;
  readTime: string;
  sections: { heading: string; content: string }[];
}

const BLOG_POSTS: Record<string, BlogPost> = {
  'og-image-guide': {
    title: 'What Are OG Images? The Complete Guide to Open Graph Images',
    description: 'Understand what OG images are, why they matter, and how to implement them correctly for better social media sharing.',
    date: '2024-03-15',
    readTime: '8 min read',
    sections: [
      {
        heading: 'Introduction',
        content: 'Open Graph (OG) images are one of the most important but often overlooked elements of modern web development. When you share a link on social media platforms like Twitter, Facebook, or LinkedIn, the website\'s OG image is what appears as the preview thumbnail. This small but powerful image can dramatically increase click-through rates and engagement. In this comprehensive guide, we\'ll explore what OG images are, why they matter, and how to implement them correctly for maximum impact.',
      },
      {
        heading: 'What Are OG Images?',
        content: 'OG images are visual previews that appear when you share a link on social media. They\'re defined using Open Graph meta tags in your HTML, specifically the og:image tag. These images are typically 1200x630 pixels in size (the standard for most social platforms) and serve as the thumbnail representation of your content. The Open Graph protocol was introduced by Facebook to allow any web page to become a rich object in a social graph. It uses meta tags to define how your content should be displayed when shared on social platforms.',
      },
      {
        heading: 'Why OG Images Matter',
        content: 'Studies show that posts with images get significantly more engagement than text-only posts. An attractive OG image can increase click-through rates by up to 40%. When someone scrolls through their social media feed, a compelling image immediately catches their attention. OG images are also an opportunity to reinforce your brand identity. By using consistent colors, logos, and design elements, you ensure that your content is instantly recognizable in the social feed. Additionally, while OG images don\'t directly impact your search engine rankings, they improve user behavior signals. More clicks and shares from social media lead to increased traffic, which is a positive signal for SEO.',
      },
      {
        heading: 'Technical Implementation',
        content: 'The minimal set of OG meta tags you should include in your page\'s head section includes: og:title, og:description, og:image, og:url, and og:type. Make sure your OG images are 1200x630 pixels (16:9 aspect ratio) in PNG or JPEG format. Keep file size under 5MB and ensure the URL is publicly accessible. Twitter also has its own tags including twitter:card set to "summary_large_image", twitter:title, twitter:description, and twitter:image.',
      },
      {
        heading: 'Best Practices',
        content: 'Keep your OG image simple - avoid clutter and ensure it\'s instantly understandable. Use readable fonts where text is legible even at small sizes. Include your logo or brand color to make it recognizable. Ensure high contrast between text and background. Place important elements in the center since different platforms crop images differently. Always specify og:image and don\'t rely on auto-generation. Use absolute URLs, not relative ones. Test your OG images on actual social media platforms before publishing. Keep images optimized and compressed. Update OG images for timely content regularly.',
      },
    ],
  },
  'social-card-best-practices': {
    title: 'Social Card Design Best Practices: Sizes, Formats & Tips',
    description: 'Master the technical requirements and design principles for creating social cards that get clicks and engagement.',
    date: '2024-03-10',
    readTime: '10 min read',
    sections: [
      {
        heading: 'Platform-Specific Dimensions',
        content: 'Facebook and LinkedIn prefer 1200x630 pixels with a 1.91:1 aspect ratio. Twitter/X works best with 1200x675 pixels. Pinterest prefers tall images at 1000x1500 pixels (2:3 ratio). Instagram uses 1080x1350 pixels for portrait or 1200x628 for landscape. The 1200x630 size is the most versatile and works across most platforms.',
      },
      {
        heading: 'Design Principles',
        content: 'Your card will appear at various sizes, so design with the smallest size in mind. Use only 1-3 key elements maximum and avoid cluttered layouts. Leave breathing room with white space. Use a large, bold headline (40-60 pixels minimum). Keep it scannable at a glance - people spend 2-3 seconds looking at social cards. Choose colors strategically based on psychology: red/orange for urgency, blue for trust, green for growth, purple for creativity. High contrast ensures readability. Use your brand colors for consistency. Make your headline impossible to ignore by using bold font weights and considering all caps. Include your brand logo for recognition.',
      },
      {
        heading: 'Design Templates by Content Type',
        content: 'For blog posts, use a professional minimalist style with the headline as the focus, optional subheading with author, and a gradient or solid background. Product launches benefit from bold gradients with large product names and taglines. Videos/tutorials should emphasize the title with a darker background. Events work best with vibrant gradients highlighting event name, date, and location. News/articles should feature a headline with byline and publication logo. Always test your designs on actual platforms to see how they crop and display.',
      },
      {
        heading: 'Common Design Mistakes',
        content: 'Don\'t use text that\'s too small - if you squint to read it, it\'s too small. Don\'t try to include too much information - a social card is a teaser, not a summary. Poor color contrast makes text unreadable on mobile screens in sunlight. Always design for mobile first since most social is consumed on mobile. Inconsistent branding reduces trust and recognition. Not testing on all platforms is risky since each displays differently. Oversized files load slowly and may not display properly.',
      },
      {
        heading: 'Tools and Resources',
        content: 'Use Figma for collaborative design with templates, Canva for template-based design, Make My OG for visual OG image generation, or Adobe Express for simple design. For optimization, try TinyPNG/TinyJPG for compression, ImageOptim for Mac, or OptiPNG. For testing, use Facebook Debugger, Twitter Card Validator, LinkedIn Inspector, and WAVE Browser Extension for accessibility.',
      },
    ],
  },
  'meta-tags-for-seo': {
    title: 'Essential Meta Tags for SEO: Open Graph, Twitter Cards & More',
    description: 'Complete reference guide to all the meta tags that matter for SEO and social sharing—og:image, twitter:card, and beyond.',
    date: '2024-03-05',
    readTime: '12 min read',
    sections: [
      {
        heading: 'Basic Meta Tags',
        content: 'Always include charset UTF-8 to tell browsers how to interpret text characters. Include a viewport meta tag for responsive design: width=device-width, initial-scale=1.0. Your title tag should be 50-60 characters and your meta description 150-160 characters. Include target keywords naturally in both. Make descriptions compelling since they appear in search results.',
      },
      {
        heading: 'Open Graph Tags',
        content: 'Core OG tags include og:title, og:description, og:image, og:url, and og:type. OG images should be 1200x630 pixels in JPEG or PNG format. Include og:image:type, og:image:width, and og:image:height. For articles, add og:type as "article" with article:published_time, article:modified_time, article:author, and article:section. For videos, use og:type "video.other" with og:video, og:video:type, og:video:width, and og:video:height.',
      },
      {
        heading: 'Twitter Card Tags',
        content: 'Twitter has its own card system with types like summary (small image on side) and summary_large_image (large image above text). Complete setup includes twitter:card, twitter:site, twitter:title, twitter:description, twitter:image, twitter:image:alt, and twitter:creator. Twitter cards work alongside OG tags for optimal display.',
      },
      {
        heading: 'SEO Meta Tags',
        content: 'Use robots meta tag to control how search engines crawl and index content. Set canonical URL to prevent duplicate content issues. For multilingual sites, use alternate hreflang tags. For paginated content, use rel:prev and rel:next. Implement structured data using JSON-LD format with schema.org types like Article, WebPage, Organization, etc.',
      },
      {
        heading: 'Testing and Validation',
        content: 'Use Google Search Console to see how Google indexes pages. Use Mobile-Friendly Test for mobile usability. Validate structured data with Schema.org validators. Use Facebook Sharing Debugger for OG tags. Use Twitter Card Validator for Twitter tags. Use Lighthouse for SEO and performance audits. Always test that title is 50-60 characters, description is 150-160 characters, OG image is 1200x630, all OG tags are included, Twitter cards are set, canonical URL is correct, robots meta tag is appropriate, and structured data is valid.',
      },
    ],
  },
  'og-image-design-tips': {
    title: 'How to Design OG Images That Get Clicks: 7 Proven Tips',
    description: 'Practical design tips and strategies to make your OG images stand out and drive more traffic from social media.',
    date: '2024-02-28',
    readTime: '9 min read',
    sections: [
      {
        heading: 'Tip 1: Make Your Headline the Star',
        content: 'Your title is the most important element of your OG image. Use at least 40-50px font size - when your image shrinks to thumbnail size, text needs to remain readable. Make your headline bold and consider all caps for added impact. People spend 2-3 seconds looking at a social card, so your headline should be the focal point they immediately understand. If possible, include your primary keyword so it\'s clear what the content is about.',
      },
      {
        heading: 'Tip 2: Leverage Color Psychology',
        content: 'Colors trigger emotional responses and drive engagement. Ensure high contrast between text and background. Use your brand colors so your image is instantly recognizable. Be aware of current design trends - vibrant gradients perform better than dull colors. Red/orange indicates urgency and energy, blue means trust and professionalism, green suggests growth and health, purple conveys creativity and luxury, yellow represents optimism and happiness. A/B test your OG images with different color schemes to see which drives more clicks.',
      },
      {
        heading: 'Tip 3: Use a Gradient Background',
        content: 'Solid backgrounds are boring. Gradients add sophistication and visual interest. Use simple two-color gradients with complementary colors. Diagonal 45-degree gradients feel dynamic and modern. Popular combinations include purple to pink (creative, modern), blue to cyan (tech, fresh), orange to red (energetic), and dark blue to black (professional). Always test on mobile since gradients can shift in appearance across devices.',
      },
      {
        heading: 'Tip 4: Include Supporting Visual Elements',
        content: 'While your headline is the star, supporting visuals add context and interest. Small icons can represent your content type. Place your brand logo in the top-right or bottom-right corner for recognition. Simple, clean illustrations add personality. A single relevant emoji can add personality without cluttering. Avoid multiple photos, confusing patterns, or cluttered layouts. Keep one clear visual focus.',
      },
      {
        heading: 'Tip 5: Limit Your Text',
        content: 'Your OG image isn\'t a billboard - less text means higher impact. Ideally, only your headline should appear. If needed, add a short 2-3 word tagline below the headline. Never use more than two lines of text. Avoid blocks of text or detailed descriptions. Think of it like a movie poster - people understand it instantly without reading multiple lines. Your actual page has space for details.',
      },
      {
        heading: 'Tip 6: Optimize for Different Platforms',
        content: 'While 1200x630 is the standard, different platforms display images differently. Facebook crops to 1200x630 fully visible. Twitter may crop to square (1:1) and crop edges. LinkedIn is like Facebook. Pinterest prefers tall images. Design for flexibility by placing most important content in the center. Avoid critical elements within 100 pixels of edges since they might be cropped. Test on actual platforms where your audience is.',
      },
      {
        heading: 'Tip 7: Test and Iterate',
        content: 'The best designers don\'t guess - they test and iterate based on data. Monitor which OG images get the most clicks from social media. Create multiple versions with different headlines, colors, or layouts for A/B testing. Update your OG images regularly - test monthly. Most platforms show click-through rates; use this to identify best performers. Ask your audience what visual styles resonate with them. Track metrics and iterate continuously.',
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Make My OG`,
    description: post.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-orange-600 hover:text-orange-700">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="hover:text-white/80 transition">
            <h1 className="text-2xl font-bold">Make My OG</h1>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/blog" className="text-orange-600 hover:text-orange-700 font-medium mb-6 inline-block">
          ← Back to Blog
        </Link>

        <article className="bg-white rounded-xl shadow-md p-8 sm:p-12">
          <header className="mb-8 pb-8 border-b border-gray-200">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              <span>{post.readTime}</span>
            </div>
          </header>

          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none space-y-6">
            {post.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </article>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your OG Image?</h3>
          <p className="text-gray-600 mb-6">Use our free visual editor to design stunning social cards in minutes.</p>
          <Link
            href="/"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-3 px-8 rounded-lg transition inline-block"
          >
            Go to OG Image Generator
          </Link>
        </div>
      </div>
    </div>
  );
}

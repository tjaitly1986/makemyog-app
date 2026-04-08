'use client';

import { useState, useRef, useEffect } from 'react';

interface OGTemplate {
  id: string;
  name: string;
  bg: { type: 'solid' | 'gradient'; color1?: string; color2?: string; direction?: string };
  textColor: string;
  titleSize: number;
  subtitleSize: number;
  alignment: 'left' | 'center' | 'right';
  titleText: string;
  subtitleText: string;
  authorText: string;
  fontFamily: string;
  pattern: 'none' | 'dots' | 'grid' | 'lines';
  shadow: boolean;
}

const TEMPLATES: OGTemplate[] = [
  {
    id: 'blog-post',
    name: 'Blog Post',
    bg: { type: 'gradient', color1: '#667eea', color2: '#764ba2', direction: 'to-bottom-right' },
    textColor: '#ffffff',
    titleSize: 56,
    subtitleSize: 24,
    alignment: 'left',
    titleText: 'Designing Better User Experiences',
    subtitleText: 'Learn the principles that drive great design',
    authorText: 'yourdomain.com',
    fontFamily: 'sans-serif',
    pattern: 'none',
    shadow: true,
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    bg: { type: 'gradient', color1: '#f97316', color2: '#ec4899', direction: 'to-right' },
    textColor: '#ffffff',
    titleSize: 72,
    subtitleSize: 28,
    alignment: 'center',
    titleText: 'Introducing Product Name',
    subtitleText: 'The future is here',
    authorText: 'company.com',
    fontFamily: 'sans-serif',
    pattern: 'none',
    shadow: true,
  },
  {
    id: 'tutorial',
    name: 'Tutorial',
    bg: { type: 'solid', color1: '#1a1a2e' },
    textColor: '#ffffff',
    titleSize: 56,
    subtitleSize: 20,
    alignment: 'left',
    titleText: 'How to Build APIs with Next.js',
    subtitleText: 'Complete guide with examples',
    authorText: 'dev.domain.com',
    fontFamily: 'monospace',
    pattern: 'grid',
    shadow: false,
  },
  {
    id: 'event',
    name: 'Event',
    bg: { type: 'gradient', color1: '#6366f1', color2: '#06b6d4', direction: 'to-bottom' },
    textColor: '#ffffff',
    titleSize: 64,
    subtitleSize: 24,
    alignment: 'center',
    titleText: 'Tech Conference 2024',
    subtitleText: 'Join us on April 15-16',
    authorText: 'techconf.com',
    fontFamily: 'sans-serif',
    pattern: 'dots',
    shadow: true,
  },
  {
    id: 'podcast',
    name: 'Podcast',
    bg: { type: 'solid', color1: '#0f172a' },
    textColor: '#ffffff',
    titleSize: 48,
    subtitleSize: 22,
    alignment: 'center',
    titleText: 'Episode 42: The Future of AI',
    subtitleText: 'Featuring special guest experts',
    authorText: 'podcast.domain.com',
    fontFamily: 'sans-serif',
    pattern: 'lines',
    shadow: false,
  },
  {
    id: 'github',
    name: 'GitHub Repo',
    bg: { type: 'solid', color1: '#0d1117' },
    textColor: '#ffffff',
    titleSize: 52,
    subtitleSize: 18,
    alignment: 'left',
    titleText: 'awesome-project',
    subtitleText: 'A collection of awesome tools and resources',
    authorText: 'github.com/username',
    fontFamily: 'monospace',
    pattern: 'none',
    shadow: false,
  },
  {
    id: 'announcement',
    name: 'Announcement',
    bg: { type: 'gradient', color1: '#f43f5e', color2: '#fbbf24', direction: 'to-right' },
    textColor: '#ffffff',
    titleSize: 64,
    subtitleSize: 26,
    alignment: 'center',
    titleText: 'Big Announcement Coming',
    subtitleText: 'Stay tuned for something amazing',
    authorText: 'company.com',
    fontFamily: 'sans-serif',
    pattern: 'none',
    shadow: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    bg: { type: 'solid', color1: '#ffffff' },
    textColor: '#000000',
    titleSize: 60,
    subtitleSize: 22,
    alignment: 'center',
    titleText: 'Clean & Simple Design',
    subtitleText: 'Elegance in simplicity',
    authorText: 'domain.com',
    fontFamily: 'serif',
    pattern: 'none',
    shadow: false,
  },
];

const GRADIENT_PRESETS = [
  { name: 'Purple Passion', color1: '#667eea', color2: '#764ba2' },
  { name: 'Sunset', color1: '#f97316', color2: '#ec4899' },
  { name: 'Ocean', color1: '#0ea5e9', color2: '#06b6d4' },
  { name: 'Forest', color1: '#16a34a', color2: '#10b981' },
  { name: 'Fire', color1: '#dc2626', color2: '#f59e0b' },
  { name: 'Midnight', color1: '#1e293b', color2: '#3b82f6' },
  { name: 'Bubble Gum', color1: '#db2777', color2: '#d946ef' },
  { name: 'Mint', color1: '#0d9488', color2: '#14b8a6' },
  { name: 'Lava', color1: '#ea580c', color2: '#d97706' },
  { name: 'Electric', color1: '#6366f1', color2: '#a855f7' },
  { name: 'Peachy', color1: '#fb923c', color2: '#fbbf24' },
  { name: 'Slate', color1: '#64748b', color2: '#475569' },
];

const FONT_FAMILIES = [
  { name: 'Sans Serif', value: 'sans-serif' },
  { name: 'Serif', value: 'serif' },
  { name: 'Monospace', value: 'monospace' },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [template, setTemplate] = useState<OGTemplate>(TEMPLATES[0]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('top-right');
  const [logoSize, setLogoSize] = useState(100);
  const [imageBlur, setImageBlur] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(100);
  const [pageTitle, setPageTitle] = useState('Your Page Title');
  const [pageDescription, setPageDescription] = useState('Your page description goes here');
  const [pageUrl, setPageUrl] = useState('yoursite.com');
  const [jpegQuality, setJpegQuality] = useState(95);
  const [showMetaTags, setShowMetaTags] = useState(false);
  const [copiedMetaTags, setCopiedMetaTags] = useState(false);
  const [copiedCanvasUrl, setCopiedCanvasUrl] = useState(false);

  // Draw canvas on state changes
  useEffect(() => {
    const drawCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1200;
      const height = 630;

      // Clear canvas
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Draw background
      if (template.bg.type === 'solid' && template.bg.color1) {
        ctx.fillStyle = template.bg.color1;
        ctx.fillRect(0, 0, width, height);
      } else if (template.bg.type === 'gradient' && template.bg.color1 && template.bg.color2) {
        const gradient = createCanvasGradient(ctx, width, height, template.bg.color1, template.bg.color2, template.bg.direction || 'to-right');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw background image if provided
      if (backgroundImage) {
        const img = new Image();
        img.onload = () => {
          ctx.globalAlpha = imageOpacity / 100;
          ctx.filter = `blur(${imageBlur}px)`;
          ctx.drawImage(img, 0, 0, width, height);
          ctx.globalAlpha = 1;
          ctx.filter = 'none';
          drawPatternOverlay(ctx, width, height);
          drawText(ctx, width, height);
          drawLogo(ctx, width, height);
        };
        img.src = backgroundImage;
        return;
      }

      // Draw pattern overlay
      drawPatternOverlay(ctx, width, height);

      // Draw text
      drawText(ctx, width, height);

      // Draw logo
      drawLogo(ctx, width, height);
    };

    drawCanvas();
  }, [template, backgroundImage, logoImage, logoPosition, logoSize, imageBlur, imageOpacity]);

  function createCanvasGradient(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color1: string,
    color2: string,
    direction: string
  ): CanvasGradient {
    let x0 = 0, y0 = 0, x1 = width, y1 = 0;

    if (direction === 'to-bottom') {
      x0 = 0; y0 = 0; x1 = 0; y1 = height;
    } else if (direction === 'to-bottom-right') {
      x0 = 0; y0 = 0; x1 = width; y1 = height;
    } else if (direction === 'to-top-right') {
      x0 = 0; y0 = height; x1 = width; y1 = 0;
    }

    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  }

  function drawPatternOverlay(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (template.pattern === 'dots') {
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = '#ffffff';
      const spacing = 30;
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    } else if (template.pattern === 'grid') {
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      const spacing = 40;
      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    } else if (template.pattern === 'lines') {
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      const spacing = 50;
      for (let i = -height; i < width + height; i += spacing) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  function drawText(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const padding = 60;
    const maxWidth = width - padding * 2;

    // Title
    ctx.font = `bold ${template.titleSize}px ${template.fontFamily}`;
    ctx.fillStyle = template.textColor;
    ctx.textAlign = template.alignment;

    let titleX = template.alignment === 'left' ? padding : template.alignment === 'right' ? width - padding : width / 2;
    let titleY = padding + template.titleSize;

    if (template.shadow) {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }

    ctx.fillText(template.titleText, titleX, titleY, maxWidth);

    ctx.shadowColor = 'transparent';

    // Subtitle
    ctx.font = `${template.subtitleSize}px ${template.fontFamily}`;
    ctx.fillStyle = template.textColor;
    ctx.globalAlpha = 0.9;

    let subtitleY = titleY + template.subtitleSize + 20;
    ctx.fillText(template.subtitleText, titleX, subtitleY, maxWidth);

    ctx.globalAlpha = 1;

    // Author/Site name at bottom
    ctx.font = `16px ${template.fontFamily}`;
    ctx.fillStyle = template.textColor;
    ctx.globalAlpha = 0.8;
    let authorY = height - padding + 20;
    ctx.textAlign = 'left';
    ctx.fillText(template.authorText, padding, authorY);
    ctx.globalAlpha = 1;
  }

  function drawLogo(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (!logoImage) return;

    const img = new Image();
    img.onload = () => {
      const size = logoSize;
      let x = 0, y = 0;

      if (logoPosition === 'top-left') {
        x = 30;
        y = 30;
      } else if (logoPosition === 'top-right') {
        x = width - size - 30;
        y = 30;
      } else if (logoPosition === 'bottom-left') {
        x = 30;
        y = height - size - 30;
      } else if (logoPosition === 'bottom-right') {
        x = width - size - 30;
        y = height - size - 30;
      }

      ctx.drawImage(img, x, y, size, size);
    };
    img.src = logoImage;
  }

  function handleBackgroundImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function downloadCanvas(format: 'png' | 'jpeg') {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    if (format === 'png') {
      link.href = canvas.toDataURL('image/png');
      link.download = 'og-image.png';
    } else {
      link.href = canvas.toDataURL('image/jpeg', jpegQuality / 100);
      link.download = 'og-image.jpg';
    }
    link.click();
  }

  function copyCanvasAsBase64() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    navigator.clipboard.writeText(dataUrl);
    setCopiedCanvasUrl(true);
    setTimeout(() => setCopiedCanvasUrl(false), 2000);
  }

  function getMetaTags() {
    const imageUrl = canvasRef.current?.toDataURL('image/png') || 'https://makemyog.app/og-image.png';

    return `<meta property="og:title" content="${pageTitle}" />
<meta property="og:description" content="${pageDescription}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:url" content="${pageUrl}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${pageTitle}" />
<meta name="twitter:description" content="${pageDescription}" />
<meta name="twitter:image" content="${imageUrl}" />`;
  }

  function copyMetaTags() {
    navigator.clipboard.writeText(getMetaTags());
    setCopiedMetaTags(true);
    setTimeout(() => setCopiedMetaTags(false), 2000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Make My OG</h1>
              <p className="text-sm sm:text-base text-white/80">Free OG Image & Social Card Generator</p>
            </div>
            <div className="text-right text-xs sm:text-sm">
              <p className="text-white/80">100% Client-side</p>
              <p className="text-white/80">No server processing</p>
              <p className="text-white/80">Your designs stay private</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Templates */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Templates</h3>
              <div className="grid grid-cols-2 gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t)}
                    className={`p-2 rounded-lg text-sm font-medium transition ${
                      template.id === t.id
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Controls */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Text</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={template.titleText}
                    onChange={(e) => setTemplate({ ...template, titleText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={template.subtitleText}
                    onChange={(e) => setTemplate({ ...template, subtitleText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author / Site</label>
                  <input
                    type="text"
                    value={template.authorText}
                    onChange={(e) => setTemplate({ ...template, authorText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Font Family</label>
                    <select
                      value={template.fontFamily}
                      onChange={(e) => setTemplate({ ...template, fontFamily: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {FONT_FAMILIES.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                    <select
                      value={template.alignment}
                      onChange={(e) => setTemplate({ ...template, alignment: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title Size: {template.titleSize}px
                  </label>
                  <input
                    type="range"
                    min="32"
                    max="96"
                    value={template.titleSize}
                    onChange={(e) => setTemplate({ ...template, titleSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle Size: {template.subtitleSize}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="48"
                    value={template.subtitleSize}
                    onChange={(e) => setTemplate({ ...template, subtitleSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                  <input
                    type="color"
                    value={template.textColor}
                    onChange={(e) => setTemplate({ ...template, textColor: e.target.value })}
                    className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="shadow"
                    checked={template.shadow}
                    onChange={(e) => setTemplate({ ...template, shadow: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="shadow" className="text-sm font-medium text-gray-700">
                    Text Shadow
                  </label>
                </div>
              </div>
            </div>

            {/* Background Controls */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Background</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Type
                  </label>
                  <select
                    value={template.bg.type}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        bg: { ...template.bg, type: e.target.value as any },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="solid">Solid Color</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </div>

                {template.bg.type === 'solid' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="color"
                      value={template.bg.color1 || '#ffffff'}
                      onChange={(e) =>
                        setTemplate({
                          ...template,
                          bg: { ...template.bg, color1: e.target.value },
                        })
                      }
                      className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                    />
                  </div>
                )}

                {template.bg.type === 'gradient' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color 1</label>
                        <input
                          type="color"
                          value={template.bg.color1 || '#667eea'}
                          onChange={(e) =>
                            setTemplate({
                              ...template,
                              bg: { ...template.bg, color1: e.target.value },
                            })
                          }
                          className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Color 2</label>
                        <input
                          type="color"
                          value={template.bg.color2 || '#764ba2'}
                          onChange={(e) =>
                            setTemplate({
                              ...template,
                              bg: { ...template.bg, color2: e.target.value },
                            })
                          }
                          className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                      <select
                        value={template.bg.direction || 'to-right'}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            bg: { ...template.bg, direction: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="to-right">Right</option>
                        <option value="to-bottom">Bottom</option>
                        <option value="to-bottom-right">Bottom Right</option>
                        <option value="to-top-right">Top Right</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Presets</label>
                      <div className="grid grid-cols-6 gap-2">
                        {GRADIENT_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() =>
                              setTemplate({
                                ...template,
                                bg: {
                                  ...template.bg,
                                  color1: preset.color1,
                                  color2: preset.color2,
                                },
                              })
                            }
                            className="h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition"
                            style={{
                              background: `linear-gradient(135deg, ${preset.color1}, ${preset.color2})`,
                            }}
                            title={preset.name}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
                  <select
                    value={template.pattern}
                    onChange={(e) => setTemplate({ ...template, pattern: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="none">None</option>
                    <option value="dots">Dots</option>
                    <option value="grid">Grid</option>
                    <option value="lines">Lines</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                    className="w-full"
                  />
                  {backgroundImage && (
                    <>
                      <div className="mt-3 space-y-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blur: {imageBlur}px
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="20"
                            value={imageBlur}
                            onChange={(e) => setImageBlur(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Opacity: {imageOpacity}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={imageOpacity}
                            onChange={(e) => setImageOpacity(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Controls */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Logo</h3>
              <div className="space-y-3">
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full"
                />
                {logoImage && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
                          <button
                            key={pos}
                            onClick={() => setLogoPosition(pos)}
                            className={`p-2 rounded-lg text-sm font-medium transition ${
                              logoPosition === pos
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {pos.replace('-', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Size: {logoSize}px
                      </label>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        value={logoSize}
                        onChange={(e) => setLogoSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Center - Canvas Preview */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-4 w-full">
              <canvas
                ref={canvasRef}
                width={1200}
                height={630}
                className="w-full h-auto bg-gray-100 rounded-lg"
              />
            </div>

            {/* Export Options */}
            <div className="mt-6 w-full space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => downloadCanvas('png')}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition shadow-md"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => downloadCanvas('jpeg')}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-lg transition shadow-md"
                >
                  Download JPEG
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">JPEG Quality: {jpegQuality}%</label>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={copyCanvasAsBase64}
                className={`w-full font-medium py-2 px-4 rounded-lg transition ${
                  copiedCanvasUrl
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {copiedCanvasUrl ? 'Copied Base64!' : 'Copy as Base64'}
              </button>
            </div>
          </div>

          {/* Right Panel - Social Previews & Meta Tags */}
          <div className="lg:col-span-1 space-y-6">
            {/* Page Info */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <h3 className="font-bold text-lg mb-3 text-gray-900">Page Info</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={pageDescription}
                    onChange={(e) => setPageDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                  <input
                    type="text"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Social Preview - Twitter */}
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
              <h3 className="font-bold text-base mb-3 text-gray-900">Twitter Preview</h3>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-gray-900 text-white p-3">
                  <div className="text-xs text-gray-500 mb-2">twitter.com</div>
                  <h4 className="font-bold text-sm mb-1">{pageTitle}</h4>
                  <p className="text-xs text-gray-400 mb-2">{pageDescription}</p>
                  <div className="bg-gray-800 aspect-video rounded flex items-center justify-center mb-2">
                    <span className="text-xs text-gray-500">OG Image Preview</span>
                  </div>
                  <div className="text-xs text-gray-500">{pageUrl}</div>
                </div>
              </div>
            </div>

            {/* Social Preview - Facebook */}
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
              <h3 className="font-bold text-base mb-3 text-gray-900">Facebook Preview</h3>
              <div className="border border-blue-300 rounded-lg overflow-hidden">
                <div className="bg-white">
                  <div className="bg-gray-100 aspect-video flex items-center justify-center mb-0">
                    <span className="text-xs text-gray-500">OG Image Preview</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-sm text-blue-600 mb-1">{pageUrl}</h4>
                    <h5 className="font-bold text-sm mb-1">{pageTitle}</h5>
                    <p className="text-xs text-gray-600">{pageDescription}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meta Tags */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <button
                onClick={() => setShowMetaTags(!showMetaTags)}
                className="w-full flex items-center justify-between font-bold text-lg text-gray-900 mb-3"
              >
                Meta Tags
                <span>{showMetaTags ? '▼' : '▶'}</span>
              </button>

              {showMetaTags && (
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-3 overflow-auto max-h-48">
                    <pre className="text-xs text-gray-200 font-mono whitespace-pre-wrap">
                      {getMetaTags()}
                    </pre>
                  </div>
                  <button
                    onClick={copyMetaTags}
                    className={`w-full font-medium py-2 px-4 rounded-lg transition ${
                      copiedMetaTags
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {copiedMetaTags ? 'Meta Tags Copied!' : 'Copy All Meta Tags'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    const imageUrl = canvasRef.current?.toDataURL('image/png') || 'https://makemyogapp.vercel.app/og-image.png';

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
    <div className="min-h-screen" style={{ background: '#e5e9f0' }}>
      {/* Premium Header */}
      <header style={{ background: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)', borderBottom: '2px solid rgba(0,0,0,0.15)', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 4px 20px rgba(249,115,22,0.3)' }}>
        <div style={{ maxWidth: '1536px', margin: '0 auto', padding: '18px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
              🎨
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                Make My OG
              </h1>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: 500 }}>Free OG Image & Social Card Generator</p>
            </div>
          </div>
          <div className="hidden sm:flex" style={{ alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff' }}>100% Client-side · No server processing</span>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1536px', margin: '0 auto', padding: '28px 32px' }}>
        {/* Three-column premium layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-min" style={{ gap: '24px' }}>
          {/* LEFT PANEL - CONTROLS (3 cols on desktop) */}
          <div className="lg:col-span-3 space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
            {/* Templates Section */}
            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #94a3b8', padding: '20px' }}>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #f97316, #ec4899)' }}></div>
                <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Templates</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {TEMPLATES.map((t) => {
                  const isLight = t.bg.color1 === '#ffffff' || t.bg.color1 === '#f8fafc' || t.bg.color1 === '#f1f5f9';
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTemplate(t)}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        height: '44px',
                        border: template.id === t.id ? '2px solid #3b82f6' : isLight ? '1px solid #cbd5e1' : '1px solid rgba(255,255,255,0.2)',
                        outline: template.id === t.id ? '2px solid #3b82f6' : 'none',
                        outlineOffset: '2px',
                        cursor: 'pointer',
                        background: t.bg.type === 'gradient'
                          ? `linear-gradient(135deg, ${t.bg.color1}, ${t.bg.color2})`
                          : t.bg.color1,
                      }}
                    >
                      <span style={{
                        position: 'relative',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: isLight ? '#334155' : '#ffffff',
                        textShadow: isLight ? 'none' : '0 1px 3px rgba(0,0,0,0.6)',
                        lineHeight: 1.1,
                        textAlign: 'center',
                        padding: '2px 3px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                      }}>{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Text Section */}
            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #94a3b8', padding: '20px' }}>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)' }}></div>
                <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Text</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
                  <input
                    type="text"
                    value={template.titleText}
                    onChange={(e) => setTemplate({ ...template, titleText: e.target.value })}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                    placeholder="Your headline"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subtitle</label>
                  <input
                    type="text"
                    value={template.subtitleText}
                    onChange={(e) => setTemplate({ ...template, subtitleText: e.target.value })}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                    placeholder="Subheading or tagline"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Author / Site</label>
                  <input
                    type="text"
                    value={template.authorText}
                    onChange={(e) => setTemplate({ ...template, authorText: e.target.value })}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                    placeholder="yoursite.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Font</label>
                    <select
                      value={template.fontFamily}
                      onChange={(e) => setTemplate({ ...template, fontFamily: e.target.value })}
                      className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                    >
                      {FONT_FAMILIES.map((f) => (
                        <option key={f.value} value={f.value}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Align</label>
                    <select
                      value={template.alignment}
                      onChange={(e) => setTemplate({ ...template, alignment: e.target.value as any })}
                      className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title Size</label>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>{template.titleSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="120"
                    value={template.titleSize}
                    onChange={(e) => setTemplate({ ...template, titleSize: parseInt(e.target.value) })}
                    className="w-full" style={{ accentColor: '#2563eb', height: '6px', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subtitle Size</label>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>{template.subtitleSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="60"
                    value={template.subtitleSize}
                    onChange={(e) => setTemplate({ ...template, subtitleSize: parseInt(e.target.value) })}
                    className="w-full" style={{ accentColor: '#2563eb', height: '6px', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Text Color</label>
                  <div className="flex items-center gap-2">
                    <div style={{ position: 'relative', height: '40px', width: '40px', borderRadius: '8px', border: '2px solid #94a3b8', overflow: 'hidden' }}>
                      <input
                        type="color"
                        value={template.textColor}
                        onChange={(e) => setTemplate({ ...template, textColor: e.target.value })}
                        className="h-full w-full cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={template.textColor}
                      onChange={(e) => setTemplate({ ...template, textColor: e.target.value })}
                      className="flex-1 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '8px 10px', fontSize: '12px', fontFamily: 'ui-monospace, monospace', color: '#0f172a', outline: 'none' }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3" style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #94a3b8' }}>
                  <input
                    type="checkbox"
                    id="shadow"
                    checked={template.shadow}
                    onChange={(e) => setTemplate({ ...template, shadow: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer' }}
                  />
                  <label htmlFor="shadow" style={{ fontSize: '13px', fontWeight: 500, color: '#334155', cursor: 'pointer', flex: 1 }}>
                    Text Shadow
                  </label>
                </div>
              </div>
            </div>

            {/* Background Section */}
            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #94a3b8', padding: '20px' }}>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #8b5cf6, #ec4899)' }}></div>
                <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Background</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</label>
                  <select
                    value={template.bg.type}
                    onChange={(e) =>
                      setTemplate({
                        ...template,
                        bg: { ...template.bg, type: e.target.value as any },
                      })
                    }
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                  >
                    <option value="solid">Solid Color</option>
                    <option value="gradient">Gradient</option>
                  </select>
                </div>

                {template.bg.type === 'solid' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Color</label>
                    <div style={{ height: '48px', borderRadius: '8px', border: '2px solid #94a3b8', overflow: 'hidden' }}>
                      <input
                        type="color"
                        value={template.bg.color1 || '#ffffff'}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            bg: { ...template.bg, color1: e.target.value },
                          })
                        }
                        className="h-full w-full cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {template.bg.type === 'gradient' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Color 1</label>
                        <div style={{ height: '40px', borderRadius: '8px', border: '2px solid #94a3b8', overflow: 'hidden' }}>
                          <input
                            type="color"
                            value={template.bg.color1 || '#667eea'}
                            onChange={(e) =>
                              setTemplate({
                                ...template,
                                bg: { ...template.bg, color1: e.target.value },
                              })
                            }
                            className="h-full w-full cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Color 2</label>
                        <div style={{ height: '40px', borderRadius: '8px', border: '2px solid #94a3b8', overflow: 'hidden' }}>
                          <input
                            type="color"
                            value={template.bg.color2 || '#764ba2'}
                            onChange={(e) =>
                              setTemplate({
                                ...template,
                                bg: { ...template.bg, color2: e.target.value },
                              })
                            }
                            className="h-full w-full cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Direction</label>
                      <select
                        value={template.bg.direction || 'to-right'}
                        onChange={(e) =>
                          setTemplate({
                            ...template,
                            bg: { ...template.bg, direction: e.target.value },
                          })
                        }
                        className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                      >
                        <option value="to-right">Right</option>
                        <option value="to-bottom">Bottom</option>
                        <option value="to-bottom-right">Bottom Right</option>
                        <option value="to-top-right">Top Right</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Presets</label>
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
                            style={{
                              height: '36px', borderRadius: '8px', border: '2px solid #94a3b8', cursor: 'pointer',
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
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pattern</label>
                  <select
                    value={template.pattern}
                    onChange={(e) => setTemplate({ ...template, pattern: e.target.value as any })}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                  >
                    <option value="none">None</option>
                    <option value="dots">Dots</option>
                    <option value="grid">Grid</option>
                    <option value="lines">Lines</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Background Image</label>
                  <label style={{ display: 'block', padding: '12px', border: '2px dashed #94a3b8', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageUpload}
                      className="hidden"
                    />
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                      {backgroundImage ? 'Change Image' : 'Click to upload'}
                    </div>
                  </label>

                  {backgroundImage && (
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Blur</label>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>{imageBlur}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="20"
                          value={imageBlur}
                          onChange={(e) => setImageBlur(parseInt(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Opacity</label>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>{imageOpacity}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageOpacity}
                          onChange={(e) => setImageOpacity(parseInt(e.target.value))}
                          className="w-full accent-blue-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Logo Section */}
            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #94a3b8', padding: '20px' }}>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #6366f1, #3b82f6)' }}></div>
                <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Logo</h2>
              </div>
              <div className="space-y-4">
                <label style={{ display: 'block', padding: '12px', border: '2px dashed #94a3b8', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
                    {logoImage ? 'Change Logo' : 'Click to upload'}
                  </div>
                </label>

                {logoImage && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Position</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((pos) => (
                          <button
                            key={pos}
                            onClick={() => setLogoPosition(pos)}
                            className={`px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                              logoPosition === pos
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {pos.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('-')}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Size</label>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>{logoSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        value={logoSize}
                        onChange={(e) => setLogoSize(parseInt(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setLogoImage(null);
                        if (logoInputRef.current) logoInputRef.current.value = '';
                      }}
                      className="w-full text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      Remove Logo
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* CENTER PANEL - CANVAS PREVIEW (6 cols on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-start">
            <div className="w-full" style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid #94a3b8', overflow: 'hidden' }}>
              <div className="aspect-video flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)', padding: '24px' }}>
                <canvas
                  ref={canvasRef}
                  width={1200}
                  height={630}
                  className="w-full h-full" style={{ borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
                />
              </div>
            </div>

            <div className="w-full mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => downloadCanvas('png')}
                  className="group relative bg-gradient-to-r from-orange-500 via-orange-500 to-pink-500 hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
                  <span className="relative flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    PNG
                  </span>
                </button>
                <button
                  onClick={() => downloadCanvas('jpeg')}
                  className="group relative bg-gradient-to-r from-purple-500 via-purple-500 to-indigo-500 hover:shadow-xl text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors" />
                  <span className="relative flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    JPEG
                  </span>
                </button>
              </div>

              <div style={{ background: '#ffffff', borderRadius: '12px', padding: '16px', border: '1px solid #94a3b8' }}>
                <div className="flex items-center justify-between mb-2">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>JPEG Quality</label>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 8px', borderRadius: '6px' }}>{jpegQuality}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <button
                onClick={copyCanvasAsBase64}
                className="w-full flex items-center justify-center gap-2"
                style={{ fontWeight: 700, padding: '12px 16px', borderRadius: '12px', border: '2px solid ' + (copiedCanvasUrl ? '#86efac' : '#94a3b8'), background: copiedCanvasUrl ? '#f0fdf4' : '#f8fafc', color: copiedCanvasUrl ? '#15803d' : '#334155', cursor: 'pointer', fontSize: '14px' }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copiedCanvasUrl ? 'Copied Base64!' : 'Copy as Base64'}
              </button>

              <button
                onClick={() => setShowMetaTags(!showMetaTags)}
                className="w-full flex items-center justify-center gap-2"
                style={{ fontWeight: 700, padding: '12px 16px', borderRadius: '12px', border: '2px solid #94a3b8', background: '#f8fafc', color: '#334155', cursor: 'pointer', fontSize: '14px' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20H7a2 2 0 01-2-2V6a2 2 0 012-2h3" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 4h3a2 2 0 012 2v12a2 2 0 01-2 2h-3" />
                </svg>
                {showMetaTags ? 'Hide' : 'View'} Meta Tags
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - SOCIAL PREVIEWS (3 cols on desktop) */}
          <div className="lg:col-span-3 space-y-5 max-h-[calc(100vh-180px)] overflow-y-auto pl-2">
            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #94a3b8', padding: '20px' }}>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #22c55e, #10b981)' }}></div>
                <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Page Info</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</label>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none' }}
                    placeholder="Page title"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                  <textarea
                    value={pageDescription}
                    onChange={(e) => setPageDescription(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none', resize: 'none' }}
                    placeholder="Describe your page..."
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>URL</label>
                  <input
                    type="text"
                    value={pageUrl}
                    onChange={(e) => setPageUrl(e.target.value)}
                    className="w-full rounded-lg" style={{ background: '#f8fafc', border: '1px solid #94a3b8', padding: '10px 12px', fontSize: '13px', fontWeight: 500, color: '#0f172a', outline: 'none', fontFamily: 'monospace' }}
                    placeholder="yoursite.com"
                  />
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #94a3b8', overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #1DA1F2, #0d8bd9)' }}></div>
                <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Twitter Preview</h3>
              </div>
              <div style={{ background: '#15202b', padding: '16px' }}>
                <div style={{ border: '1px solid #38444d', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ background: '#1e2732', aspectRatio: '1200/630', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <div style={{ fontSize: '12px', color: '#8899a6', fontWeight: 500 }}>OG Image Preview</div>
                  </div>
                  <div style={{ padding: '12px', borderTop: '1px solid #38444d' }}>
                    <div style={{ fontSize: '11px', color: '#8899a6', marginBottom: '4px' }}>{pageUrl || 'yoursite.com'}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pageTitle || 'Page Title'}</div>
                    <div style={{ fontSize: '12px', color: '#8899a6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pageDescription || 'Page description...'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #94a3b8', overflow: 'hidden' }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #94a3b8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #1877F2, #0d65d9)' }}></div>
                <h3 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Facebook Preview</h3>
              </div>
              <div style={{ background: '#f0f2f5', padding: '16px' }}>
                <div style={{ background: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dadde1' }}>
                  <div style={{ background: '#e4e6eb', aspectRatio: '1200/630', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '12px', color: '#65676b', fontWeight: 500 }}>OG Image Preview</div>
                  </div>
                  <div style={{ padding: '12px 14px', borderTop: '1px solid #dadde1', background: '#f0f2f5' }}>
                    <div style={{ fontSize: '11px', color: '#65676b', textTransform: 'uppercase', marginBottom: '4px' }}>{pageUrl || 'yoursite.com'}</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1c1e21', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pageTitle || 'Page Title'}</div>
                    <div style={{ fontSize: '13px', color: '#65676b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pageDescription || 'Page description...'}</div>
                  </div>
                </div>
              </div>
            </div>

            {showMetaTags && (
              <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border: '1px solid #94a3b8', padding: '20px' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div style={{ width: '4px', height: '20px', borderRadius: '4px', background: 'linear-gradient(to bottom, #64748b, #334155)' }}></div>
                  <h2 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Meta Tags Code</h2>
                </div>
                <div style={{ background: '#0f172a', borderRadius: '12px', padding: '16px', overflow: 'auto', maxHeight: '256px', marginBottom: '12px' }}>
                  <pre style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {getMetaTags()}
                  </pre>
                </div>
                <button
                  onClick={copyMetaTags}
                  className="w-full flex items-center justify-center gap-2"
                  style={{ fontWeight: 700, padding: '10px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid ' + (copiedMetaTags ? '#86efac' : '#94a3b8'), background: copiedMetaTags ? '#f0fdf4' : '#f1f5f9', color: copiedMetaTags ? '#15803d' : '#475569', cursor: 'pointer' }}
                >
                  <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copiedMetaTags ? 'Copied!' : 'Copy Meta Tags'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid #94a3b8', background: 'rgba(255,255,255,0.7)', marginTop: '48px' }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>
            Made with Canvas API • Your designs never leave your browser
          </p>
        </div>
      </footer>
    </div>
  );
}

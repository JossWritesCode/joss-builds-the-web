import { Helmet } from "react-helmet-async";
import { site } from "../../../config/siteConfig";

function SEO({ title, description }: { title?: string; description?: string }) {
  const t = title ? `${title} • ${site.name}` : site.seo.defaultTitle;
  const d = description || site.seo.defaultDescription;
  return (
    <Helmet>
      <title>{t}</title>
      <meta name="description" content={d} />
      <meta property="og:title" content={t} />
      <meta property="og:description" content={d} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site.seo.url} />
      <meta property="og:image" content={site.seo.image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

export default SEO;

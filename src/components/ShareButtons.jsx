"use client";

export default function ShareButtons({ url }) {

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied!");
  };

  return (
    <div className="flex gap-3">

      <a
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        className="border px-4 py-2 rounded-lg"
      >
        Twitter
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        className="border px-4 py-2 rounded-lg"
      >
        LinkedIn
      </a>

      <button
        onClick={copyLink}
        className="border px-4 py-2 rounded-lg"
      >
        Copy Link
      </button>

    </div>
  );
}
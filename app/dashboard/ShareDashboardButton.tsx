import React, { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';

const ShareDashboardButton = ({ username }: { username: string }) => {
  const [message, setMessage] = useState("Share Dashboard");

  const handleShare = async () => {
    const dashboardUrl = `${window.location.origin}/dashboard/${username}`;
    try {
      await navigator.clipboard.writeText(dashboardUrl);
      setMessage("Link copied!");
      setTimeout(() => setMessage("Share Dashboard"), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };
  
  return (
    <button
      className="flex items-center border border-zinc-200 text-zinc-200 py-2 px-4 rounded-lg text-sm hover:bg-zinc-200 hover:text-black transition-all shadow-md"
      onClick={handleShare}
    >
      <FiShare2 className="mr-2" />
      {message}
    </button>
  );
};

export default ShareDashboardButton;

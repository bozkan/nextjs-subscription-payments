const MetricCard = ({ metric }) => {
  
  const readableDate = new Date(metric.created_at).toLocaleDateString();

  return (
    <div className="rounded-lg bg-gray-800 overflow-hidden shadow border-2 border-gray-400">
      <div className="px-6 py-4 text-center">
        <div className="font-bold text-xl mb-2 text-white">{metric.name}</div>
        <p className="text-gray-300 text-6xl">{metric.value}</p>
      </div>
      <div className="px-6 pt-4 pb-2 text-center">
        <span className="inline-block bg-gray-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-500">{readableDate}</span>
      </div>
    </div>
  );
};

export default MetricCard;
import React, { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { FaCheck } from 'react-icons/fa';

interface Props {
  userId: string;
  onMetricAdded: () => void;
}

const MetricInsertCardV2 = ({ userId, onMetricAdded }: Props) => {
  const [name, setName] = useState('');
  const [stripeConnected, setStripeConnected] = useState(false);
  
  // Simulate check if user has connected Stripe
  useEffect(() => {
    const checkStripeConnection = async () => {
      // Replace with your real API call to check if user has connected Stripe
      const userHasConnectedStripe = await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
      setStripeConnected(userHasConnectedStripe);
    };
    checkStripeConnection();
  }, []);

  const handleStripeConnect = () => {
    window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_O7ZYi3WLsPaAa98iCRNl5ExSLOoUrXE8&scope=read_only`;
  };

  const handleFetchMetrics = async () => {
    // Replace with your real API call to fetch and insert metrics
    const metricData = {
      user_id: userId,
      name: name,
      value: '123',  // dummy value, replace with real data
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    const { data, error } = await supabaseAdmin
      .from('metrics')
      .insert([metricData]);
    if (error) throw error;
    console.log("Metric added", data);
    onMetricAdded();
  };

  return (
    <div className="p-6 rounded-md bg-gray-800 overflow-hidden shadow border-2 border-gray-400">
      <h2 className="text-center text-xl font-bold mb-4">Stripe</h2>
      {stripeConnected ? (
        <form onSubmit={handleFetchMetrics}>
          <div className="mb-4">
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a metric</option>
              <option value="Get MRR">Get MRR</option>
              <option value="# Paying Customers"># Paying Customers</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
          >
            Fetch
          </button>
        </form>
      ) : (
        <button
          onClick={handleStripeConnect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Connect with Stripe
        </button>
      )}
      {stripeConnected && <p className="text-green-500 text-center mt-4"><FaCheck /> Stripe Connected</p>}
    </div>
  );
};

export default MetricInsertCardV2;

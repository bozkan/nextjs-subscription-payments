"use client"

import { useState, useEffect } from 'react';
import { supabaseAdmin, getUsername } from '@/utils/supabase-admin';
import type { Metric } from '@/utils/supabase-admin';
import MetricCard from './MetricCard';
import MetricInsertCard from './MetricInsertCard';
import ShareDashboardButton from './ShareDashboardButton';
import { useSupabase } from '@/app/supabase-provider';

const Dashboard = () => {

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [userId, setUserId] = useState<string | null | undefined>(null);
  const [username, setUsername] = useState<string | null | undefined>(null);
  const { supabase } = useSupabase();

  const handleMetricAdded = (newMetric: Metric) => {
    setMetrics((prevMetrics) => [...prevMetrics, newMetric]);
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user?.id) {
          const fetchedUsername = await getUsername(user.id);
          if (typeof fetchedUsername === 'string') {
            setUsername(fetchedUsername);
          }
          setUserId(user.id);
        }
    
        const { data, error } = await supabaseAdmin
          .from('metrics')
          .select('*')
          .eq('user_id', user?.id);

        if (error) throw error;
        setMetrics(data || []);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <section className="mb-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 mx-autosm:pt-24">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Dashboard
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
              We partnered with Stripe for a simplified billing.
            </p>
          </div>
          {username && (
            <div className="top-4 right-4">
              <ShareDashboardButton username={username} />
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
          {userId && <MetricInsertCard userId={userId} onMetricAdded={handleMetricAdded} />}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
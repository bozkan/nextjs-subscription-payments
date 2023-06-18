"use client"

import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/utils/supabase-admin';
import type { Metric } from '@/utils/supabase-admin';
import MetricCard from './MetricCard';
import { useSupabase } from '@/app/supabase-provider';

const Dashboard = () => {

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabaseAdmin
          .from('metrics')
          .select('*')
          .eq('user_id', user?.id);
          
        if (error) throw error;
        console.log(data)

        setMetrics(data || []);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-center leading-tight text-white">Metrics</h1>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
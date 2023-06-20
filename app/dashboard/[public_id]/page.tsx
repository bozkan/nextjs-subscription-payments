"use client"

import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/utils/supabase-admin';
import type { Metric } from '@/utils/supabase-admin';
import MetricCard from '../MetricCard';

const Page = ({ params }: { params: { public_id: string } }) => {

  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data, error } = await supabaseAdmin
          .from('metrics')
          .select('*')
          .eq('username', params.public_id);
          
        if (error) throw error;
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
        <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Public Dashboard
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
              {params.public_id}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
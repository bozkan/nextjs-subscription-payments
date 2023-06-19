import React, { useState } from 'react';
import { supabaseAdmin } from '@/utils/supabase-admin';

const MetricInsertCard = ({ userId, onMetricAdded }: Props) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data, error } = await supabaseAdmin
        .from('metrics')
        .insert([
          {
            user_id: userId,
            name: name,
            value: value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
        ])
        .select('*');

      if (error) throw error;

      console.log("Metric added", data);

      setName('');
      setValue('');
      onMetricAdded(data[0]);  // call the passed in function to update the list
    } catch (error) {
      console.error("Error inserting metric:", error);
    }
  };

  return (
    <div className="p-6 rounded-md bg-gray-800 overflow-hidden shadow border-2 border-gray-400">
      <h2 className="text-center text-xl font-bold mb-4">Insert a new metric</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="metric-name"
          type="text"
          value={name}
          placeholder="Metric Name"
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <input
          id="metric-value"
          type="number"
          value={value}
          placeholder="Metric Value"
          onChange={(e) => setValue(e.target.value)}
          className="shadow appearance-none border rounded w-full mb-2 mt-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MetricInsertCard;

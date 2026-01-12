import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions, ChartDataset } from 'chart.js';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

import { getHarvestsByGrapeId, type Harvest } from '../Services/Harvest/HarvestServices';
import { fetchGrapes, type Grape } from '../Services/Grape/GrapeServices';
import { rainfallMockData } from './RainfallMock';


ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type Props = { grapeId?: number };

//colors for lines on chart
const palette = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
];

export default function ChartComponent({}: Props) {
  const [grapes, setGrapes] = useState<Grape[]>([]);
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [selectedGrapeId, setSelectedGrapeId] = useState<number | "">("");
  
  const [showHarvest, setShowHarvest] = useState(true);
  const [showRainfall, setShowRainfall] = useState(false);

  const [xAxisTimeUnit, setXAxisTimeUnit] = useState<'month' | 'year'>('month');

  /* ---------------- Fetch grapes ---------------- */
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const gs = await fetchGrapes();
        if (mounted) setGrapes(gs);
      } catch (err) {
        console.error('Failed to load grapes', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------- Fetch harvests ---------------- */
  useEffect(() => {
    if (!selectedGrapeId || (!showHarvest && !showRainfall)) {
      setHarvests([]);
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const data = await getHarvestsByGrapeId(selectedGrapeId);
        if (mounted) setHarvests(data);
      } catch (err) {
        console.error('Failed to load harvests', err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [selectedGrapeId, showHarvest, showRainfall]);

  const selectedGrape = grapes.find(g => g.GrapeId === selectedGrapeId);

  /* ---------------- Datasets ---------------- */
  const datasets: ChartDataset<'line', { x: number; y: number }[]>[] = [];

  if (showHarvest) {
    datasets.push({
      label: `${selectedGrape?.GrapeName ?? 'Drue'} – Høst`,
      data: harvests.map(h => ({
        x: new Date(h.HarvestDate).getTime(),
        y: h.HarvestWeight,
      })),
      borderColor: palette[0],
      backgroundColor: palette[0],
      yAxisID: 'yHarvest',
      tension: 0.3,
    });
  }

  if (showRainfall) {
  datasets.push({
    label: 'Nedbør',
    data: rainfallMockData.map(r => ({
      x: new Date(r.date).getTime(),
      y: r.mm,
    })),
    borderColor: palette[1],
    backgroundColor: palette[1],
    yAxisID: 'yRainfall',
    tension: 0.3,
  });
}


  const data: ChartData<'line'> = { datasets };

  /* ---------------- Dynamic axes ---------------- */
  const scales: ChartOptions<'line'>['scales'] = {
    x: {
      type: 'time',
      time: { unit: xAxisTimeUnit},
    },
  };

  if (showHarvest) {
    scales.yHarvest = {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Høst (kg)',
      },
      suggestedMin: 0, 
      suggestedMax: 200,
    };
  }

  if (showRainfall) {
    scales.yRainfall = {
      type: 'linear',
      position: 'right',
      title: {
        display: true,
        text: 'Nedbør (mm)',
      },
      grid: {
        drawOnChartArea: false,
      },
      suggestedMin: 0, 
      suggestedMax: 100,
    };
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales,      
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  /* ---------------- Render ---------------- */
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <label className="flex items-center gap-2">
          <span>Druesort:</span>
          <select
            value={selectedGrapeId}
            onChange={e =>
              setSelectedGrapeId(
                e.target.value ? Number(e.target.value) : ""
              )
            }
            className="border rounded px-2 py-1"
          >
            <option value="">-- Vælg --</option>
            {grapes.map(g => (
              <option key={g.GrapeId} value={g.GrapeId}>
                {g.GrapeName}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showHarvest}
              onChange={e => setShowHarvest(e.target.checked)}
            />
            <span>Høst</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showRainfall}
              onChange={e => setShowRainfall(e.target.checked)}
            />
            <span>Nedbør</span>
          </label>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={xAxisTimeUnit === 'month'}
              onChange={(e) =>
                setXAxisTimeUnit(e.target.checked ? 'month' : 'year')
              }
            />
            <span>Vis måneder</span>
          </label>
        </div>
      </div>

      <div style={{ height: 500, width: 1000 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

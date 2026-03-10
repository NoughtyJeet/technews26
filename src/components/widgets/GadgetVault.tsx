import React from 'react';
import { Box } from 'lucide-react';

const SPLINE_SCENE_URL =
  process.env.NEXT_PUBLIC_SPLINE_SCENE_URL?.trim() || '';

export default function GadgetVault() {
  const hasSplineScene = Boolean(SPLINE_SCENE_URL);

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col p-6 relative">
      <div className="flex items-center justify-between mb-4 z-10">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Box className="w-5 h-5 text-[var(--color-neon-purple)]" />
          3D Gadget Vault
        </h3>
        <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-zinc-300">
          Interactive
        </span>
      </div>

      <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-purple)]/5 to-[var(--color-neon-cyan)]/5 group-hover:opacity-100 transition-opacity" />

        {hasSplineScene ? (
          <div className="relative z-10 w-full h-full">
            <iframe
              src={SPLINE_SCENE_URL}
              title="3D Gadget Vault"
              className="w-full h-full border-0"
              loading="lazy"
              allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope; magnetometer; vr; autoplay"
            />
          </div>
        ) : (
          <div className="text-center z-10 px-4">
            <div className="w-16 h-16 rounded-full border border-[var(--color-neon-cyan)] border-dashed mx-auto mb-3 animate-[spin_10s_linear_infinite] flex items-center justify-center">
              <Box className="w-6 h-6 text-zinc-500" />
            </div>
            <p className="text-sm font-medium text-zinc-300">
              Connect your Spline model
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Set <code className="px-1 py-0.5 rounded bg-black/40 border border-white/5">NEXT_PUBLIC_SPLINE_SCENE_URL</code>{' '}
              in <code className="px-1 py-0.5 rounded bg-black/40 border border-white/5">.env.local</code> with your Spline
              share URL to make this widget fully interactive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

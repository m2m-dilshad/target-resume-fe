/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useRef, ChangeEvent } from 'react';

export default function NativeColorPicker({
  onChange,
  defaultColor = '#3b82f6',
}: {
  onChange: any;
  defaultColor: string;
}) {
  // TypeScript infers 'string' from the initial hex value
  const [color, setColor] = useState<string>(defaultColor);

  // Explicitly type the ref for an HTML Input element
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTrigger = (): void => {
    const input = inputRef.current;
    if (!input) return;

    // Use type assertion for showPicker (not in TypeScript's standard lib yet)
    if ((input as HTMLInputElement & { showPicker?: () => void }).showPicker) {
      (input as HTMLInputElement & { showPicker?: () => void }).showPicker();
    } else {
      input.click();
    }
  };

  // Typed event handler for the input change
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex w-fit items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={handleColorChange}
        className="sr-only"
        aria-label="Choose theme color"
      />

      <button
        type="button" // Use button for better accessibility than a div
        onClick={handleTrigger}
        className="h-12 w-12 cursor-pointer rounded-full border-4 border-gray-100 shadow-inner transition-transform hover:scale-105"
        style={{ backgroundColor: color }}
        title="Click to change color"
      />

      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Hex</span>
        <span className="font-mono text-lg font-bold text-gray-800">{color.toUpperCase()}</span>
      </div>
    </div>
  );
}

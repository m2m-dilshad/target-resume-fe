'use client';

import { useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from './Textarea';
import Heading from './Heading';
import Typography from './Typography';
import Button from './Button';

interface PromptSelectorProps {
  onPromptChange?: (prompt: string) => void;
  className?: string;
}

const suggestedPrompts = [
  'Make resume ATS-friendly',
  'Highlight leadership and impact',
  'Quantify achievements with metrics',
  'Use strong action verbs',
  'Improve clarity and conciseness',
  'Focus on results over responsibilities',
  'Highlight problem-solving skills',
  'Emphasize collaboration and teamwork',
  'Improve overall formatting and readability',
  'Remove redundant or irrelevant details',
  'Highlight remote work capabilities',
];

export function PromptSelector({ onPromptChange, className }: PromptSelectorProps) {
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const textareaId = useId();
  const groupId = useId();

  const togglePrompt = (prompt: string) => {
    const newSelection = selectedPrompts.includes(prompt)
      ? selectedPrompts.filter((p) => p !== prompt)
      : [...selectedPrompts, prompt];

    setSelectedPrompts(newSelection);
    const combined = [...newSelection, customPrompt].filter(Boolean).join('. ');
    onPromptChange?.(combined);
  };

  const handleCustomPromptChange = (value: string) => {
    setCustomPrompt(value);
    const combined = [...selectedPrompts, value].filter(Boolean).join('. ');
    onPromptChange?.(combined);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        {/* <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" /> */}
        <Heading variant="h6" id={groupId} className="text-foreground">
          Optimization Prompts
        </Heading>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-labelledby={groupId}
        aria-describedby={`${groupId}-hint`}
      >
        <Typography variant="p" id={`${groupId}-hint`} className="sr-only">
          Select one or more optimization options. Press Enter or Space to toggle.
        </Typography>
        {suggestedPrompts.map((prompt) => {
          const isSelected = selectedPrompts.includes(prompt);
          return (
            <Button
              key={prompt}
              onClick={() => togglePrompt(prompt)}
              aria-pressed={isSelected}
              className={cn(
                'w-fit rounded-full px-3 py-1 text-xs! leading-none font-normal! lg:text-xs!',
                isSelected
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              )}
            >
              {prompt}
            </Button>
          );
        })}
      </div>

      <div className="space-y-2">
        <label htmlFor={textareaId} className="text-foreground text-sm font-medium">
          Custom Instructions
        </label>
        <Textarea
          id={textareaId}
          placeholder="Add any specific instructions for your resume optimization..."
          value={customPrompt}
          onChange={(e) => handleCustomPromptChange(e.target.value)}
          className="min-h-25 resize-none"
          aria-describedby={`${textareaId}-hint`}
        />
        <Typography variant="p" id={`${textareaId}-hint`} className="sr-only">
          Optional: Enter any custom instructions for how you want your resume to be optimized.
        </Typography>
      </div>
    </div>
  );
}

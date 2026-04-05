'use client';

import { useState } from 'react';
import { X, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Heading from '@/components/ui/Heading';
import Typography from '@/components/ui/Typography';
import { FilterState } from '../_constants/templates.types';
import { calculateRecommendation } from '../utils/template.recommend';

type WizardProps = {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (recommended: FilterState) => void;
};

export default function SuggestTemplateWizard({ isOpen, onClose, onApplyFilters }: WizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: '',
    highlight: '',
    profile: '',
  });

  if (!isOpen) return null;

  const handleNext = () => setStep((p) => Math.min(p + 1, 3));
  const handleBack = () => setStep((p) => Math.max(p - 1, 1));

  const handleSubmit = () => {
    const recommended = calculateRecommendation(formData);
    onApplyFilters(recommended);
    onClose();
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md duration-300">
      <div className="animate-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 duration-300">
        <div className="h-1.5 w-full bg-gray-100">
          <div
            className="bg-primary h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="text-primary flex items-center gap-2">
              <Sparkles size={18} className="animate-pulse" />
              <Typography variant="span" className="text-xs font-bold tracking-widest uppercase">
                Template Assistant
              </Typography>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <X size={20} />
            </button>
          </div>
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 space-y-6 duration-300">
              <div className="space-y-2">
                <Heading variant="h4" className="text-2xl font-bold tracking-tight">
                  Tell us about your journey
                </Heading>
                <Typography variant="span" className="text-muted-foreground">
                  This helps us choose the best layout for your career stage.
                </Typography>
              </div>
              <div className="grid gap-3">
                {['Fresher / Student', '1–3 years', '3–7 years', '7+ years'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFormData({ ...formData, experience: opt });
                      handleNext();
                    }}
                    className={`group hover:border-primary/50 flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                      formData.experience === opt
                        ? 'border-primary bg-primary/5 ring-primary ring-1'
                        : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-gray-700">{opt}</span>
                    {formData.experience === opt && (
                      <CheckCircle2 size={18} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 space-y-6 duration-300">
              <div className="space-y-2">
                <Heading variant="h4" className="text-2xl font-bold tracking-tight">
                  {'What\'s your "wow" factor?'}
                </Heading>
                <Typography variant="span" className="text-muted-foreground">
                  {"We'll emphasize the section that makes you stand out most."}
                </Typography>
              </div>
              <div className="grid gap-3">
                {[
                  { label: 'My skills', desc: 'Best for career changers or students' },
                  { label: 'My work experience', desc: 'Best for consistent career growth' },
                  { label: 'Both equally', desc: 'Best for well-rounded professionals' },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setFormData({ ...formData, highlight: opt.label });
                      handleNext();
                    }}
                    className={`group hover:border-primary/50 flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all active:scale-[0.98] ${
                      formData.highlight === opt.label
                        ? 'border-primary bg-primary/5 ring-primary ring-1'
                        : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-gray-700">{opt.label}</div>
                      <div className="text-xs text-gray-400">{opt.desc}</div>
                    </div>
                    {formData.highlight === opt.label && (
                      <CheckCircle2 size={18} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="animate-in slide-in-from-right-4 space-y-6 duration-300">
              <div className="space-y-2">
                <Heading variant="h4" className="text-2xl font-bold tracking-tight">
                  {"Finally, what's your role?"}
                </Heading>
                <Typography variant="span" className="text-muted-foreground">
                  {"We'll match the design style to your industry standards."}
                </Typography>
              </div>
              <div className="relative">
                <input
                  autoFocus
                  type="text"
                  placeholder="e.g. Senior Product Designer"
                  className="focus:border-primary focus:ring-primary/10 w-full rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 text-lg font-medium transition-all focus:bg-white focus:ring-4 focus:outline-none"
                  value={formData.profile}
                  onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="shadow-primary/20 h-14 w-full rounded-2xl text-lg font-bold shadow-lg"
                disabled={!formData.profile.trim()}
              >
                Find My Perfect Template
              </Button>
            </div>
          )}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm font-semibold text-gray-400 transition-colors hover:text-gray-900"
              >
                <ChevronLeft size={18} /> Back
              </button>
            ) : (
              <div />
            )}
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${step === i ? 'bg-primary w-4' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

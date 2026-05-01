'use server';

/**
 * skill.actions.ts
 *
 * Server actions for skill gap analysis.
 * Currently powered by mock data — swap the internals of each function
 * with real API / DB calls when the backend is ready.
 * The public function signatures and return shapes MUST NOT change.
 */

import { ActionResponse } from '@/types/action.types';
import {
  AnalysisResult,
  computeImprove,
  extractSkillsFromText,
  getMockResumeText,
  MOCK_RECOMMENDATIONS,
} from '@/types/skill.insights.types';

export async function runSkillAnalysis(data: {
  resumeText: string;
  jdText: string;
}): Promise<ActionResponse<AnalysisResult>> {
  try {
    const { resumeText, jdText } = data;

    if (!resumeText?.trim()) {
      return { success: false, message: 'Missing resume text' };
    }
    if (!jdText?.trim()) {
      return { success: false, message: 'Missing job description text' };
    }

    const resumeSkills = extractSkillsFromText(resumeText);
    const jdSkills = extractSkillsFromText(jdText);

    const resumeNames = new Set(resumeSkills.map((s) => s.name));
    const jdNames = new Set(jdSkills.map((s) => s.name));

    const matched = resumeSkills.filter((s) => jdNames.has(s.name));
    const missing = jdSkills.filter((s) => !resumeNames.has(s.name));
    const improve = computeImprove(resumeSkills, jdSkills);

    const gaps = missing.map((s) => s.name);
    const recommendations = missing.map(
      (s) =>
        MOCK_RECOMMENDATIONS[s.name] ??
        `Learn ${s.name} by building projects and reading the official docs.`
    );

    const score = jdSkills.length === 0 ? 0 : Math.round((matched.length / jdSkills.length) * 100);

    return {
      success: true,
      data: {
        skills: resumeSkills,
        matched,
        missing,
        improve,
        gaps,
        recommendations,
        score,
      },
    };
  } catch (error) {
    console.error('[runSkillAnalysis] failed:', error);
    return { success: false, message: 'Something went wrong during analysis' };
  }
}

/**
 * parseResumeFile
 *
 * Accepts a File (forwarded from the client via FormData) and returns
 * extracted plain text.
 *
 * BACKEND SWAP: Replace the mock text lookup with a real PDF/DOCX parser
 * (e.g. pdf2json, mammoth, Textract). Keep the return shape identical.
 *
 * NOTE: The client passes a FormData object; we accept File here because
 * Next.js server actions automatically unwrap FormData entries.
 */
export async function parseResumeFile(formData: FormData): Promise<ActionResponse<string>> {
  try {
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return { success: false, message: 'No file uploaded' };
    }

    if (file.size === 0) {
      return { success: false, message: 'Uploaded file is empty' };
    }

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        message: 'Unsupported file type. Please upload a PDF or DOCX.',
      };
    }

    // ── MOCK: return deterministic sample text based on filename ──────────
    // BACKEND SWAP: replace this block with real parsing logic, e.g.:
    //   const buffer = Buffer.from(await file.arrayBuffer());
    //   const text   = await realPdfParser(buffer);
    const mockText = getMockResumeText(file.name);
    // ─────────────────────────────────────────────────────────────────────

    if (!mockText.trim()) {
      return { success: false, message: 'No text could be extracted from the file' };
    }

    return { success: true, data: mockText };
  } catch (error) {
    console.error('[parseResumeFile] failed:', error);
    return { success: false, message: 'Failed to parse file' };
  }
}

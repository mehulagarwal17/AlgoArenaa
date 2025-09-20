// A Genkit flow for providing AI-powered mentoring, offering personalized hints, code suggestions, and algorithm explanations.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiPoweredMentoringInputSchema = z.object({
  problemDescription: z.string().describe('The description of the coding problem the user is trying to solve.'),
  userCode: z.string().describe('The current code the user has written to solve the problem.'),
  userSkillLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('The skill level of the user.'),
  preferredHintType: z.enum(['hint', 'codeSuggestion', 'algorithmExplanation']).describe('The type of help the user prefers.'),
});

export type AiPoweredMentoringInput = z.infer<typeof AiPoweredMentoringInputSchema>;

const AiPoweredMentoringOutputSchema = z.object({
  mentoringMessage: z.string().describe('The personalized mentoring message for the user.'),
});

export type AiPoweredMentoringOutput = z.infer<typeof AiPoweredMentoringOutputSchema>;

export async function aiPoweredMentoring(input: AiPoweredMentoringInput): Promise<AiPoweredMentoringOutput> {
  return aiPoweredMentoringFlow(input);
}

const aiPoweredMentoringPrompt = ai.definePrompt({
  name: 'aiPoweredMentoringPrompt',
  input: {schema: AiPoweredMentoringInputSchema},
  output: {schema: AiPoweredMentoringOutputSchema},
  prompt: `You are an AI-powered coding mentor. Your goal is to help the user overcome coding challenges by providing personalized assistance. The user has the following skill level: {{{userSkillLevel}}}. The user prefers this type of help: {{{preferredHintType}}}.

Here is the coding problem description:
{{{problemDescription}}}

Here is the current code the user has written:
{{{userCode}}}

Provide a mentoring message to help the user make progress. Be encouraging and supportive. Only provide the mentoring message. The message should be tailored based on user's current skill level, preferred type of hint and current code. The message should be designed to help the user make small step forwards, not provide the complete answer.`,
});

const aiPoweredMentoringFlow = ai.defineFlow(
  {
    name: 'aiPoweredMentoringFlow',
    inputSchema: AiPoweredMentoringInputSchema,
    outputSchema: AiPoweredMentoringOutputSchema,
  },
  async input => {
    const {output} = await aiPoweredMentoringPrompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview Personalized learning paths flow.
 *
 * This flow generates a custom-tailored learning path based on the user's coding proficiency and goals.
 *
 * @file PersonalizedLearningPaths - A function that returns a custom learning path.
 * @file PersonalizedLearningPathsInput - The input type for the PersonalizedLearningPaths function.
 * @file PersonalizedLearningPathsOutput - The return type for the PersonalizedLearningPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedLearningPathsInputSchema = z.object({
  codingProficiency: z
    .string()
    .describe("The user's coding proficiency level (e.g., beginner, intermediate, advanced)."),
  goals: z.string().describe('The user goals.'),
});

export type PersonalizedLearningPathsInput = z.infer<
  typeof PersonalizedLearningPathsInputSchema
>;

const PersonalizedLearningPathsOutputSchema = z.object({
  learningPath: z
    .string()
    .describe('A custom-tailored learning path based on the user input.'),
});

export type PersonalizedLearningPathsOutput = z.infer<
  typeof PersonalizedLearningPathsOutputSchema
>;

export async function personalizedLearningPaths(
  input: PersonalizedLearningPathsInput
): Promise<PersonalizedLearningPathsOutput> {
  return personalizedLearningPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedLearningPathsPrompt',
  input: {schema: PersonalizedLearningPathsInputSchema},
  output: {schema: PersonalizedLearningPathsOutputSchema},
  prompt: `You are an expert learning path generator.

  Based on the user's coding proficiency and goals, generate a custom-tailored learning path.  The learning path should be a string.

  Coding Proficiency: {{{codingProficiency}}}
  Goals: {{{goals}}}
  `,
});

const personalizedLearningPathsFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathsFlow',
    inputSchema: PersonalizedLearningPathsInputSchema,
    outputSchema: PersonalizedLearningPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

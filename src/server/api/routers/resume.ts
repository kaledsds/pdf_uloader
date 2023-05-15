import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const resumeRouter = createTRPCRouter({
  createResume: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const resume = await ctx.prisma.resume.create({
        data: {
          url: input.url,
        },
      });
      return resume;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.resume.findMany();
  }),
});

import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const fitnessRouter =  createTRPCRouter({
    getExcercises: publicProcedure
    .input(z.object({
        id: z.string(),
    }))
    .query( async({ input }) => {
        const excercises  = await prisma?.bodyPart.findMany({
            where: {
                id: input.id
            },
            select: {
                exercises: true
            }
        })
        return excercises
    }),
    getBodyParts: publicProcedure
        .query(async({ ctx }) => {
            const bodyParts = await ctx.prisma.bodyPart.findMany({
                select: {
                    exercises: true,
                    name: true,
                    id: true
                }
            })
            return bodyParts
        }),
    addExcercise: publicProcedure
        .input(z.object({
            id: z.string(),
            excerciseName: z.string()
        }))
        .mutation(async({input, ctx }) => {
            try{
                const addExce = await ctx.prisma.exercises.create({
                    data: {
                        name: input.excerciseName,
                        bodypart: {
                            connect: { id: input.id}
                            }
                        }
                    })              
                return addExce
            } catch(e){
                return 'Error occured in database:'+ e
            }
        })
})
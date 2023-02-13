import { test, expect} from '@jest/globals'
import { AppRouter, appRouter } from '../../root'
import { prisma } from '../../../db'
import { mockDeep} from 'jest-mock-extended'
import { BodyPart, Example, PrismaClient } from '@prisma/client'



test('getAll test', async () => {

    const prismaMock = mockDeep<PrismaClient>()

    const mockOutput: Example[] = [
        {id: 'testId', createdAt: new Date(), updatedAt: new Date()}
    ]
    prismaMock.example.findMany.mockResolvedValue(mockOutput)

    const caller = appRouter.createCaller({session: null, prisma: prismaMock})

    const result = await caller.example.getAll()

    expect(result).toHaveLength(mockOutput.length);
    expect(result).toStrictEqual(mockOutput)
    console.log(result)
})
import { test, expect} from '@jest/globals'
import { appRouter } from '../../root'
import { mockDeep} from 'jest-mock-extended'
import { PrismaClient, Exercises } from '@prisma/client'


test('add excercise test test', async () => {

    const prismaMock = mockDeep<PrismaClient>()

    const mockOutput: Exercises = { exeid: 1, id: 'test', name: 'test'}
    
    prismaMock.exercises.create.mockResolvedValue(mockOutput)

    const caller = appRouter.createCaller({session: null, prisma: prismaMock})

    const result = await caller.fitness.addExcercise({excerciseName: 'testName', id: 'BPtestID'})

    expect(result).toStrictEqual(mockOutput)
})
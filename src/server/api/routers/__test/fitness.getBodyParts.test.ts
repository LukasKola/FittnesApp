import { test, expect} from '@jest/globals'
import { appRouter } from '../../root'
import { mockDeep} from 'jest-mock-extended'
import { BodyPart, PrismaClient } from '@prisma/client'



test('getBodyParts test', async () => {

    const prismaMock = mockDeep<PrismaClient>()

    const mockOutput: BodyPart[] = [
        {id: 'testId', name: 'test'},
        {id: 'secondId', name: 'secondName'}
    ]
    
    prismaMock.bodyPart.findMany.mockResolvedValue(mockOutput)

    const caller = appRouter.createCaller({session: null, prisma: prismaMock})

    const result = await caller.fitness.getBodyParts()

    expect(result).toHaveLength(mockOutput.length);
    expect(result).toStrictEqual(mockOutput)
})
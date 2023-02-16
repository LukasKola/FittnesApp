import { test, expect} from '@jest/globals'
import { appRouter } from '../../root'
import { prisma } from '../../../db'






test('getExcercises test', async () => {

    const caller = appRouter.createCaller({session: null, prisma: prisma})

    const result = await caller.fitness.getBodyParts()

    expect(result).toHaveLength(result.length);
})
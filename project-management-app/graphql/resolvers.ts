import prisma from "../lib/prisma";

export const resolvers = {
    Query: {
        tasks: async (_parentValue: any, args: any, context: { prisma: { task: { findMany: () => any; }; }; }) => await context.prisma.task.findMany()
    }
}
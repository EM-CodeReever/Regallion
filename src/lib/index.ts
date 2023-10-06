// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from '@prisma/client';
let prisma = new PrismaClient();

export enum Gender {
    MALE= 'MALE',
    FEMALE = 'FEMALE',
    RNS = 'RNS'
}

export { prisma };
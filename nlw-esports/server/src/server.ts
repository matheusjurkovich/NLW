import express from 'express';
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinuteToHourString } from './utils/convert-minute-to-hour-string';
import cors from 'cors'

const app = express()
app.use(express.json())
const prisma = new PrismaClient({
    log: ['query'],
})
app.use(cors({
    origin: 'http://ec2-15-228-246-50.sa-east-1.compute.amazonaws.com'
}))

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })

    return res.json(games)
});

app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id
    const body: any = req.body
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hoursStart: convertHourStringToMinutes(body.hoursStart),
            hoursEnd: convertHourStringToMinutes(body.hoursEnd),
            useVoiceChanel: body.useVoiceChanel,
        },
    })
    return res.status(201).json(ad)
});

app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChanel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return res.json(ads.map((ad: { weekDays: string; hoursStart: number; hoursEnd: number; }) => ({
        ...ad,
        weekDays: ad.weekDays.split(','),
        hoursStart: convertMinuteToHourString(ad.hoursStart),
        hoursEnd: convertMinuteToHourString(ad.hoursEnd),
    })))
})

app.get('/ads/:id/discord', async (req, res) => {
    const adId = req.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId,
        }
    })

    return res.json({
        discord: ad.discord
    })
})

app.listen(3333, () => {
    console.log("Server started!")
})
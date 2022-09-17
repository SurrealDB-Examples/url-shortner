import body from 'body-parser'
import express from 'express'
import 'dotenv/config'

import { db, init } from './init'
import uid from './uid'

const envs: { PORT: string } | any = process.env
const server = express()

server.use(body.urlencoded({ extended: false }))
server.use(body.json())

init({
  user: 'root',
  pass: 'root',
  ns: 'main',
  db: 'urlshort',
})
  .then((data) => {
    console.log(`Successfuly Connected To Database!`)
  })
  .catch((err) => {
    console.log(err)
  })

server.get('/:id', async (req: any, res: any) => {
  const { id } = req.params

  if (id == null) {
    return res.json({
      Message: 'Invalid url',
    })
  }

  let data = await db.select('links', {
    id: uid(id),
  })

  if (data.length > 0) {
    res.redirect(data[0].long)
  } else {
    return res.json({
      Message: 'URL not found in database',
    })
  }
})

server.post('/create', async (req: any, res: any) => {
  const { url } = req.body

  if (url == null) {
    return res.json({
      Message: 'No URL provided',
    })
  }

  let created = await db.create(`links:${uid(7)}`, {
    long: req.body.url,
  })

  return res.json({
    Message: 'Shortened URL',
    Data: {
      ...created,
    },
  })
})

server.listen({ port: envs.PORT }, () => {
  console.log(`Application is available at http://127.0.0.1:${envs.PORT}`)
})

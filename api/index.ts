import { Router } from 'itty-router'
import { createCors } from 'itty-cors'

// create CORS handlers
const { preflight, corsify } = createCors({});

// now let's create a router (note the lack of "new")
const router = Router()

router.all('*', preflight as any);

// GET traffic change
router.get('/traffic-change', async () => new Response(await CLOUDFLARE_GA_KV.get("traffic-change")))

// GET popular-domains
router.get('/popular-domains', async () => new Response(await CLOUDFLARE_GA_KV.get("popular-domains")))

// GET attack-layer3
router.get('/attack-layer3', async () => new Response(await CLOUDFLARE_GA_KV.get("attack-layer3")))

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  (event as any).respondWith(router.handle((event as any).request).then(corsify))
  )
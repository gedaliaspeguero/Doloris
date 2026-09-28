# Doloris · Hg Delicatessen Gourmet

App web para pedir bizcochos a Doloris Henriquez ([@hg_delicatessen_gourmet](https://instagram.com/hg_delicatessen_gourmet)).

El cliente responde unas preguntas (ocasión → para quién → edad → estilo → color → invitados), ve los bizcochos del catálogo que mejor encajan y elige uno igual, uno parecido con cambios o describe su propia idea. El pedido completo llega al WhatsApp de Doloris para que ella lo cotice.

## Qué incluye (Fase 1)

- **Cuestionario guiado** (`/descubre`) con recomendaciones ordenadas por parecido.
- **Catálogo** (`/catalogo`) con filtros por ocasión y estilo, y ficha de cada pastel (`/pastel/[id]`).
- **"Parecido a este, pero…"**: se parte de un pastel real y se piden cambios.
- **Calculadora de porciones**: sugiere libras y pisos según los invitados.
- **Fecha con disponibilidad**: exige 7 días de anticipación y bloquea los días sin cupo.
- **Ficha completa del pedido** (`/pedido`): fecha, invitados, sabor, relleno, cubierta, alergias, entrega y nombre. Se envía por WhatsApp con un mensaje ya redactado.

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| WhatsApp, horario, anticipación mínima, días llenos, sabores, porciones por libra | `src/lib/negocio.ts` |
| Pasteles del catálogo y categorías del cuestionario | `src/lib/catalogo.ts` |
| Fotos de los pasteles | `public/pasteles/` |

Los pasteles marcados con `ejemplo: true` usan una ilustración provisional. Cuando lleguen las fotos de Instagram, se añade `foto: "/pasteles/<archivo>.jpg"` y se quita `ejemplo`.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

Opcional: `NEXT_PUBLIC_SITE_URL` con el dominio final, para que los enlaces del mensaje de WhatsApp apunten ahí.

## Publicar

La forma más sencilla es [Vercel](https://vercel.com): importar este repositorio y pulsar *Deploy*. No necesita base de datos ni claves en esta fase.

## Próximas fases

2. Imagen generada por IA a partir de la descripción del cliente.
3. Panel privado para que Doloris apruebe pedidos, ponga precio y marque días llenos.

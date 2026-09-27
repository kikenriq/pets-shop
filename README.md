# Pet's Shop

Tienda de comida y accesorios para mascotas, construida con **Next.js 16 (App Router)**,
**React 19**, **TypeScript** y **Tailwind CSS 4**.

Este repo era una landing estática en React 18 + Vite 4. Van completadas las fases
0 a 3: saneamiento, migración, catálogo con filtros y carrito funcional. Hoy tiene
38 productos, filtrado por URL, ficha completa, reseñas y un carrito que persiste.

---

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build |
| `npm run lint` | ESLint (en Next 16 es `eslint`, ya no `next lint`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest (55 tests) |
| `npm run test:watch` | Vitest en modo watch |

---

## Estructura

```
app/
  layout.tsx                 Navbar + Footer + fuentes + metadata
  page.tsx                   la landing
  products/page.tsx          catálogo con filtros, orden y paginación
  products/[slug]/page.tsx   ficha de producto (38 páginas SSG)
  cart/page.tsx              carrito
  globals.css                tema de Tailwind 4 (config CSS-first)
components/
  layout/    Navbar, Footer
  sections/  Hero, TopCategories, PromoBanners, BestSellers, Features, CTA, Brands
  cart/      CartProvider, CartDrawer, CartView
  catalog/   FilterPanel, SortSelect, Pagination
  product/   ProductGallery, AddToCartControls, ProductTabs, ReviewsSection
  ui/        ProductCard, Rating, SectionHeading, Breadcrumbs, SocialIcons
data/
  catalog.ts                 11 líneas de producto -> 38 variantes, categorías, marcas
  reviews.ts                 reseñas ficticias deterministas
lib/
  types.ts                   modelo de datos y tipos de filtro
  filters.ts                 parseo de URL, filtrado, orden y paginación (funciones puras)
  cart.ts                    reducer, totales y persistencia (funciones puras)
  format.ts                  formateo de precios
  site.ts                    URL canónica según la plataforma de deploy
  fonts.ts                   Bangers + Nunito Sans vía next/font
tests/                       55 tests de vitest sobre lib/cart.ts y lib/filters.ts
public/images/               los 40 assets originales
```

### Todo el contenido vive en `data/catalog.ts`

No hace falta tocar componentes para cambiar el catálogo. Añadir un producto es
añadir un objeto al array; la grilla, la ficha y el sitemap salen solos.

---

## Decisiones que conviene conocer

### Los precios son enteros en céntimos

```ts
priceCents: 1500   // $15.00
```

Antes eran strings con símbolo (`price='$15.00'`), imposibles de sumar. Tampoco se
usan flotantes: `0.1 + 0.2 !== 0.3`, y ese error se acumula en un subtotal. Además
todas las pasarelas de pago (Stripe incluida) trabajan en la unidad mínima.

El formateo vive en `lib/format.ts` para que los céntimos nunca lleguen al JSX.

### Tailwind 4 se configura en CSS, no en `tailwind.config.js`

El tema está en `app/globals.css` dentro de `@theme`. Ese archivo ya no existe.

El proyecto anterior definía 15 variables CSS de las que usaba 3, y mezclaba el
naranja de marca con `orange-400` y `orange-500` de Tailwind — **tres naranjas
distintos en la misma página**. Ahora hay una sola escala `brand-50 … brand-900`
derivada del `--portland-orange` original.

El bloque `@theme inline` es el de las fuentes: `inline` es necesario para que
resuelvan contra las variables que `next/font` inyecta en runtime.

### Iconos

`lucide-react` para los de interfaz. Los de redes sociales están inline en
`components/ui/SocialIcons.tsx` porque lucide v1 eliminó los glifos de marca por
temas de trademark, y no valía la pena sumar otra librería solo para el footer.

Los `<ion-icon>` que se cargaban desde `unpkg.com` desaparecieron: eran Web
Components y **no renderizan en SSR**, así que en Next habrían salido huecos en
blanco hasta la hidratación.

---

## Qué se arregló en esta tanda

| Antes | Ahora |
|---|---|
| 30 `<h1>` en una página | 1 `<h1>`, 8 `<h2>` |
| 29 de 29 imágenes con `alt=""` | 0 imágenes de contenido sin `alt` |
| 36 de 37 enlaces `href="#"` | 0 enlaces muertos |
| Botones de icono sin nombre accesible | Todos con `aria-label` |
| `useEffect` de scroll sin deps ni cleanup | Deps vacías, cleanup y `{ passive: true }` |
| 15 `cal(` + 10 `calc()` sin espacios (los 25 inválidos) | Sin `calc`: los strips son grid |
| 11 atributos `class` que React ignoraba | Todos `className` |
| `.section-text`, `.btn`, `.social-link` sin definir | Eliminadas |
| `flowbite` y `flowbite-react` sin usar | Eliminadas |
| `App.css` duplicando el reset de `index.css` | Eliminado |
| `preload` a una ruta inexistente (404) | `priority` en el `<Image>` del hero |
| 7 productos en JSX, sin `id` ni categoría | 38 productos tipados con slug, stock, rating |
| 6 estrellas fijas, sin prop | 5 estrellas según `rating` real |
| `product-8` y las 8 `_0.jpg` sin usar | En uso: 8º producto y segunda vista en hover |
| Categorías duplicadas, 5 marcas con la misma etiqueta | Nombres correctos |
| `<button>` envolviendo un `<a>` | Un solo `<Link>` |
| Menú móvil tabulable estando oculto | Se desmonta; cierra con `Escape` |
| Tarjeta de producto no clicable | Card entera enlaza a la ficha |

---

## Fase 2: catálogo, filtros y ficha

### El inventario son familias, no 38 objetos escritos a mano

`data/catalog.ts` define **11 líneas de producto** y cada una lista sus variantes
(sabor, tamaño, presentación). Los 38 productos salen de expandir esa tabla, así que
cambiar un precio o añadir un formato es una línea, no un objeto nuevo.

Es también la razón de que la misma foto aparezca en varias fichas: son variantes del
mismo producto, igual que en una tienda real.

Tres imágenes de categoría (`category-1`, `category-4`, `category-5`) se usan además
como fotos de producto. Sin eso, las categorías **Cat Food, Dog Toys y Chew Toys** que
muestra el landing no tenían ni un producto y al filtrar daban cero.

### Los filtros viven en la URL

`?category=dog-food&brand=catis&sort=price-asc&stock=1&page=2`

Nada del resultado está en estado de componente. Eso hace que una vista filtrada se
pueda compartir, que el botón atrás funcione y que el servidor la renderice directa.

La lógica está en `lib/filters.ts` como funciones puras (`parseFilters`,
`applyFilters`, `paginate`), separadas de la interfaz para poder testearlas.

Filtros disponibles: categoría, marca, precio máximo, rating mínimo, solo en stock y
solo en oferta. Orden por destacados, precio, rating o novedad. 12 por página.

### Ficha de producto

Galería con miniaturas y zoom al pasar el cursor, selector de cantidad limitado por
stock, pestañas de Descripción / Especificaciones / Envíos con el patrón ARIA
completo (navegación con flechas incluida), reseñas con desglose de estrellas,
breadcrumbs, selector de variantes hermanas y productos relacionados.

Los relacionados excluyen deliberadamente la misma línea de producto: las variantes
hermanas ya aparecen arriba como "Other options", y repetirlas mostraba el mismo
artículo dos veces.

También emite **JSON-LD de tipo Product** con precio, disponibilidad y rating, que es
lo que Google usa para los resultados enriquecidos de producto.

### Reseñas deterministas

`data/reviews.ts` genera las reseñas a partir de un hash del id del producto. Sin
`Math.random` ni `Date.now`: un generador aleatorio produciría texto distinto en
servidor y cliente, rompiendo la hidratación, y haría que cada build saliera diferente.

---

## Lo que falta (siguientes fases)

**Fase 4 — Checkout.** Route Handler que cree la sesión de Stripe en el servidor. La
clave secreta nunca debe viajar al cliente, y el precio debe recalcularse desde
`data/catalog.ts`, no aceptarse del navegador.

---

## Fase 3: el carrito

### La lógica vive fuera de React

Todo el cálculo está en `lib/cart.ts` como funciones puras: el reducer, los totales,
el clamp de cantidades y el parseo de lo guardado. No toca React, ni storage, ni el
reloj. Por eso se puede testear, y por eso tiene 55 tests.

`components/cart/CartProvider.tsx` es solo el pegamento: Context, el efecto que lee
`localStorage` al montar y el que escribe en cada cambio.

### Decisiones que importan

**El total se calcula sobre el subtotal, no por línea.** Redondear el impuesto de
cada línea por separado desvía el resultado: tres líneas de $3,33 dan $0,69 si
redondeas una a una, y $0,70 si aplicas el 7% sobre los $9,99. La segunda es la
correcta, y hay un test que lo fija.

**El carrito guardado se valida contra el catálogo en cada lectura.** Un carrito en
`localStorage` sobrevive a los deploys, así que puede referirse a un producto
renombrado o agotado. `resolveCart` descarta esas líneas en vez de pintar una fila
rota — la alternativa es cobrar por algo que ya no existe.

**Las cantidades se re-limitan al leer, no al escribir.** El reducer no conoce el
stock; `resolveCart` sí. Así, si el stock baja de 8 a 2 entre visitas, la línea
guardada se ajusta sola.

**El contador del navbar no aparece hasta hidratar.** El servidor no tiene
`localStorage`, así que el primer render del cliente debe coincidir con el carrito
vacío del servidor. El flag `hydrated` vive en el reducer, no en un `useState`
disparado desde un efecto.

**Nada revienta si `localStorage` falla.** En modo privado o con el almacenamiento
bloqueado, las lecturas y escrituras van en `try/catch` y el carrito sigue
funcionando durante la sesión. `parseStoredCart` nunca lanza: un JSON corrupto o
manipulado a mano devuelve un carrito vacío, y las entradas inválidas se descartan
conservando las buenas.

### Reglas de negocio

| Regla | Valor |
|---|---|
| Envío gratis desde | $50,00 |
| Envío plano por debajo | $4,95 |
| Impuesto | 7% sobre el subtotal |
| Máximo por línea | 10 unidades (o el stock, lo que sea menor) |

Están como constantes exportadas en `lib/cart.ts`, no esparcidas por los componentes.

---

## Notas

- `next lint` ya no existe en Next 16; el script `lint` llama a `eslint` directamente.
- `eslint-config-next` 16 exporta flat configs nativos, sin `FlatCompat`.
- Las fuentes (Bangers, Nunito Sans) se descargan en build con `next/font`. Carter One,
  que el proyecto anterior cargaba y nunca usaba, ya no se pide.

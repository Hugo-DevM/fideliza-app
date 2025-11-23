# Configuración básica del proyecto con Supabase

Este proyecto utiliza **Supabase** como backend (base de datos, autenticación y almacenamiento).  
Para que la aplicación funcione correctamente, debes configurar las **variables de entorno** locales.

---

## Requisitos previos

Asegúrate de tener instalado:

- Node.js 18+
- npm, pnpm o yarn
- Una cuenta en Supabase
- Un proyecto creado en https://app.supabase.com

---

## 1. Renombrar el archivo .env.example a `.env.local`

En el archivo renombrado como **.env.local** agregar las siguientes variables:

```bash

NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

```

Puedes obtener estos valores en:

- Supabase Dashboard
- Proyecto → Project Settings
- API → sección Project URL y anon public key

## 2. Instalar dependencias

Si usas npm:

```bash

npm install

```

Si usas pnpm:

```bash

pnpm install

```

Si usas yarn:

```bash

yarn install

```

## 3. Levantar el servidor de desarrollo

Ejecutar el siguente comando para levantar el servidor

```bash

npm run dev

```

La app estará disponible en:

```bash

http://localhost:3000

```

## 4. Conexión a Supabase

Este proyecto utiliza el cliente oficial, en el caso de que no se haya instalado ejecutar el siguiente comando:

```bash

npm install @supabase/supabase-js

```

Ejemplo de inicialización:

```bash

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

```

## 5. Seguridad

- Nunca expongas la service_role_key en el frontend.
- No subas el archivo .env.local al repositorio.
- Next.js ya lo ignora automáticamente en .gitignore.

## 6. Scripts disponibles

- `npm run dev` → Modo desarrollo

- `npm run build` → Build de producción

- `npm run start` → Ejecutar la versión compilada

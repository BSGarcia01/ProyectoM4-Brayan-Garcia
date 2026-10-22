# Gestor estratégico de tareas

Aplicación web (SPA) para que los empleados de una pequeña empresa gestionen sus tareas diarias de forma organizada, persistente y accesible desde cualquier dispositivo. Cada usuario inicia sesión y ve únicamente sus propias tareas, guardadas en la nube.

**URL de producción:** https://proyecto-m4-brayan-garcia.vercel.app

## Stack

- React + TypeScript (Vite)
- Firebase: Authentication y Cloud Firestore
- Vercel (despliegue)
- Vitest y React Testing Library
- AWS SES (envío de emails): ver sección "Flujo de envío de emails"

## Funcionalidades

- Registro, inicio y cierre de sesión con correo y contraseña, con sesión persistente al recargar.
- Rutas privadas: sin sesión no se pueden ver las tareas.
- CRUD completo de tareas: crear, listar, editar, eliminar y completar/descompletar.
- Persistencia en Firestore filtrada por `userId`, con actualización automática de la interfaz (`onSnapshot`).
- Estados de carga y de error, y mensajes de error de autenticación traducidos al español.
- Validación por campo en el formulario de login.
- El título de la pestaña muestra cuántas tareas hay pendientes.

## Decisiones arquitectónicas

- **Código por capas:** `components`, `pages`, `services`, `hooks`, `types` y `api`. Cada carpeta tiene una sola responsabilidad.
- **Servicios aislados:** solo `services/` habla con Firebase. Los componentes no conocen Firestore, así que cambiar de proveedor solo afecta esa capa.
- **Sesión centralizada:** el componente `Authenticator` (Context y hook `useAuth`) es la única fuente de verdad de la sesión. La ruta protegida distingue tres estados (cargando, con usuario, sin usuario) para no redirigir al login antes de que Firebase responda.
- **Estado en la nube:** la lista de tareas llega por `onSnapshot`; las acciones solo escriben en Firestore y la interfaz se actualiza sola. La suscripción se limpia al desmontar el componente.
- **Tipado estricto:** sin `any`. Los documentos de Firestore se convierten a `Tarea` comprobando cada campo, y los errores se leen como `unknown` con narrowing, sin aserciones `as`.
- **Seguridad:** las reglas de Firestore (`firestore.rules`) solo permiten leer, editar y eliminar al dueño de cada tarea, y crear solo con su propio `userId`. El filtro por `userId` del código es una comodidad; el control real son las reglas.
- **Formularios controlados** con validación y botón desactivado mientras se envía (`try/catch/finally`).
- **SPA en Vercel:** `vercel.json` redirige todas las rutas a `index.html` para que recargar no dé 404.

## Instalación

```bash
git clone https://github.com/BSGarcia01/ProyectoM4-Brayan-Garcia.git
cd ProyectoM4-Brayan-Garcia
npm install
cp .env.example .env   # completa los valores
npm run dev
```

Pruebas: `npm run test`. Compilación de producción: `npm run build`.

## Variables de entorno

Frontend (archivo `.env`, con prefijo `VITE_`; es configuración pública de Firebase):

| Variable | Descripción |
|---|---|
| `VITE_FIREBASE_API_KEY` | Clave de la app web de Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Dominio de autenticación |
| `VITE_FIREBASE_PROJECT_ID` | Identificador del proyecto |
| `VITE_FIREBASE_APP_ID` | Identificador de la app |

Servidor (previstas para el envío de emails; irían solo en las variables de entorno de Vercel, **sin** prefijo `VITE_`): `SES_ACCESS_KEY_ID`, `SES_SECRET_ACCESS_KEY`, `SES_REGION`, `SES_FROM_EMAIL`.

El archivo `.env` está en `.gitignore`; el repositorio incluye `.env.example` sin valores. Las reglas de Firestore están en `firestore.rules`.

## Flujo de envío de emails

**Estado: no implementado en esta entrega.**

El requisito de enviar un resumen de tareas con AWS SES no quedó completo: no logré activar una cuenta de AWS a tiempo (la consola no me permitió el acceso), por lo que no pude verificar un remitente en SES ni crear credenciales.

El diseño previsto es: un botón "Enviar resumen" en el frontend llama a una función serverless de Vercel (`/api/enviar-resumen`) enviando el token de sesión de Firebase. La función verifica el token, toma el correo del usuario desde Firebase y envía el resumen con AWS SES. Las credenciales de AWS se guardarían solo como variables de entorno de Vercel, nunca en el frontend.

## Pruebas

Se usan Vitest y React Testing Library (5 pruebas): `TarjetaTarea` (muestra título, descripción y estado; llama a `onEliminar` con el `id`) y `FormularioTarea` (no agrega con título vacío; llama a `onAgregar` con los datos).

## Cómo integré la IA en mi proceso

Usé Claude como profesor de programación: no le pedí código completo, sino explicaciones con ejemplos de la vida diaria y ejercicios cortos por cada lección. Yo escribía el código, lo pegaba y lo revisábamos. En la recta final, con poco tiempo, pedí código resuelto por partes y lo revisé antes de integrarlo.

**Dónde fue más efectiva**
- Explicar conceptos con analogías antes de escribir (props y estado, `useEffect` con limpieza, el contexto de autenticación).
- Revisar mi código y señalar errores que TypeScript no detecta.
- Resolver errores a partir del mensaje de la consola.

**Patrones y buenas prácticas que descubrí**
- Un tipo correcto no garantiza un significado correcto. Ejemplos: pasar `tarea.titulo` en vez de `tarea.id`; dos campos con `name="nombre"`; un `catch` sin nombre que dejaba `error` apuntando a la libreta de estado en vez de al error atrapado. Lo encontré imprimiendo qué recibía realmente la función.
- Desconfiar del código sugerido: la guía usaba `error as FirebaseAuthError`; lo reemplacé por comprobaciones con narrowing.
- Una pieza provisional (`hayUsuario = false`) se reemplazó por la real sin tocar el formulario, gracias a la separación de responsabilidades.
- Revisar qué subo a Git: `git status` y `git diff` antes de cada commit para no incluir `.env`.
- Los cambios van por partes, con un commit por idea y mensajes semánticos.

**Dificultades con herramientas**
- Antigravity no es compatible con mi Mac con procesador Intel, así que usé VS Code con la extensión de Google Antigravity.
- En el editor de reglas de la consola de Firestore aparecía un error de sintaxis que no era del texto; lo resolví publicando las reglas desde la terminal con `firebase-tools`.
- AWS: no pude acceder a la consola con mi cuenta, lo que impidió completar el envío de emails.
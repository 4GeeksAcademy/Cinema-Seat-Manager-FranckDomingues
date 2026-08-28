# Cinema Seat Manager

> Un prototipo de reserva de asientos por línea de comandos construido con TypeScript — organizado por [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![twitter](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=twitter)](https://twitter.com/4geeksacademy)

*These instructions are available in [english](./README.md).*

---

## Resumen del Proyecto

Un pequeño cine independiente necesita un sistema sencillo de reserva de asientos. La sala tiene **8 filas** y **10 asientos por fila**, con un total de **80 asientos**. Este proyecto desarrolla la lógica principal de reserva en TypeScript, centrándose en un prototipo de línea de comandos basado en la lógica de programación.

El objetivo es practicar conceptos fundamentales de programación mediante la implementación de una estructura de datos bidimensional realista y las operaciones necesarias para gestionarla.

## Objetivos de Aprendizaje

- Trabajar con **arreglos bidimensionales (matrices)**
- Escribir y componer **funciones**
- Usar **parámetros** y **valores de retorno**
- **Bucles anidados** para recorrer filas y columnas
- **Lógica condicional** para validación y visualización
- **Validación de datos** antes de realizar operaciones
- **Búsqueda en matrices** para encontrar patrones

## Representación de los Asientos

Cada asiento del cine se representa mediante un valor numérico dentro de un arreglo bidimensional:

| Valor | Significado    | Visualización |
|-------|----------------|---------------|
| `0`   | Disponible     | `L`           |
| `1`   | Ocupado        | `X`           |

- El arreglo externo representa las **filas** (0–7).
- Cada arreglo interno representa los **asientos de una fila** (0–9).
- Un asiento está **disponible** cuando su valor es `0` y se muestra como **L**.
- Un asiento está **ocupado** cuando su valor es `1` y se muestra como **X**.

## Requisitos Principales

- [x] Inicializar una matriz de 8 × 10 asientos con todos los asientos disponibles (valor `0`).
- [x] Mostrar la sala del cine en la consola con números de fila y columna.
- [x] Mostrar los asientos ocupados como **X** y los asientos disponibles como **L**.
- [x] Reservar un asiento usando coordenadas de fila y columna.
- [x] Validar si un asiento ya está ocupado antes de reservarlo.
- [x] Devolver un mensaje claro de éxito o error al intentar una reserva.
- [x] Contar el número total de asientos ocupados.
- [x] Contar el número total de asientos disponibles.
- [x] Encontrar el primer par de asientos libres horizontalmente contiguos.
- [x] Devolver las posiciones del primer par contiguo disponible.
- [x] Informar claramente cuando no exista ningún par contiguo.

### Avanzado: Asientos Contiguos

Además de las reservas individuales, el sistema debe poder encontrar el **primer par de asientos libres horizontalmente adyacentes** en el cine. Esto es útil para clientes que quieren sentarse juntos. La búsqueda debe recorrer la sala de izquierda a derecha y de arriba abajo, y devolver las coordenadas del primer par que coincida o un mensaje claro indicando que no hay ninguno disponible.

## Escenarios de Prueba

La implementación debe probarse con los siguientes escenarios:

1. **Cine vacío** — Todos los asientos están disponibles (estado inicial).
2. **Cine parcialmente ocupado** — Algunos asientos reservados, otros aún disponibles.
3. **Cine casi lleno con asientos aislados** — Solo quedan asientos libres individuales, sin pares adyacentes.
4. **Cine completamente lleno** — Cada asiento está ocupado.

## Restricciones del Proyecto

> ⚠️ **Importante** — Estas restricciones deben respetarse durante la implementación:

- **NO** uses clases para el modelo de datos de los asientos.
- **NO** uses objetos para representar asientos individuales.
- La disposición de los asientos **debe** representarse mediante un **arreglo bidimensional** (una matriz).
- Usa **funciones, parámetros, valores de retorno, bucles y condicionales**.
- Mantén los nombres de variables y funciones **significativos**.
- Mantén la salida en consola **clara y comprensible**.
- **No** agregues abstracciones innecesarias.

## Estructura del Proyecto

```
├── index.html          # Plantilla HTML (para uso futuro de interfaz)
├── package.json        # Dependencias y scripts del proyecto
├── tsconfig.json       # Configuración de TypeScript
├── vite.config.ts      # Configuración del empaquetador Vite
├── README.md           # Documentación en inglés
├── README.es.md        # Este archivo
├── public/             # Recursos estáticos
└── src/
    ├── main.ts         # Punto de entrada de TypeScript
    ├── style.css       # Estilos (Tailwind CSS v4)
    └── vite-env.d.ts   # Declaraciones de tipos de Vite
```

## Cómo Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo (con recarga automática)
npm run start

# Ejecutar solo la validación de TypeScript
npm run typecheck

# Ejecutar main.ts en la terminal (salida por consola)
npm run console
```

## Hoja de Ruta de Desarrollo

| Fase | Enfoque                                            |
|------|----------------------------------------------------|
| 0    | Inicialización y documentación del proyecto        |
| 1    | Inicializar la matriz de 8 × 10 asientos            |
| 2    | Mostrar la sala del cine                           |
| 3    | Reservar asientos                                  |
| 4    | Agregar validación de reservas                     |
| 5    | Contar asientos ocupados y disponibles             |
| 6    | Encontrar asientos contiguos                       |
| 7    | Probar los escenarios requeridos                   |
| 8    | Limpieza y validación final                        |

## Estado Actual

- **Fase actual:** Fase 7 (Pruebas de escenarios requeridos)
- **Estado:** Escenarios de sala vacía, parcialmente ocupada y asientos disponibles aislados verificados
- **Siguiente fase:** Escenario de sala completamente llena
- La función `testIsolatedAvailableSeatsScenario()` crea una matriz de 8 × 10 fresca, reserva todos los asientos excepto 8 posiciones predefinidas que están horizontalmente aisladas entre sí, y verifica el conteo (72 ocupados, 8 disponibles, total 80) y que la búsqueda de asientos contiguos no devuelva ningún par a pesar de que existan asientos disponibles. Los escenarios de sala vacía y parcialmente ocupada también pasan de forma independiente. Todas las funcionalidades existentes funcionan correctamente y no modifican la matriz.

## Trabajo Futuro Opcional

- Mapa visual de asientos con una interfaz interactiva.
- Selección de asientos mediante clics usando la plantilla HTML.

> ⚠️ La interfaz web es completamente opcional y **no** forma parte de la implementación requerida actual. Solo debe explorarse después de que la lógica principal en TypeScript esté completamente implementada y probada.

---

<p align="center">
  <small>Hecho con ❤️ en 4Geeks Academy</small>
</p>

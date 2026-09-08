---
titulo: Qué es un agente de IA
programa: taller-agente-ia
etiquetas: [agente, ia, modelo, llm, razonar, plan, herramientas, memoria, automatizacion, chatbot]
actualizado: 2026-09-07
fuentes:
  - Slides de la sesión teórica «Fundamentos para crear tu primer agente de IA»
---

# Qué es un agente de IA

Esta es la sesión teórica que antecede a la práctica. Sirve para responder «¿pero
qué es esto?» sin salirse de lo que se enseñó en la sala.

## La definición formal

IBM define la inteligencia artificial como una tecnología que permite a los
computadores y máquinas simular capacidades humanas: aprender, comprender,
resolver problemas, tomar decisiones, ser creativos y actuar con autonomía.

## Todo lo que una máquina imita, tú ya lo haces

El punto de partida del taller no es la tecnología, son las capacidades propias.

Las **capacidades cognitivas**: percibir, aprender, razonar, resolver, lenguaje,
planificar, crear, decidir.

Y **lo que va más allá del intelecto**: emociones, sentido común, valores y
propósito, conciencia, deseos propios.

La máquina construye las primeras. Las segundas no.

## Cómo las construye una máquina

Detrás de cada respuesta hay datos, un modelo y un objetivo:

- **Percibir** — reconoce imágenes, rostros y textos.
- **Aprender** — encuentra patrones en grandes volúmenes de ejemplos.
- **Lenguaje** — conversa, traduce, resume y redacta.
- **Resolver** — analiza datos y propone soluciones.
- **Crear** — genera imágenes, música, texto y video.
- **Planificar** — ordena pasos, usa herramientas y ejecuta tareas.

Los pilares que lo sostienen: datos, algoritmo, modelo, computación, objetivo y
aplicación.

## Cuándo gana cada una

**Ante una tarea bien definida, gana la máquina.** Multiplicar 15.998.792 por
24.523: la IA responde en un segundo, una persona con calculadora tarda unos
cinco minutos. Reglas claras, un único resultado correcto.

**Ante una situación humana, gana la experiencia.** Un bebé llora. La IA ve el
patrón y propone una hipótesis genérica: «posiblemente se cayó, ayúdalo». Su mamá
reconoce ese llanto —así llora cuando le duele la barriga— y sabe qué hacer. Gana
quien tiene contexto, memoria emocional y experiencia vivida.

Las dos escenas juntas son el argumento del taller: la máquina no reemplaza el
criterio propio, lo ejecuta más rápido cuando el criterio ya está puesto.

## Qué es un agente

Un agente de IA es un sistema que usa un modelo de lenguaje para tres cosas, en
este orden:

1. **Razonar** — entiende el problema antes de actuar.
2. **Crear un plan** — ordena los pasos para resolverlo.
3. **Ejecutar e iterar** — actúa con herramientas y ajusta sobre la marcha.

Un modelo de lenguaje es un sistema entrenado con enormes cantidades de texto
para comprender, resumir, traducir y generar lenguaje natural.

El ejemplo de la sala: «Agéndame una reunión con mi equipo esta semana». El
agente revisa quién debe asistir y qué disponibilidad tiene cada persona, elige
el horario que más gente puede cumplir, envía la invitación y la reagenda si
alguien avisa que no puede.

## Qué NO es un agente

No es agente solo por usar IA, tener un chat o hacer varias tareas.

| Ejemplo | Por qué no |
|---|---|
| ChatGPT respondiendo una pregunta | Una sola respuesta, no un proceso |
| Un generador de imágenes | Crea, pero no persigue un objetivo |
| Un chatbot de preguntas frecuentes | Responde con reglas fijas, no decide |
| Un traductor automático | Hace una tarea, no planifica un flujo |
| Una fórmula de Excel | Calcula un resultado, no actúa por su cuenta |

Importante: muchos de estos **sí** pueden ser herramientas que un agente usa.

## La prueba rápida

Ante cualquier caso, la pregunta es: **¿actúa por su cuenta o solo responde?**

Sí son agentes: organizar el día completo a partir de varias obligaciones;
revisar la lista de compras, comparar precios, consultar disponibilidad y
preparar el pedido; recibir la consulta de una clienta, revisar catálogo,
verificar stock y preparar una cotización; investigar el mercado, comparar
competidores y armar un plan de lanzamiento.

No son agentes: redactar una respuesta amable para una clienta —una sola tarea
puntual— o una cámara que detecta movimiento y manda una notificación, que es una
regla fija sin decisión.

## Los ocho pasos para construir uno

1. **Propósito** — qué resuelve, para quién, sus límites y cómo se mide el éxito.
2. **Personalidad e instrucciones** — su rol, tono, objetivos y lo que nunca debe
   hacer.
3. **Cerebro** — el modelo, equilibrando rapidez, razonamiento y costo.
4. **Herramientas** — acciones reales sobre apps que ya se usan: correo,
   calendario, hojas de cálculo.
5. **Memoria** — la conversación, las sesiones pasadas y los documentos propios.
6. **Flujo de trabajo** — cuándo se activa, qué hace si algo falla, cómo se
   coordina con otros sistemas.
7. **Ventana de contacto** — dónde lo usan las personas: WhatsApp, Slack, web o
   app móvil.
8. **Prueba y mejora** — casos reales y ajustes antes de lanzar.

El taller presencial trabaja los pasos 1, 2 y 5 —propósito, instrucciones y
memoria— sobre un Proyecto de ChatGPT o Claude. Ahí no se programa: se define y
se carga contexto, que es lo que hace útil al Proyecto desde el primer día. Los
pasos 3, 4, 6 y 7 se nombran para dar el panorama completo; construirlos es un
nivel posterior.

## Tres niveles, para dimensionar

**Básico — planificadora semanal.** Equilibra las comidas familiares y las
compras según presupuesto y tiempo libre. Razona sobre gastos y dietas; el plan
va de menú a despensa a lista; usa notas y una app de supermercado.

**Intermedio — gestora de clientas y ventas.** Atiende consultas en redes, revisa
stock en tiempo real y envía el link de cobro. Razona sobre la intención de
compra; el plan va de duda a stock a pago a envío; usa WhatsApp y hojas de
cálculo.

**Avanzado — investigadora de mercado.** Analiza qué vende la competencia y qué
piden las clientas en redes, y arma un plan de lanzamiento. Razona sobre
oportunidades desatendidas; el plan va de rastreo web a costos a dossier; usa
web, planillas y herramientas de diseño.

En los tres, el patrón es el mismo: razona, arma un plan, usa herramientas.

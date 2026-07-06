# Solitario 2048 - Actividad #1

Proyecto desarrollado de manera individual para la materia **Programación Orientada a la Web** (Semestre 2-2025) en la Universidad Católica Andrés Bello (UCAB)[cite: 1, 2, 42].

## Descripción del Proyecto
Este sistema es un juego web interactivo inspirado en las mecánicas de 2048 y el solitario de cartas[cite: 4, 5]. El jugador gestiona un mazo dinámico con el objetivo de colocar cartas numeradas estratégicamente dentro de 4 columnas verticales[cite: 7, 14, 15]. Las cartas se apilan desde la base por efecto de gravedad simulada y se fusionan al entrar en contacto con cartas del mismo valor[cite: 23, 26]. 

### Mecánicas e Interfaz:
- **Mazo estilo Tetris:** Permite visualizar tanto la "Carta en Mano" actual como una vista previa de la "Siguiente Carta" para planificar la estrategia de juego.
- **Sistema de Fusión Recursivo:** Al combinarse dos cartas idénticas ($2+2=4$), el juego evalúa recursivamente si el nuevo valor coincide con la carta inferior, desatando reacciones en cadena automáticas[cite: 8, 27].
- **Efecto Especial 2048:** Al alcanzar una carta de valor 2048, la columna completa se limpia para otorgar espacio adicional[cite: 35].
- **Condición de Derrota:** Si alguna columna excede el límite estricto de 8 cartas tras procesar las fusiones, se declara el fin del juego mediante una interfaz modal interactiva[cite: 33, 34].

## 🛠️ Tecnologías Utilizadas
De acuerdo con las restricciones de la actividad[cite: 43]:
- **HTML5:** Estructuración del DOM, contenedores de juego y modales de estado.
- **Tailwind CSS (v4 mediante CDN):** Utilizada como la **única librería de estilos** del proyecto para gestionar el diseño responsivo, centrado de textos y paletas dinámicas de color para cada valor de carta[cite: 16, 45, 48].
- **JavaScript Puro (Vanilla JS):** Control absoluto de la lógica de negocio del cliente, manipulación del DOM, temporizadores y algoritmos de recursividad[cite: 44, 50, 52].
*Nota: El sistema opera 100% del lado del cliente empleando datos simulados y estáticos, sin interactuar con servidores ni bases de datos[cite: 52, 53].*

## 🤖 Declaración de Uso de Inteligencia Artificial Generativa
En cumplimiento con las directrices de la evaluación, se declara el uso asistido de la IA generativa (Gemini de Google) bajo los siguientes parámetros:

### ¿Para qué se utilizó?
1. **Estructuración y Planificación:** Diseño inicial del Roadmap lógico para segmentar el desarrollo por fases e identificar dependencias críticas.
2. **Diseño Algorítmico:** Creación y depuración del método de recursividad estructurada (`processMerges`) para asegurar fusiones en cadena óptimas sin alterar el flujo de eventos síncronos[cite: 27].
3. **Optimización de Estilos:** Selección e implementación estricta de clases de Tailwind CSS para cumplir la restricción de usar una sola tecnología de diseño visual y evitar penalizaciones de código combinado[cite: 45, 48, 49].
4. **Mecánica de Estados:** Definición del objeto global `STATE` para mantener sincronizados en todo momento los puntos, las columnas y el mazo de cartas.

### ¿Cómo se utilizó?
El desarrollo se realizó mediante un proceso iterativo de diálogo asistido (prompts específicos por componentes). En primer lugar, se generó el esqueleto visual (HTML base). Posteriormente, se integró la lógica física de clicks y apilamiento. Una vez estable, se incorporó el algoritmo recursivo y las condiciones límite (Game Over/2048)[cite: 27, 33, 35]. En cada fase se supervisó activamente que la IA no introdujera herramientas prohibidas, asegurando un entorno de código nativo y compatible con la ejecución directa en el navegador[cite: 46, 47, 52].
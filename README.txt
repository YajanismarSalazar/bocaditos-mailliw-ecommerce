# Portal de Pago — U.E.I SAN ANTONIO C.A.

Aplicación web independiente para consulta de estado de cuenta, cálculo de montos en USD ($) y Bolívares (Bs. según tasa BCV), selección de conceptos pendientes y generación de comprobantes en revisión para validación administrativa vía WhatsApp.

**Sitio web:** https://yajanismarsalazar.github.io/-portal-pagos-uei-san-antonio/

## Datos institucionales
- **Institución:** U.E.I SAN ANTONIO C.A.
- **RIF:** J-30392701-7
- **Teléfono / Administración:** 0424-8912975
- **Ubicación:** Upata, Estado Bolívar, Venezuela

## Estructura del proyecto
- `index.html`: Interfaz principal del portal de pagos y modal de comprobante.
- `logo.jpg`: Logotipo institucional.
- `styles.css`: Estilos visuales y diseño adaptable.
- `data.js`: Catálogos, configuración de cobros/métodos de pago y registros iniciales (`ALUMNOS_INICIALES`).
- `app.js`: Lógica de búsqueda por cédula o matrícula, conversión BCV, carrito de conceptos, persistencia en `localStorage` (`uei_san_antonio_portal_v4`) y envío de comprobante por WhatsApp.

## Casos de prueba incluidos
- `V-28110234` | `2023001` — Saldo pendiente en período `2023-2024`
- Sin cédula registrada | `2024064-P` — Saldo pendiente en período `2024-2025`
- `V-31884512` | `2025019` — Saldo pendiente en período `2025-2026`
- `V-34901234` | `2026045` — Alumno regular `2026-2027` con inscripción y mensualidades pendientes
- `V-34729201` | `2024251` — Saldo anterior en `2025-2026` más mensualidades pendientes en `2026-2027`
- `V-32456789` | `2026099` — Alumno solvente (`$0.00`)

Además, se incluyen los registros de la relación de morosidad al `04/11/2026` consultables por número de matrícula.

## Uso y pruebas
1. Abre el portal en https://yajanismarsalazar.github.io/-portal-pagos-uei-san-antonio/ o abre `index.html` en el navegador.
2. Ingresa una cédula o matrícula en el buscador y haz clic en **Buscar Registro**.
3. Ajusta o consulta la tasa BCV si es necesario, selecciona los conceptos a reportar, elige el método de pago y registra el pago para generar el comprobante.
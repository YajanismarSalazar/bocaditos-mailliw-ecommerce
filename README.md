# Bocaditos Mailliw — E-commerce de Repostería

Aplicación web de comercio electrónico desarrollada como proyecto de portafolio para Ingeniería en Sistemas, orientada a la gestión, pago móvil y confirmación de pedidos de repostería artesanal.

## Demo en vivo
- Sitio web: https://yajanismarsalazar.github.io/bocaditos-mailliw-ecommerce/

## Características
- Catálogo organizado por categorías (**Tortas y Marquesas**, **New York Cookies** y **Porciones**) con selección de tamaño, sabor o relleno y control de disponibilidad.
- Contador dinámico de pedidos del día persistente en `localStorage`.
- Modalidad de entrega seleccionable entre **Pick up (retiro en tienda)** y **Delivery** con tarifas por zona (**Barcelona $3**, **Lechería $4**, **Puerto La Cruz $5**).
- Carrito interactivo con cálculo automático de subtotal, recargo de empaque (5 %), tarifa de delivery y total a pagar.
- Bloque con datos de **Pago Móvil** de la empresa (`0172 - Bancamiga`, `04129424001`, `J208837067`), validación de número de referencia y envío de comanda pagada directamente a WhatsApp.

## Tecnologías utilizadas
- HTML5 (`index.html`)
- CSS3 (`styles.css`)
- JavaScript (`app.js`)
- GitHub Pages para despliegue estático
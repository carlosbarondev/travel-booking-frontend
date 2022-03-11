import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const invoicePdf = (nombre, resumen) => {

    const fecha = resumen.fecha;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    let rows = [];
    rows.push(['Descripción', 'Cantidad', 'Precio Unitario', 'Precio Total']);
    resumen.producto.map(p => rows.push([p.producto.nombre, p.unidades, p.producto.precio, (p.producto.precio * p.unidades).toFixed(2)]));

    const docDefinition = {
        content: [
            {
                text: `\n\n`
            },
            {
                columns: [
                    {
                        text: `
                            ${nombre}
                            ${resumen.direccionFacturacion.line1} ${resumen.direccionFacturacion.line2}
                            ${resumen.direccionFacturacion.city} ${resumen.direccionFacturacion.state} ${resumen.direccionFacturacion.postal_code}
                            ${resumen.direccionFacturacion.country}
                        `,
                        style: {
                            fontSize: 12
                        }
                    },
                    {

                    },
                    {
                        table: {
                            widths: [100],
                            heights: [50],
                            body: [
                                [
                                    {
                                        text: `Pagado`,
                                        fillColor: '#DAF9F9',
                                        style: "pagado"
                                    },
                                ]
                            ],
                        }
                    }
                ],
                style: { lineHeight: 1.3 },
            },
            {
                text: `\n\n\n`
            },
            {
                text: `Si tienes preguntas sobre tus pedidos, visita https://github.com/carlosbarondev`,
                style: "small"
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
            {
                text: `\n`
            },
            {
                columns: [
                    {
                        text: [
                            {
                                text: `Dirección de facturación`,
                                style: 'subheader'
                            },
                            {
                                text: `
                                    ${nombre}
                                    ${resumen.direccionFacturacion.line1} ${resumen.direccionFacturacion.line2}
                                    ${resumen.direccionFacturacion.city} ${resumen.direccionFacturacion.state} ${resumen.direccionFacturacion.postal_code}
                                    ${resumen.direccionFacturacion.country}
                                `
                            }
                        ]
                    },
                    {
                        text: [
                            {
                                text: `Dirección de envío`,
                                style: 'subheader'
                            },
                            {
                                text: `
                                    ${resumen.direccionEnvio.name}
                                    ${resumen.direccionEnvio.address.line1} ${resumen.direccionEnvio.address.line2}
                                    ${resumen.direccionEnvio.address.city} ${resumen.direccionEnvio.address.state} ${resumen.direccionEnvio.address.postal_code}
                                    ${resumen.direccionEnvio.address.country}
                                `
                            }
                        ]
                    },
                    {
                        text: [
                            {
                                text: `Vendido por`,
                                style: 'subheader'
                            },
                            {
                                text: `
                                    ${nombre}
                                    ${resumen.direccionFacturacion.line1} ${resumen.direccionFacturacion.line2}
                                    ${resumen.direccionFacturacion.city} ${resumen.direccionFacturacion.state} ${resumen.direccionFacturacion.postal_code}
                                    ${resumen.direccionFacturacion.country}
                                `
                            }
                        ]
                    },
                ],
                style: { lineHeight: 1.3 },
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
            {
                text: `\n`
            },
            {
                columns: [
                    {
                        text: [
                            {
                                text: `Información del pedido`,
                                style: 'subheader'
                            },
                            {
                                text: `
                                    Fecha del pedido: ${new Date(fecha).toLocaleDateString("es-ES", options)}
                                    Número del pedido: ${resumen.idPedido}
                                `
                            }
                        ]
                    },
                ],
                style: { lineHeight: 1.3 },
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
            {
                text: `\n`
            },
            {
                text: `Detalles del documento\n`,
                style: 'header'
            },
            { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1 }] },
            {
                text: `\n`
            },
            {
                style: 'tableExample',
                table: {
                    widths: [321, '*', '*', '*'],
                    body: rows
                }
            },
            {
                text: `Total: ${resumen.total / 100} €`,
                style: 'total'
            },
        ],
        styles: {
            header: {
                fontSize: 12,
                bold: true
            },
            subheader: {
                fontSize: 11,
                bold: true
            },
            total: {
                fontSize: 14,
                bold: true,
                alignment: 'right',
            },
            pagado: {
                fontSize: 16,
                bold: true,
                alignment: 'center',
                margin: [0, 15, 0, 0]
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            fontSize: 8,
            columnGap: 75
        }
    };
    pdfMake.createPdf(docDefinition).open();
}
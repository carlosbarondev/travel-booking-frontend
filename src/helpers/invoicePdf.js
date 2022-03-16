import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


export const invoicePdf = (name, summary) => {

    const date = summary.date;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    let rows = [];
    rows.push(['Descripción', 'Habitaciones', 'Régimen', "Parking", 'Precio Total']);
    rows.push([summary.hotel.name + " habitación " + summary.booking.roomType.type, summary.booking.rooms, summary.booking.food.type, summary.booking.parking.type, summary.booking.total]);

    const docDefinition = {
        content: [
            {
                text: `\n\n`
            },
            {
                columns: [
                    {
                        text: `
                            ${name}
                            ${summary.user.billing.line1} 
                            ${summary.user.billing.line2}
                            ${summary.user.billing.city} ${summary.user.billing.state} ${summary.user.billing.postal_code}
                            ${summary.user.billing.country}
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
                                    ${name}
                                    ${summary.user.billing.line1} ${summary.user.billing.line2}
                                    ${summary.user.billing.city} ${summary.user.billing.state} ${summary.user.billing.postal_code}
                                    ${summary.user.billing.country}
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
                                    ${summary.hotel.name}
                                    ${summary.hotel.city} ${summary.hotel.country}
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
                                    Fecha del pedido: ${new Date(date).toLocaleDateString("es-ES", options)}
                                    Número del pedido: ${summary.idBooking}
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
                    widths: [220, '*', 90, '*', '*'],
                    body: rows
                }
            },
            {
                text: `Total: ${summary.total} €`,
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
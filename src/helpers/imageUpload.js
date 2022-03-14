import Swal from "sweetalert2";

import { fetch_Token } from "./fetch";

export const imageUpload = async (event, id, collection, roomType) => {

    if (event.target.files) {

        try {

            const files = event.target.files;
            const formData = new FormData();
            formData.append('file', files[0]);

            let body;

            if (roomType) {
                const send = await fetch_Token(`uploads/${collection}/${id}/${roomType}`, formData, 'PUT', true);
                body = await send.json();
            } else {
                const send = await fetch_Token(`uploads/${collection}/${id}`, formData, 'PUT', true);
                body = await send.json();
            }

            return body;

        } catch (error) {
            console.log(error);
            return Swal.fire('Error', '', 'error');
        }

    }

}
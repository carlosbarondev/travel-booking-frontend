import Swal from "sweetalert2";

import { fetch_Token } from "./fetch";

export const imageUpload = async (event, id, collection) => {

    if (event.target.files) {

        try {

            const files = event.target.files;
            const formData = new FormData();
            formData.append('file', files[0]);

            const send = await fetch_Token(`uploads/${collection}/${id}`, formData, 'PUT', true);
            const body = await send.json();

            return body;

        } catch (error) {
            console.log(error);
            return Swal.fire('Error', '', 'error');
        }

    }

}
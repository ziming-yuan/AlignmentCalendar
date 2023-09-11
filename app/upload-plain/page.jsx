process.nodeprecation = true;

import { utapi } from "uploadthing/server";

async function uploadFiles(formData) {
    "use server";
    try {
        const files = await formData.getAll("files");
        const response = await utapi.uploadFiles(files);
    } catch (e) {
        console.log(e);
    }
    //    ^? UploadedFileResponse[]
}

export default function MyForm() {
    return (
        <form action={uploadFiles}>
            <input name="files" type="file" multiple />
            <button type="submit">Upload</button>
        </form>
    );
}

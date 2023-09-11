import { utapi } from "uploadthing/server";

async function uploadFiles(formData) {
    "use server";
    const files = formData.getAll("files");
    const response = await utapi.uploadFiles(files);
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

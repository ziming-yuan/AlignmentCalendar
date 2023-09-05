import { utapi } from "uploadthing/server";
import Dropzone from "/components/Dropzone";

async function uploadFiles(formData) {
    "use server";
    const files = formData.getAll("files");
    const response = await utapi.uploadFiles(files);
    //    ^? { key: string, url: string }[]
}

export default function MyForm() {
    return (
        <Dropzone uploadFiles={uploadFiles}/>
    );
}

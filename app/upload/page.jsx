import { utapi } from "uploadthing/server";
 
async function uploadFiles(formData) {
  "use server";
  const files = formData.getAll("files");
  const response = await utapi.uploadFiles(files);
  console.log(JSON.stringify(response))
  //    ^? { key: string, url: string }[]
}
 
export default function MyForm() {
  return (
    <form action={uploadFiles}>
      <input name="files" type="file" multiple />
      <button type="submit">Upload</button>
    </form>
  );
}
export default function Page({params}) {
  return (
  <div>
    <h2>Edit Page</h2>
    <p>Post path: {params.path}</p> 
  </div>
  );
}
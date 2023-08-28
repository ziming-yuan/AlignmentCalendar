export default function ViewPage( {params} ) {

    return (
    <div>
        <h2>View Page</h2>
        <p>Calendar Path: {params.path}</p>
    </div>
    );
}
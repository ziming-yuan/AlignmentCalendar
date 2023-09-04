export default function CalendarHeader(){
    return (
        <thead className="bg-gray-100 text-gray-600 text-sm">
        <tr>
          <th className="px-4 py-2">TITLE</th>
          <th className="px-4 py-2">DESCRIPTION</th>
          <th className="hidden sm:table-cell px-4 py-2">STATUS</th>
          <th className="px-4 py-2">ACTIONS</th>
        </tr>
      </thead>
    );
}
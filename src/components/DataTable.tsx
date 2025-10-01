import { LeadData } from './types';

interface DataTableProps {
    csvData: LeadData[];
    columnHeaders: string[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onExportCsv: () => void;
    onRowClick: (row: LeadData, index: number) => void;
}

export default function DataTable({
    csvData,
    columnHeaders,
    searchTerm,
    onSearchChange,
    onExportCsv,
    onRowClick,
}: DataTableProps) {

    const filteredData = csvData.filter(row =>
        Object.values(row).some(value =>
            value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            {/* Fixed header with search and export */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-700">Yüklenen Veriler</h2>
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Tabloda ara..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm w-48 text-gray-900 placeholder-gray-500"
                        />
                        <button
                            onClick={onExportCsv}
                            className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
                        >
                            CSV Olarak Dışa Aktar
                        </button>
                    </div>
                </div>
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            {columnHeaders.map((header) => (
                                <th
                                    key={header}
                                    scope="col"
                                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                            <th
                                scope="col"
                                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Aksiyonlar
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((row, index) => (
                            <tr
                                key={index}
                                onClick={() => onRowClick(row, index)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                            >
                                {columnHeaders.map((header) => (
                                    <td
                                        key={`${index}-${header}`}
                                        className="px-4 py-2 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {row[header]}
                                    </td>
                                ))}
                                <td
                                    className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => onRowClick(row, index)}
                                        className="text-blue-600 hover:text-blue-900 text-xs"
                                    >
                                        Detay / Düzenle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import { LeadData } from './types';

interface LeadModalProps {
    isOpen: boolean;
    selectedLead: LeadData | null;
    columnHeaders: string[];
    onClose: () => void;
    onSave: (updatedLead: LeadData) => void;
}

export default function LeadModal({
    isOpen,
    selectedLead,
    columnHeaders,
    onClose,
    onSave,
}: LeadModalProps) {
    if (!isOpen || !selectedLead) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedLead: LeadData = {};
        columnHeaders.forEach(header => {
            updatedLead[header] = formData.get(header) as string;
        });
        onSave(updatedLead);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto transform transition-all duration-300 ease-out scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Lead Detayları ve Düzenle</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4">
                    <form onSubmit={handleSubmit}>
                        {columnHeaders.map((header) => (
                            <div key={header} className="mb-3">
                                <label htmlFor={header} className="block text-sm font-medium text-gray-700 mb-1">
                                    {header}
                                </label>
                                {header.startsWith('Follow-up') ? (
                                    <textarea
                                        id={header}
                                        name={header}
                                        defaultValue={selectedLead[header]}
                                        rows={3}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    ></textarea>
                                ) : (
                                    <input
                                        type="text"
                                        id={header}
                                        name={header}
                                        defaultValue={selectedLead[header]}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-150 text-sm"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 text-sm"
                            >
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

interface CsvUploadProps {
    fileName: string;
    onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CsvUpload({ fileName, onFileUpload }: CsvUploadProps) {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">CSV Yükle</h2>
            <input
                type="file"
                accept=".csv"
                onChange={onFileUpload}
                className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
            />
            {fileName && (
                <p className="mt-2 text-sm text-gray-700">
                    Yüklenen dosya: {fileName}
                </p>
            )}
            <p className="mt-2 text-sm text-gray-600">
                Lütfen AI tarafından oluşturulan follow-up maillerini içeren CSV dosyasını buraya yükleyin.
            </p>
        </div>
    );
}

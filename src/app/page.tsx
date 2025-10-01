"use client";

import { useState } from 'react';
import Papa from 'papaparse';
import { CsvUpload, DataTable, LeadModal, LeadData } from '../components';

export default function Home() {
  // State'ler
  const [csvData, setCsvData] = useState<LeadData[]>([]);
  const [columnHeaders, setColumnHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [editingLeadIndex, setEditingLeadIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // CSV yükleme fonksiyonu
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setCsvData(results.data as LeadData[]);
          setColumnHeaders(results.meta.fields || []);
          console.log("Parsed CSV Data:", results.data);
          console.log("Column Headers:", results.meta.fields);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          alert("CSV dosyasını okurken bir hata oluştu.");
        },
      });
    }
  };

  // CSV export fonksiyonu
  const handleExportCsv = () => {
    if (csvData.length === 0) {
      alert("Dışa aktarılacak veri bulunmamaktadır.");
      return;
    }
    const csv = Papa.unparse(csvData, { header: true, columns: columnHeaders });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'exported_leads.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      alert("Tarayıcınız CSV indirmeyi desteklemiyor.");
    }
  };

  // Row click handler
  const handleRowClick = (row: LeadData, index: number) => {
    setSelectedLead(row);
    setEditingLeadIndex(index);
    setIsModalOpen(true);
  };

  // Modal close handler
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
    setEditingLeadIndex(null);
  };

  // Modal save handler
  const handleModalSave = (updatedLead: LeadData) => {
    setCsvData(prevData => {
      if (editingLeadIndex !== null) {
        const newData = [...prevData];
        newData[editingLeadIndex] = updatedLead;
        return newData;
      }
      return prevData;
    });

    setIsModalOpen(false);
    setSelectedLead(null);
    setEditingLeadIndex(null);
    alert("Değişiklikler kaydedildi!");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Lead Mailer Yönetim Paneli
        </h1>

        <CsvUpload fileName={fileName} onFileUpload={handleFileUpload} />

        {csvData.length > 0 && (
          <DataTable
            csvData={csvData}
            columnHeaders={columnHeaders}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onExportCsv={handleExportCsv}
            onRowClick={handleRowClick}
          />
        )}
      </div>

      <LeadModal
        isOpen={isModalOpen}
        selectedLead={selectedLead}
        columnHeaders={columnHeaders}
        onClose={handleModalClose}
        onSave={handleModalSave}
      />
    </main>
  );
}
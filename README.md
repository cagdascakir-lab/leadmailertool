# Lead Mailer Tool

AI tarafından oluşturulan follow-up maillerini içeren CSV dosyalarını yükleyip düzenleyebileceğiniz, filtreleyebileceğiniz ve tekrar CSV olarak dışa aktarabileceğiniz bir Next.js uygulaması.

## 🛠️ Ortam Gereksinimleri

### Sistem Gereksinimleri
- **Node.js**: 20 LTS (önerilen) veya 18.18+
- **npm**: 10.0+
- **OS**: macOS / Linux / Windows 10+
- **RAM**: En az 4GB (8GB önerilen)
- **Disk**: En az 1GB boş alan

### Teknoloji Stack
- **Framework**: Next.js 15.5.4
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4
- **CSV Parsing**: PapaParse 5.5.3
- **Type Safety**: TypeScript 5
- **Linting**: ESLint 9

## 📦 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd lead-mailer-tool
```

### 2. Bağımlılıkları Yükleyin
```bash
npm ci          # veya npm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda http://localhost:3000 adresine gidin.

## 🚀 Çalıştırma Komutları

### Geliştirme Modu (Hot Reload)
```bash
npm run dev
# http://localhost:3000
```

### Üretim Build
```bash
npm run build
npm start
```

### Lint Kontrolü
```bash
npm run lint
```

## 📖 Kullanım

1. **CSV Yükleme**: Ana sayfadan CSV dosyanızı yükleyin (`.csv`). İlk satır başlık olmalıdır.
2. **Veri Görüntüleme**: Yüklenen veriler otomatik olarak tabloda gösterilir.
3. **Arama**: Tabloda arama yaparak verileri filtreleyebilirsiniz.
4. **Düzenleme**: Satıra tıklayarak veya "Detay / Düzenle" butonuna basarak modal açabilirsiniz.
5. **Kaydetme**: Düzenlediğiniz verileri modal içinden kaydedebilirsiniz.
6. **Dışa Aktarma**: Güncellenmiş verileri "CSV Olarak Dışa Aktar" ile indirebilirsiniz.

**Örnek CSV dosyası**: `src/app/leads.csv`

## ✨ Özellikler

- ✅ **CSV Import**: Otomatik başlık tanıma ile dosya yükleme
- ✅ **Veri Görüntüleme**: Responsive tablo ile veri listeleme
- ✅ **Arama/Filtreleme**: Gerçek zamanlı tablo araması
- ✅ **Detay Görünümü**: Modal ile satır bazlı detay görüntüleme
- ✅ **Düzenleme**: Modal form ile veri düzenleme
- ✅ **CSV Export**: Güncellenmiş veriyi CSV olarak dışa aktarma
- ✅ **Responsive Design**: Mobil ve desktop uyumlu arayüz
- ✅ **Type Safety**: TypeScript ile tip güvenliği

## 🏗️ Bileşen Mimarisi

Component mimarisi kullanma sebebim 

**1. Kod Organizasyonu**
- Ana sayfa dosyası 288 satırdan 87 satıra düşürüldü (%70 azalma)
- Her bileşen tek bir sorumluluğa sahip (Single Responsibility Principle)
- Kod daha okunabilir ve bakımı kolay

**2. Yeniden Kullanılabilirlik**
- Bileşenler bağımsız ve props odaklı
- Farklı sayfalarda veya projelerde kullanılabilir
- Test edilmesi daha kolay

**3. Import/Export Avantajları**
```typescript
// Barrel export pattern (src/components/index.ts)
export { default as CsvUpload } from './CsvUpload';
export { default as DataTable } from './DataTable';
export { default as LeadModal } from './LeadModal';

// Temiz import (src/app/page.tsx)
import { CsvUpload, DataTable, LeadModal } from '../components';
```

**4. Performans**
- Bileşenler gerektiğinde lazy load edilebilir
- React'in memoization özelliklerinden yararlanılabilir
- Bundle size optimizasyonu

### Bileşen Yapısı

```
src/components/
├── types.ts          # TypeScript interfaces
├── CsvUpload.tsx     # CSV file upload component
├── DataTable.tsx     # Data table with search/export
├── LeadModal.tsx     # Lead details modal
└── index.ts          # Barrel exports
```

### Veri Akışı

1. **State Management**: Ana sayfa (`page.tsx`) tüm state'i yönetir
2. **Props Down**: Veriler bileşenlere props olarak aktarılır
3. **Events Up**: Bileşenler callback fonksiyonları ile ana sayfaya geri bildirim yapar
4. **Unidirectional Flow**: Veri akışı tek yönlü ve öngörülebilir

---

##  Yol Haritası (Roadmap)

### 🧠 Projeye Başlarken Düşündüklerim

Bu projeyi tasarlarken öncelikle **kullanıcı deneyimini** odak noktasına aldım. CSV dosyalarını yükleyip düzenlemek isteyen birinin en çok ihtiyaç duyacağı özellikleri belirledim: hızlı yükleme, kolay arama, pratik düzenleme ve sorunsuz dışa aktarma. 

Teknik açıdan **Next.js** seçimim, hızlı geliştirme ve production-ready çıktı almak içindi. **Component-based mimari** ile başlamak yerine önce monolitik bir yapı kurup sonra refactor etme stratejisini benimsedim - bu sayede MVP'yi hızla test edip gerçek kullanıcı ihtiyaçlarını öğrenebilecektim.

**PapaParse** ile CSV işleme, **Tailwind** ile hızlı styling ve **TypeScript** ile tip güvenliği sağladım. En kritik karar, modal ile detay görünümünü seçmemdi - bu hem mobile-friendly hem de kullanıcı dostu bir çözüm sundu.

##  MVP Geliştirme Aşaması

1. Proje kurulumu ve temel altyapıyı (Next.js, React, Tailwind, PapaParse) 1.5 saat içinde tamamladım; bağımlılıkları kurup temel Next.js iskeletini çıkardım ve CSV parsing altyapısını hazırladım. **(Bitti)**

2. CSV yükleme ve veri gösterimi için 2.0 saat çalıştım; dosya yükleme bileşenini geliştirdim, verileri responsive bir tabloda dinamik kolon başlıklarıyla birlikte gösterdim ve gerekli veri eşlemelerini yaptım. **(Bitti)**

3. Arama ve düzenleme özelliklerini 2.0 saatte hayata geçirdim; gerçek zamanlı arama deneyimi ekledim, satır detayları için modal bileşeni hazırladım ve form alanları üzerinden düzenleme akışını tamamladım. **(Bitti)**

4. CSV dışa aktarma ve temel UX iyileştirmelerini 1.5 saat içinde tamamladım; CSV export akışını kurdum, hover ve spacing gibi görsel düzenlemeler yaptım ve arayüzü responsive hale getirdim. **(Bitti)**

###  Mimari Refactoring Aşaması

5. Bileşen mimarisine geçişi 2.0 saat içinde tamamladım; `CsvUpload`, `DataTable` ve `LeadModal` bileşenlerine ayırdım, TypeScript ile props arayüzlerini netleştirdim ve importları sadeleştirmek için barrel export yapısını kullandım. **(Bitti)**

6. UX ve performans tarafında 1.5 saat iyileştirme yaptım; modal açılış/kapanış animasyonlarını ekledim, dışarı tıklamayla kapatma davranışı sağladım, arama bölümünü tablodan bağımsız kaydırılabilir hale getirdim ve satır tıklamasıyla detay açma etkileşimini ekledim. **(Bitti)**

###  Toplam Süre Analizi

- **MVP Geliştirme**: 7.0 saat (4 parça)
- **Mimari Refactoring**: 3.5 saat (2 parça)
- **Dokümantasyon**: 1.5 saat (1 parça)
- **🎯 Toplam Süre**: ~12.0 saat (2 gün)

###  Eksik  Özellikler (Backlog)
 Düzenle ve detay butonları kullanmadan istediğimiz satırdaki değişiklikleri o satırda bulunan herhangi bir veri(name,company..) tıklayarak yapılabiliyor fakat düzenlemek istediğimiz bir veri öznelinde bunu yapamıyoruz örneğin ben company başlığı altındaki veriyi değiştirmek istediğim zaman tıkladığım  verinin ardından karşılaştığım tabloda aynı zamanda bana  name email verisini değiştirme hakkıda sunuyor benim bu casede eksik olarak gördüğüm özellik bu. Düzenlemek istediğim veriye tıkladığımda karşıma çıkan şablon sadece o veri başlığı altında çıkmalıdır.



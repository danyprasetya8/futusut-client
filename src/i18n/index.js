import { createI18n } from 'vue-i18n'

const DAMAGED_GOODS = [
  {
    name: 'Backdrops',
    price: '855000'
  },
  {
    name: 'Tripods',
    price: '1500000'
  },
  {
    name: 'Podium cube',
    price: '600000'
  },
  {
    name: 'Monitors',
    price: '2000000'
  },
  {
    name: 'Printers',
    price: '2000000'
  },
  {
    name: 'Cameras',
    price: '40000000'
  },
  {
    name: 'Softbox',
    price: '1000000'
  }
]

const i18n = createI18n({
  locale: 'ID',
  allowCompositoin: true,
  messages: {
    EN: {
      protocols: {
        title: 'Futusut Studio Protocols',
        items: [
          'No food or water in the studio',
          'No shoes are allowed in the studio',
          'No nudity content',
          'Our studio\'s maximum capacity is for 8 pax',
          'You must be vaccinated and mask equipped to enter our studio',
          'We only accept contactless payment',
          'We strongly recommend you to arrive 10 minutes prior to your scheduled time',
          'Any late arrivals will result in cancellation without any refund',
          'Any damage to our studio equipment will be charged'
        ]
      },
      regulations: {
        title: 'Rules & Regulations in the studio',
        items: [
          'Do not touch / move the position/location of studio\'s equipments',
          'Do not stand past the line that has been determined by the admin',
          'Do not change the backdrop without admin\'s supervision',
          'Do not alter studio\'s lighting setup',
          'Please return the shutter clicker to the space provided'
        ],
        damagedGoodsTitle: 'Conditions for replacement of damaged goods',
        damagedGoodsItems: DAMAGED_GOODS,
        notes: 'NB: in case of fatal damage, guests are required to sign a statement stating that he/she/they are ready to replace the damaged goods due to intentional or unintentional actions, and must replace the goods by 75% of the value listed above.'
      }
    },
    ID: {
      protocols: {
        title: 'Protokol Futusut Studio',
        items: [
          'Makanan dan minuman tidak diperbolehkan di dalam studio',
          'Segala jenis alas kaki tidak diperbolehkan di dalam studio',
          'Tidak diperkenankan untuk mengambil konten berbau dewasa di dalam studio',
          'Kapasitas maksimum studio berjumlah 8 orang',
          'Pengunjung wajib sudah divaksinasi dan memakai masker untuk memasuki studio',
          'Kami hanya menerima pembayaran digital',
          'Kami sangat menyarankan Anda untuk tiba 10 menit sebelum waktu yang dijadwalkan',
          'Setiap keterlambatan sesi akan mengakibatkan pembatalan tanpa pengembalian uang',
          'Pengunjung akan di denda apabila terjadi kerusakan secara sengaja maupun tidak disengaja di dalam studio'
        ]
      },
      regulations: {
        title: 'Tata tertib di dalam studio',
        items: [
          'Dilarang memindakan posisi/letak perlatan kamera',
          'Tidak diperkenankan untuk beridiri melewati garis yang sudah ditentukan oleh admin',
          'Tidak diperkenankan untuk mengganti backdrop tanpa pengawasan admin',
          'Tidak diperkenankan untuk mengotak–atik setup lightning di dalam studio',
          'Mohon kembalikan shutter clicker di tempat yang sudah disediakan'
        ],
        damagedGoodsTitle: 'Ketentuan untuk penggantian barang rusak',
        damagedGoodsItems: DAMAGED_GOODS,
        notes: 'NB: jika terjadi kerusakan fatal maka pengunjung wajib metandatangani surat pernyataan siap mengganti barang yang rusak akibat tindakan yang sengaja maupun tidak sengaja, dan wajib mengganti barang – barang tersebut 75% dari nilai yang sudah tertera diatas.'
      }
    }
  }
})

export default i18n

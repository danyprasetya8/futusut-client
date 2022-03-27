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
      },
      faq: {
        one: {
          question: 'Do I get soft copy files from my session?',
          answer: 'You can get the soft copy files from your session on additional charge (check our Price List for more info). Please note that soft copy files are only accessible 7 days after your session so please download your photos before they expire.'
        },
        two: {
          question: 'Can I use my shoes inside the studio?',
          answer: 'Sorry, any kind of footwear from outside is not allowed in the studio, but we do provide you comfy slippers :)'
        },
        three: {
          question: 'Can I bring my pets?',
          answer: 'As much as we love pets and admire them, our studio is not pet friendly :( Let\'s hope that soon we can allow your cute furbabies inside the studio!'
        },
        four: {
          question: 'What is the maximum number of people in the studio?',
          answer: 'Due to Covid-19 measures, we limit the number of our guests to maximum 8 people per session.'
        },
        five: {
          question: 'What clothing code would you recommend?',
          answer: 'Many of our guests prefer wearing contrast clothes like lightly-colored tops and dark-coloured bottoms. But at the end of the day, wear whatever that is comfortable for you and be confident during the session! You will look good anyway :)'
        },
        six: {
          question: 'Can I cancel my booking?',
          answer: 'Unfortunately, you can\'t cancel/ask for a refund after you have booked your session. But you can definitely reschedule your session! <br />*maximum 1x24 hours prior to your scheduled session. <br />*limited to one time'
        },
        seven: {
          question: 'Can I reschedule my booking?',
          answer: 'It is possible to reschedule once with maximum 1x24 hours prior to your scheduled session, for more information about session rescheduling please reach out through our whatsapp'
        },
        eight: {
          question: 'Can I walk-in for a session?',
          answer: 'Yes you can, but there is a low possibility that the slot you desire is available. Therefore, we highly encourage you to do the bookings beforehand through the link on our bio.'
        },
        nine: {
          question: 'What if we late for a session?',
          answer: 'We strongly recommend you to arrive 10 minutes prior to your scheduled time as late arrivals will result in cancellation with no refund. Therefore, if you are unable to arrive on time, we encourage you to make a new booking on available dates/times.'
        },
        ten: {
          question: 'How do I know if my booking is confirmed?',
          answer: 'You can claim your slot after you making your payments online. We will reach out to you regarding your booking via Whatsapp and Email after it is confirmed by our website.'
        }
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
      },
      faq: {
        one: {
          question: 'Apakah saya mendapatkan file soft copy dari sesi saya?',
          answer: 'Anda bisa mendapatkan file soft copy dari sesi Anda dengan biaya tambahan (lihat Daftar Harga kami untuk info lebih lanjut). Harap dicatat bahwa file soft copy hanya dapat diakses 7 hari setelah sesi Anda, jadi silakan unduh foto Anda sebelum kedaluwarsa.'
        },
        two: {
          question: 'Bisakah saya menggunakan sepatu saya di studio?',
          answer: 'Maaf, segala jenis alas kaki dari luar tidak diperbolehkan di studio, tetapi kami menyediakan sandal yang nyaman untuk Anda :)'
        },
        three: {
          question: 'Bisakah saya membawa hewan peliharaan saya?',
          answer: 'Meskipun kami mencintai hewan peliharaan dan mengagumi mereka, studio kami tidak mengizinkan untuk membawa hewan peliharaan :( Semoga kedepannya kami dapat mengizinkan hewan peliharaan lucu Anda di dalam studio!'
        },
        four: {
          question: 'Berapa jumlah maksimum orang di dalam studio?',
          answer: 'Dikarenakan Covid-19, kami membatasi jumlah tamu hingga maksimal 8 orang per sesi.'
        },
        five: {
          question: 'Kode pakaian apa yang anda rekomendasikan?',
          answer: 'Banyak tamu kami lebih menyukai pakaian kontras seperti atasan berwarna terang dan bawahan berwarna gelap. Namun pada akhirnya, kamu dapat mengenakan apa pun yang selama anda nyaman dan percaya diri selama kamu berfoto di sesi kami!'
        },
        six: {
          question: 'Bisakah saya membatalkan pesanan saya?',
          answer: 'Sangat disayangkan namun anda tidak dapat membatalkan/meminta pengembalian dana setelah anda memesan sesi anda. Tetapi anda dapat mengganti sesi anda!<br/>*maksimum 1x24 jam sebelum sesi Anda<br/>*hanya bisa sekali'
        },
        seven: {
          question: 'Bisakah saya mengganti jadwal pesanan saya?',
          answer: 'Anda hanya dapat  melakukan pergantian jadwal/reschedule sekali dengan ketentuan pergantian harus dilakukan paling lambat 1x24 jam dari waktu sesi yang sudah dipilih'
        },
        eight: {
          question: 'Bisakah saya datang langsung untuk sesi?',
          answer: 'Bisa, tapi kemungkinannya kecil bahwa slot yang Anda inginkan tersedia. Oleh karena itu, kami sangat menyarankan Anda untuk melakukan pemesanan terlebih dahulu melalui tautan di bio kami.'
        },
        nine: {
          question: 'Bagaimana jika saya terlambat untuk sesi saya?',
          answer: 'Kami sangat menyarankan Anda untuk tiba 10 menit sebelum waktu yang dijadwalkan karena kedatangan yang terlambat akan mengakibatkan pembatalan tanpa pengembalian uang. Oleh karena itu, jika Anda tidak dapat tiba tepat waktu, kami menyarankan Anda untuk melakukan pemesanan baru pada tanggal/waktu yang tersedia.'
        },
        ten: {
          question: 'Bagaimana saya tahu jika pemesanan saya sudah dikonfirmasi?',
          answer: 'Anda dapat mengklaim slot Anda setelah melakukan pembayaran secara online. Kami akan menghubungi Anda mengenai pemesanan Anda melalui Whatsapp dan Email setelah dikonfirmasi oleh situs web kami.'
        }
      }
    }
  }
})

export default i18n

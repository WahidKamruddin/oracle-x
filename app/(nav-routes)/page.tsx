import { Features } from '@/components/features';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-41/hero-section-41'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-01/faq-component-01'
import Footer from '@/components/shadcn-studio/blocks/footer-component-01/footer-component-01';
import CTASection from '@/components/shadcn-studio/blocks/cta-section-10/cta-section-10';

const menudata = [
  {
    id: 1,
    img: 'https://1000logos.net/wp-content/uploads/2018/05/Bitcoin-Logo-1536x864.png',
    imgAlt: 'btc-logo',
    title: 'Bitcoin',
  },
  {
    id: 2,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDn0ojTITvcdAzMsfBMJaZC4STaDHzduleQ&s',
    imgAlt: 'eth-logo',
    title: 'Etherium',
  },
  {
    id: 3,
    img: 'https://cdn.vectorstock.com/i/500p/63/71/tether-symbol-icon-usdt-logo-crypto-vector-41056371.jpg',
    imgAlt: 'tether-logo',
    title: 'Tether',
  },

]

const features = [
  {
    id: 1,
    title: 'Real-Time Market Data',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw12.jpeg',
    description:
      'Track live prices, market caps, volume, and price changes across thousands of cryptocurrencies.',
  },
  {
    id: 2,
    title: 'Interactive Price Charts',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw15.jpeg',
    description:
      "Analyze token performance with dynamic charts, historical data, and multiple time ranges.",
  },
  {
    id: 3,
    title: 'Market Insights',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw20.jpeg',
    description:
      "View key metrics like market dominance, liquidity, and trading volume to understand market trends.",
  },
  {
    id: 4,
    title: 'Watchlist',
    image:
      'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/lummi/bw21.jpeg',
    description:
      'Create a personal watchlist to track your favorite cryptocurrencies and monitor their performance in one place.'}
]

const faqItems = [
  {
    question: 'What is this app?',
    answer: 'This app is a project by Wahid to showcase his skills in fullstack development.'
  },
  {
    question: 'Can I still use this app?',
    answer:
      'Yes, of course you can. This is a fully functional fullstack application and works as intended. Have fun!'
  },
  {
    question: 'Do I have to pay?',
    answer:
      'Until further notice, this app is completely free to use!'
  },
  {
    question: 'Why are you so cool?',
    answer:
      'What can I say? I am just a chill guy.'
  }
]

const HeroSectionPage = () => {
  return (
    <div className='overflow-x-hidden'>
        <HeroSection menudata={menudata} />
        <Features features={features}/>
        <CTASection/>
        <FAQ faqItems={faqItems} />
        <Footer />
    </div>
  );
}

export default HeroSectionPage

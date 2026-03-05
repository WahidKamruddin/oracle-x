import { Features } from '@/components/features';
import HeroSection from '@/components/shadcn-studio/blocks/hero-section-41/hero-section-41'
import FAQ from '@/components/shadcn-studio/blocks/faq-component-01/faq-component-01'
import Footer from '@/components/shadcn-studio/blocks/footer-component-01/footer-component-01';
import CTASection from '@/components/shadcn-studio/blocks/cta-section-10/cta-section-10';

const menudata = [
  {
    id: 1,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-18.png',
    imgAlt: 'plate-1',
    userComment: 'The ambiance is perfect and the food is absolutely delicious. Highly recommended!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png'
  },
  {
    id: 2,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-19.png',
    imgAlt: 'plate-2',
    userComment: 'Best dining experience in town. The staff is friendly and the menu is exceptional.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png'
  },
  {
    id: 3,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-20.png',
    imgAlt: 'plate-3',
    userComment: 'Every dish is crafted with care. This place never disappoints!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
  },
  {
    id: 4,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-05.png',
    imgAlt: 'plate-4',
    userComment: 'Great atmosphere and incredible flavors. A must-visit restaurant!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png'
  },
  {
    id: 5,
    img: 'https://cdn.shadcnstudio.com/ss-assets/template/landing-page/bistro/image-20.png',
    imgAlt: 'plate-3',
    userComment: 'Every dish is crafted with care. This place never disappoints!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
  }
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

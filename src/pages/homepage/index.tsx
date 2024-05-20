import { NextSeo } from 'next-seo';
import Page from '@/components/homepage/page';
import Header from '@/components/homepage/header';
import VideoSection from '@/components/homepage/video-section';
import ListSection from '@/components/homepage/list-section';
import FeatureSection from '@/components/homepage/feature-section';
import CasesSection from '@/components/homepage/cases-section';
import SocialProof from '@/components/homepage/social-proof';
import PricingTable from '@/components/homepage/pricing-table';
import Footer from '@/components/homepage/footer';

export default function Home() {
  return (
    <Page>
      <NextSeo
        title="LifeLink"
        description="Facilitando transplantes para todos"
      />
      <Header />
      <main>
        <VideoSection />
        <ListSection />
        <FeatureSection />
        <CasesSection />
        <SocialProof />
        <PricingTable />
      </main>
      <Footer />
    </Page>
  );
}

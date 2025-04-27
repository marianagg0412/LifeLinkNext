
import Page from '@/app/components/homepage/page';
import Header from '@/app/components/homepage/header';
import ListSection from '@/app/components/homepage/list-section';
import FeatureSection from '@/app/components/homepage/feature-section';
import CasesSection from '@/app/components/homepage/cases-section';
import SocialProof from '@/app/components/homepage/social-proof';
import PricingTable from '@/app/components/homepage/pricing-table';
import Footer from '@/app/components/homepage/footer';

export default function Home() {
  return (
    <Page>
      <Header />
      <main>
        {/*<VideoSection />*/}
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

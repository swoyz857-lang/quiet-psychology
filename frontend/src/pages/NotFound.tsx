import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Quiet Psychology" description="The requested page could not be found." />
      <section className="page-section">
        <div className="mx-auto max-w-2xl text-center px-4 sm:px-6">
          <p className="text-6xl font-serif text-soft-gold mb-6">404</p>
          <h1 className="font-serif text-3xl md:text-4xl text-heading mb-4">Page Not Found</h1>
          <p className="text-body mb-8">The archive entry you are looking for does not exist.</p>
          <Link to="/">
            <Button>Return to Archive</Button>
          </Link>
        </div>
      </section>
    </>
  );
}

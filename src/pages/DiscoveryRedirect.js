import { Navigate, useSearchParams } from 'react-router-dom';

export default function DiscoveryRedirect() {
  const [searchParams] = useSearchParams();
  const clientSlug = searchParams.get('client');

  if (clientSlug) {
    return <Navigate to={`/intake/${clientSlug}`} replace />;
  }

  return <Navigate to="/" replace />;
}

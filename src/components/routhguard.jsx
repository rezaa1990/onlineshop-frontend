import { useEffect } from 'react';
import { useLocation,} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';

const RouteGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = location.pathname;

  useEffect(() => {
    if (location.pathname !== previousPath) {
      navigate(previousPath);
    }
  }, [location, navigate, previousPath]);

  return null;
};

export default RouteGuard;
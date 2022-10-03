import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scrollTo from 'gatsby-plugin-smoothscroll';

export default function GoToTop() {
  const routePath = useLocation();
  const onTop = () => {
    scrollTo('.header__section');
  };
  useEffect(() => {
    onTop();
  }, [routePath]);

  return null;
}

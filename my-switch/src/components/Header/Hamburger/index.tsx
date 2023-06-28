import { useEffect, useState } from 'react';
import { Divide as HamburgerMenu } from 'hamburger-react';

interface HamburgerProps {
  toggleNavigation: () => void;
  onClickOutside: boolean;
}

export const Hamburger = ({ toggleNavigation, onClickOutside }: HamburgerProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (onClickOutside) {
      setIsOpen(false);
    }
  }, [onClickOutside])

  const toggle = () => {
    setIsOpen((status)=> !status);
    toggleNavigation();
  };

  return <HamburgerMenu size={24} onToggle={toggle} toggled={isOpen} />;
};
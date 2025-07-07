'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface PortfolioState {
  activeSection: string;
  mobileMenuOpen: boolean;
  isAnimating: boolean;
  mousePosition: { x: number; y: number };
}

type PortfolioAction =
  | { type: 'SET_ACTIVE_SECTION'; payload: string }
  | { type: 'TOGGLE_MOBILE_MENU' }
  | { type: 'SET_MOBILE_MENU'; payload: boolean }
  | { type: 'SET_ANIMATING'; payload: boolean }
  | { type: 'SET_MOUSE_POSITION'; payload: { x: number; y: number } };

const initialState: PortfolioState = {
  activeSection: 'home',
  mobileMenuOpen: false,
  isAnimating: false,
  mousePosition: { x: 0, y: 0 },
};

const portfolioReducer = (
  state: PortfolioState,
  action: PortfolioAction
): PortfolioState => {
  switch (action.type) {
    case 'SET_ACTIVE_SECTION':
      return { ...state, activeSection: action.payload };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen };
    case 'SET_MOBILE_MENU':
      return { ...state, mobileMenuOpen: action.payload };
    case 'SET_ANIMATING':
      return { ...state, isAnimating: action.payload };
    case 'SET_MOUSE_POSITION':
      return { ...state, mousePosition: action.payload };
    default:
      return state;
  }
};

interface PortfolioContextType {
  state: PortfolioState;
  dispatch: React.Dispatch<PortfolioAction>;
  scrollToSection: (sectionId: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState);

  const scrollToSection = (sectionId: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: sectionId });
    dispatch({ type: 'SET_MOBILE_MENU', payload: false });

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PortfolioContext.Provider value={{ state, dispatch, scrollToSection }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from '@/app/components/NavBar';
 
describe('Navbar', () => {
  
  it('renders a link to home component', () => {
    render(<NavBar />);
    
    const navbar = screen.getByRole("link");
    
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveAttribute("href", "/");
  });
  
  it("renders the sign in button", () => {
    render(<NavBar />);

    const signInButton = screen.getByRole("button", {
      name: /sign in/i
    });
    
    expect(signInButton).toBeInTheDocument();
  });

  it("renders the sign up button", () => {
    render(<NavBar />);

    const signUpButton = screen.getByRole("button", {
      name: /sign up/i
    });
    
    expect(signUpButton).toBeInTheDocument();
  });
});
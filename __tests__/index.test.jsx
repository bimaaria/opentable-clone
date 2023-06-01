import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context";
import userEvent from "@testing-library/user-event"
import NavBar from "@/app/components/NavBar";
import RestaurantCard from "@/app/search/components/RestaurantCard";
import { RESTAURANT } from "../mock/data";
import SearchBar from "@/app/components/SearchBar";
import { createMockRouter } from "../mock/createMockRouter";
import Price from "@/app/components/Price";
 
describe("Home", () => {
  it("renders a link to home component", () => {
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

  it("renders the search bar", async () => {  
    const user = userEvent.setup();
    const router = createMockRouter({
      query: "toronto"
    })

    render(
      <AppRouterContext.Provider value={router}>
        <SearchBar />
      </AppRouterContext.Provider>
    );

    const searchInput = screen.getByPlaceholderText(/state, city or town/i);
    
    const searchButton = screen.getByRole("button", {
      name: /let's go/i
    });
    
    expect(searchInput).toBeInTheDocument();
    
    await user.type(searchInput, "toronto");
    expect(searchInput.value).toBe("toronto");
    
    expect(searchButton).toBeInTheDocument();
  });
  
  it("should navigate to search page", async () => {
    const user = userEvent.setup();
    const router = createMockRouter({
      query: "toronto"
    });

    const searchButton = screen.getByRole("button", {
      name: /let's go/i
    });
    
    await user.click(searchButton);
    expect(router.push).toHaveBeenCalledWith("/search?city=toronto");
  });

  it("renders the price", () => {
    render(<Price price={RESTAURANT.price} />);

    const price = screen.getByText("$$");

    expect(price).toBeInTheDocument();
  });
  
  it("render the restaurant card", () => {
    render(<RestaurantCard restaurant={RESTAURANT} />);

    const paragraph = screen.getByRole("link");
  
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveAttribute("href", "/restaurant/vivaan-fine-indian-cuisine-ottawa");
  });
});
    import {Link, Outlet} from "react-router-dom";
    import './RootLayout.css';
    import { ClerkProvider, SignedIn, UserButton,SignedOut,SignInButton } from "@clerk/clerk-react";
    import {QueryClient,QueryClientProvider} from '@tanstack/react-query'


    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

    if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
    }
  
    // using react query -- from react query docs
    const queryClient = new QueryClient()   

        const RootLayout = () => {
            return (
                // for cleark authenication
                <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
                {/* using react query   */}
                    <QueryClientProvider client={queryClient}>
                <div className='rootLayout'>
                <header>
                    <Link to="/" className="logo">
                    <img src="/black.jpg" alt="" />
                    <span>ChatGenius</span>
                    </Link>
                    <div className="user">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    </div>
                </header>

                <main>
                <Outlet/>
                </main>
                </div>
                </QueryClientProvider>
                </ClerkProvider>
            );
        }

        export default RootLayout;

import React from "react";
import { UserProvider } from "../utils/GlobalStates/UserContext";
import { GlobalProvider } from "../utils/GlobalStates/GlobalState";
import { CauseProvider } from "../utils/GlobalStates/CauseContext";
import { PostProvider } from "../utils/GlobalStates/PostContext";
import { TrendingProvider } from "../utils/GlobalStates/TrendingContext";
import { ConvoProvider } from "../utils/GlobalStates/ConvoContext";
import { GuessProvider } from "../utils/GlobalStates/GuessContext";

const Providers = ({ children }) => {
  return (
    <GlobalProvider>
      <UserProvider>
        <GuessProvider>
          <CauseProvider>
            <TrendingProvider>
              <PostProvider>
                <ConvoProvider>{children}</ConvoProvider>
              </PostProvider>
            </TrendingProvider>
          </CauseProvider>
        </GuessProvider>
      </UserProvider>
    </GlobalProvider>
  );
};

export default Providers;

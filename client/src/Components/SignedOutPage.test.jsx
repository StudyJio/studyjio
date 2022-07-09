/**
 * I want the environment variables to be set properly
 * so that
 * I can import SignedOutPage from "./SignedOutPage.jsx"
 * so that
 * I can test the SignedOutPage component.
 * 
 * However, uncommenting the line below causes the test suite to fail to run, as shown in the Terminal.
 * 
 */
import SignedOutPage from "./SignedOutPage.jsx"

import { expect } from "@jest/globals"

it("has the correct ...URL environment variable", () => {
    expect(process.env.REACT_APP_SUPABASE_URL).toEqual("https://raqxffxcknwwrzqjpemc.supabase.co");
});

it("has the correct ...KEY environment variable", () => {
    expect(process.env.REACT_APP_SUPABASE_KEY).toEqual("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcXhmZnhja253d3J6cWpwZW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0Njc4OTMsImV4cCI6MTk2OTA0Mzg5M30.QcWHOSFUiR8oem3p-ghYQ9RxRVyoIS_e6O6wrkarGL8");
});
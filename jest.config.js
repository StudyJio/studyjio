module.exports = {
    setupFiles: ["./.jest/setEnvVars.js"]
};

process.env = Object.assign(process.env, {
    REACT_APP_SUPABASE_URL: "https://raqxffxcknwwrzqjpemc.supabase.co",
    REACT_APP_SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcXhmZnhja253d3J6cWpwZW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0Njc4OTMsImV4cCI6MTk2OTA0Mzg5M30.QcWHOSFUiR8oem3p-ghYQ9RxRVyoIS_e6O6wrkarGL8"
});
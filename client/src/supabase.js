import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://raqxffxcknwwrzqjpemc.supabase.co";
const supabaseAnonKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcXhmZnhja253d3J6cWpwZW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM0Njc4OTMsImV4cCI6MTk2OTA0Mzg5M30.QcWHOSFUiR8oem3p-ghYQ9RxRVyoIS_e6O6wrkarGL8";
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
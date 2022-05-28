import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://pbejqmkznfbtdnffzoxi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBiZWpxbWt6bmZidGRuZmZ6b3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI1MDU1NjQsImV4cCI6MTk2ODA4MTU2NH0.slq1moFsbcP8A1Ut_2M1h9XZs0-mxX4MER7O3l8MhvM";
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://skxfvsuucxctxqzlgorg.supabase.co'
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNreGZ2c3V1Y3hjdHhxemxnb3JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwODgyNjAsImV4cCI6MjAwNjY2NDI2MH0.hj_sPPAFQ-8ZQFKtMA9dPYZwXHMzGEcyczo3fOwNLpY"


const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); }
    else router.push('/feed');
  }
  const inp = { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 16px', color:'#e8e6f0', fontFamily:'DM Mono,monospace', fontSize:13, outline:'none', width:'100%' } as React.CSSProperties;
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:16, position:'relative', zIndex:1 }}>
      <div style={{ width:'100%', maxWidth:360 }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }} />
            <span style={{ fontFamily:'Fraunces,serif', fontSize:32, fontWeight:700, color:'var(--accent)', letterSpacing:-1 }}>pulse</span>
          </div>
          <p style={{ color:'var(--muted)', fontSize:13 }}>Welcome back.</p>
        </div>
        <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={inp} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={inp} />
          {error && <p style={{ color:'var(--accent2)', fontSize:12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ background:'var(--accent)', color:'#0d0d0f', border:'none', borderRadius:10, padding:12, fontFamily:'DM Mono,monospace', fontSize:13, fontWeight:500, cursor:'pointer', opacity:loading?0.7:1, marginTop:4 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign:'center', color:'var(--muted)', fontSize:12, marginTop:24 }}>
          No account? <Link href="/auth/signup" style={{ color:'var(--accent)' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

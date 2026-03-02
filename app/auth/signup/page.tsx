'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const supabase = createClient();
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { username: username.toLowerCase() }, emailRedirectTo: `${window.location.origin}/auth/callback` } });
    if (error) { setError(error.message); setLoading(false); }
    else setDone(true);
  }
  const inp = { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'12px 16px', color:'#e8e6f0', fontFamily:'DM Mono,monospace', fontSize:13, outline:'none', width:'100%' } as React.CSSProperties;
  if (done) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1, position:'relative' }}>
      <div style={{ textAlign:'center', maxWidth:360 }}>
        <div style={{ fontSize:48, marginBottom:16 }}>📬</div>
        <h2 style={{ fontFamily:'Fraunces,serif', fontSize:22, marginBottom:8, color:'#e8e6f0' }}>Check your email</h2>
        <p style={{ color:'var(--muted)', fontSize:13 }}>We sent a confirmation to <strong style={{ color:'#e8e6f0' }}>{email}</strong>.</p>
        <Link href="/auth/login" style={{ display:'inline-block', marginTop:24, color:'var(--accent)', fontSize:13 }}>Back to login →</Link>
      </div>
    </div>
  );
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:16, position:'relative', zIndex:1 }}>
      <div style={{ width:'100%', maxWidth:360 }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--accent)' }} />
            <span style={{ fontFamily:'Fraunces,serif', fontSize:32, fontWeight:700, color:'var(--accent)', letterSpacing:-1 }}>pulse</span>
          </div>
          <p style={{ color:'var(--muted)', fontSize:13 }}>Create your account.</p>
        </div>
        <form onSubmit={handleSignup} style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <input type="text" placeholder="username" value={username} onChange={e=>setUsername(e.target.value.replace(/[^a-z0-9_]/gi,''))} required minLength={3} style={inp} />
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={inp} />
          <input type="password" placeholder="Password (min 8 chars)" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} style={inp} />
          {error && <p style={{ color:'var(--accent2)', fontSize:12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ background:'var(--accent)', color:'#0d0d0f', border:'none', borderRadius:10, padding:12, fontFamily:'DM Mono,monospace', fontSize:13, fontWeight:500, cursor:'pointer', opacity:loading?0.7:1, marginTop:4 }}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign:'center', color:'var(--muted)', fontSize:12, marginTop:24 }}>
          Have an account? <Link href="/auth/login" style={{ color:'var(--accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

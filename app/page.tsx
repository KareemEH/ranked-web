'use client';

import { useEffect, useCallback, useState } from 'react';
import { PAIRS, TASTE_TOP_5 } from '@/lib/data';

const FS_ROW_A = [10, 24, 37, 52, 65, 78, 91, 104, 118];
const FS_ROW_B = [130, 145, 158, 172, 186, 200, 213, 227, 240];
const FS_ROW_C = [255, 268, 282, 295, 310, 324, 337, 351, 365];


export default function LandingPage() {
  const [matchIndex, setMatchIndex] = useState(0);
  const [picking, setPicking] = useState(false);
  const [winnerSide, setWinnerSide] = useState<'left' | 'right' | null>(null);
  const [loserSide, setLoserSide] = useState<'left' | 'right' | null>(null);
  const [picksUsed, setPicksUsed] = useState(0);
  const PICK_LIMIT = 5;
  const gated = picksUsed >= PICK_LIMIT;

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 90);
        });
      },
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pair = PAIRS[Math.min(matchIndex, PAIRS.length - 1)];

  const pickWinner = useCallback((side: 'left' | 'right') => {
    if (picking || gated) return;
    setPicking(true);
    setWinnerSide(side);
    setLoserSide(side === 'left' ? 'right' : 'left');
    setTimeout(() => {
      setMatchIndex(i => i + 1);
      setPicksUsed(n => n + 1);
      setWinnerSide(null);
      setLoserSide(null);
      setPicking(false);
    }, 900);
  }, [picking, gated]);

  const cardLeftClass = [
    'match-card card-left',
    winnerSide === 'left' ? 'winner' : '',
    loserSide === 'left' ? 'loser' : '',
  ].filter(Boolean).join(' ');

  const cardRightClass = [
    'match-card card-right',
    winnerSide === 'right' ? 'winner' : '',
    loserSide === 'right' ? 'loser' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">R</div>
          <span className="nav-logo-text">Ranked</span>
        </a>
        <div className="nav-links">
          <a className="nav-link" href="#hero">Home</a>
          <a className="nav-link" href="#how-it-works">How It Works</a>
          <a className="nav-link" href="#taste">Taste Profile</a>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <a href="#" className="nav-cta-ghost">Sign in</a>
          <a href="#" className="nav-cta">Sign up</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">· A head-to-head ranking engine ·</p>
          <h1 className="hero-headline">
            Every film.<br />
            Every game.<br />
            <span className="italic-gold">Every thing.</span><br />
            Ranked.
          </h1>
        </div>

        {/* Filmstrip background */}
        <div className="filmstrip" aria-hidden="true">
          {([
            [FS_ROW_A, 'fs-left'],
            [FS_ROW_B, 'fs-right fs-mid'],
            [FS_ROW_C, 'fs-left fs-slow'],
            [FS_ROW_A, 'fs-right'],
          ] as [number[], string][]).map(([row, dir], ri) => (
            <div className="fs-row" key={ri}>
              <div className={`fs-track ${dir}`}>
                {[...row, ...row, ...row, ...row].map((id, i) => (
                  <div className="fs-card" key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://picsum.photos/seed/${id}/300/450`} alt="" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hero-bottom">
          <p className="hero-sub">
            Ranked builds your definitive list through thousands of head&#8209;to&#8209;head choices. Pick between two favourites, watch your rankings evolve, and uncover what your taste really says about you.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Get started</a>
          </div>
        </div>

        <div className="cat-strip">
          <span className="cat-item">Movies</span><span className="cat-dot">·</span>
          <span className="cat-item">TV</span><span className="cat-dot">·</span>
          <span className="cat-item">Games</span><span className="cat-dot">·</span>
          <span className="cat-item">Books</span><span className="cat-dot">·</span>
          <span className="cat-item">Food</span><span className="cat-dot">·</span>
          <span className="cat-item hl">Everything</span>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section section-light" data-gated={gated}>
        <p className="section-eyebrow fade-up">How it works</p>
        <h2 className="section-headline fade-up">Two enter. <span className="gold">One wins.</span></h2>
        <p className="section-sub fade-up">Every match refines your rankings using ELO scoring. No overthinking — just gut instinct.</p>
        <div className="picks-progress fade-up">
          <div className="picks-progress-label">
            <span>{pair.categoryIcon}</span>
            <span className="picks-progress-category">{pair.category}</span>
            <span className="picks-progress-dot">·</span>
            <span className="picks-progress-category">{picksUsed} / {PICK_LIMIT}</span>
            <span className="picks-progress-hint">picks</span>
          </div>
          <div className="picks-progress-track">
            <div className="picks-progress-fill" style={{ width: `${(picksUsed / PICK_LIMIT) * 100}%` }} />
          </div>
        </div>

        <div className="match-arena fade-up" data-gated={gated}>
          <div className="match-glow" />
          <div className={cardLeftClass} onClick={() => pickWinner('left')}>
            <div className="card-bg" style={{ background: pair.left.cover?.grad ?? '#1a1a1a' }} />
            {pair.left.cover?.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="card-poster" src={pair.left.cover.img} alt={pair.left.name} />
            )}
            <div className="card-grad-overlay" />
            <div className="card-elo">{pair.left.elo}</div>
            <div className="card-title-label">{pair.left.name}</div>
            <div className="card-year-label">{pair.left.cover?.year}</div>
          </div>
          <div className="match-gate">
            <p className="match-gate-eyebrow">Your taste profile is taking shape</p>
            <h3 className="match-gate-headline">Keep ranking to see your results</h3>
            <p className="match-gate-sub">Sign up to save your picks and unlock your full taste profile.</p>
            <div className="match-gate-actions">
              <a href="#" className="match-gate-cta">Sign up free</a>
              <a href="#" className="match-gate-cta-ghost">Sign in</a>
            </div>
          </div>
          <div className="vs-label">VS</div>
          <div className={cardRightClass} onClick={() => pickWinner('right')}>
            <div className="card-bg" style={{ background: pair.right.cover?.grad ?? '#1a1a1a' }} />
            {pair.right.cover?.img && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="card-poster" src={pair.right.cover.img} alt={pair.right.name} />
            )}
            <div className="card-grad-overlay" />
            <div className="card-elo">{pair.right.elo}</div>
            <div className="card-title-label">{pair.right.name}</div>
            <div className="card-year-label">{pair.right.cover?.year}</div>
          </div>
        </div>

        <div className="elo-row fade-up">
          <span className="elo-score">{pair.left.elo}</span>
          <span className="elo-tag">
            ELO
            <span className="elo-info">
              <span className="elo-info-icon">?</span>
              <span className="elo-tooltip">
                ELO is a scoring system originally invented for chess. Every time you pick a winner, the winner gains points and the loser drops. Your rankings get smarter with every choice.
              </span>
            </span>
          </span>
          <span className="elo-score">{pair.right.elo}</span>
        </div>

        <div className="steps-row fade-up">
          <div className="step"><div className="step-num">01</div>Pick a category</div>
          <div className="step"><div className="step-num">02</div>Tap your winner</div>
          <div className="step"><div className="step-num">03</div>Get your taste profile</div>
        </div>
      </section>


      {/* TASTE PROFILE */}
      <section id="taste" className="section">
        <p className="section-eyebrow fade-up">The payoff</p>
        <h2 className="section-headline fade-up">Your taste, <span className="gold">explained.</span></h2>
        <p className="section-sub fade-up">After enough head-to-head matches, our algorithm automatically analyzes your picks and surfaces something you couldn&apos;t quite articulate yourself.</p>
        <div className="taste-card fade-up">
          <div className="taste-top-meta">
            <div className="taste-label">My Top Movies · Ranked</div>
          </div>
          <div className="taste-name">Alex&apos;s Taste Profile</div>
          <div className="taste-podium">
            {[1, 0, 2].map((dataIdx, displayIdx) => {
              const item = TASTE_TOP_5[dataIdx];
              const rank = [2, 1, 3][displayIdx];
              const medal = ['silver', 'gold', 'bronze'][displayIdx];
              return (
                <div className={`podium-slot rank-${rank}`} key={rank}>
                  <div className="podium-cover-wrap">
                    <div className="podium-cover" style={{ background: item.grad }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.title} />
                    </div>
                    <div className={`podium-medal ${medal}`}>{rank}</div>
                  </div>
                  <div className="podium-title">{item.title}</div>
                  <div className="podium-elo">{item.elo}</div>
                  <div className="podium-base" />
                </div>
              );
            })}
          </div>
          <div className="taste-also">
            <span className="taste-also-label">also in your top 5</span>
            <div className="taste-also-rows">
              {TASTE_TOP_5.slice(3).map((item, i) => (
                <div className="taste-also-row" key={i}>
                  <div className="taste-also-thumb" style={{ background: item.grad }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.title} />
                  </div>
                  <span className="taste-also-rank">#{i + 4}</span>
                  <span className="taste-also-name">{item.title}</span>
                  <span className="taste-also-elo">{item.elo}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="taste-summary">
            Three Nolan films in your top five. You reward directors who <em>trust complexity</em>.
            Parasite and Blade Runner 2049 fill in the rest: meticulous craft, worlds that feel inevitable.
            You want the idea to be <em>the spectacle</em>.
          </div>
        </div>
      </section>


      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="nav-logo-mark">R</div>
              <span className="footer-logo-text">Ranked</span>
            </div>
            <p className="footer-tagline">Your taste, ranked.</p>
            <span className="footer-version-badge">v0.1 BETA</span>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <a href="#how-it-works" className="footer-link">How It Works</a>
            <a href="#taste" className="footer-link">Taste Profile</a>
            <a href="#" className="footer-link">Sign Up</a>
            <a href="#" className="footer-link">Sign In</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Explore</div>
            <a href="#" className="footer-link">Movies</a>
            <a href="#" className="footer-link">TV Shows</a>
            <a href="#" className="footer-link">Games</a>
            <a href="#" className="footer-link">Books</a>
            <a href="#" className="footer-link">Albums</a>
          </div>

          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Use</a>
            <a href="#" className="footer-link">Cookie Policy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Ranked. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#" className="footer-bottom-link">Privacy</a>
            <a href="#" className="footer-bottom-link">Terms</a>
            <a href="#" className="footer-bottom-link">Cookies</a>
          </div>
        </div>
      </footer>
    </>
  );
}

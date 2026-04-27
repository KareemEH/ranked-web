'use client';

import { useEffect, useCallback, useState } from 'react';
import { PAIRS, LISTS, TASTE_TOP_5 } from '@/lib/data';

const FS_ROW_A = [10, 24, 37, 52, 65, 78, 91, 104, 118];
const FS_ROW_B = [130, 145, 158, 172, 186, 200, 213, 227, 240];
const FS_ROW_C = [255, 268, 282, 295, 310, 324, 337, 351, 365];


export default function LandingPage() {
  const [matchIndex, setMatchIndex] = useState(0);
  const [picking, setPicking] = useState(false);
  const [winnerSide, setWinnerSide] = useState<'left' | 'right' | null>(null);
  const [loserSide, setLoserSide] = useState<'left' | 'right' | null>(null);

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

  const pair = PAIRS[matchIndex % PAIRS.length];

  const pickWinner = useCallback((side: 'left' | 'right') => {
    if (picking) return;
    setPicking(true);
    setWinnerSide(side);
    setLoserSide(side === 'left' ? 'right' : 'left');
    setTimeout(() => {
      setMatchIndex(i => (i + 1) % PAIRS.length);
      setWinnerSide(null);
      setLoserSide(null);
      setPicking(false);
    }, 900);
  }, [picking]);

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
          <a className="nav-link active" href="#how-it-works">How It Works</a>
          <a className="nav-link" href="#trending">Trending Lists</a>
          <a className="nav-link" href="#taste">Taste Profile</a>
          <a className="nav-link" href="#community">Community</a>
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
      <section id="how-it-works" className="section section-light">
        <p className="section-eyebrow fade-up">How it works</p>
        <h2 className="section-headline fade-up">Two enter. <span className="gold">One wins.</span></h2>
        <p className="section-sub fade-up">Every match refines your rankings using ELO scoring. No overthinking — just gut instinct.</p>
        <p className="match-counter fade-up">MATCH {matchIndex * 2 + 23} / 60</p>

        <div className="match-arena fade-up">
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
          <span className="elo-tag">ELO</span>
          <span className="elo-score">{pair.right.elo}</span>
        </div>

        <div className="steps-row fade-up">
          <div className="step"><div className="step-num">01</div>Pick a category</div>
          <div className="step"><div className="step-num">02</div>Tap your winner</div>
          <div className="step"><div className="step-num">03</div>Get your taste profile</div>
        </div>
      </section>

      {/* TRENDING LISTS */}
      <section id="trending" className="section">
        <p className="section-eyebrow fade-up">Community rankings</p>
        <h2 className="section-headline fade-up">Trending <span className="gold">lists.</span></h2>
        <p className="section-sub fade-up">Jump into a ranked list built by the community. Add your votes, see where you stand.</p>
        <div className="trending-grid">
          {LISTS.map((list, i) => (
            <div className="list-card fade-up" key={i}>
              <div className="list-card-header">
                <div className="list-icon" style={{ background: list.color }}>{list.icon}</div>
                <div className="list-card-info">
                  <div className="list-card-title">{list.title}</div>
                  <div className="list-card-meta">{list.count} · {list.rankers} ranked</div>
                </div>
              </div>
              <div className="list-preview">
                {list.items.map((item, j) => (
                  <div className="list-preview-item" key={j}>
                    <span className="list-preview-num">{j + 1}</span>
                    <span className="list-preview-name">{item}</span>
                  </div>
                ))}
              </div>
              <div className="list-card-cta">Join the ranking →</div>
            </div>
          ))}
        </div>
      </section>

      {/* TASTE PROFILE */}
      <section id="taste" className="section section-light">
        <p className="section-eyebrow fade-up">The payoff</p>
        <h2 className="section-headline fade-up">Your taste, <span className="gold">explained.</span></h2>
        <p className="section-sub fade-up">After enough head-to-head matches, Claude analyzes your rankings and writes something you couldn&apos;t quite articulate yourself.</p>
        <div className="taste-card fade-up">
          <div className="taste-top-meta">
            <div className="taste-label">My Top Movies · Claude</div>
            <button className="taste-share">Share card ↗</button>
          </div>
          <div className="taste-name">Alex&apos;s Movie Rankings</div>
          <div className="taste-list">
            {TASTE_TOP_5.map((item, i) => (
              <div className="taste-item" key={i}>
                <div className="taste-mini-cover" style={{ background: item.grad }} />
                <span className="taste-rank">#{i + 1}</span>
                <span className="taste-item-name">{item.title}</span>
                <span className="taste-item-elo">{item.elo}</span>
              </div>
            ))}
          </div>
          <div className="taste-summary">
            You gravitate toward <em>slow-burn psychological storytelling</em> over spectacle.
            The titles that rise in your rankings share one quality: they trust silence.
            That says something about <em>how you think</em>, not just what you watch.
          </div>
        </div>
      </section>

      {/* SOCIAL SECTION */}
      <section id="community" className="section">
        <p className="section-eyebrow fade-up">Your profile</p>
        <h2 className="section-headline fade-up">Share your taste. <span className="gold">Compare with friends.</span></h2>
        <p className="section-sub fade-up">Your rankings become a profile. Share lists, discover taste twins, and see how you stack up.</p>
        <div className="social-layout fade-up">
          <div className="social-profile-card">
            <div className="profile-top">
              <div className="profile-avatar">A</div>
              <div className="profile-info">
                <div className="profile-name">Alex M.</div>
                <div className="profile-handle">@alexm · Ottawa</div>
                <div className="profile-badge">Slow-burn thriller enthusiast</div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="profile-stat"><span className="stat-num">847</span><span className="stat-lbl">ranked</span></div>
              <div className="profile-stat"><span className="stat-num">12</span><span className="stat-lbl">lists</span></div>
              <div className="profile-stat"><span className="stat-num">34</span><span className="stat-lbl">friends</span></div>
              <div className="profile-stat"><span className="stat-num">4</span><span className="stat-lbl">taste twins</span></div>
            </div>
            <div className="profile-lists-label">Pinned lists</div>
            <div className="profile-pinned">
              <div className="pinned-list"><span className="pinned-icon">🎬</span><span>My Top 50 Movies</span><span className="pinned-count">50 items</span></div>
              <div className="pinned-list"><span className="pinned-icon">🎮</span><span>Best Games Ever</span><span className="pinned-count">38 items</span></div>
              <div className="pinned-list"><span className="pinned-icon">📺</span><span>TV I Can&apos;t Stop</span><span className="pinned-count">22 items</span></div>
            </div>
            <button className="profile-share-btn">Share my profile ↗</button>
          </div>
          <div className="social-right">
            <div className="compare-card">
              <div className="compare-header">
                <span className="compare-title">Compare taste</span>
                <span className="compare-badge">New</span>
              </div>
              <div className="compare-avatars">
                <div className="compare-avatar you">A</div>
                <div className="compare-vs">vs</div>
                <div className="compare-avatar friend">J</div>
              </div>
              <div className="compare-result">
                <div className="compare-bar-wrap">
                  <div className="compare-bar-fill" style={{ width: '72%' }} />
                </div>
                <div className="compare-score"><strong>72%</strong> taste overlap with Jamie</div>
              </div>
              <div className="compare-diff">You both love <em>psychological thrillers</em> but disagree on sci-fi.</div>
              <button className="compare-btn">Find your taste twin →</button>
            </div>
            <div className="activity-feed">
              <div className="activity-feed-label">Friends&apos; activity</div>
              {[
                { av:'J', body: <><strong>Jamie</strong> ranked <em>Elden Ring</em> #1 in Best Games Ever</>, time:'2h' },
                { av:'S', body: <><strong>Sara</strong> created list <em>Top 50 Horror Films</em></>, time:'5h' },
                { av:'M', body: <><strong>Marcus</strong> agreed with your #1 pick: <em>There Will Be Blood</em></>, time:'1d' },
                { av:'L', body: <><strong>Lena</strong> challenged your ranking of <em>Inception</em></>, time:'2d' },
              ].map((item, i) => (
                <div className="activity-item" key={i}>
                  <div className="activity-av">{item.av}</div>
                  <div className="activity-body">{item.body}</div>
                  <div className="activity-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-cats">
          <span>Movies</span>·<span>TV</span>·<span>Games</span>·<span>Books</span>·<span>Albums</span>
        </div>
        <div className="footer-version">v0.1 BETA</div>
      </footer>
    </>
  );
}

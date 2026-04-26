'use client';

import { useEffect, useCallback, useState } from 'react';
import { PAIRS, LISTS, TASTE_TOP_5 } from '@/lib/data';

const FS_ROW_A = [
  { type: 'FILM', title: 'Blade Runner 2049', grad: 'linear-gradient(160deg,#1a0a2e,#3d1f5e,#6b3fa0)' },
  { type: 'GAME', title: 'Elden Ring',        grad: 'linear-gradient(160deg,#1a0f00,#3d2200,#7a4400)' },
  { type: 'TV',   title: 'The Sopranos',      grad: 'linear-gradient(160deg,#1a0808,#350f0f,#500808)' },
  { type: 'FILM', title: 'Interstellar',      grad: 'linear-gradient(160deg,#0a0a1a,#1a1a3e,#101050)' },
  { type: 'GAME', title: 'God of War',        grad: 'linear-gradient(160deg,#1a0000,#4a0808,#7a1010)' },
  { type: 'TV',   title: 'Chernobyl',         grad: 'linear-gradient(160deg,#1a1a0a,#2d2d1a,#404030)' },
  { type: 'FILM', title: 'Dune',              grad: 'linear-gradient(160deg,#2a1800,#5e3800,#8a5500)' },
  { type: 'GAME', title: 'Hollow Knight',     grad: 'linear-gradient(160deg,#08080a,#141428,#1e1e40)' },
  { type: 'TV',   title: 'Severance',         grad: 'linear-gradient(160deg,#0a1a14,#1a3828,#205040)' },
];

const FS_ROW_B = [
  { type: 'FILM', title: 'The Dark Knight',   grad: 'linear-gradient(160deg,#0d0d0d,#1a1a2e,#2e3060)' },
  { type: 'TV',   title: 'Breaking Bad',      grad: 'linear-gradient(160deg,#1a2800,#3d5e00,#5a8800)' },
  { type: 'GAME', title: 'The Last of Us',    grad: 'linear-gradient(160deg,#0d1a0a,#1e3d14,#305a20)' },
  { type: 'FILM', title: 'Parasite',          grad: 'linear-gradient(160deg,#181818,#2a2a2a,#3d3d3d)' },
  { type: 'TV',   title: 'Succession',        grad: 'linear-gradient(160deg,#141414,#2a2a2a,#3a3a3a)' },
  { type: 'GAME', title: 'Disco Elysium',     grad: 'linear-gradient(160deg,#0a0a20,#1a1a50,#2a2a80)' },
  { type: 'FILM', title: 'Moonlight',         grad: 'linear-gradient(160deg,#1a0a3e,#3d1f7a,#5a30a0)' },
  { type: 'TV',   title: 'True Detective',    grad: 'linear-gradient(160deg,#0a0a0a,#1a1a14,#2a2818)' },
  { type: 'GAME', title: 'Hades',             grad: 'linear-gradient(160deg,#2a0a1a,#5e1a3e,#8a2060)' },
];

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
        <a href="#" className="nav-cta">Start ranking →</a>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">· A head-to-head ranking engine ·</p>
          <h1 className="hero-headline">
            Every film.<br />
            Every album.<br />
            <span className="italic-gold">Every game</span>
            you&apos;ve loved.
          </h1>
        </div>

        {/* Filmstrip rows */}
        <div className="filmstrip" aria-hidden="true">
          <div className="fs-row">
            <div className="fs-track fs-left">
              {[...FS_ROW_A, ...FS_ROW_A].map((item, i) => (
                <div className="fs-card" key={i} style={{ background: item.grad }}>
                  <div className="fs-card-overlay" />
                  <div className="fs-card-body">
                    <div className="fs-type">{item.type}</div>
                    <div className="fs-title">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="fs-row">
            <div className="fs-track fs-right">
              {[...FS_ROW_B, ...FS_ROW_B].map((item, i) => (
                <div className="fs-card" key={i} style={{ background: item.grad }}>
                  <div className="fs-card-overlay" />
                  <div className="fs-card-body">
                    <div className="fs-type">{item.type}</div>
                    <div className="fs-title">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <p className="hero-sub">
            Ranked builds your definitive list through thousands of tiny, honest choices.
            Then Claude reads it back to you — and tells you something about yourself you didn&apos;t know.
          </p>
          <div className="hero-buttons">
            <a href="#" className="btn-primary">Build your first list →</a>
            <a href="#taste" className="btn-secondary">See a sample profile</a>
          </div>
        </div>

        <div className="cat-strip">
          <span className="cat-item">Movies</span><span className="cat-dot">·</span>
          <span className="cat-item">TV</span><span className="cat-dot">·</span>
          <span className="cat-item">Games</span><span className="cat-dot">·</span>
          <span className="cat-item">Books</span><span className="cat-dot">·</span>
          <span className="cat-item">Albums</span><span className="cat-dot">·</span>
          <span className="cat-item hl">Anything</span>
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
            <div className="card-grad-overlay" />
            <div className="card-elo">{pair.left.elo}</div>
            <div className="card-title-label">{pair.left.name}</div>
            <div className="card-year-label">{pair.left.cover?.year}</div>
          </div>
          <div className="vs-label">VS</div>
          <div className={cardRightClass} onClick={() => pickWinner('right')}>
            <div className="card-bg" style={{ background: pair.right.cover?.grad ?? '#1a1a1a' }} />
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

      {/* SOCIAL SECTION */}
      <section id="community" className="section section-light">
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

      {/* TASTE PROFILE */}
      <section id="taste" className="section">
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

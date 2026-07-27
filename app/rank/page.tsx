'use client';
import { useState, useCallback } from 'react';
import Nav from '@/components/Nav';
import { RANK_ITEMS, RankItem } from '@/lib/data';

const CATS = [
  { id: 'movie', label: 'Movies',   icon: '🎬', desc: 'Films, directors, performances' },
  { id: 'tv',    label: 'TV Shows', icon: '📺', desc: 'Series, seasons, pilots' },
  { id: 'game',  label: 'Games',    icon: '🎮', desc: 'Titles, franchises, studios' },
  { id: 'book',  label: 'Books',    icon: '📚', desc: 'Novels, series, authors' },
  { id: 'food',  label: 'Food',     icon: '🍕', desc: 'Dishes, cuisines, restaurants' },
  { id: 'music', label: 'Music',    icon: '🎵', desc: 'Albums, artists, songs' },
];

function calcElo(winnerElo: number, loserElo: number) {
  const K = 32;
  const ea = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
  return {
    winner: Math.round(winnerElo + K * (1 - ea)),
    loser:  Math.round(loserElo  + K * (0 - ea)),
  };
}

function pickPair(items: RankItem[], recent: Set<string>): [RankItem, RankItem] {
  for (let i = 0; i < 60; i++) {
    const a = items[Math.floor(Math.random() * items.length)];
    const b = items[Math.floor(Math.random() * items.length)];
    if (a.id === b.id) continue;
    if (!recent.has([a.id, b.id].sort().join('|'))) return [a, b];
  }
  return [items[0], items[1]];
}

export default function RankPage() {
  const [view, setView]             = useState<'cats' | 'rank'>('cats');
  const [catId, setCatId]           = useState('');
  const [items, setItems]           = useState<RankItem[]>([]);
  const [pair, setPair]             = useState<[RankItem, RankItem] | null>(null);
  const [recent, setRecent]         = useState<Set<string>>(new Set());
  const [matchCount, setMatchCount] = useState(0);
  const [picking, setPicking]       = useState(false);
  const [winSide, setWinSide]       = useState<'left' | 'right' | null>(null);
  const [loseSide, setLoseSide]     = useState<'left' | 'right' | null>(null);
  const [delta, setDelta]           = useState<number | null>(null);

  const openCat = useCallback((type: string) => {
    const pool = RANK_ITEMS.filter(i => i.type === type).map(i => ({ ...i }));
    setCatId(type);
    setItems(pool);
    setMatchCount(0);
    const r = new Set<string>();
    setRecent(r);
    setPair(pickPair(pool, r));
    setView('rank');
  }, []);

  const pick = useCallback((side: 'left' | 'right') => {
    if (picking || !pair) return;
    const [L, R] = pair;
    const winner = side === 'left' ? L : R;
    const loser  = side === 'left' ? R : L;
    const { winner: wElo, loser: lElo } = calcElo(winner.elo, loser.elo);
    const gain = wElo - winner.elo;

    setPicking(true);
    setWinSide(side);
    setLoseSide(side === 'left' ? 'right' : 'left');
    setDelta(gain);

    setTimeout(() => {
      const updated = items.map(it => {
        if (it.id === winner.id) return { ...it, elo: wElo };
        if (it.id === loser.id)  return { ...it, elo: lElo };
        return it;
      });
      const key = [L.id, R.id].sort().join('|');
      const r = new Set([...recent, key]);
      if (r.size > 12) {
        const arr = [...r]; arr.splice(0, arr.length - 10);
        r.clear(); arr.forEach(k => r.add(k));
      }
      setItems(updated);
      setRecent(r);
      setPair(pickPair(updated, r));
      setMatchCount(n => n + 1);
      setPicking(false);
      setWinSide(null);
      setLoseSide(null);
      setDelta(null);
    }, 850);
  }, [picking, pair, items, recent]);

  const cat  = CATS.find(c => c.id === catId);
  const board = [...items].sort((a, b) => b.elo - a.elo);

  if (view === 'cats') {
    return (
      <>
        <Nav />
        <div className="rank-cats-page">
          <div className="rank-cats-header">
            <p className="section-eyebrow">Start ranking</p>
            <h1 className="rank-cats-title">What are you ranking today?</h1>
            <p className="rank-cats-sub">Pick a category and start making calls.</p>
          </div>
          <div className="rank-cats-grid">
            {CATS.map(c => (
              <button key={c.id} className="rank-cat-card" onClick={() => openCat(c.id)}>
                <span className="rank-cat-icon">{c.icon}</span>
                <span className="rank-cat-label">{c.label}</span>
                <span className="rank-cat-desc">{c.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="rank-page">
        {/* Left: category switcher */}
        <aside className="rank-sidebar">
          <p className="rank-sidebar-lbl">Category</p>
          {CATS.map(c => (
            <button
              key={c.id}
              className={`rank-sidebar-btn${c.id === catId ? ' active' : ''}`}
              onClick={() => openCat(c.id)}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </aside>

        {/* Center: match arena */}
        <main className="rank-main">
          <div className="rank-main-header">
            <span className="rank-main-cat">{cat?.icon} {cat?.label}</span>
            <span className="rank-main-count">{matchCount} {matchCount === 1 ? 'match' : 'matches'}</span>
          </div>

          {pair && (
            <>
              <div className="rank-arena">
                {/* Left card */}
                <div
                  className={`rank-card rank-card-l${winSide === 'left' ? ' winner' : ''}${loseSide === 'left' ? ' loser' : ''}`}
                  onClick={() => pick('left')}
                >
                  <div className="rank-card-bg" style={{ background: pair[0].grad }} />
                  {pair[0].img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="rank-card-poster" src={pair[0].img} alt={pair[0].name} />
                  )}
                  <div className="rank-card-overlay" />
                  <div className="rank-card-elo">{pair[0].elo}</div>
                  <div className="rank-card-name">{pair[0].name}</div>
                  {pair[0].year && <div className="rank-card-year">{pair[0].year}</div>}
                  {winSide === 'left' && delta !== null && (
                    <div className="rank-card-delta">+{delta}</div>
                  )}
                </div>

                <div className="rank-vs">VS</div>

                {/* Right card */}
                <div
                  className={`rank-card rank-card-r${winSide === 'right' ? ' winner' : ''}${loseSide === 'right' ? ' loser' : ''}`}
                  onClick={() => pick('right')}
                >
                  <div className="rank-card-bg" style={{ background: pair[1].grad }} />
                  {pair[1].img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="rank-card-poster" src={pair[1].img} alt={pair[1].name} />
                  )}
                  <div className="rank-card-overlay" />
                  <div className="rank-card-elo">{pair[1].elo}</div>
                  <div className="rank-card-name">{pair[1].name}</div>
                  {pair[1].year && <div className="rank-card-year">{pair[1].year}</div>}
                  {winSide === 'right' && delta !== null && (
                    <div className="rank-card-delta">+{delta}</div>
                  )}
                </div>
              </div>
              <p className="rank-hint">Tap your favourite to rank it higher</p>
            </>
          )}
        </main>

        {/* Right: live leaderboard */}
        <aside className="rank-leaderboard">
          <p className="rank-sidebar-lbl">Your Rankings</p>
          <div className="rank-lb">
            {board.map((item, i) => (
              <div key={item.id} className="rank-lb-row">
                <span className={`rank-lb-pos${i < 3 ? ' top' : ''}`}>{i + 1}</span>
                <div className="rank-lb-cover" style={{ background: item.grad }}>
                  {item.img && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.img} alt="" />
                  )}
                </div>
                <span className="rank-lb-name">{item.name}</span>
                <span className="rank-lb-elo">{item.elo}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}

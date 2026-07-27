'use client';
import { useState } from 'react';
import Nav from '@/components/Nav';
import { LISTS } from '@/lib/data';

const FILTERS = [
  { id: 'all',    label: 'All' },
  { id: 'movie',  label: 'Movies' },
  { id: 'game',   label: 'Games' },
  { id: 'tv',     label: 'TV' },
  { id: 'food',   label: 'Food' },
  { id: 'music',  label: 'Music' },
];

const LIST_TYPES: Record<string, string> = {
  '🎬': 'movie', '🎮': 'game', '📺': 'tv',
  '🍔': 'food',  '🎵': 'music', '🏆': 'movie',
};

// Extended list data
const ALL_LISTS = [
  ...LISTS,
  { icon:'📚', color:'linear-gradient(135deg,#080810,#101028)', title:'Top 100 Novels of All Time',     count:'100 books',  rankers:'6.2k',  items:['1984','Lord of the Rings','Crime and Punishment'] },
  { icon:'🎵', color:'linear-gradient(135deg,#080810,#080840)', title:'Greatest Albums Ever Made',       count:'200 albums', rankers:'8.9k',  items:['Dark Side of the Moon','Abbey Road','Kind of Blue'] },
  { icon:'🍕', color:'linear-gradient(135deg,#5a0a00,#9e1a00)', title:'Best Cuisines in the World',     count:'50 cuisines',rankers:'31.2k', items:['Japanese','Italian','Indian'] },
  { icon:'🎬', color:'linear-gradient(135deg,#0a1628,#2a5a8a)', title:'Mind-Bending Sci-Fi Films',      count:'100 films',  rankers:'12.1k', items:['Inception','Blade Runner 2049','Interstellar'] },
  { icon:'🎮', color:'linear-gradient(135deg,#2a0a1a,#8a2060)', title:'Best Indie Games of the Decade', count:'75 games',   rankers:'5.4k',  items:['Hollow Knight','Disco Elysium','Hades'] },
  { icon:'📺', color:'linear-gradient(135deg,#1a0a3e,#5a30a0)', title:'Peak TV: Drama Edition',         count:'150 shows',  rankers:'19.7k', items:['The Sopranos','The Wire','Breaking Bad'] },
];

export default function ListsPage() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<number | null>(null);

  const visible = filter === 'all'
    ? ALL_LISTS
    : ALL_LISTS.filter(l => LIST_TYPES[l.icon] === filter);

  return (
    <>
      <Nav />
      <div className="lists-page">
        <div className="lists-header">
          <p className="section-eyebrow">Community</p>
          <h1 className="lists-title">Discover Lists</h1>
          <p className="lists-sub">The internet has spoken. These are the rankings that matter.</p>
        </div>

        <div className="lists-filters">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`list-filter-btn${filter === f.id ? ' active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="lists-grid">
          {visible.map((list, i) => (
            <div
              key={i}
              className={`list-card${expanded === i ? ' expanded' : ''}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="list-card-header">
                <div className="list-card-icon" style={{ background: list.color }}>
                  {list.icon}
                </div>
                <div className="list-card-meta">
                  <div className="list-card-title">{list.title}</div>
                  <div className="list-card-count">{list.count}</div>
                </div>
              </div>
              <div className="list-card-items">
                {list.items.map((item, j) => (
                  <div key={j} className="list-card-item">
                    <span className="list-card-rank">#{j + 1}</span>
                    <span className="list-card-item-name">{item}</span>
                  </div>
                ))}
                {expanded === i && (
                  <div className="list-card-expanded-hint">
                    <span>Full list has {list.count}</span>
                  </div>
                )}
              </div>
              <div className="list-card-footer">
                <span className="list-card-rankers">{list.rankers} rankers</span>
                <span className="list-card-cta">View full list →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

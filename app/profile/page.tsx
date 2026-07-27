'use client';
import { useState } from 'react';
import Nav from '@/components/Nav';
import { RANK_ITEMS } from '@/lib/data';

const PROFILE_CATS = [
  { id: 'movie', label: 'Movies',   icon: '🎬' },
  { id: 'tv',    label: 'TV Shows', icon: '📺' },
  { id: 'game',  label: 'Games',    icon: '🎮' },
  { id: 'book',  label: 'Books',    icon: '📚' },
  { id: 'food',  label: 'Food',     icon: '🍕' },
  { id: 'music', label: 'Music',    icon: '🎵' },
];

const AI_ANALYSIS: Record<string, string> = {
  movie: 'Three Nolan films in your top five. You reward directors who trust complexity. Parasite and Blade Runner 2049 fill in the rest: meticulous craft, worlds that feel inevitable. You want the idea to be the spectacle.',
  tv:    'The Sopranos at the top tells us everything. You are drawn to television that refuses to redeem its characters. Breaking Bad and The Wire reinforce it: consequence matters more to you than comfort.',
  game:  'Elden Ring winning out is a statement. You value challenge as a form of storytelling. The Last of Us and God of War round out a taste for games where the world pushes back. You do not want to feel safe.',
  book:  'Lord of the Rings and Dune side by side: you are a world-builder at heart. You want fiction that earns its scope. Crime and Punishment is the outlier that explains everything — you want interiority too.',
  food:  'Burgers over steak is a confidence move. You are not performing sophistication. Tacos and ramen point at the same thing: you want maximum flavour per square inch. You eat like someone who knows what they like.',
  music: "Dark Side of the Moon and Abbey Road at the top — you respect craft that ages. To Pimp a Butterfly in the mix is the tell: you are not just nostalgic. You want albums that are arguments.",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('movie');

  const ranked = RANK_ITEMS
    .filter(i => i.type === activeTab)
    .sort((a, b) => b.elo - a.elo);

  const top3    = [ranked[1], ranked[0], ranked[2]]; // podium order: 2nd, 1st, 3rd
  const rest    = ranked.slice(3);
  const medals  = ['silver', 'gold', 'bronze'];
  const ranks   = [2, 1, 3];

  const totalMatches = 312;

  return (
    <>
      <Nav />
      <div className="profile-page">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">A</div>
          <div>
            <div className="profile-name">Alex&apos;s Profile</div>
            <div className="profile-stats">{totalMatches} matches across 6 categories</div>
          </div>
          <a href="/signup" className="btn-primary" style={{ marginLeft: 'auto' }}>Share profile</a>
        </div>

        {/* Category tabs */}
        <div className="profile-tabs">
          {PROFILE_CATS.map(c => (
            <button
              key={c.id}
              className={`profile-tab${activeTab === c.id ? ' active' : ''}`}
              onClick={() => setActiveTab(c.id)}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {/* Podium top 3 */}
        {ranked.length >= 3 && (
          <div className="taste-card" style={{ marginBottom: 24 }}>
            <div className="taste-top-meta">
              <div className="taste-label">
                {PROFILE_CATS.find(c => c.id === activeTab)?.icon} My Top {PROFILE_CATS.find(c => c.id === activeTab)?.label} · Ranked
              </div>
            </div>
            <div className="taste-name">Alex&apos;s Taste Profile</div>

            <div className="taste-podium">
              {top3.map((item, displayIdx) => item && (
                <div className={`podium-slot rank-${ranks[displayIdx]}`} key={displayIdx}>
                  <div className="podium-cover-wrap">
                    <div className="podium-cover" style={{ background: item.grad }}>
                      {item.img && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.img} alt={item.name} />
                      )}
                    </div>
                    <div className={`podium-medal ${medals[displayIdx]}`}>{ranks[displayIdx]}</div>
                  </div>
                  <div className="podium-title">{item.name}</div>
                  <div className="podium-elo">{item.elo}</div>
                  <div className="podium-base" />
                </div>
              ))}
            </div>

            {rest.length > 0 && (
              <div className="taste-also">
                <span className="taste-also-label">also in your top {Math.min(ranked.length, 10)}</span>
                <div className="taste-also-rows">
                  {rest.slice(0, 7).map((item, i) => (
                    <div className="taste-also-row" key={item.id}>
                      <div className="taste-also-thumb" style={{ background: item.grad }}>
                        {item.img && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.img} alt={item.name} />
                        )}
                      </div>
                      <span className="taste-also-rank">#{i + 4}</span>
                      <span className="taste-also-name">{item.name}</span>
                      <span className="taste-also-elo">{item.elo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="taste-summary">
              {AI_ANALYSIS[activeTab]}
            </div>
          </div>
        )}

        {/* Full ranked list */}
        <div className="profile-full-list">
          <p className="profile-list-label">Full Rankings ({ranked.length} items)</p>
          {ranked.map((item, i) => (
            <div key={item.id} className="profile-list-row">
              <span className={`profile-list-rank${i < 3 ? ' top3' : ''}`}>{i + 1}</span>
              <div className="profile-list-cover" style={{ background: item.grad }}>
                {item.img && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.img} alt={item.name} />
                )}
              </div>
              <div className="profile-list-info">
                <span className="profile-list-name">{item.name}</span>
                {item.year && <span className="profile-list-year">{item.year}</span>}
              </div>
              <span className="profile-list-elo">{item.elo}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

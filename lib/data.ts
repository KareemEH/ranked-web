export interface Cover {
  type: string;
  title: string;
  year: string;
  img: string;
  grad: string;
}

export const COVERS: Cover[] = [
  { type:'movie', title:'Blade Runner 2049',       year:'2017', img:'https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png',           grad:'linear-gradient(160deg,#1a0a2e,#3d1f5e,#6b3fa0)' },
  { type:'movie', title:'The Dark Knight',         year:'2008', img:'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg',    grad:'linear-gradient(160deg,#0d0d0d,#1a1a2e,#2e3060)' },
  { type:'movie', title:'Parasite',                year:'2019', img:'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png',           grad:'linear-gradient(160deg,#181818,#2a2a2a,#3d3d3d)' },
  { type:'movie', title:'Inception',               year:'2010', img:'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg', grad:'linear-gradient(160deg,#0a1628,#1e3a5f,#2a5a8a)' },
  { type:'movie', title:'Interstellar',            year:'2014', img:'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',           grad:'linear-gradient(160deg,#0a0a1a,#1a1a3e,#101050)' },
  { type:'movie', title:'Dune',                    year:'2021', img:'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg',               grad:'linear-gradient(160deg,#2a1800,#5e3800,#8a5500)' },
  { type:'movie', title:'Pulp Fiction',            year:'1994', img:'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_fiction.jpg',                       grad:'linear-gradient(160deg,#3d0000,#7a1a1a,#a02020)' },
  { type:'movie', title:'No Country',              year:'2007', img:'https://upload.wikimedia.org/wikipedia/en/3/3b/No_Country_for_Old_Men_poster.jpg',      grad:'linear-gradient(160deg,#1a0f00,#3d2800,#6a4a10)' },
  { type:'movie', title:'The Godfather',           year:'1972', img:'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',                     grad:'linear-gradient(160deg,#1a0800,#3d1800,#602800)' },
  { type:'movie', title:'Moonlight',               year:'2016', img:'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Moonlight_%282016_film%29.png/220px-Moonlight_%282016_film%29.png', grad:'linear-gradient(160deg,#1a0a3e,#3d1f7a,#5a30a0)' },
  { type:'movie', title:'Everything Everywhere',   year:'2022', img:'https://upload.wikimedia.org/wikipedia/en/b/b3/Everything_Everywhere_All_at_Once.jpg',  grad:'linear-gradient(160deg,#2a0a1a,#602040,#c04060)' },
  { type:'movie', title:'There Will Be Blood',     year:'2007', img:'https://upload.wikimedia.org/wikipedia/en/b/b8/There_will_be_blood_ver2.jpg',           grad:'linear-gradient(160deg,#2a1000,#6a2800,#8a3800)' },
  { type:'movie', title:'Mulholland Drive',        year:'2001', img:'https://upload.wikimedia.org/wikipedia/en/d/d1/Mulholland_Drive_poster.jpg',            grad:'linear-gradient(160deg,#0a001a,#200050,#3d0080)' },
  { type:'movie', title:'The Tree of Life',        year:'2011', img:'https://upload.wikimedia.org/wikipedia/en/7/7c/The_Tree_of_Life_poster.jpg',            grad:'linear-gradient(160deg,#001020,#002840,#004060)' },
  { type:'tv',    title:'Breaking Bad',            year:'2008', img:'https://upload.wikimedia.org/wikipedia/en/9/9c/Breaking_Bad_Season_1_Promotional_Poster.jpg', grad:'linear-gradient(160deg,#1a2800,#3d5e00,#5a8800)' },
  { type:'tv',    title:'Succession',              year:'2018', img:'https://upload.wikimedia.org/wikipedia/en/a/a0/Succession_season_4_promo_image.png',    grad:'linear-gradient(160deg,#141414,#2a2a2a,#3a3a3a)' },
  { type:'tv',    title:'Chernobyl',               year:'2019', img:'https://upload.wikimedia.org/wikipedia/en/b/b3/Chernobyl_Title_Card.jpg',               grad:'linear-gradient(160deg,#1a1a0a,#2d2d1a,#404030)' },
  { type:'tv',    title:'True Detective',          year:'2014', img:'https://upload.wikimedia.org/wikipedia/en/5/fifty/True_Detective_Season_1.jpg',         grad:'linear-gradient(160deg,#0a0a0a,#1a1a14,#2a2818)' },
  { type:'tv',    title:'The Sopranos',            year:'1999', img:'https://upload.wikimedia.org/wikipedia/en/2/26/The_Sopranos.jpg',                       grad:'linear-gradient(160deg,#1a0808,#350f0f,#500808)' },
  { type:'tv',    title:'The Wire',                year:'2002', img:'https://upload.wikimedia.org/wikipedia/en/e/ed/The_Wire_Season_1_DVD.jpg',              grad:'linear-gradient(160deg,#0a0f00,#1a2800,#2a3a00)' },
  { type:'game',  title:'Elden Ring',              year:'2022', img:'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',                 grad:'linear-gradient(160deg,#1a0f00,#3d2200,#7a4400)' },
  { type:'game',  title:'The Last of Us',          year:'2013', img:'https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg', grad:'linear-gradient(160deg,#0d1a0a,#1e3d14,#305a20)' },
  { type:'game',  title:'God of War',              year:'2018', img:'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg',                 grad:'linear-gradient(160deg,#1a0000,#4a0808,#7a1010)' },
  { type:'game',  title:'Hades',                   year:'2020', img:'https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg',                    grad:'linear-gradient(160deg,#2a0a1a,#5e1a3e,#8a2060)' },
  { type:'game',  title:'Cyberpunk 2077',          year:'2020', img:'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',             grad:'linear-gradient(160deg,#020d1a,#0a243a,#0a3a5e)' },
  { type:'game',  title:'Hollow Knight',           year:'2017', img:'https://upload.wikimedia.org/wikipedia/en/7/70/Hollow_Knight_artwork.webp',            grad:'linear-gradient(160deg,#08080a,#141428,#1e1e40)' },
  { type:'game',  title:'Red Dead 2',              year:'2018', img:'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',             grad:'linear-gradient(160deg,#1a0808,#3d1010,#6a1818)' },
  { type:'game',  title:'Disco Elysium',           year:'2019', img:'https://upload.wikimedia.org/wikipedia/en/8/8c/Disco_Elysium_cover_art.jpg',            grad:'linear-gradient(160deg,#0a0a20,#1a1a50,#2a2a80)' },
  { type:'game',  title:'Zelda: TotK',             year:'2023', img:'https://upload.wikimedia.org/wikipedia/en/2/22/The_Legend_of_Zelda_Tears_of_the_Kingdom_cover.jpg', grad:'linear-gradient(160deg,#001a10,#004428,#006040)' },
  { type:'game',  title:'Ghost of Tsushima',       year:'2020', img:'https://upload.wikimedia.org/wikipedia/en/b/b2/Ghost_of_Tsushima_cover_art.jpg',        grad:'linear-gradient(160deg,#1a0a00,#4a2200,#d44000)' },
  { type:'tv',    title:'Severance',               year:'2022', img:'https://upload.wikimedia.org/wikipedia/en/e/e7/Severance_Apple_TV.jpg',                 grad:'linear-gradient(160deg,#0a1a14,#1a3828,#205040)' },
  { type:'tv',    title:'The Bear',                year:'2022', img:'https://upload.wikimedia.org/wikipedia/en/3/36/The_Bear_TV_series.jpg',                 grad:'linear-gradient(160deg,#1a0a00,#3a1800,#602800)' },
];

export interface MatchEntry {
  name: string;
  elo: number;
  type: string;
  cover: Cover | undefined;
}

const raw: [string, number, string][] = [
  ['Pulp Fiction',        1284, 'movie'],
  ['Moonlight',           1130, 'movie'],
  ['The Dark Knight',     1412, 'movie'],
  ['Parasite',            1356, 'movie'],
  ['Elden Ring',          1420, 'game'],
  ['Breaking Bad',        1402, 'tv'],
  ['Interstellar',        1376, 'movie'],
  ['God of War',          1370, 'game'],
  ['Succession',          1330, 'tv'],
  ['Dune',                1320, 'movie'],
  ['Severance',           1318, 'tv'],
  ['Hades',               1295, 'game'],
  ['Inception',           1398, 'movie'],
  ['The Last of Us',      1380, 'game'],
  ['No Country',          1344, 'movie'],
  ['Red Dead 2',          1365, 'game'],
  ['Chernobyl',           1360, 'tv'],
  ['Ghost of Tsushima',   1288, 'game'],
  ['Disco Elysium',       1310, 'game'],
  ['The Sopranos',        1420, 'tv'],
];

export const MATCHES: MatchEntry[] = raw.map(([name, elo, type]) => ({
  name,
  elo,
  type,
  cover: COVERS.find(c => c.title === name),
}));

export interface Pair {
  left: MatchEntry;
  right: MatchEntry;
  category: string;
  categoryIcon: string;
}

const m = (title: string): MatchEntry => ({
  name: title,
  elo: MATCHES.find(e => e.name === title)?.elo ?? 1300,
  type: MATCHES.find(e => e.name === title)?.type ?? 'movie',
  cover: COVERS.find(c => c.title === title),
});

export const PAIRS: Pair[] = [
  {
    category: 'Movies', categoryIcon: '🎬',
    left:  m('Pulp Fiction'),
    right: m('The Dark Knight'),
  },
  {
    category: 'TV Shows', categoryIcon: '📺',
    left:  m('Breaking Bad'),
    right: m('The Sopranos'),
  },
  {
    category: 'Games', categoryIcon: '🎮',
    left:  m('Elden Ring'),
    right: m('The Last of Us'),
  },
  {
    category: 'Food', categoryIcon: '🍕',
    left:  { name: 'Pizza',       elo: 1374, type: 'food', cover: { type:'food', title:'Pizza',       year:'', img:'', grad:'linear-gradient(160deg,#5a0a00,#9e1a00,#c83200)' } },
    right: { name: 'Sushi',       elo: 1291, type: 'food', cover: { type:'food', title:'Sushi',       year:'', img:'', grad:'linear-gradient(160deg,#001428,#00244a,#003d6e)' } },
  },
  {
    category: 'Books', categoryIcon: '📚',
    left:  { name: '1984',        elo: 1348, type: 'book', cover: { type:'book', title:'1984',        year:'1949', img:'', grad:'linear-gradient(160deg,#080810,#101028,#181840)' } },
    right: { name: 'Harry Potter',elo: 1316, type: 'book', cover: { type:'book', title:'Harry Potter',year:'1997', img:'', grad:'linear-gradient(160deg,#1a0838,#3d1078,#6020b8)' } },
  },
];

export interface TrendingList {
  icon: string;
  color: string;
  title: string;
  count: string;
  rankers: string;
  items: string[];
}

export const LISTS: TrendingList[] = [
  { icon:'🎬', color:'linear-gradient(135deg,#3d1800,#7a3000)', title:'Top 500 Rated Movies',      count:'500 films',  rankers:'18.2k', items:['The Godfather','The Dark Knight','Schindler\'s List'] },
  { icon:'🎮', color:'linear-gradient(135deg,#001a10,#004428)', title:'Top 500 PC Games',           count:'500 games',  rankers:'9.7k',  items:['Half-Life 2','Elden Ring','Disco Elysium'] },
  { icon:'📺', color:'linear-gradient(135deg,#141414,#2a2a2a)', title:'Top 500 Comedy TV Shows',    count:'500 shows',  rankers:'7.1k',  items:['Seinfeld','Arrested Development','Fleabag'] },
  { icon:'🍔', color:'linear-gradient(135deg,#2a1000,#5e2800)', title:'Top 100 Fast Food Chains',   count:'100 chains', rankers:'24.5k', items:['In-N-Out Burger','Chipotle','Shake Shack'] },
  { icon:'🎵', color:'linear-gradient(135deg,#1a0a3e,#3d1f7a)', title:'Top 500 Albums of All Time', count:'500 albums', rankers:'11.3k', items:['Kind of Blue','OK Computer','The Dark Side of the Moon'] },
  { icon:'🏆', color:'linear-gradient(135deg,#1a0808,#3d1010)', title:'Top 250 Action Films',       count:'250 films',  rankers:'14.8k', items:['Mad Max: Fury Road','The Raid','Die Hard'] },
];

export const TASTE_TOP_5: { grad: string; title: string; elo: number }[] = [
  { grad:'linear-gradient(160deg,#1a0f00,#3d2200,#7a4400)', title:'Elden Ring',        elo:1420 },
  { grad:'linear-gradient(160deg,#0d0d0d,#1a1a2e,#2e3060)', title:'The Dark Knight',   elo:1412 },
  { grad:'linear-gradient(160deg,#0a0a1a,#1a1a3e,#101050)', title:'Interstellar',      elo:1376 },
  { grad:'linear-gradient(160deg,#181818,#2a2a2a,#3d3d3d)', title:'Parasite',          elo:1356 },
  { grad:'linear-gradient(160deg,#1a2800,#3d5e00,#5a8800)', title:'Breaking Bad',      elo:1402 },
];

// メインの3本（自信のある順）
const WORKS = [
  {
    id: "0QFnn4Zwbas",
    title: "近未来怪談",
    en: "Near-Future Ghost Stories",
    genre: "SFホラーコメディ",
    meta: ["SFホラーコメディ", "約20分", "2026年"],
    text: "舞台は、AIやロボットが暮らしに溶け込んだ10〜20年後の日本。呪いのビデオ、呪いのメールと時代ごとに形を変えてきた「呪い」は、この未来でどんな姿になるのか。「AI暴走防止法」や未来の認証システムなど、本当にありそうな技術や制度を細かく作り込んだ、少し不気味で、どこか笑えるホラーコメディです。",
    badges: [],
    credit: "企画・脚本・監督・映像制作：ポコAI",
  },
  {
    id: "QBGAx-BzWI8",
    title: "ラブ&イーツ",
    en: "LOVE & EATS",
    genre: "ブラックラブコメ",
    meta: ["ブラックラブコメ", "約23分", "2026年", "4.1万回再生"],
    text: "人生を終わらせるために樹海へ来た青年・ユウタ。そこで出会ったのは、人間を「食べ物」として見る化け物だった。どうせ死ぬなら、死ぬ気でナンパでもしてみるか――。すべてを諦めたからこそ踏み出した一歩が、ユウタの日々を少しずつ変えていく。社会からはみ出した2人の、ブラック“ラブ”コメディです。",
    badges: [],
    credit: "企画・脚本・演出・編集・制作：ポコAI",
  },
  {
    id: "572PV2E6ZXA",
    title: "アースジャック",
    en: "EARTH JACK — Episode 1",
    genre: "SFアクション",
    meta: ["第1話", "SFアクション・頭脳戦", "約15分", "2026年"],
    text: "世界征服を目指す青年トーイチと、彼が作ったAI「ポコちゃん」。世界規模のサイバー攻撃を始めたトーイチたちの前に、地球侵略をたくらむ宇宙人が現れ、計画が狂い始める。世界征服をねらうトーイチたち、宇宙人、そして人類。目的も力も違う三つの勢力がさぐり合う、三つ巴の頭脳戦です。",
    badges: [{ label: "COLOTEK AIアニメコンテスト Best Story賞", award: true }],
    credit: "制作：ポコAI",
  },
];

// AI再現シリーズ（再生回数の多い順）
const SERIES = [
  {
    id: "dEIyjPU9bGA",
    title: "300年後の日本をのぞく。",
    views: "44.7万",
    text: "江戸時代の人には、空を飛ぶ乗り物も、地球の裏側と話せる道具も想像できなかったはずです。それなら、300年後の日本が今と大きく違っていても不思議ではありません。今の技術や社会の動きから考えた「ありえる未来」を、映像・声・音楽まですべてAIで作りました。",
    tag: "未来予測 × AI再現",
  },
  {
    id: "tShmRTa_Bmk",
    title: "本物の地獄をめぐる。",
    views: "3.2万",
    text: "日本仏教に伝わる八大地獄を、自分の足で歩いてめぐるような視点で再現しました。等活地獄から阿鼻地獄まで、罪が重いほど苦しみも重くなる地獄を、一つずつ順番にたどっていきます。",
    tag: "日本仏教 × AI再現",
  },
  {
    id: "FhryMMRdZvY",
    title: "AIに最狂の動物園作ってもらった。",
    views: null,
    text: "AIが管理し、展示している――という設定の架空の動物園です。モスマン、ネッシー、イエティなど、言い伝えや目撃談に残る未確認生物たちを、ナレーションなしで静かに眺める映像にしました。",
    tag: "UMA・未確認生物 × AI再現",
  },
];

const thumb = (id, size) => `https://i.ytimg.com/vi/${id}/${size}.jpg`;

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function embed(id, title) {
  const f = document.createElement("iframe");
  f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
  f.title = title;
  f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  f.allowFullscreen = true;
  return f;
}

function thumbImg(id, alt) {
  const img = document.createElement("img");
  img.src = thumb(id, "maxresdefault");
  img.alt = alt;
  img.draggable = false;
  img.addEventListener("error", () => { img.src = thumb(id, "hqdefault"); }, { once: true });
  return img;
}

// ---- いちばん上：3本を並べて、選ぶと大きく表示 ----
(function pickup() {
  const player = document.querySelector("[data-player]");
  const info = document.querySelector("[data-info]");
  const selector = document.querySelector("[data-selector]");
  const ambient = document.querySelector("[data-ambient]");

  let index = 0;
  let playing = false;

  const layers = WORKS.map((w) => {
    const l = el("div", "layer");
    l.style.backgroundImage = `url(${thumb(w.id, "hqdefault")})`;
    ambient.append(l);
    return l;
  });

  const tabs = WORKS.map((w, i) => {
    const b = el("button", "sel");
    b.type = "button";
    b.setAttribute("role", "tab");
    const t = el("div", "sel-thumb");
    t.append(thumbImg(w.id, ""));
    if (w.badges.some((x) => x.award)) t.append(el("span", "sel-award", "受賞作"));
    const txt = el("div", "sel-text");
    txt.append(el("span", "sel-no", String(i + 1).padStart(2, "0")), el("span", "sel-title", w.title), el("span", "sel-genre", w.genre));
    b.append(t, el("div", "sel-bar"), txt);
    b.addEventListener("click", () => select(i));
    selector.append(b);
    return b;
  });

  function renderPlayer() {
    const w = WORKS[index];
    player.innerHTML = "";
    player.classList.remove("playing");
    playing = false;
    player.append(thumbImg(w.id, w.title));
    ["tl", "tr", "bl", "br"].forEach((c) => player.append(el("span", `corner ${c}`)));
    player.append(el("span", "play-btn", "本編を再生"));
    player.setAttribute("aria-label", `${w.title}を再生`);
  }

  function renderInfo() {
    const w = WORKS[index];
    info.innerHTML = "";
    info.append(
      el("p", "info-no", `No. ${String(index + 1).padStart(2, "0")} / ${String(WORKS.length).padStart(2, "0")}`),
      el("h2", "info-title", w.title),
      el("p", "info-en", w.en),
    );
    const meta = el("p", "info-meta");
    w.meta.forEach((m) => meta.append(el("span", null, m)));
    info.append(meta, el("p", "info-text", w.text));
    if (w.badges.length) {
      const bs = el("div", "info-badges");
      w.badges.forEach((b) => bs.append(el("span", b.award ? "badge is-award" : "badge", b.label)));
      info.append(bs);
    }
    info.append(el("p", "info-credit", w.credit));
  }

  function select(i) {
    const n = (i + WORKS.length) % WORKS.length;
    if (n === index && player.firstChild) return;
    index = n;
    tabs.forEach((t, k) => t.setAttribute("aria-selected", String(k === index)));
    layers.forEach((l, k) => l.classList.toggle("on", k === index));
    renderPlayer();
    renderInfo();
  }

  function play() {
    if (playing) return;
    const w = WORKS[index];
    player.innerHTML = "";
    player.classList.add("playing");
    player.append(embed(w.id, w.title));
    playing = true;
  }

  // 大きい画面：タップで再生、左右のスワイプで切り替え
  player.tabIndex = 0;
  player.setAttribute("role", "button");
  let sx = 0, sy = 0, pid = null, moved = false;
  player.addEventListener("pointerdown", (e) => {
    if (playing || e.button !== 0) return;
    pid = e.pointerId; sx = e.clientX; sy = e.clientY; moved = false;
  });
  player.addEventListener("pointermove", (e) => {
    if (e.pointerId !== pid) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) moved = true;
  });
  player.addEventListener("pointerup", (e) => {
    if (e.pointerId !== pid) return;
    pid = null;
    const dx = e.clientX - sx;
    if (moved && Math.abs(dx) > 40) select(index + (dx < 0 ? 1 : -1));
    else if (!moved) play();
  });
  player.addEventListener("pointercancel", () => { pid = null; });
  player.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
  });
  selector.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { select(index + 1); tabs[index].focus(); }
    if (e.key === "ArrowLeft") { select(index - 1); tabs[index].focus(); }
  });

  index = -1;
  select(0);
})();

// ---- AI再現シリーズ ----
(function series() {
  const box = document.querySelector("[data-series]");
  SERIES.forEach((s) => {
    const item = el("article", "s-item");
    const v = el("div", "video");
    v.tabIndex = 0;
    v.setAttribute("role", "button");
    v.setAttribute("aria-label", `${s.title}を再生`);
    v.append(thumbImg(s.id, s.title), el("span", "mini-play"));
    const start = () => {
      if (v.querySelector("iframe")) return;
      v.innerHTML = "";
      v.append(embed(s.id, s.title));
    };
    v.addEventListener("click", start);
    v.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); start(); }
    });
    item.append(v);
    if (s.views) {
      const views = el("p", "s-views", s.views);
      views.append(el("small", null, "回再生"));
      item.append(views);
    }
    item.append(el("h3", "s-title", s.title), el("p", "s-text", s.text), el("span", "s-tag", s.tag));
    box.append(item);
  });
})();

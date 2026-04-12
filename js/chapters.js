// chapters.js — Pre-written chapter data for book tracker
// Pattern: window.BOOK_CHAPTERS["Book Title"].chapters[]
//
// Page ranges sourced from Internet Archive digital text of The Shock Doctrine
// (Metropolitan Books hardcover, 2007). 21 chapters across 7 parts.
// Confirmed: Ch 18 "Full Circle" = pages 360-384, midpoint 372.
//
// Chapters 9-13 start pages estimated (Part 4 spans pp. 171-282, 5 chapters).

window.BOOK_CHAPTERS = {

  "The Power of Now": {
    totalPages: 236,
    chapters: [
      {
        num: 0,
        label: "Preface",
        title: "The Origin of This Book",
        startPage: 1,
        endPage: 10,
        part: null,
        refresher: "Tolle describes the crisis that preceded his transformation: a night of profound suicidal despair in which a sudden dissociation occurred — the recognition that there were two 'selves,' the intolerable 'I' and a deeper witnessing presence. That witnessing presence was not the one suffering. The suffering ended and he awoke the next morning in a state of unshakeable peace. This experience became the experiential foundation the entire book rests on: the ego-self is not who you are, and the recognition of that is sufficient to end most ordinary suffering.",
        lessonTitles: []
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "You Are Not Your Mind",
        startPage: 11,
        endPage: 40,
        part: null,
        refresher: "The book's central claim is introduced: you are not your mind — you are the awareness that observes your thoughts. The mind, left to itself, is compulsively active and produces an incessant internal commentary that most people identify with as 'self.' This identification is the root of ordinary human suffering. The way out is not to stop thoughts but to watch them: the moment you observe a thought as a thought, you are no longer inside it. Tolle introduces 'the pain-body' — the accumulated emotional residue of past suffering — which feeds on negative thinking to sustain itself.",
        lessonTitles: ["You Are Not Your Thoughts"]
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "Consciousness: The Way Out of Pain",
        startPage: 41,
        endPage: 72,
        part: null,
        refresher: "Tolle distinguishes between pain that is unavoidable (acute physical suffering, grief) and the vast bulk of human suffering, which is self-created through resistance to what is. The mind habitually judges the present moment as inadequate and imagines a future moment that will be better — this gap is where suffering lives. The pain-body is examined in depth: it can be triggered by small incidents that seem disproportionate, because they activate the stored emotional residue of years. The remedy is present-moment awareness, which cannot coexist with the pain-body's activity.",
        lessonTitles: ["Present Moment as the Only Reality"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "Moving Deeply Into the Now",
        startPage: 73,
        endPage: 98,
        part: null,
        refresher: "Tolle offers practical instruction for accessing presence: using the body's inner felt sense as an anchor. Attention to the aliveness felt inside the hands, feet, or torso connects consciousness to the present moment in a way that conceptual thinking cannot. He introduces the distinction between clock time (necessary for practical planning) and psychological time (the mind's tendency to dwell in past or future as a primary mode of being). Problems require clock time to solve; suffering requires psychological time to persist. Staying in the Now doesn't prevent planning — it prevents compulsive rumination.",
        lessonTitles: ["Clock Time vs Psychological Time"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "Mind Strategies for Avoiding the Now",
        startPage: 99,
        endPage: 126,
        part: null,
        refresher: "The ego resists presence because presence dissolves it. Tolle catalogs the mind's strategies for avoiding the Now: compulsive planning, worry, complaint, imagining future scenarios (positive or negative), and rehearsing past grievances. He identifies 'waiting' as one of the subtler forms — the pervasive sense that real life begins when some future condition is met (the job, the relationship, the achievement). He also addresses 'ordinary unconsciousness' — the low-grade dissatisfaction that underlies daily life even when nothing is specifically wrong — distinguishing it from the acute pain of crisis.",
        lessonTitles: ["The Ego's Resistance to Presence"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "The State of Presence",
        startPage: 127,
        endPage: 152,
        part: null,
        refresher: "Tolle describes what full presence actually feels like and how to recognize it versus mistaking its absence for it. He addresses common misunderstandings: presence is not a blank mental state, not concentration, not relaxation, not effort. It is an alert, open watchfulness — a quality of attention that has no object it prefers and no outcome it fears. He discusses how beauty, nature, and art can momentarily produce presence involuntarily, and why the effect fades — the mind reasserts itself and converts the experience into memory and concept.",
        lessonTitles: []
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "The Inner Body",
        startPage: 153,
        endPage: 172,
        part: null,
        refresher: "The body, attended to from the inside, is presented as the most reliable portal to the present moment. Tolle distinguishes between the body as seen from the outside (the physical form, which is subject to disease and death and therefore a source of anxiety for the ego) and the body as felt from the inside — the 'inner body,' a field of aliveness that is always present, always Now. Sustained attention to inner body sensation is offered as a practical anchor. The more deeply you inhabit the inner body, the less the mind can pull you into past or future.",
        lessonTitles: ["The Body as Anchor to the Present"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "Portals Into the Unmanifested",
        startPage: 173,
        endPage: 192,
        part: null,
        refresher: "Tolle introduces the 'Unmanifested' — the source from which all form (including thought, emotion, and physical reality) arises, and into which it returns. He discusses silence, dreamless sleep, and conscious presence as natural portals. The chapter becomes more explicitly metaphysical: consciousness is not produced by the brain but expressed through it; the deepest self is not a personal entity but the awareness that underlies all experience. This is the book's most abstract chapter, addressing what Tolle calls the formless dimension of existence.",
        lessonTitles: []
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Enlightened Relationships",
        startPage: 193,
        endPage: 208,
        part: null,
        refresher: "Tolle applies his framework to relationships, arguing that most human relationships are unconscious — driven by the ego's need for completion, validation, or the projection of its needs onto another person. Love as the ego understands it ('I need you, therefore I love you') is a form of dependency, not love. Present-moment awareness transforms relationships: when you are no longer using the other person to complete yourself, you can be fully present with them as they are. He addresses the pain-body in relationships specifically — how partners can unconsciously activate each other's accumulated pain.",
        lessonTitles: ["Presence in Relationships"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Beyond Happiness and Unhappiness There Is Peace",
        startPage: 209,
        endPage: 222,
        part: null,
        refresher: "Tolle challenges the conventional pursuit of happiness by pointing to its fundamental instability: happiness that depends on conditions is always vulnerable to the loss of those conditions. The peace he describes is different — it is not a feeling state at all but a quality of presence that underlies all states, accessible when you stop resisting what is. He distinguishes acceptance from resignation: acceptance does not mean passivity about changing circumstances; it means not adding the layer of mental suffering (complaint, resentment, anxiety) on top of the situation as it is.",
        lessonTitles: ["Acceptance vs Resignation"]
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "The Meaning of Surrender",
        startPage: 223,
        endPage: 236,
        part: null,
        refresher: "The final chapter reframes surrender — not as defeat but as the cessation of resistance to what is. Tolle argues that most human effort goes into maintaining the illusion of control, and the exhaustion this produces is the source of much low-grade suffering. Surrender releases this effort. He distinguishes outer surrender (accepting circumstances you cannot change) from the deeper inner surrender (releasing the ego's compulsive need to judge, manage, and improve the present moment). The book closes by pointing back to its beginning: what you most fundamentally are has never been lost, never been damaged, and requires no future to be whole.",
        lessonTitles: ["Surrender as Strength"]
      }
    ]
  },

  "Why Nations Fail: The Origins of Power, Prosperity, and Poverty": {
    totalPages: 464,
    chapters: [
      {
        num: 0,
        label: "Introduction",
        title: "So Close and Yet So Different",
        startPage: 1,
        endPage: 42,
        part: null,
        refresher: "Acemoglu and Robinson open with the city of Nogales, split by the US-Mexico border: the northern half is prosperous, the southern half poor. Same people, same geography, same culture — different institutions. This contrast crystallises the book's central question: why do some nations prosper while others remain poor? The authors dismiss standard explanations — geography (Diamond's argument), culture (Weber's Protestant ethic), and ignorance (the idea that poor countries just need better economic advice) — and argue that the answer lies in political and economic institutions.",
        lessonTitles: ["Inclusive vs Extractive Institutions"]
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "So Close and Yet So Different",
        startPage: 43,
        endPage: 68,
        part: "Part 1 · Why Nations Fail and Succeed",
        refresher: "The authors lay out their core framework: inclusive economic institutions (secure property rights, rule of law, open markets) enable prosperity; extractive economic institutions (which concentrate wealth and power in a small elite) generate poverty. But economic institutions are shaped by political institutions — inclusive political institutions (pluralism, broad distribution of power) tend to produce inclusive economic institutions; extractive political institutions (where power is concentrated) produce extractive economic ones. The relationship is symbiotic and self-reinforcing in both directions.",
        lessonTitles: []
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "Theories That Don't Work",
        startPage: 69,
        endPage: 96,
        part: "Part 1 · Why Nations Fail and Succeed",
        refresher: "A systematic dismantling of competing explanations for poverty: geography (temperate climates don't automatically produce wealth — Botswana is prosperous; Congo is not, despite similar geography to other African nations); culture (South and North Korea share culture; Max Weber's Protestant Ethic fails to explain sustained divergence within Protestant nations); and ignorance (poor countries often have leaders who understand exactly what policies would enrich citizens — they simply prefer policies that enrich themselves instead). The authors demonstrate that all three theories fail basic empirical tests.",
        lessonTitles: ["Why Geography Doesn't Explain Poverty"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "The Making of Prosperity and Poverty",
        startPage: 97,
        endPage: 126,
        part: "Part 1 · Why Nations Fail and Succeed",
        refresher: "The institutional framework is elaborated. Inclusive economic institutions create the conditions for innovation and growth: when entrepreneurs can keep the fruits of their work and contracts are enforced, investment and innovation flourish. Extractive institutions actively impede growth — not from ignorance but by design: elites who control existing industries block creative destruction because innovation threatens their position. The authors introduce the concept of 'creative destruction' (from Schumpeter) as the engine of growth that extractive institutions must suppress to survive.",
        lessonTitles: ["Creative Destruction and Elites"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "Small Differences and Critical Junctures",
        startPage: 127,
        endPage: 158,
        part: "Part 2 · How Institutions Shape History",
        refresher: "Nations diverge not through gradual accumulation of advantage but through critical junctures — moments when historical circumstances open windows of institutional change. The Black Death in 14th-century Europe is the central example: the same plague had opposite institutional effects in Western Europe (where labour scarcity gave serfs bargaining power that eroded feudalism) and Eastern Europe (where landlords successfully re-imposed serfdom). Small initial differences in the balance of power between lords and peasants determined which path each region took — and those paths diverged for centuries.",
        lessonTitles: ["Critical Junctures and Path Dependence"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: '"I\'ve Seen the Future and It Works": Growth Under Extractive Institutions',
        startPage: 159,
        endPage: 192,
        part: "Part 2 · How Institutions Shape History",
        refresher: "Extractive institutions can produce economic growth — up to a point. The Soviet Union's rapid industrialisation in the 1930s-60s demonstrated that centrally directed economies can mobilise resources and expand production. But growth under extractive institutions is always limited: without inclusive markets and property rights, there is no incentive for creative destruction; growth comes from moving people into existing industries, not from innovation. Once existing resources are mobilised, growth stalls. This explains why the USSR eventually stagnated, why China's growth requires continued institutional reform, and why no extractive economy has ever sustained long-run prosperity.",
        lessonTitles: ["Why Authoritarian Growth Hits a Ceiling"]
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "Drifting Apart",
        startPage: 193,
        endPage: 222,
        part: "Part 2 · How Institutions Shape History",
        refresher: "A long-run comparison of divergence: why did England develop inclusive institutions when Venice, Rome, and the Ottoman Empire did not? The authors trace England's path from the Magna Carta (1215) through the gradual dissolution of feudalism, the rise of Parliament, and ultimately the Glorious Revolution of 1688 — which established constitutional constraints on the monarchy and created the conditions for the Industrial Revolution. The key is that critical junctures accumulated incrementally, each one slightly broadening participation and constraining elite power, until the institutional foundation for sustained growth existed.",
        lessonTitles: ["The Glorious Revolution and Inclusive Institutions"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "The Turning Point",
        startPage: 223,
        endPage: 254,
        part: "Part 2 · How Institutions Shape History",
        refresher: "The Industrial Revolution began in England because it was the one society with inclusive enough institutions to allow entrepreneurs to invest in new technologies without fear of confiscation. The authors contrast England with China and the Ottoman Empire, both of which had comparable technologies in earlier centuries but whose extractive political systems blocked sustained adoption: rulers who feared creative destruction suppressed innovations that threatened their position. They also examine why the Industrial Revolution spread through Europe and North America but not through colonised territories, where European powers deliberately maintained extractive institutions.",
        lessonTitles: []
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Not on Our Turf: Barriers to Development",
        startPage: 255,
        endPage: 286,
        part: "Part 3 · The Persistence of Poverty",
        refresher: "Why do extractive institutions persist even when they generate poverty for most? The authors identify the 'iron law of oligarchy': elites in extractive systems block reforms that would undermine their position, even when those reforms would generate far more wealth overall. They examine colonial extraction — how European colonisers deliberately dismantled existing social institutions and replaced them with extraction systems (forced labour, plantation agriculture, resource extraction) that persisted long after independence. The institutional damage of colonialism is not primarily the direct extraction but the destruction of inclusive institutions that had existed beforehand.",
        lessonTitles: ["Colonial Extraction and Long-Run Poverty"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Reversing Fortunes",
        startPage: 287,
        endPage: 316,
        part: "Part 3 · The Persistence of Poverty",
        refresher: "Why did colonialism produce different outcomes in different places? The density of existing indigenous population determined whether Europeans settled or extracted. In sparsely populated places (Australia, North America, New Zealand), Europeans settled and eventually created inclusive institutions similar to their home countries. In densely populated places (Africa, South Asia, Central America), the colonisers created extractive institutions to exploit existing populations. This 'reversal of fortune' explains why many of the world's richest places in 1500 (India, Mexico, Peru) are among the poorest today, while previously sparse regions became wealthy.",
        lessonTitles: []
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "The Diffusion of Prosperity",
        startPage: 317,
        endPage: 348,
        part: "Part 3 · The Persistence of Poverty",
        refresher: "Prosperity spread from England not through imitation of policy but through institutional change, and only where conditions permitted such change. Japan's Meiji Restoration is the central success story: threatened by Western colonialism, Japanese elites chose modernisation over extraction, creating inclusive institutions that enabled rapid industrialisation. The authors contrast this with the Ottoman response (failed partial reforms that preserved elite privilege) and the Chinese response (similar failure). The key variable: whether reform threatened elites so severely that they blocked it, or whether reform could be accomplished while preserving enough elite advantage.",
        lessonTitles: ["Japan's Meiji Restoration as Institutional Change"]
      },
      {
        num: 11,
        label: "Chapter 11",
        title: "The Virtuous Circle",
        startPage: 349,
        endPage: 378,
        part: "Part 4 · Paths to Prosperity and Failure",
        refresher: "Inclusive institutions create self-reinforcing virtuous circles: pluralistic political systems protect property rights and open markets; open markets generate broad wealth; broad wealth creates constituencies for pluralism; pluralism preserves the open markets. The US is the primary case study — not because it had perfect institutions from the start, but because its critical juncture (the Constitutional settlement of 1787) created a system with enough checks, balances, and constraints on concentrated power to resist subsequent attempts by elites to capture the state. The Civil War, the Progressive Era, and the New Deal are examined as moments when the virtuous circle held.",
        lessonTitles: ["Self-Reinforcing Inclusive Institutions"]
      },
      {
        num: 12,
        label: "Chapter 12",
        title: "The Vicious Circle",
        startPage: 379,
        endPage: 408,
        part: "Part 4 · Paths to Prosperity and Failure",
        refresher: "Extractive institutions create equally self-reinforcing vicious circles: concentrated power protects extractive economics; extractive economics concentrate wealth further; wealth concentration enables further political capture. The authors examine Sierra Leone, Zimbabwe, and Colombia to show how elites use resource wealth (diamonds, land, narcotics) to reinforce political control, which they use to secure further resource access. The vicious circle is not eternal — critical junctures can break it — but those junctures must be exploited by coalitions broad enough to prevent the old elite from reasserting control.",
        lessonTitles: []
      },
      {
        num: 13,
        label: "Chapter 13",
        title: "Why Nations Fail Today",
        startPage: 409,
        endPage: 432,
        part: "Part 4 · Paths to Prosperity and Failure",
        refresher: "A survey of contemporary failure, testing the institutional hypothesis against current cases: Zimbabwe under Mugabe deliberately destroyed the property rights and rule of law that existed under the colonial regime in order to distribute patronage; North Korea's regime is the purest modern example of extractive political and economic institutions coexisting with complete poverty; Egypt under Mubarak maintained growth through partial economic liberalisation while preserving political extraction. In each case, the authors show that poverty is not an accident or the result of lack of resources — it is the product of institutions deliberately maintained because they benefit those in power.",
        lessonTitles: []
      },
      {
        num: 14,
        label: "Chapter 14",
        title: "Breaking the Mold",
        startPage: 433,
        endPage: 454,
        part: "Part 4 · Paths to Prosperity and Failure",
        refresher: "Can extractive institutions be reformed from within? The authors are cautiously hopeful but identify the conditions required. Botswana's post-independence success is the primary case: its pre-colonial institutions (the kgotla, a form of public assembly) provided a foundation for inclusive politics that leaders like Seretse Khama chose to build upon rather than dismantle. China's reforms since 1978 have moved toward more inclusive economic institutions while maintaining extractive political ones — the authors predict this path will eventually hit the limits of growth without political reform. Sustained change requires broad coalitions that prevent elite capture of reform.",
        lessonTitles: ["Botswana as a Success Story"]
      },
      {
        num: 15,
        label: "Chapter 15",
        title: "Understanding Prosperity and Poverty",
        startPage: 455,
        endPage: 462,
        part: null,
        refresher: "The concluding chapter synthesises the book's argument and addresses its policy implications. The authors resist simple prescriptions: you cannot export inclusive institutions through aid or conditionality, because institutional change is fundamentally a political process that must come from within. What outsiders can do is support reformers, refuse to legitimate autocrats, and resist the temptation to deal with extractive governments simply because they are stable. The deepest implication is that prosperity is not the natural state of affairs — it requires specific institutional arrangements that are difficult to build and easy to destroy.",
        lessonTitles: []
      }
    ]
  },

  "Grit": {
    totalPages: 352,
    chapters: [
      {
        num: 0,
        label: "Introduction",
        title: "Showing Up",
        startPage: 1,
        endPage: 16,
        part: null,
        refresher: "Duckworth opens with a puzzle: at West Point's brutal summer initiation (Beast Barracks), the best predictor of who would drop out was not physical fitness, academic rank, or leadership scores — it was a simple questionnaire measuring what she calls grit. The same pattern appeared across professions she studied: elite National Spelling Bee competitors, sales agents, military officers, teachers in tough schools. In every domain, a combination of passion and perseverance — grit — predicted success better than talent or IQ. The book's aim is to explain what grit is, where it comes from, and how it can be developed.",
        lessonTitles: ["Grit Predicts Success Over Talent"]
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "Showing Up",
        startPage: 17,
        endPage: 38,
        part: "Part 1 · What Grit Is and Why It Matters",
        refresher: "Duckworth traces her own path from McKinsey consultant to public school teacher to psychology PhD student, driven by a persistent question: why do some students succeed and others don't despite similar intelligence? Her research consistently found that self-discipline and persistence mattered more than IQ for academic achievement. She introduces the Grit Scale — a ten-question assessment — and discusses what it measures: not just the ability to work hard in the short term, but sustained effort toward long-term goals through failure, setbacks, and boredom.",
        lessonTitles: []
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "Distracted by Talent",
        startPage: 39,
        endPage: 62,
        part: "Part 1 · What Grit Is and Why It Matters",
        refresher: "America has a talent obsession that actively harms performance. Duckworth draws on Darwin, Nietzsche, and her own research to argue that society systematically overestimates the role of natural talent and underestimates the role of effort. When we attribute success to talent, we implicitly excuse our own lack of effort ('I'm just not naturally good at this'). She documents how even demonstrably high-effort achievers are retrospectively credited with innate ability. The result: people avoid effort because struggling implies lack of talent, and talent is what's supposed to matter.",
        lessonTitles: ["The Talent Myth"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "Effort Counts Twice",
        startPage: 63,
        endPage: 88,
        part: "Part 1 · What Grit Is and Why It Matters",
        refresher: "Duckworth proposes a simple model: Talent × Effort = Skill; Skill × Effort = Achievement. Effort appears twice — it builds skill and it converts skill into achievement. A person with twice the talent but half the effort ends up with the same skill and less achievement than a person with half the talent and twice the effort. This reframes the talent-effort debate: talent matters, but effort matters more, and effort is under your control. The chapter grounds this in William James's concept of 'reserve energy' — the observation that most people stop far short of their true capacity.",
        lessonTitles: ["Effort Counts Twice: The Grit Formula"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "How Grit Grows",
        startPage: 89,
        endPage: 114,
        part: "Part 1 · What Grit Is and Why It Matters",
        refresher: "Grit develops over time and varies systematically by age: older people score higher on the Grit Scale than younger people, and this is not purely a generational effect — people genuinely become grittier as they mature. The chapter introduces the four psychological assets that underlie grit: interest (passion for your work), practice (deliberate improvement), purpose (the conviction that your work matters to others), and hope (resilience in the face of setbacks). Each of these can be cultivated. Duckworth argues that grit is not a fixed trait but a set of capacities that can be developed.",
        lessonTitles: []
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "Interest",
        startPage: 115,
        endPage: 140,
        part: "Part 2 · Growing Grit from the Inside Out",
        refresher: "Passion is not discovered in a lightning bolt moment — it is developed through years of exploration, practice, and deepening engagement. Duckworth interviews Olympic athletes, chess champions, and novelists and finds that none of them simply 'found their passion' fully formed. Interest requires time and positive feedback to develop; it typically begins as a vague attraction, is nurtured through early encouragement, deepens through increasing mastery, and becomes a source of intrinsic motivation. The practical implication: telling people to 'follow their passion' as if it exists waiting to be found is wrong. You develop your passion.",
        lessonTitles: ["Passion Is Developed, Not Discovered"]
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "Practice",
        startPage: 141,
        endPage: 168,
        part: "Part 2 · Growing Grit from the Inside Out",
        refresher: "Deliberate practice — Anders Ericsson's concept — is the specific type of effort that converts raw time into skill. It is not the same as doing the same thing repeatedly: deliberate practice requires working at the edge of your current ability, with immediate feedback, and focused attention on specific weaknesses. Duckworth shows that gritty people do more deliberate practice than less gritty people, and that they approach it differently — they suffer through it but are motivated by long-term improvement rather than immediate enjoyment. The chapter also addresses the hard truth: deliberate practice is often not enjoyable. Grit includes the capacity to do necessary things that are not fun.",
        lessonTitles: ["Deliberate Practice Explained"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "Purpose",
        startPage: 169,
        endPage: 194,
        part: "Part 2 · Growing Grit from the Inside Out",
        refresher: "Beyond personal interest, gritty people are typically motivated by a sense that their work contributes to something larger than themselves. Duckworth draws on Adam Grant's research showing that hospital janitors who believe their work contributes to patient healing are more motivated than those who see it as purely instrumental. She introduces Aristotle's distinction between eudaimonic happiness (the deep satisfaction of purposeful activity) and hedonic happiness (pleasure), arguing that long-term grit requires the former. Purpose develops alongside interest — it typically begins as self-oriented and gradually becomes other-oriented as mastery deepens.",
        lessonTitles: ["Purpose as the Engine of Grit"]
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Hope",
        startPage: 195,
        endPage: 218,
        part: "Part 2 · Growing Grit from the Inside Out",
        refresher: "Hope — the belief that the future can be better than the present and that you have a role in making it so — is the fourth psychological asset underlying grit. Duckworth draws on Martin Seligman's learned helplessness research: when people experience repeated failures with no perceived agency, they stop trying even when agency becomes available. Conversely, a 'growth mindset' (Carol Dweck's concept) — the belief that abilities develop through effort — produces resilience in the face of failure. The practical tools: learning to interpret setbacks as temporary and specific rather than permanent and pervasive, and persisting because you believe persistence will matter.",
        lessonTitles: ["Growth Mindset and Resilience"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Parenting for Grit",
        startPage: 219,
        endPage: 244,
        part: "Part 3 · Growing Grit from the Outside In",
        refresher: "Parenting style has a measurable effect on grit. Duckworth identifies the optimal parenting approach as 'wise parenting' — combining high warmth (supportive, attentive) with high demands (expecting effort and achievement). Permissive parents (high warmth, low demands) raise children who feel loved but don't develop persistence; authoritarian parents (low warmth, high demands) raise children who may achieve but lack intrinsic motivation. The most gritting development experience: extracurricular activities that combine interest, deliberate practice, and commitment over multiple years — with parental support but not coercion.",
        lessonTitles: []
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "The Playing Fields of Grit",
        startPage: 245,
        endPage: 278,
        part: "Part 3 · Growing Grit from the Outside In",
        refresher: "Organised activities — sports, music, drama — build grit more effectively than unstructured time because they combine the four pillars: interest (you choose the activity), practice (structured improvement with a coach), purpose (team membership, competition, performance), and hope (the experience of progress over time). Duckworth examines the 'Hard Thing Rule' she applies in her own family: everyone must do a hard thing that requires daily practice; no one can quit in the middle of a season; everyone gets to choose their own hard thing. She also discusses how commitment to an activity for multiple years — the two-year minimum she suggests — is qualitatively different from shorter engagements.",
        lessonTitles: ["The Hard Thing Rule"]
      },
      {
        num: 11,
        label: "Chapter 11",
        title: "A Culture of Grit",
        startPage: 279,
        endPage: 318,
        part: "Part 3 · Growing Grit from the Outside In",
        refresher: "Grit is contagious: we become like the people around us, and organisations that make grit a cultural value produce grittier members. Duckworth examines West Point's culture, the Seattle Seahawks under Pete Carroll, and KIPP schools as examples of organisations that deliberately cultivate grit through norms, rituals, and expectations. She draws on conformity research showing that individuals reliably adopt the behaviours and attitudes of their groups. The implication: if you want to become grittier, surround yourself with gritty people and join organisations that value long-term effort over short-term performance.",
        lessonTitles: ["Culture of Grit in Organisations"]
      },
      {
        num: 12,
        label: "Conclusion",
        title: "What We Can Do",
        startPage: 319,
        endPage: 333,
        part: null,
        refresher: "Duckworth closes by addressing the tension between grit and well-being, and between grit and flexibility. Grit does not mean persisting with the wrong goal — quitting a goal that no longer makes sense is wise, not weak. What grit means is not quitting when things are merely difficult, boring, or temporarily demoralising. She also addresses grit and inequality: if grit is partly a product of environment (parenting, schools, culture), then grit gaps between groups reflect opportunity gaps. Growing grit without expanding opportunity is incomplete. The final challenge: to build environments and institutions that make grit more universally accessible.",
        lessonTitles: []
      }
    ]
  },

  "When Breath Becomes Air": {
    totalPages: 228,
    chapters: [
      {
        num: 0,
        label: "Foreword",
        title: "Foreword by Abraham Verghese",
        startPage: 1,
        endPage: 10,
        part: null,
        refresher: "Abraham Verghese, the physician and author, provides context for Paul Kalanithi's memoir: a neurosurgeon at the peak of his training is diagnosed with terminal lung cancer, and responds by writing this book. Verghese frames Kalanithi's project as an attempt to understand what makes life worth living at the moment when life is ending — and to translate that understanding into prose precise enough to be useful to others.",
        lessonTitles: []
      },
      {
        num: 1,
        label: "Part 1",
        title: "In Perfect Health I Begin",
        startPage: 11,
        endPage: 118,
        part: null,
        refresher: "Kalanithi traces his path from a childhood in Kingman, Arizona — where his physician father's practice shaped his early sense of medicine as vocation — through Stanford literature and human biology degrees, into medical school and then neurosurgery residency. He describes his attraction to neurosurgery as philosophical: the brain is where identity, consciousness, and meaning reside, and the neurosurgeon works at the intersection of biology and human experience. He writes about the moral weight of surgical training — the first time he held a life in his hands and understood what it meant to be responsible for another person's existence. The part ends as his own symptoms appear: weight loss, back pain, the cough he is too tired to investigate.",
        lessonTitles: ["Medicine as Moral Practice", "The Weight of Surgical Training"]
      },
      {
        num: 2,
        label: "Part 2",
        title: "Cease Not till Death",
        startPage: 119,
        endPage: 199,
        part: null,
        refresher: "The diagnosis: stage IV metastatic lung cancer, in a 36-year-old who had never smoked. Kalanithi is abruptly on the other side of medicine — the patient who must be told prognosis by colleagues who are treating him with the same careful reserve he had used with his own patients. He struggles with the question every dying person faces: what to do with the time that remains. He and his wife Lucy decide to have a child. He returns to neurosurgery, then has to stop again. He begins to write. The prose slows and deepens as he moves closer to death, reaching for language to describe what dying from the inside feels like — not as tragedy but as a specific kind of experience to be lived fully.",
        lessonTitles: ["Living Fully in the Face of Death", "What Makes Life Meaningful"]
      },
      {
        num: 3,
        label: "Epilogue",
        title: "Epilogue by Lucy Kalanithi",
        startPage: 200,
        endPage: 217,
        part: null,
        refresher: "Paul's wife Lucy writes the ending he could not. She describes his final months, his death in March 2015, and the eight months he spent with their daughter Cady, who was born after his diagnosis. She writes about the book he was writing until he could no longer type, and why she chose to complete and publish it. The epilogue is a meditation on grief and love, and on what it means to be loved by someone who faced death with such clarity and care. 'You can't know the end of the story before it begins,' Paul had said. Lucy completes the story.",
        lessonTitles: []
      }
    ]
  },

  "Performing Under Pressure: The Science of Doing Your Best When It Matters Most": {
    totalPages: 306,
    chapters: [
      {
        num: 0,
        label: "Introduction",
        title: "The Problem of Pressure",
        startPage: 1,
        endPage: 18,
        part: null,
        refresher: "Weisinger and Pawliw-Fry open with a central insight from their research: pressure is not the same as stress, and the distinction matters enormously. Stress is chronic — an ongoing state produced by overwhelming demands. Pressure is acute — a specific moment when the outcome matters, stakes are high, and uncertainty is present. People handle chronic stress better than acute pressure because pressure triggers a physiological response (cortisol, adrenaline) that impairs precisely the cognitive functions — working memory, decision-making, focus — that performance requires. The book's claim: virtually nobody performs at their best under pressure, and specific strategies can change that.",
        lessonTitles: ["Pressure Is Not Stress"]
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "Pressure Is in Your Head",
        startPage: 19,
        endPage: 46,
        part: "Part 1 · Understanding Pressure",
        refresher: "The physiological and psychological mechanics of pressure are explained. When we perceive a situation as having high stakes and uncertain outcome, the threat response activates: cortisol narrows attention (helpful for physical threats, harmful for complex cognitive tasks), working memory capacity shrinks, and we default to habitual responses rather than optimal ones. The authors introduce the IPS (Immediate Performance State) — the physiological and psychological state you are in at the moment of performance. Pressure degrades IPS. The book's approach is to identify interventions that modify IPS before and during high-pressure moments.",
        lessonTitles: []
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "The Negative Consequences of Pressure",
        startPage: 47,
        endPage: 74,
        part: "Part 1 · Understanding Pressure",
        refresher: "A catalogue of how pressure degrades performance: it increases errors (the wrong choice is made under time pressure), reduces creativity (fixation on familiar approaches), damages relationships (curtness, blame, poor listening), and produces decision fatigue. The authors distinguish between 'choking' (a performance failure caused by over-thinking well-practised skills) and 'panicking' (abandoning deliberate thinking in favour of instinct on complex tasks that require deliberation). Both are pressure-induced failures, but they have opposite causes and require opposite remedies.",
        lessonTitles: ["Choking vs Panicking Under Pressure"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "Developing a COTE of Armor",
        startPage: 75,
        endPage: 102,
        part: "Part 2 · The COTE Solution",
        refresher: "The book's central framework is introduced: COTE — Confidence, Optimism, Tenacity, Enthusiasm. These four psychological qualities buffer against the performance-degrading effects of pressure. Confidence reduces threat perception; optimism maintains motivation through setbacks; tenacity enables continuation despite difficulty; enthusiasm keeps engagement high. The framework is grounded in research across sports psychology, positive psychology, and organisational behaviour. Each element can be developed through specific practices, and together they create a protective 'coat of armor' that allows performance to be maintained when stakes are high.",
        lessonTitles: ["The COTE Framework"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "Confidence",
        startPage: 103,
        endPage: 132,
        part: "Part 2 · The COTE Solution",
        refresher: "Confidence under pressure differs from general self-esteem: it is task-specific, evidence-based, and can be deliberately built. The authors identify the sources of pressure-relevant confidence: preparation (knowing you have done the work reduces threat perception), mastery experiences (previous successes under similar conditions), and self-talk patterns. They introduce 'confidence anchors' — specific memories of successful past performance that can be deliberately recalled before high-pressure moments to reset the threat response. Key distinction: confidence is not certainty about the outcome but certainty about your capacity to perform your best.",
        lessonTitles: ["Building Confidence Before High-Stakes Moments"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "Optimism",
        startPage: 133,
        endPage: 158,
        part: "Part 2 · The COTE Solution",
        refresher: "Optimism under pressure means specifically the explanatory style by which you interpret setbacks — whether you see them as temporary or permanent, specific or pervasive, external or internal. The authors draw heavily on Seligman's learned optimism research: people who explain failure as permanent, pervasive, and personal ('I always fail, everything is affected, it's all my fault') perform worse under subsequent pressure than those who explain failure as temporary, specific, and situational. Optimism can be trained through 'disputation' — actively challenging catastrophic interpretations of setbacks with more accurate, balanced ones.",
        lessonTitles: []
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "Tenacity",
        startPage: 159,
        endPage: 184,
        part: "Part 2 · The COTE Solution",
        refresher: "Tenacity — the ability to continue performance-directed effort despite adversity — is examined through the psychology of goal-setting and self-regulation. The authors introduce 'implementation intentions' (if-then plans: 'if X obstacle arises, then I will do Y') as the most research-validated technique for maintaining persistence through obstacles. They also address the paradox of pressure and effort: trying harder under pressure often makes performance worse (over-gripping, over-thinking). Tenacity sometimes means maintaining relaxed effort rather than increasing intensity — staying in process rather than fixating on outcome.",
        lessonTitles: ["Implementation Intentions Under Pressure"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "Enthusiasm",
        startPage: 185,
        endPage: 208,
        part: "Part 2 · The COTE Solution",
        refresher: "Enthusiasm — engaged, energised orientation toward the task — is perhaps the most undervalued element of the COTE framework because it seems like a consequence of performance rather than a cause. The authors argue the reverse: enthusiastic framing of pressure situations (seeing them as opportunities rather than threats) measurably improves performance, and this reframing can be deliberately practised. They introduce the 'pressure as privilege' concept — elite performers learn to welcome high-stakes moments because they are occasions to demonstrate competence. Physiologically, enthusiasm and anxiety produce similar arousal; the difference is the interpretation.",
        lessonTitles: ["Reframing Pressure as Privilege"]
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Pressure and Relationships",
        startPage: 209,
        endPage: 234,
        part: "Part 3 · Pressure in Context",
        refresher: "Pressure degrades interpersonal performance as reliably as it degrades individual performance: people become shorter, less empathetic, more reactive, and worse at listening under pressure. The authors examine how this compounds: in organisations under pressure, communication breaks down at precisely the moments when it is most needed. They introduce specific practices for maintaining relationship quality under pressure — slowing down rather than speeding up communication, naming the pressure explicitly ('I'm aware this is a high-stakes moment'), and separating problem-solving from blame.",
        lessonTitles: []
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Teams Under Pressure",
        startPage: 235,
        endPage: 260,
        part: "Part 3 · Pressure in Context",
        refresher: "Team performance under pressure depends on psychological safety (Amy Edmondson's concept) — the shared belief that members can take risks, ask questions, and acknowledge mistakes without punishment. Under pressure, teams with low psychological safety suppress exactly the information most needed: members who see problems don't speak up; leaders who don't know answers don't say so; mistakes are concealed rather than corrected. The authors show how the pre-mortem technique (imagining the project has failed and identifying why) can improve team pressure performance by legitimising the surfacing of concerns before a crisis makes concealment rational.",
        lessonTitles: ["Psychological Safety Under Team Pressure"]
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "Performing Your Best When It Matters Most",
        startPage: 261,
        endPage: 290,
        part: "Part 3 · Pressure in Context",
        refresher: "The final chapter integrates the COTE framework into a practical pre-performance routine. The authors identify the key window: the 24-48 hours before a high-pressure event, during which preparation, sleep, physical activity, and mental rehearsal have the most impact on IPS. They also address the post-pressure period — how to debrief effectively (what went well, what to adjust, separate from blame) to convert pressure experiences into improved future performance. The closing argument: the goal is not to eliminate pressure — it is an unavoidable feature of meaningful work — but to build the capacities that allow you to perform at your best precisely when it matters most.",
        lessonTitles: []
      }
    ]
  },

  "The Looming Tower": {
    totalPages: 469,
    chapters: [
      {
        num: 0,
        label: "Prologue",
        title: "The Martyr",
        startPage: 1,
        endPage: 14,
        part: null,
        refresher: "Wright opens with Sayyid Qutb's 1949 arrival in America — specifically Greeley, Colorado, where he had been sent by the Egyptian Ministry of Education. The experience radicalised him: he was repelled by American materialism, sexual freedom, and what he saw as spiritual emptiness. He returned to Egypt a committed Islamist ideologue. The prologue establishes Qutb as the intellectual grandfather of al-Qaeda: his prison writings, especially 'Milestones,' provided the theological framework that Zawahiri and bin Laden later used to justify mass murder. The shock of his American experience is the book's opening paradox: the encounter with the West that was meant to modernise him instead produced the ideology that would eventually attack the West.",
        lessonTitles: ["The Radicalisation of Sayyid Qutb"]
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "The Sporting Club",
        startPage: 15,
        endPage: 44,
        part: "Part 1 · The Terrorists",
        refresher: "Cairo in the early 1970s: Ayman al-Zawahiri, as a teenage student, joins an underground Islamic cell. Wright traces Zawahiri's formation — his upper-class Egyptian background, his surgical training, his growing conviction that secular Arab nationalism had failed and that only a return to Islamic governance could restore Muslim dignity. The Sporting Club (a Cairo social club) symbolises the secular, Westernised Egyptian elite that Zawahiri regarded as corrupt and illegitimate. The chapter establishes the psychological origins of al-Qaeda's second-in-command: a deep sense of humiliation at the Muslim world's weakness and a cold conviction that violence was theologically justified.",
        lessonTitles: []
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "The Boy",
        startPage: 45,
        endPage: 78,
        part: "Part 1 · The Terrorists",
        refresher: "Osama bin Laden's early life in Saudi Arabia and Sudan: the 17th of 52 children of a Yemeni construction magnate, raised in luxury but increasingly drawn to Islamic piety. Wright traces bin Laden's student years in Jeddah — where he came under the influence of teachers who fused religious conservatism with anti-Western politics — and his first encounter with jihad through the Afghan war against the Soviets. Afghanistan was the transformative experience: bin Laden discovered that wealthy Muslims could fund and facilitate a victorious holy war, and he became convinced that the same model could be applied globally.",
        lessonTitles: []
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "The Base",
        startPage: 79,
        endPage: 116,
        part: "Part 1 · The Terrorists",
        refresher: "The founding of al-Qaeda in 1988 in Afghanistan — 'the Base' — is reconstructed from testimony, documents, and intelligence records. Wright shows how the anti-Soviet jihad created an international network of experienced fighters, fundraisers, and logistics experts who returned to their home countries radicalised and trained. Al-Qaeda's founding document defined it as a vanguard organisation, not a mass movement — a small elite that would inspire and direct global jihad. The chapter traces bin Laden's break with Saudi Arabia after the Gulf War (when he opposed American troops on Saudi soil) and his subsequent statelessness.",
        lessonTitles: ["Al-Qaeda's Founding and Structure"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "The Kingdom and the Power",
        startPage: 117,
        endPage: 148,
        part: "Part 2 · The Counterterrorists",
        refresher: "The chapter pivots to introduce the American side: John O'Neill, head of the FBI's counterterrorism division in New York, who became almost uniquely obsessed with the threat from al-Qaeda years before anyone else in the US government took it seriously. Wright draws O'Neill as a vivid character — brilliant, compulsive, self-destructive — and traces his early warnings about bin Laden being met with bureaucratic indifference. The chapter also introduces the structural problem: the FBI and CIA were designed as competitive institutions, the CIA legally prohibited from sharing intelligence with domestic law enforcement, and both more interested in protecting their own turf than in coordinating against a shared threat.",
        lessonTitles: ["FBI vs CIA: The Intelligence Failure"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "The Terrorist Tourist",
        startPage: 149,
        endPage: 184,
        part: "Part 2 · The Counterterrorists",
        refresher: "Al-Qaeda's global expansion through the 1990s: operations in Somalia, Yemen, and Sudan, and the first World Trade Center bombing in 1993 (not by al-Qaeda but by its ideological orbit). Wright tracks the growing sophistication of al-Qaeda's operations as bin Laden, now based in Sudan, builds a parallel state — businesses, training camps, a global network of cells. He also follows O'Neill and Ali Soufan (the FBI's Arabic-speaking analyst) as they begin to piece together a picture of the network from fragments of intelligence. The intelligence picture was always incomplete; the failure to share information meant each agency had only partial vision.",
        lessonTitles: []
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "The Spy",
        startPage: 185,
        endPage: 218,
        part: "Part 2 · The Counterterrorists",
        refresher: "Ali Soufan is introduced more fully — a Lebanese-American FBI agent who became one of the few people in US intelligence fluent in Arabic, immersed in Islamic theology, and capable of understanding al-Qaeda's ideological motivations from the inside. Wright traces Soufan's realisation that the standard law enforcement approach to terrorism — treat it as crime, wait for a specific plot, gather evidence for prosecution — was catastrophically inadequate for an organisation planning mass casualty attacks. The chapter also examines the CIA's use of human sources inside al-Qaeda and their growing but withheld understanding of the network's capabilities.",
        lessonTitles: []
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "The Fall of the House of Saud?",
        startPage: 219,
        endPage: 252,
        part: "Part 2 · The Counterterrorists",
        refresher: "The 1996 Khobar Towers bombing in Saudi Arabia, which killed 19 American airmen, becomes a case study in intelligence and jurisdictional failure. Wright traces the FBI's investigation — O'Neill pushing aggressively for access to the bomb site and the Saudi detainees, the Saudi government blocking access for reasons of domestic politics — and the subsequent debate about Iranian versus al-Qaeda involvement. The chapter is a detailed portrait of how terrorism investigations are compromised by geopolitical considerations, allied governments' self-interest, and bureaucratic competition between agencies more concerned with their own primacy than with finding the truth.",
        lessonTitles: []
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Two Declarations",
        startPage: 253,
        endPage: 284,
        part: "Part 3 · The Millennium",
        refresher: "Bin Laden issues two declarations of war against the United States in 1996 and 1998. The second, signed with Zawahiri, declared it a religious duty for every Muslim to kill Americans and their allies wherever they could be found. Wright examines the American response: the declarations were noted, debated, and largely dismissed as bluster. The chapter traces the Clinton administration's internal debates about targeted killing of bin Laden — legally fraught, operationally difficult, politically risky — and the several occasions on which operations were called off at the last minute for reasons of legal ambiguity or risk of civilian casualties.",
        lessonTitles: ["The Declarations of War America Ignored"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "The Attacks",
        startPage: 285,
        endPage: 320,
        part: "Part 3 · The Millennium",
        refresher: "The 1998 US embassy bombings in Kenya and Tanzania — the first al-Qaeda attacks that produced mass casualties — are reconstructed in painful detail: 224 killed, 5,000 injured. Wright follows the FBI investigation, in which Soufan and O'Neill play central roles, showing how the attacks revealed al-Qaeda's genuine operational capability for the first time to most of the US government. He also traces the US retaliation — cruise missile strikes on an al-Qaeda camp in Afghanistan and a pharmaceutical factory in Sudan — which was widely mocked as 'aspirins and camp followers,' and which confirmed to bin Laden that America would not respond with the sustained commitment that a genuine military campaign would require.",
        lessonTitles: []
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "The Millennium Plot",
        startPage: 321,
        endPage: 356,
        part: "Part 3 · The Millennium",
        refresher: "The foiled plot to bomb Los Angeles International Airport on New Year's Eve 1999 — the millennium — becomes a case study in the counterterrorism system working almost by accident. Ahmed Ressam was stopped at the Canadian border not by intelligence but by an alert customs agent. The near-miss produced a burst of interagency cooperation and focus. Wright traces the simultaneous unravelling of another millennium plot in Jordan, and the NSC's recognition in early 2000 that al-Qaeda was planning multiple simultaneous attacks on scale not previously attempted. The sense of genuine threat briefly unified American institutions — then the millennium passed and attention dispersed.",
        lessonTitles: []
      },
      {
        num: 11,
        label: "Chapter 11",
        title: "The End of the World As We Know It",
        startPage: 357,
        endPage: 392,
        part: "Part 4 · September 11",
        refresher: "The USS Cole bombing in Yemen (October 2000) — which killed 17 sailors — is the book's penultimate catastrophe. Wright uses it to crystallise the intelligence failure: the FBI had evidence that linked the Cole bombing to al-Qaeda within weeks; the CIA had information about two of the future 9/11 hijackers being in the United States; neither shared the information with the other or with the White House in time for it to matter. O'Neill is shown in his final assignment in Yemen, battling the US Ambassador for access to the crime scene and witnesses, increasingly convinced that the next attack would be inside the United States.",
        lessonTitles: []
      },
      {
        num: 12,
        label: "Chapter 12",
        title: "September 11, 2001",
        startPage: 393,
        endPage: 435,
        part: "Part 4 · September 11",
        refresher: "The morning of September 11 is narrated from multiple perspectives simultaneously — the hijackers, the air traffic controllers, the NORAD commanders, the people in the towers. John O'Neill, who had left the FBI and taken the job of security director at the World Trade Center just weeks earlier, is inside the towers that morning. Wright traces the chaos of the response — confused chains of command, inadequate communications, the inability to co-ordinate fighter jets — and follows Ali Soufan as he receives the news in Yemen and begins the work of identifying the hijackers. The chapter is devastating in its detail: the catastrophe that had been predicted, prepared for, and then systemically prevented from being prevented.",
        lessonTitles: ["The Systemic Failure Behind 9/11"]
      },
      {
        num: 13,
        label: "Epilogue",
        title: "The Reckoning",
        startPage: 436,
        endPage: 469,
        part: null,
        refresher: "Wright assesses the institutional failures that made 9/11 possible: the rivalry between the FBI and CIA, the wall between intelligence and law enforcement, the failure of imagination about what al-Qaeda would attempt, and the political decisions (in both the Clinton and early Bush administrations) that repeatedly deferred sustained engagement with the threat. He also traces what happened to the surviving protagonists: Soufan continued as an interrogator and later testified about the CIA's use of torture. The epilogue is a meditation on accountability — who bore responsibility for the failure, and what kind of institutional change was required to prevent recurrence.",
        lessonTitles: []
      }
    ]
  },

  "Nexus": {
    totalPages: 391,
    chapters: [
      {
        num: 0,
        label: "Introduction",
        title: "The Intelligent Network",
        startPage: 1,
        endPage: 20,
        part: null,
        refresher: "Harari opens with the central question: is AI simply a new tool, like the printing press, or is it something categorically different? His answer: AI is the first technology in history capable of making decisions, generating ideas, and taking actions autonomously — it is not a tool but an agent. This transforms the nature of information networks. Throughout history, information networks connected human nodes; AI networks can replace human nodes entirely. The book is organised as a history of information networks and their relationship to power, culminating in what AI changes about that relationship.",
        lessonTitles: []
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "What Is Information?",
        startPage: 21,
        endPage: 44,
        part: "Part 1 · Human Networks",
        refresher: "Harari rejects the naive view of information as a representation of reality and argues instead that information is fundamentally a social phenomenon: it connects nodes in a network, and its value is determined by that network rather than by its correspondence to external truth. This has a radical implication: information can be completely false and still be powerful if it successfully coordinates human behaviour. The Bible, nationalist myths, and legal fictions (corporations, nations) are all 'useful fictions' — information that doesn't correspond to physical reality but coordinates millions of people effectively. Understanding information as a network phenomenon rather than a truth-tracking phenomenon changes how we should think about fake news, propaganda, and AI-generated content.",
        lessonTitles: ["Information as a Social Phenomenon"]
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "Stories: Unlimited Connections",
        startPage: 45,
        endPage: 70,
        part: "Part 1 · Human Networks",
        refresher: "Shared stories are what allow humans — unlike any other animal — to cooperate in large, flexible groups with strangers. Harari develops his argument from Sapiens: the cognitive revolution enabled large-scale cooperation through shared myths. But unlike Sapiens, which treated this as primarily a feature of human biology, Nexus asks what this means for information network design. Stories can bind millions but they can also mislead millions; the same capacity that enables human civilisation enables human catastrophe. The question for information network design is not just 'what stories are true' but 'what network structures distinguish truth-tracking from truth-distorting',",
        lessonTitles: []
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "Documents: The Bite of Reality",
        startPage: 71,
        endPage: 96,
        part: "Part 1 · Human Networks",
        refresher: "Writing introduced something new: a mechanism for checking stories against external reality. Documents — tax records, contracts, maps, census data — impose constraints on what stories can be told. You can tell a story that contradicts a tax record, but eventually the discrepancy shows up. Bureaucratic documentation was not primarily about truth-seeking but about power: the state needed to count, measure, and track its subjects in order to tax and conscript them. Nevertheless, the infrastructure of documentation created the conditions for a new relationship between information and reality. Science, law, and journalism all grew from the documentary tradition.",
        lessonTitles: ["Writing, Power, and Bureaucracy"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "Errors: Self-Correcting and Self-Reinforcing Systems",
        startPage: 97,
        endPage: 120,
        part: "Part 1 · Human Networks",
        refresher: "The book's most important analytical distinction: some information networks are self-correcting (they have mechanisms that detect and fix errors) while others are self-reinforcing (they amplify errors). Science is the paradigmatic self-correcting network: peer review, replication, falsifiability, and the norm of following evidence even when it contradicts prior beliefs. Religious orthodoxies and authoritarian propaganda systems are self-reinforcing: they define any challenge to the dominant narrative as error and suppress it. Harari argues that the health of a society's information network depends on its error-correction capacity, and that this capacity is always under political pressure.",
        lessonTitles: ["Self-Correcting vs Self-Reinforcing Information Networks"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "A First Look at History: The Circle of Goodness",
        startPage: 121,
        endPage: 146,
        part: "Part 2 · The Information-Power Nexus",
        refresher: "Harari introduces the 'circle of goodness' — the naive view that powerful information networks are driven by truth and that truth ultimately prevails. In this view, the printing press spread the Reformation because the reformers were right; democracy spread because self-governance is better; science triumphed because it works. He will spend the next several chapters dismantling this view, showing that information networks are shaped far more by power dynamics than by truth-tracking. Powerful institutions control information networks not to seek truth but to maintain power, and they are often devastatingly effective at this.",
        lessonTitles: []
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "The Naive View of Information",
        startPage: 147,
        endPage: 172,
        part: "Part 2 · The Information-Power Nexus",
        refresher: "The naive view — that more information leads to better decisions and freer societies — is challenged through historical examples. The printing press did not produce the Enlightenment; it produced a century of religious wars before eventually contributing to the Enlightenment. The internet has not produced a global democratic awakening; it has provided powerful tools for authoritarian governments to monitor and manipulate their populations. Harari's argument: the effects of information technology depend entirely on the institutional and power context into which it is introduced. Technology is not inherently liberating or oppressive — it amplifies existing power dynamics.",
        lessonTitles: ["Technology Amplifies Power, Not Freedom"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "Bureaucracy: Oracles, Priests, and Procedures",
        startPage: 173,
        endPage: 200,
        part: "Part 2 · The Information-Power Nexus",
        refresher: "Harari examines bureaucracy as an information network designed to implement large-scale coordination: it converts decisions made at the top into actions implemented throughout the system through standardised procedures, hierarchies, and documentation. Bureaucracy's great strength is scale: it can coordinate millions of actions without requiring each individual to understand the whole. Its great weakness is rigidity: it is optimised for known problems and fails badly when reality departs from the procedures written to handle it. He examines both ancient bureaucracies (Egypt, Rome, China) and modern ones, showing the same structural tensions across all of them.",
        lessonTitles: []
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Science: The Covenant with Truth",
        startPage: 201,
        endPage: 226,
        part: "Part 2 · The Information-Power Nexus",
        refresher: "Science is the most powerful self-correcting information network humans have ever built, but it depends on an institutional covenant — a set of norms, incentives, and practices that maintain truth-tracking in the face of constant pressure toward self-reinforcement. Harari traces how that covenant was established (the scientific revolution, peer review, replication requirements) and how it is constantly under threat: from funding dependence on interested parties, from prestige incentives that reward novel findings over replication, from political pressure to reach predetermined conclusions. His concern: AI changes the economics of science in ways that could undermine the covenant.",
        lessonTitles: ["Science as an Institutional Covenant"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Democracy and the Public Sphere",
        startPage: 227,
        endPage: 256,
        part: "Part 2 · The Information-Power Nexus",
        refresher: "Democracy is also an information processing system: it aggregates the distributed knowledge and preferences of millions of people through elections, free speech, and an independent press. Harari examines what makes democratic information networks self-correcting: the ability to vote out leaders who fail, the freedom to criticise power, and the institutional separation between political authority and information channels. He traces how these features have been eroded — through media capture, algorithmic manipulation, and the deliberate flooding of the public sphere with misinformation — and argues that democracy's information infrastructure is more fragile than it appears.",
        lessonTitles: ["Democracy as an Information Network"]
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "Totalitarianism: The Information Flood",
        startPage: 257,
        endPage: 284,
        part: "Part 2 · The Information-Power Nexus",
        refresher: "Totalitarian regimes of the 20th century solved the problem of political control not primarily through censorship but through information flood — overwhelming citizens with so much contradictory, unreliable, and ideologically distorted information that they lost their capacity to distinguish true from false and retreated into cynicism or compliance. Harari traces this dynamic through Nazi Germany and the Soviet Union, and argues it is more relevant than censorship as a model for 21st-century information control. AI enables the information flood strategy at unprecedented scale and precision, targeting individuals with content calibrated to their specific psychological vulnerabilities.",
        lessonTitles: ["Totalitarianism and Information Flood"]
      },
      {
        num: 11,
        label: "Chapter 11",
        title: "The Silicon Curtain: Global Empire or Global Split?",
        startPage: 285,
        endPage: 314,
        part: "Part 3 · Computer Networks and AI",
        refresher: "The geopolitics of AI are examined through the lens of information network history. The internet was built on an assumption of global interconnection; AI is being built within national silos, with the US and China developing competing AI ecosystems that may become incompatible. Harari examines the prospect of a 'Silicon Curtain' — a technological divide analogous to the Iron Curtain — where the world splits into incompatible AI-based information networks with fundamentally different values and capabilities. He argues this split is already occurring and has profound implications for global governance, trade, and the possibility of international coordination on AI safety.",
        lessonTitles: []
      },
      {
        num: 12,
        label: "Chapter 12",
        title: "The AI Takeover: New Masters or Old Masters' Tools?",
        startPage: 315,
        endPage: 352,
        part: "Part 3 · Computer Networks and AI",
        refresher: "The central question: does AI represent a qualitative break from previous information technologies, or is it simply a more powerful version of what came before? Harari argues it is a genuine break because it introduces non-human decision-making into information networks that previously consisted entirely of human nodes. Previous technologies (printing press, internet) changed how humans communicate; AI changes who communicates. The implications for power: whoever controls the AI systems controls entities capable of decisions and actions at a scale no human institution can match. This creates the possibility — for the first time in history — of non-human entities holding genuine social power.",
        lessonTitles: ["AI as Non-Human Agent in Information Networks"]
      },
      {
        num: 13,
        label: "Chapter 13",
        title: "The Democracy Remaining: Can We Still Shape AI?",
        startPage: 353,
        endPage: 378,
        part: "Part 3 · Computer Networks and AI",
        refresher: "The final chapter before the conclusion examines whether democratic governance of AI is still possible. Harari's argument: the window is closing, not closed. AI systems are increasingly embedded in critical infrastructure, financial systems, and political communication before governance frameworks exist. The key choices — about who trains AI systems, on what data, with what objectives, accountable to whom — are being made right now by a small number of corporations and governments with limited democratic input. Delay in establishing governance is not neutral: every year of ungoverned AI deployment makes governance harder because of path dependence and vested interests.",
        lessonTitles: ["The Closing Window for AI Governance"]
      },
      {
        num: 14,
        label: "Conclusion",
        title: "The Intelligent Network: What Should We Do?",
        startPage: 379,
        endPage: 391,
        part: null,
        refresher: "Harari closes with a call for treating AI governance as the defining political challenge of the 21st century — analogous to nuclear governance after Hiroshima but more urgent because AI proliferates faster and invisibly. His prescriptions are institutional rather than technical: require AI transparency (who built it, on what data, for what purpose), establish democratic oversight of critical AI systems, invest in AI literacy so citizens can participate in governance debates. His deepest worry: that the speed of AI development will outpace the development of the institutional capacities needed to govern it, producing an intelligent network that serves the interests of its builders rather than humanity as a whole.",
        lessonTitles: ["AI Governance as the Defining Challenge"]
      }
    ]
  },

  "The Big Short": {
    totalPages: 266,
    chapters: [
      {
        num: 0,
        label: "Prologue",
        title: "Poltergeist",
        startPage: 1,
        endPage: 12,
        part: null,
        refresher: "Lewis opens with Steve Eisman — abrasive, brilliant, newly bearish on Wall Street — at a dinner where he meets Vincent Daniel, who spent months at a law firm auditing subprime mortgage securitisations and came away convinced the entire machine was fraudulent. Lewis sets up the book's central puzzle: the financial system was not just taking on risk it didn't understand — it was actively creating it, layering bad loans into instruments rated AAA, selling them to pension funds and foreign banks as if they were treasury bonds. The book will follow the handful of people who saw this, bet against it, and spent years wondering if they were wrong.",
        lessonTitles: []
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "A Secret Origin Story",
        startPage: 13,
        endPage: 38,
        part: null,
        refresher: "Michael Burry is introduced: a one-eyed physician turned self-taught investor who ran a hedge fund from a San Jose office while wearing shorts and metal T-shirts. By 2004 Burry had become obsessed with the subprime mortgage market and began reading the actual loan files underlying mortgage-backed securities — something almost no one else on Wall Street was doing. What he found: teaser rates, stated-income loans, no documentation, loans to people who demonstrably could not afford them. He concluded the entire market would collapse when the teaser rates reset, and began buying credit default swaps — insurance policies — against specific mortgage bonds. His investors thought he had lost his mind.",
        lessonTitles: ["Reading the Fine Print Others Ignore"]
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "In the Land of the Blind",
        startPage: 39,
        endPage: 66,
        part: null,
        refresher: "The chapter explains how the mortgage bond market grew from a specialist backwater to the dominant force in global finance. Lewis traces the role of Salomon Brothers in the 1980s (where Lewis himself worked), the invention of the mortgage-backed security, and the subsequent decades of financial innovation that turned individual mortgages into global financial instruments. The rating agencies — Moody's and S&P — sit at the centre of the problem: they rated pools of subprime loans AAA based on models that assumed house prices had never fallen nationally and never would. Wall Street banks gamed those models routinely.",
        lessonTitles: ["How Ratings Agencies Failed"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: '"How Can a Guy Who Can\'t Speak English Lie?"',
        startPage: 67,
        endPage: 92,
        part: null,
        refresher: "Steve Eisman's story deepens. He had spent years covering subprime lenders for Oppenheimer and watched with increasing disgust as companies that made predatory loans — charging exorbitant rates to borrowers who didn't understand the terms — were celebrated on Wall Street. His conversion from sceptic to short-seller came from a close reading of prospectuses that revealed the underlying loans were getting systematically worse: lower FICO scores, higher loan-to-value ratios, more stated-income (liar) loans. Lewis introduces the CDO — the collateralised debt obligation — the instrument that allowed Wall Street to manufacture more AAA-rated paper from the same underlying pool of junk.",
        lessonTitles: ["CDOs and Manufactured AAA Ratings"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "How to Harvest a Migrant Worker",
        startPage: 93,
        endPage: 120,
        part: null,
        refresher: "The chapter follows the actual loan origination process — the source of the raw material the Wall Street machine consumed. Lewis traces a mortgage broker in Bakersfield, California, writing loans to strawberry pickers on incomes of $14,000 a year for $750,000 houses, with no documentation required. The broker didn't care about repayment because he sold the loan immediately to a bank, which packaged it into a bond, which was sliced into tranches, which was repackaged into a CDO, which was re-repackaged into a CDO-squared. At each step someone took a fee; at no step did anyone bear the risk of the underlying borrower defaulting.",
        lessonTitles: ["Originate-to-Distribute and Moral Hazard"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "Accidental Capitalists",
        startPage: 121,
        endPage: 148,
        part: null,
        refresher: "Charlie Ledley and Jamie Mai are introduced — two men who had started Cornwall Capital with $110,000 in a shed and built it into a small hedge fund through a strategy of finding bets where the options market was mispricing extreme outcomes. They stumbled into subprime shorts almost accidentally and were baffled by what they found: the market was offering insurance against catastrophic outcomes at prices that implied catastrophe was nearly impossible. They began buying credit default swaps on CDO tranches for cents on the dollar — bets that, if they paid off, would return hundreds of times their cost.",
        lessonTitles: []
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "Spider-Man at the Venetian",
        startPage: 149,
        endPage: 172,
        part: null,
        refresher: "The annual subprime mortgage conference in Las Vegas provides the book's most vivid scene. Eisman, Daniel, and their analyst Danny Moses attend, expecting to find at least some anxiety about the deteriorating loan quality. Instead they find euphoria: salespeople, brokers, and bankers celebrating record volumes, certain that rising house prices would continue to rescue any bad loans. Eisman becomes openly contemptuous in meetings with bond salespeople and rating agency analysts, unable to believe that the people running this machine don't see what he sees. Lewis uses the conference to crystallise the book's central theme: the catastrophe was visible to anyone willing to look.",
        lessonTitles: ["Wilful Blindness in Finance"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "The Great Treasure Hunt",
        startPage: 173,
        endPage: 196,
        part: null,
        refresher: "As housing markets begin to show stress in 2006-2007, the shorts try to understand why the bonds they've bet against haven't fallen in price despite rising delinquencies. The answer lies in the CDO machine: Wall Street banks were buying their own bonds to feed into new CDOs, artificially supporting prices. Deutsche Bank's Greg Lippmann — who sold Burry and others their credit default swaps — has become a fellow traveller, also betting against the market he's supposed to be supporting. Lewis reveals the surreal double-dealing at the heart of the collapse: the same banks selling mortgage bonds to clients were internally betting against them.",
        lessonTitles: ["Conflicts of Interest at Major Banks"]
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "The Long Quiet",
        startPage: 197,
        endPage: 216,
        part: null,
        refresher: "The period of maximum stress for the shorts: 2006 into early 2007. Delinquencies are rising but bond prices are barely moving. Burry's investors are furious — he has locked up their capital in bets that seem to be going nowhere, and several are suing to get their money back. Eisman's fund is bleeding carry costs (the insurance premiums paid monthly on the credit default swaps). Lewis examines the psychological toll of being right but early: you face the full social and financial cost of being a contrarian before you see any vindication, and there is no guarantee vindication will come before you run out of capital or nerve.",
        lessonTitles: ["The Cost of Being Early"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "A Death of Interest",
        startPage: 217,
        endPage: 236,
        part: null,
        refresher: "The collapse begins. Bear Stearns' two internal hedge funds, which held concentrated positions in CDOs, collapse in June 2007. For the first time the possibility of systemic crisis becomes public. The shorts watch their bets finally begin to pay off, but the experience is not triumphant — it's disorienting. Eisman, Burry, and Ledley had all assumed that when the market recognised the crisis, the prices of their credit default swaps would adjust rationally. Instead, chaos: counterparties refuse to price their positions, bid-ask spreads vanish, and the instruments that were supposed to profit from collapse become as illiquid as everything else.",
        lessonTitles: []
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "Two Men in a Boat",
        startPage: 237,
        endPage: 254,
        part: null,
        refresher: "The final chapter traces the endgame. Eisman meets with a Wing Chun teacher who had lost his savings to a fraudulent subprime lender and feels something unfamiliar: guilt. The people who created this crisis — the bankers, the rating agency analysts, the brokers — suffered little; the people who trusted them suffered enormously. Lewis follows Burry's final reckoning with his investors, who are furious despite having made enormous returns, because he made them without their consent. Cornwall Capital finally gets paid on their swaps. The chapter catalogues how thoroughly the institutions failed — and how thoroughly the individuals who ran them escaped accountability.",
        lessonTitles: ["Accountability and the 2008 Crisis"]
      },
      {
        num: 11,
        label: "Epilogue",
        title: "Everything Is Correlated",
        startPage: 255,
        endPage: 266,
        part: null,
        refresher: "Lewis returns to where the book started: Steve Eisman, now even more disillusioned. The epilogue is a moral reckoning. The financial system was not brought down by a few bad actors but by a machine that rewarded short-term risk-taking and socialised long-term losses — and which, despite the crisis, remained largely intact. Lewis traces what happened to the protagonists: Burry retreated almost entirely from markets; Eisman started a new fund. The broader system was bailed out, reformed minimally, and resumed operations. Lewis's conclusion is bleak: the same incentives that created the crisis remain in place, and the question is not whether another crisis will occur but what it will look like.",
        lessonTitles: ["Systemic Risk and Moral Hazard"]
      }
    ]
  },

  "Naked Economics": {
    totalPages: 278,
    chapters: [
      {
        num: 0,
        label: "Introduction",
        title: "The Power of Economics",
        startPage: 1,
        endPage: 14,
        part: null,
        refresher: "Wheelan's premise: economics is not about graphs and equations but about understanding how the world works. Economists have a set of tools — incentives, trade-offs, opportunity costs, marginal thinking — that produce non-obvious insights about everything from drug policy to education reform. The book is an attempt to make those tools accessible without dumbing them down. The goal is not to turn readers into economists but to help them think like one.",
        lessonTitles: []
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "Who Feeds Paris? The Power of Markets",
        startPage: 15,
        endPage: 38,
        part: null,
        refresher: "The miracle of market coordination: Paris wakes up every morning with its 10 million residents fed, without any central authority planning where the bread comes from. Price signals aggregate dispersed information better than any planner could — when prices rise, producers expand supply; when they fall, producers cut back. Wheelan traces the invisible hand from Adam Smith through modern supply chains to show that the apparent chaos of markets is in fact a sophisticated information-processing system. Markets fail when prices lie — when externalities, monopolies, or information asymmetries prevent prices from reflecting true costs.",
        lessonTitles: ["The Invisible Hand", "Price Signals as Information"]
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "Incentives Matter",
        startPage: 39,
        endPage: 64,
        part: null,
        refresher: "Every policy and institution creates incentives, intended or not. Wheelan catalogs how well-meaning interventions produce perverse outcomes when they alter incentives in unexpected ways: rent control reduces housing supply, mandatory helmets may increase bicycle accidents (risk compensation), paying blood donors can crowd out volunteer donors. The chapter introduces the concept of moral hazard — when insurance or protection from consequences encourages the very behavior it was meant to prevent — and applies it to banking, healthcare, and foreign aid.",
        lessonTitles: ["Perverse Incentives", "Moral Hazard Explained"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "Government and the Economy",
        startPage: 65,
        endPage: 92,
        part: null,
        refresher: "Markets fail in predictable ways: public goods (defence, lighthouses, basic research) that everyone benefits from but no one will pay for voluntarily; externalities (pollution, congestion) where private costs don't reflect social costs; and natural monopolies where competition is inefficient. These failures justify government intervention. But government also fails in predictable ways: public choice theory shows that politicians respond to concentrated interest groups rather than diffuse public goods. Wheelan argues the question is not 'markets or government' but which tool is better suited to which problem.",
        lessonTitles: ["Market Failures and Public Goods", "Government Failure and Public Choice"]
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "Government and the Economy II: Fix It or Live With It",
        startPage: 93,
        endPage: 114,
        part: null,
        refresher: "The second government chapter focuses on tools: regulation, taxes, and subsidies as mechanisms for correcting market failures versus the costs those tools impose. Wheelan examines environmental policy, healthcare, and poverty programs through this lens — when does the cure cost more than the disease? He introduces cost-benefit analysis as the economist's framework for evaluating policy, and explains why economists often favour market-based solutions (carbon taxes over cap-and-trade mandates, vouchers over direct provision) even for social goals.",
        lessonTitles: []
      },
      {
        num: 5,
        label: "Chapter 5",
        title: "Economics of Information",
        startPage: 115,
        endPage: 138,
        part: null,
        refresher: "When one party to a transaction knows more than the other, markets malfunction. Wheelan explains adverse selection (bad risks crowd out good ones when buyers can't distinguish them — Akerlof's used car market) and how it explains why health insurance markets without mandates collapse: only sick people want insurance, so premiums rise, which drives out healthy people, which raises premiums further. He also explains signalling — why education functions partly as a credential rather than as skill acquisition, and why hiring practices, warranties, and brand reputations are mechanisms for conveying information cheaply.",
        lessonTitles: ["Adverse Selection", "Signalling and Credentials"]
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "Productivity and Human Capital",
        startPage: 139,
        endPage: 162,
        part: null,
        refresher: "Long-run living standards are determined almost entirely by productivity — output per worker per hour. Wheelan traces what drives productivity: physical capital (tools and machines), human capital (education, skills, health), and technology. He examines the economics of education in detail — why the returns to schooling have risen dramatically, why not everyone invests optimally in their own human capital (information problems, credit constraints, present bias), and why the gap between skilled and unskilled wages has widened. The chapter argues that human capital investment is the closest thing economics has to a free lunch.",
        lessonTitles: ["Human Capital and Economic Growth"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "Financial Markets",
        startPage: 163,
        endPage: 186,
        part: null,
        refresher: "Financial markets serve two functions: moving capital from savers to productive uses, and allocating risk to those best able to bear it. Wheelan explains stocks, bonds, mutual funds, and derivatives as mechanisms for these functions — not as abstract instruments but as solutions to real economic problems. He addresses the efficient market hypothesis — prices reflect all available information, so beating the market consistently is nearly impossible — and its implication: most actively managed funds underperform index funds after fees. He also addresses financial crises as failures of risk allocation, where risks were mis-priced or concealed.",
        lessonTitles: ["Efficient Markets", "Why Index Funds Win"]
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "The Power of Organized Interests",
        startPage: 187,
        endPage: 206,
        part: null,
        refresher: "Why does bad policy persist? Public choice economics explains: small, concentrated interest groups (sugar producers, steel manufacturers, taxi companies) have strong incentives to lobby for policies that benefit them at diffuse cost to the public — each voter loses pennies while the industry gains millions. Voters rationally ignore small losses; industries spend heavily to protect large gains. The result is a systematic bias toward protectionism, subsidies, occupational licensing, and regulations that protect incumbents. Wheelan argues this is not corruption but rational behaviour by all parties — which makes it harder to fix.",
        lessonTitles: ["Concentrated Benefits, Diffuse Costs"]
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Keeping Score: GDP and Other Measures",
        startPage: 207,
        endPage: 222,
        part: null,
        refresher: "GDP — the total market value of goods and services produced in a country — is the standard measure of economic size, but it omits much that matters (leisure, inequality, environmental degradation, non-market household production) and counts things that shouldn't (the economic activity generated by cleaning up a disaster). Wheelan surveys the debates around GDP's limitations and the alternative measures proposed — Human Development Index, happiness surveys, Genuine Progress Indicator — and explains why economists still rely heavily on GDP despite its flaws: it is consistent, measurable, and correlates with most things people actually care about.",
        lessonTitles: ["What GDP Measures and Misses"]
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "The Federal Reserve",
        startPage: 223,
        endPage: 240,
        part: null,
        refresher: "Central banking is one of economics' genuine success stories: the Federal Reserve's ability to manage money supply and interest rates has eliminated the banking panics that once made recessions catastrophic. Wheelan explains what the Fed does — sets short-term interest rates, acts as lender of last resort, regulates the money supply — and why it matters: too little money causes deflation and recession; too much causes inflation. He traces how the Fed's independence from political pressure (insulated from the electoral incentive to print money before elections) is key to its effectiveness, and what happens when central banks lose that independence.",
        lessonTitles: ["Why Central Bank Independence Matters"]
      },
      {
        num: 11,
        label: "Chapter 11",
        title: "Trade and Globalization",
        startPage: 241,
        endPage: 258,
        part: null,
        refresher: "Free trade is one of economics' most robust findings and most politically unpopular prescriptions. Wheelan explains comparative advantage — even if one country is better at producing everything, both benefit from specialising in what they do relatively better and trading. The aggregate gains from trade are large; the costs are concentrated among workers in import-competing industries. This distribution — diffuse gains, concentrated losses — explains the political economy of protectionism. Wheelan is sympathetic to displaced workers but argues that the solution is compensation and retraining, not import barriers that make everyone poorer to protect a few.",
        lessonTitles: ["Comparative Advantage", "Why Free Trade is Unpopular"]
      },
      {
        num: 12,
        label: "Chapter 12",
        title: "Development Economics",
        startPage: 259,
        endPage: 272,
        part: null,
        refresher: "Why are some countries rich and others poor? Wheelan surveys the landscape: geography, institutions, human capital, colonial history. The evidence increasingly points to institutions — property rights, rule of law, functioning markets, honest government — as the primary determinant of long-run prosperity. Countries with secure property rights and contract enforcement attract investment and enable markets to function; those without them see savings exported and talent emigrated. Foreign aid has a weak record precisely because it can prop up bad institutions; the most effective development interventions work at the institutional level.",
        lessonTitles: ["Why Nations Fail to Develop", "Institutions and Prosperity"]
      },
      {
        num: 13,
        label: "Conclusion",
        title: "Life Is a Series of Trade-offs",
        startPage: 273,
        endPage: 278,
        part: null,
        refresher: "Wheelan closes by returning to the economist's core insight: every choice involves a trade-off, and denying the trade-off doesn't make it go away — it just makes policy worse. The skill economics teaches is to see the full cost of any action, including the opportunity cost (what you give up), the unintended consequences, and who bears the burden. Applied honestly, this is not a conservative or liberal tool but a discipline for clear thinking about a world of scarcity and competing interests.",
        lessonTitles: []
      }
    ]
  },

  "The Shock Doctrine": {
    totalPages: 466,
    chapters: [
      {
        num: 0,
        label: "Introduction",
        title: "Blank Is Beautiful: Three Decades of Erasing and Remaking the World",
        startPage: 3,
        endPage: 24,
        part: null,
        refresher: "Klein opens by introducing the book's central thesis: free-market ideologues have learned to exploit moments of collective shock — coups, disasters, financial crises — to push through radical economic transformations that populations in their right minds would never accept. She draws on Ewen Cameron's CIA-funded psychiatric experiments as the book's governing metaphor: break down all existing structures, then rebuild from scratch according to an imposed blueprint.",
        lessonTitles: ["Disaster as Opportunity for Radicals", "Milton Friedman's Crisis Doctrine", "The Blank Slate Fantasy"]
      },
      {
        num: 1,
        label: "Chapter 1",
        title: "The Torture Lab: Ewen Cameron, the CIA and the Maniacal Quest to Erase and Remake the Human Mind",
        startPage: 25,
        endPage: 48,
        part: "Part 1 · Two Doctor Shocks",
        refresher: "Klein documents the CIA-funded psychiatric experiments of Dr. Ewen Cameron at McGill University: patients were subjected to electroshock at 30-40 times normal intensity, drug-induced sleep for weeks, and recorded messages looped to overwrite their personalities — all in pursuit of a 'blank slate' mind that could be rebuilt from scratch. The chapter establishes the book's central metaphor: economic shock therapy applies the same logic to entire societies, using crisis and disorientation to erase existing structures and impose a new order.",
        lessonTitles: ["The Torture Metaphor Is Literal"]
      },
      {
        num: 2,
        label: "Chapter 2",
        title: "The Other Doctor Shock: Milton Friedman and the Search for a Laissez-Faire Laboratory",
        startPage: 49,
        endPage: 74,
        part: "Part 1 · Two Doctor Shocks",
        refresher: "Klein traces the rise of Milton Friedman and the Chicago School of economics — their belief that markets self-correct, that government intervention is always counterproductive, and that only a crisis produces 'real change.' Friedman understood that political opposition makes gradual reform impossible, so his model required a sudden, simultaneous transformation — a clean break from all existing economic arrangements. Chile under Pinochet became his first real-world laboratory.",
        lessonTitles: ["Chile as the First Laboratory"]
      },
      {
        num: 3,
        label: "Chapter 3",
        title: "States of Shock: The Bloody Birth of the Counterrevolution",
        startPage: 75,
        endPage: 97,
        part: "Part 2 · The First Test",
        refresher: "The September 11, 1973 coup against Chile's Salvador Allende was the shock that created the conditions for the Chicago Boys' economic experiment. Klein shows that the mass arrests, torture centers, and disappearances that followed were not incidental to the economic project — they were its precondition. Unions, opposition politicians, and economists who might have organized resistance were silenced first; then came the rapid privatization, deregulation, and austerity. Political terror and economic shock therapy were two components of the same program.",
        lessonTitles: []
      },
      {
        num: 4,
        label: "Chapter 4",
        title: "Cleaning the Slate: Terror Does Its Work",
        startPage: 98,
        endPage: 115,
        part: "Part 2 · The First Test",
        refresher: "Argentina, Uruguay, and Brazil followed Chile's template through the 1970s: US-backed military coups installed regimes that simultaneously operated torture centers and restructured their economies along Chicago School lines. Argentina's Dirty War disappeared an estimated 30,000 people — economists, union leaders, students — while the junta privatized state industries and opened the economy. Klein argues that in every case the violence preceded and enabled the economics: the blank slate had to be created by force before the free market could be written onto it.",
        lessonTitles: ["Democracy and Free Markets Are Not Twins"]
      },
      {
        num: 5,
        label: "Chapter 5",
        title: '"Entirely Unrelated": How an Ideology Was Cleansed of Its Crimes',
        startPage: 116,
        endPage: 130,
        part: "Part 2 · The First Test",
        refresher: "After the atrocities of the Latin American coups became undeniable, Chicago School economists and their supporters developed a deliberate narrative: the economic reforms and the political terror were 'entirely unrelated' — the economists merely gave technical advice, the generals merely maintained order, and the two had nothing to do with each other. Klein dismantles this story, showing how the cleansing of the ideology from its crimes allowed shock therapy to be repackaged as a neutral, technical solution and exported globally.",
        lessonTitles: []
      },
      {
        num: 6,
        label: "Chapter 6",
        title: "Saved by a War: Thatcherism and Its Useful Enemies",
        startPage: 131,
        endPage: 141,
        part: "Part 3 · Surviving Democracy",
        refresher: "Margaret Thatcher's radical privatization program was losing public support when the 1982 Falklands War transformed her political fortunes. Klein shows how military victory generated a nationalist surge that gave Thatcher the authority to push through policies — breaking the miners' union, privatizing utilities, gutting manufacturing — that had been politically impossible before. The Falklands demonstrated that in a democracy, war can serve the same function as a coup: suspending normal political resistance long enough to impose radical economic change.",
        lessonTitles: ["The Falklands War Enabled Thatcherism"]
      },
      {
        num: 7,
        label: "Chapter 7",
        title: "The New Doctor Shock: Economic Warfare Replaces Dictatorship",
        startPage: 142,
        endPage: 154,
        part: "Part 3 · Surviving Democracy",
        refresher: "Jeffrey Sachs developed shock therapy as an explicitly democratic alternative to the military coups that had previously enforced free-market restructuring. In Bolivia's 1985 hyperinflation crisis, Sachs advised the government to implement all reforms simultaneously — eliminate subsidies, open borders, deregulate — rather than gradually. The 'shock' of rapid transformation was supposed to prevent political resistance from forming before the new system was locked in. Bolivia stabilized but impoverished; the template was nonetheless exported.",
        lessonTitles: []
      },
      {
        num: 8,
        label: "Chapter 8",
        title: "Crisis Works: The Packaging of Shock Therapy",
        startPage: 155,
        endPage: 170,
        part: "Part 3 · Surviving Democracy",
        refresher: "Klein examines how economic crisis itself became a tool for imposing reforms that populations would otherwise reject. The IMF's structural adjustment programs used debt crises as leverage: governments in financial trouble were offered emergency loans only in exchange for rapid privatization, austerity, and deregulation. The 'crisis' framing created urgency that bypassed democratic deliberation — there was no time to debate, only to sign. This shift from military coups to economic conditionality was the shock doctrine's adaptation to the post-Cold War democratic era.",
        lessonTitles: []
      },
      {
        num: 9,
        label: "Chapter 9",
        title: "Slamming the Door on History: A Crisis in Poland, a Massacre in China",
        startPage: 171,
        endPage: 193,
        part: "Part 4 · Lost in Transition",
        refresher: "Klein examines two simultaneous crises in 1989 that shaped the post-Cold War economic order. Poland's Solidarity movement won democratic elections but immediately accepted IMF shock therapy, surrendering the economic sovereignty its workers had spent a decade fighting for. In China, the Tiananmen Square massacre silenced democratic opposition just as the Communist Party was opening the economy to foreign capital. Klein argues both events illustrate the same pattern: political openness and economic liberalization move in opposite directions.",
        lessonTitles: ["Poland as the Counter-Example"]
      },
      {
        num: 10,
        label: "Chapter 10",
        title: "Democracy Born in Chains: South Africa's Constricted Freedom",
        startPage: 194,
        endPage: 215,
        part: "Part 4 · Lost in Transition",
        refresher: "Nelson Mandela's ANC won political liberation in 1994 but surrendered economic sovereignty in secret negotiations, accepting IMF and World Bank conditions that locked in the apartheid regime's economic structures as a precondition for international recognition. Klein shows how South Africa's transition produced a profound split: Black South Africans gained the right to vote and hold office, while economic power — the mines, banks, and major industries — remained overwhelmingly white. Political freedom and economic freedom were deliberately severed.",
        lessonTitles: []
      },
      {
        num: 11,
        label: "Chapter 11",
        title: "Bonfire of a Young Democracy: Russia Chooses 'the Pinochet Option'",
        startPage: 216,
        endPage: 237,
        part: "Part 4 · Lost in Transition",
        refresher: "When the Russian parliament resisted Yeltsin's shock therapy program in October 1993, he dissolved it unconstitutionally and — urged by Western advisors who saw the parliamentary resistance as an obstacle to reform — shelled the building with tanks. The political shock created the conditions for rapid privatization: Russia's vast state industries were sold at a fraction of their value through insider auctions, creating an oligarch class virtually overnight. Western governments and economists celebrated the outcome as a democratic triumph.",
        lessonTitles: ["Russia's Shock Therapy Catastrophe"]
      },
      {
        num: 12,
        label: "Chapter 12",
        title: "The Capitalist Id: Russia and the New Era of the Boor Market",
        startPage: 238,
        endPage: 259,
        part: "Part 4 · Lost in Transition",
        refresher: "Klein examines the aftermath of Russia's shock therapy: the emergence of a small class of billionaire oligarchs who acquired state industries for cents on the dollar, a middle class that was destroyed by hyperinflation, and a population whose life expectancy collapsed. The 'free market' that emerged was not Adam Smith's competitive economy but a system of state-sponsored theft dressed in market language. Klein calls it the 'capitalist id' — the raw accumulation instinct freed from any social constraint — and traces how this model inspired disaster capitalism globally.",
        lessonTitles: []
      },
      {
        num: 13,
        label: "Chapter 13",
        title: 'Let It Burn: The Looting of Asia and "the Fall of a Second Berlin Wall"',
        startPage: 260,
        endPage: 282,
        part: "Part 4 · Lost in Transition",
        refresher: "The 1997 Asian financial crisis began as a currency contagion in Thailand but was transformed by the IMF into a restructuring opportunity. Klein shows how the IMF's conditions — imposed at the peak of financial panic — forced South Korea, Thailand, and Indonesia to open their economies to foreign ownership of industries and banks that domestic investors had previously been protected from acquiring. Crisis once again served as the mechanism: populations in shock accepted terms they would have rejected in calmer times.",
        lessonTitles: ["The Asian Financial Crisis Playbook"]
      },
      {
        num: 14,
        label: "Chapter 14",
        title: 'Shock Therapy in the U.S.A.: The Homeland Security Bubble',
        startPage: 283,
        endPage: 307,
        part: "Part 5 · Shocking Times",
        refresher: "Klein turns to the United States after September 11, 2001, which she argues was treated as the ultimate blank-slate crisis. The Bush administration rapidly privatized homeland security, intelligence, and disaster response functions, creating what Klein calls the 'disaster capitalism complex' — a network of corporations including Halliburton, Bechtel, and Booz Allen Hamilton that derived revenue from perpetual crisis. The Homeland Security bubble, like the dot-com bubble, was driven not by real value creation but by government contracts awarded to politically connected firms.",
        lessonTitles: []
      },
      {
        num: 15,
        label: "Chapter 15",
        title: "A Corporatist State: Removing the Revolving Door, Putting in an Archway",
        startPage: 308,
        endPage: 324,
        part: "Part 5 · Shocking Times",
        refresher: "Klein traces how the revolving door between government and the private sector — once a source of scandal — became normalized and institutionalized after 9/11, creating what she calls a 'corporatist state.' Former corporate executives became department heads; former regulators became industry lobbyists the day after leaving office; entire government functions were outsourced to the same firms that had lobbied to win the contracts. The distinction between public and private governance effectively dissolved.",
        lessonTitles: []
      },
      {
        num: 16,
        label: "Chapter 16",
        title: 'Erasing Iraq: In Search of a "Model" for the Middle East',
        startPage: 325,
        endPage: 340,
        part: "Part 6 · Iraq, Full Circle",
        refresher: "Iraq was planned partly as a neoliberal showcase — the ultimate blank slate. Paul Bremer's Coalition Provisional Authority issued 100 orders in the first weeks of occupation: Iraqi state industries were dissolved, the economy was opened entirely to foreign ownership, import tariffs were eliminated, and a flat tax was imposed — the most radical free-market transformation ever attempted on a populated country. Klein shows that the occupation was simultaneously a military operation and an economic one, and that Iraqis understood and resisted both.",
        lessonTitles: ["The Iraq War as Corporate Bonanza"]
      },
      {
        num: 17,
        label: "Chapter 17",
        title: "Ideological Blowback: A Very Capitalist Disaster",
        startPage: 341,
        endPage: 359,
        part: "Part 6 · Iraq, Full Circle",
        refresher: "Iraq's reconstruction contracts went to American corporations that billed billions while building almost nothing — electricity, clean water, and oil production all remained below pre-invasion levels years after the occupation began. Klein argues the failure was not incidental but structural: the disaster capitalism complex profits from ongoing crisis, not from resolution. The worse things got for Iraqis, the more contracts were awarded. The reconstruction became a case study in how privatized disaster response systematically produces worse outcomes than public alternatives.",
        lessonTitles: []
      },
      {
        num: 18,
        label: "Chapter 18",
        title: "Full Circle: From Blank Slate to Scorched Earth",
        startPage: 360,
        endPage: 384,
        part: "Part 6 · Iraq, Full Circle",
        refresher: "Klein closes the Iraq section by returning to the book's opening metaphor. The US occupation attempted to create a blank slate through shock — invasion, de-Baathification, dissolution of the army, looting of archives and museums — and ended with a scorched earth, a country more destroyed than remade. She traces the direct line from Cameron's psychiatric patients (erased, not rebuilt) to Iraq (destroyed, not reconstructed) and identifies the common logic: the blank-slate ideology always causes more damage than it acknowledges, because it treats existing human institutions as worthless obstacles rather than the product of lived experience.",
        lessonTitles: ["Disaster Capitalism as Growth Industry"]
      },
      {
        num: 19,
        label: "Chapter 19",
        title: 'Blanking the Beach: "The Second Tsunami"',
        startPage: 385,
        endPage: 405,
        part: "Part 7 · The Movable Green Zone",
        refresher: "The 2004 Indian Ocean tsunami killed over 220,000 people and displaced millions. Klein documents how Sri Lankan fishing communities were prevented from returning to their coastal land — which was rezoned for tourist resort development — while international aid flows went to hotel and infrastructure projects rather than rebuilding fishing villages. She calls this 'the second tsunami': the economic shock that followed the natural disaster and systematically dispossessed the poor in favor of wealthier interests.",
        lessonTitles: ["Sri Lanka Tsunami and Beach Privatization"]
      },
      {
        num: 20,
        label: "Chapter 20",
        title: "Disaster Apartheid: A World of Green Zones and Red Zones",
        startPage: 406,
        endPage: 422,
        part: "Part 7 · The Movable Green Zone",
        refresher: "Hurricane Katrina's aftermath revealed what Klein calls 'disaster apartheid': wealthy areas received immediate private security and emergency services while poor Black neighborhoods were abandoned, then cleared for luxury redevelopment. The same pattern appeared globally — from post-tsunami Sri Lanka to post-earthquake Kashmir — with private resources flowing to insured, wealthy areas and public resources systematically redirected. Klein argues this is not dysfunction but the logical endpoint of the shock doctrine: permanent separate-and-unequal systems where wealth determines access to survival.",
        lessonTitles: ["The Hollow State After Disaster"]
      },
      {
        num: 21,
        label: "Chapter 21",
        title: "Losing the Peace Incentive: Israel as Warning",
        startPage: 423,
        endPage: 448,
        part: "Part 7 · The Movable Green Zone",
        refresher: "Klein examines Israel's economy as a case study in disaster capitalism taken to its logical extreme: a country that has made security crisis so central to its economic model that peace becomes economically threatening. Israel's defense and surveillance technology sector — Elbit, Check Point, Rafael — profits from ongoing conflict and exports its solutions to governments worldwide. Klein argues this represents the most advanced version of the disaster capitalism complex: a state that has internalized the logic so thoroughly that it cannot afford to resolve the crises that sustain it.",
        lessonTitles: []
      },
      {
        num: 22,
        label: "Conclusion",
        title: "Shock Wears Off: The Rise of People's Reconstruction",
        startPage: 449,
        endPage: 466,
        part: null,
        refresher: "Klein sees signs that the shock doctrine's power is waning as populations develop immunity. Latin American countries — Venezuela, Bolivia, Ecuador, Argentina — elected governments that explicitly rejected IMF orthodoxy and pursued state-led redistribution. In New Orleans, Sri Lanka, and Lebanon, grassroots movements built 'people's reconstruction' that prioritized community needs over profit. The shock doctrine depends on disorientation and amnesia; when populations recognize the playbook — understand that their disaster is someone else's opportunity — they can organize before the window of exploitation closes.",
        lessonTitles: ["Collective Memory as Resistance"]
      }
    ]
  }

};

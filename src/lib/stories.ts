export interface StoryImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface StorySection {
  type: 'text' | 'image-full' | 'image-pair' | 'image-offset' | 'pullquote';
  content?: string;
  image?: StoryImage;
  images?: [StoryImage, StoryImage];
  align?: 'left' | 'right';
}

export interface Story {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  date: string;
  year: string;
  heroImage: string;
  heroAlt: string;
  excerpt: string;
  author: string;
  credit: string;
  sections: StorySection[];
  sectionsEn?: StorySection[];
  subtitleEn?: string;
  originalLanguage?: 'it' | 'es';
  password?: string;
}

export const stories: Story[] = [
  {
    slug: 'si-san-juanito-permite',
    title: 'Si San Juanito Permite',
    subtitle: 'In San Juan de la Vega, a banned tradition refuses to die',
    location: 'San Juan de la Vega, Mexico',
    date: '2026',
    year: '2026',
    heroImage: '/assets/images/sanjuanito.webp',
    heroAlt: 'San Juan de la Vega, Mexico',
    excerpt: 'Every year on Shrove Tuesday, the townspeople of San Juan de la Vega pack homemade explosives onto sledgehammers and slam them against the ground. For the first time, authorities banned it. The town had other plans.',
    author: 'By Mattia Astori',
    credit: 'A <a href="https://sacratos.com?utm_source=mattiaastori.com" target="_blank" rel="noopener noreferrer">Sacratos.com</a> project. Photographs by Mattia Astori and Daniele Colucci.',
    sections: [
      {
        type: 'text',
        content: `A door in the street cracked open just enough for a hand to slip through. A kid, maybe fifteen, curled his fingers toward himself \u2013 come here, come here \u2013 then pulled back into the dark. I looked around the street. Nobody. I stepped inside.`
      },
      {
        type: 'text',
        content: `The house looked like a drug kitchen. Two folding tables stretched across the room, their surfaces dusted white and yellow. On one side, a bucket of potassium chlorate. On the other, sulfur. A mixture that, once combined, becomes a potent explosive. The air was thick with it, not quite fog, but close, a haze that caught the light from a bare bulb. Three kids stood around the tables, working the powders together with their bare hands. Empty bottles of Caguama beer lined the edge of the table. One kid looked up at me and grinned, then went back to scooping powder into small plastic bags.`
      },
      {
        type: 'text',
        content: `Josu\u00e9 was the one who had waved me in from the doorway. He was skinny, quick-moving, proud of the operation in the way a kid is proud of a treehouse.`
      },
      {
        type: 'text',
        content: `One of the boys had no hands. Both arms ended at the wrists. I didn\u2019t want to ask. I asked anyway. He told me it happened during the explosions, a few years back. He said it the way someone tells you about a stolen bicycle, part of life.`
      },
      {
        type: 'text',
        content: `Don Juan David, Josu\u00e9\u2019s father, walked into the room. He greeted me with a handshake and a smile, glanced at the tables of explosive powder where their children worked, and walked back out.`
      },
      // sanjuanito2
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito2-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      {
        type: 'text',
        content: `Every year, on Shrove Tuesday, the townspeople of San Juan de la Vega pack homemade explosives onto sledgehammers, carry them to the streets and open fields, and slam them against the ground. The detonations are enormous. The earth shakes. People lose limbs. This time, something was different. For the first time in the town\u2019s history, authorities had banned the use of explosives during the carnival. A public petition, signatures gathered, police mobilized. I wanted to understand what happens when a government tells a town to stop being itself.`
      },
      {
        type: 'text',
        content: `Walking around during the five days before the festival we couldn\u2019t get more than a block without being pulled into a doorway. Families wanted to talk. They wanted to make sure we understood the history, their version of the history. Each family insisted theirs was the true story, that the others had it wrong. They pulled out old photographs, pointed to churches, waved their hands as they spoke. The carnival, they all agreed, celebrates San Juan de la Vega, a saint who saved the town from gold robbers centuries ago. The explosives reenact the gunshots from his battles.`
      },
      {
        type: 'pullquote',
        content: `Every family also wanted to make sure we knew that the big explosions, the ones the town is famous for, are not the real tradition. The real tradition is small. Modest. A respectful crack of gunpowder in honor of the saint.`
      },
      {
        type: 'text',
        content: `But here\u2019s what surprised me: every family also wanted to make sure we knew that the big explosions, the ones the town is famous for, are not the real tradition. The real tradition is small. Modest. A respectful crack of gunpowder in honor of the saint. What the town has become known for is something else entirely. Kids started making bigger and bigger explosives, detonating them around town, destroying city piping. Everything breaks, they said, shaking their own heads. This is not what we are.`
      },
      // sanjuanito3
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito3-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      {
        type: 'text',
        content: `The story begins, depending on who tells it, centuries ago. A man named Aquino de la Vega was moving silver shipments by mule along the Camino Real when bandits started robbing him and his workers. He prayed to San Juan Bautista. The robbers stopped. Aquino vowed he would honor the saint every year, forever, and so would his sons, and their sons after them.`
      },
      {
        type: 'text',
        content: `Six families still carry that vow. Each one is tied to a barrio, each barrio to a saint, each captain elected on September 20th after the others have looked the family over, how they live, who they are. The families fund the music, the food, the processions. They keep the image of the saint in their home for a year. The carnival is the debt coming due.`
      },
      {
        type: 'text',
        content: `What the explosions reenact are the robberies, the bandits on the Camino Real, the indigenous defenders with their machetes and farm tools, the occasional Spanish pistol shot. The men who hold the tradition will tell you this, quietly, with some embarrassment about what it has become.`
      },
      // sanjuanito4
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito4-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      {
        type: 'text',
        content: `The word I heard more than any other during my time in San Juan de la Vega was <em>adrenalina</em>. I heard it from a man in his forties, shirtless, showing me scars on his forearms. I heard it from teenagers leaning against trucks in the afternoon heat. But I understood it best watching Josu\u00e9.`
      },
      {
        type: 'text',
        content: `The afternoon before the carnival, I found him sitting on a curb outside a corner store, rolling a cigarette. He was quiet, different from the kid who had waved me into his house with such excitement.`
      },
      {
        type: 'pullquote',
        content: `"I\u2019m always scared before I do it," he told me. "But once I blow up one, I can\u2019t stop. The adrenaline is too strong. I want to keep going."`
      },
      {
        type: 'text',
        content: `I asked about the dangers, and stories came easily: a man who burned, another who was paralyzed, people who lost fingers, hands, arms, legs. Accidents happen because the explosives are powerful enough to send twenty-five-kilogram sledgehammers flying through the air. A hammer goes up, a hammer comes down, and sometimes there is a head in the way. Or a spark hits a bag of powder before the hammer does, and someone standing too close disappears into smoke.`
      },
      {
        type: 'text',
        content: `"Police always try to take them away," one man said. He was sitting in a plastic chair outside his house, two kids playing in the dirt beside him. "But they will never stop the tradition. Nothing will change."`
      },
      {
        type: 'text',
        content: `He said it without bravado.`
      },
      // sanjuanito5
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito5-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      {
        type: 'text',
        content: `In the days before the carnival, the town climbed toward something. More people in the streets. More music from open windows. More trucks loaded with supplies. The energy was cumulative, each day louder and more festive than the last, a slow wave building toward its crest.`
      },
      {
        type: 'text',
        content: `On the afternoon before the main event, a strange calm settled over the town. Streets were empty. Doors closed. No music. No voices. The air itself seemed to hold still, as if the entire town had taken a breath and was waiting to exhale.`
      },
      // sanjuanito6
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito6-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      {
        type: 'text',
        content: `Boom. The first hammer hit the ground as soon as night fell and the exhale came all at once.`
      },
      {
        type: 'text',
        content: `The explosion was not what I expected. I had seen videos. I thought I was prepared. I was not. The sound moved through me. The ground shook under my feet. My ears whistled, even from a hundred meters away. My chest vibrated. Windows cracked. The pipes beneath the street groaned and split. One impact, and the air is different. The density of it. The sulfur.`
      },
      {
        type: 'text',
        content: `Then came another. And another.`
      },
      {
        type: 'text',
        content: `Parades took the streets. Villagers singing, dancing, playing instruments, carrying the image of San Juanito through the town until the end of the night. Following them in the back, kids dressed as soldiers, some in boots and gas masks, others with no gloves, no protection of any kind. Everyone carried sledgehammers and backpacks stuffed with explosives. They ran through the streets in groups, slamming hammers down as they went. The town disappeared into noise and powder.`
      },
      {
        type: 'text',
        content: `I found Josu\u00e9 in the crowd. He was barely recognizable, face covered in soot, eyes wide. He swung a hammer down and the detonation threw him sideways. He got up laughing and loaded another charge. This was what he\u2019d been waiting for. This was the adrenaline he had tried to explain.`
      },
      {
        type: 'text',
        content: `Around midnight, the first police cars appeared.`
      },
      {
        type: 'text',
        content: `The crowd froze. About ten men climbed out, SWAT gear, assault rifles, bulletproof vests. They walked toward the kids with the backpacks. The boys scattered. They ran down side streets and alleyways, clutching their hammers, looking for somewhere to hide.`
      },
      {
        type: 'pullquote',
        content: `I saw a grandmother crack her front door open. She let the kids shove their backpacks full of explosives through the gap, she closed the door, and she stood in front of it. When the police asked to enter, she stood immobile like a statue until they were gone.`
      },
      {
        type: 'text',
        content: `The police roamed for some time, confiscated what they could, caught a few guys, and left. Within minutes, the parades reformed. The hammers came back out. The explosions picked up where they had stopped, as if nothing had happened.`
      },
      {
        type: 'text',
        content: `The parade moved out of town, into an open space. Kids detonated the entirety of their backpacks; explosion stacked on explosion, smoke rising in columns against the night sky.`
      },
      {
        type: 'text',
        content: `At around three in the morning, we walked back toward town to catch some sleep.`
      },
      {
        type: 'text',
        content: `I did not sleep. The city was at war. The bed shook after every boom, one every few seconds, sometimes overlapping, sometimes a chain of three or four in rapid succession. Even with earplugs pushed deep, my ears hurt. The walls vibrated. The floor vibrated. There was no pause, no gap long enough to trick yourself into thinking it might be over. It went on for hours. It went on until seven in the morning.`
      },
      // sanjuanito7
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito7-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      // sanjuanito8 + sanjuanito9
      {
        type: 'image-pair',
        images: [
          {
            src: '/assets/images-optimized/sanjuanito8-lg.webp',
            alt: 'San Juan de la Vega',
          },
          {
            src: '/assets/images-optimized/sanjuanito9-lg.webp',
            alt: 'San Juan de la Vega',
          }
        ]
      },
      {
        type: 'text',
        content: `We walked outside into the silence. The sun was coming up, pale and cautious. Over ten police cars patrolled the town, circling slowly with lights off. They had shut everything down.`
      },
      {
        type: 'text',
        content: `But beyond the edge of town, we could hear it. Distant, but unmistakable. Boom. Boom.`
      },
      {
        type: 'text',
        content: `We followed the sound.`
      },
      {
        type: 'text',
        content: `The townspeople had moved to the train tracks. Tracks that cut through flat, open land, sand, rocks and gravel, not a piece of shade anywhere. They placed explosives on the rails and waited for trains to roll over them. Between trains, they took turns blowing up hammers on steel bars laid flat against the ground.`
      },
      {
        type: 'text',
        content: `There, away from the police, the hammers got bigger.`
      },
      {
        type: 'text',
        content: `It was noon on the day of the carnival. The sun was directly overhead and the heat was punishing. People packed more and more powder onto the sledgehammers and took turns; one swing, then step aside for the next person. Huge hammers flew tens of meters into the air. People were thrown backward by the force. Mushroom clouds of smoke rose from every detonation.`
      },
      {
        type: 'text',
        content: `Tiredness was showing on everyone. No sleep, hours of sun and alcohol.`
      },
      {
        type: 'text',
        content: `I watched a kid swing a hammer down. The explosion threw him back onto the ground. The hammer launched upward, spinning, and came down on his head. The ring of steel on skull. He tried to stand. Blood ran from his scalp, down his face, into his eyes. His friend pulled off his own shirt, wrapped it tight around the kid\u2019s head, and hauled him onto the back of a motorcycle. They disappeared down the road.`
      },
      {
        type: 'text',
        content: `Nobody stopped. The next person stepped up.`
      },
      {
        type: 'text',
        content: `I heard two guys make a bet. Fifteen hundred pesos that one of them couldn\u2019t detonate five kilograms of explosives in one blow. His arms were already bleeding from flying rocks. He accepted. He swung. He walked back to collect.`
      },
      {
        type: 'text',
        content: `"No," the other man said. "I didn\u2019t bet."`
      },
      {
        type: 'text',
        content: `The man with bleeding arms looked at him. His eyes were red and raw.`
      },
      {
        type: 'text',
        content: `"You have two weeks. Fifteen hundred pesos, or you\u2019re dead."`
      },
      {
        type: 'text',
        content: `The crowd began to split. People moved into groups. Clans formed along lines I couldn\u2019t read. One side started throwing rocks at the other. Throwing, with full force, people ducking behind trucks, scrambling to get clear. One group charged together across the field. Military forces showed up with guns drawn. A man walked toward them. His head was covered in blood.`
      },
      // sanjuanito10 + sanjuanito11
      {
        type: 'image-pair',
        images: [
          {
            src: '/assets/images-optimized/sanjuanito10-lg.webp',
            alt: 'San Juan de la Vega',
          },
          {
            src: '/assets/images-optimized/sanjuanito11-lg.webp',
            alt: 'San Juan de la Vega',
          }
        ]
      },
      // sanjuanito12
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito12-lg.webp',
          alt: 'San Juan de la Vega',
        }
      },
      {
        type: 'text',
        content: `The next morning, the market opened in the square as always, stalls selling fruit, tortillas and plastic toys. People walked slowly, said good morning to each other, stopped to talk. A dog slept in a doorway. The church bell rang at eight.`
      },
      {
        type: 'text',
        content: `We walked through town. Here was Josu\u00e9, down the road. He waved. There was the poultry man at his stand, sorting eggs. There was Ana, who had spent an hour explaining the history of the celebration to me on my first day, making sure I had every detail right. There was the man who owns the ice cream shop in front of the church, sweeping his entrance.`
      },
      {
        type: 'text',
        content: `I went to say goodbye to Don Juan David. He pulled me into a hug that lasted a long time. He held on. We had barely talked. When he finally let go, his eyes were wet. He thanked me. He begged me to come back next year.`
      },
      {
        type: 'pullquote',
        content: `"Si San Juanito permite," he said. If San Juanito allows it.`
      },
      // sanjuanito13
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito13-lg.webp',
          alt: 'San Juan de la Vega',
        }
      }
    ]
  }
  ,
  {
    slug: 'c-vdim-au-fnel',
    title: "C' vdim au' fnel",
    subtitle: 'Appunti dalla Festa del Soccorso',
    subtitleEn: 'Notes from the Festa del Soccorso',
    originalLanguage: 'it',
    location: 'San Severo, Italia',
    date: '2026',
    year: '2026',
    heroImage: '/assets/images/sansevero.webp',
    heroAlt: 'Festa del Soccorso, San Severo',
    excerpt: "Ogni anno a San Severo, nella terza settimana di maggio, migliaia di persone corrono sotto esplosioni a mezz'aria in onore della Madonna del Soccorso. Tre giorni in cui le leggi, il lavoro e il lutto vengono sospesi.",
    author: 'By Mattia Astori',
    credit: 'A <a href="https://sacratos.com?utm_source=mattiaastori.com" target="_blank" rel="noopener noreferrer">Sacratos.com</a> project. Photographs by Mattia Astori and Daniele Colucci.',
    sections: [
      {
        type: 'text',
        content: `Era sabato sera e sopra le nostre teste pendevano i castelletti, ghirlande di filo di ferro tese da un lato all'altro della strada, cariche di cilindri grigi legati a intervalli regolari. La carta dei giornali vecchi avvolgeva ogni carica. A guardarle da sotto, controluce contro i lampioni, facevano pensare a una festa di paese, ma quella carta secca e l'odore di zolfo dicevano altro.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero3.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Bruno mi teneva per il braccio destro. Alto, robusto, i capelli scuri mossi e pettinati all'indietro, un trench beige sopra la camicia. Pantaloni da abito, scarpe lucide. Niente che suggerisse che di lì a trenta secondi avremmo corso in mezzo a esplosioni a mezz'aria. Aveva l'espressione calma di chi ha già fatto quella cosa molte volte e adesso deve solo accompagnare qualcun altro a farla per la prima volta.`
      },
      {
        type: 'text',
        content: `La strada era piena, una calca fitta, spalla contro spalla. Gruppetti di ragazzi che si chiamavano da un marciapiede all'altro, famiglie con bambini in braccio, anziani appoggiati ai muri. Tutti guardavano nella stessa direzione. L'aria sapeva già di zolfo.`
      },
      {
        type: 'text',
        content: `Da lontano arrivò il primo botto. Mi partì il cuore in gola. La folla si strinse, un'increspatura attraversò la strada.\n\nBruno mi strinse il braccio. «No, aspetta», disse. «Aspetta... aspetta… aspetta...»\n\nAltri due botti, distanziati. Poi la raffica veloce. Da dietro qualcuno iniziò a spingere, la pressione crebbe all'improvviso.\n\nBruno strinse la presa. «Ok. Andiamo.»`
      },
      {
        type: 'text',
        content: `E poi correvamo. Ma non era una corsa scelta: la strada stessa si metteva in movimento, un'onda umana che partiva da dietro e ti prendeva alle spalle, ti comprimeva. Eravamo così schiacciati che non potevo alzare il gomito. Il braccio sinistro incastrato contro il costato, la mano destra serrata sulla macchina fotografica premuta sul petto, e intorno solo corpi. Corpi che spingevano e urlavano, corpi che a tratti ti sollevavano da terra senza che tu potessi opporti.`
      },
      {
        type: 'text',
        content: `I fuochi sopra di noi scoppiavano in sequenza lungo il filo di ferro, appena più veloci della folla. Li sentivi arrivare prima con le orecchie, crepitii sempre più vicini, poi li vedevi: lampi bianchi e arancioni ad altezza testa, scintille che piovevano sulle spalle, sulle braccia, nei capelli. Un ragazzo davanti a me inciampò, cadde in avanti, e prima ancora che toccasse terra quattro mani lo afferrarono per le ascelle e lo rimisero in piedi. Non si smise di correre per quel ragazzo.`
      },
      {
        type: 'text',
        content: `Poi la raffica si fermò. Due secondi di silenzio in cui si sentivano solo i respiri e il ronzio delle orecchie. Un botto isolato. Pausa. Un altro botto. Il fuoco prendeva fiato.\n\nBruno si fermò. Aveva il viso arrossato e una bruciatura fresca sul colletto, ma gli occhi erano tranquilli.\n\n«Dobbiamo decidere», disse. «Se stiamo qua dietro, ce lo prendiamo comodo. Se vuoi vedere il finale, dobbiamo andare avanti adesso, prima che riprenda. Però lì davanti si stringe, è un casino.»\n\n«Andiamo avanti», dissi.`
      },
      {
        type: 'text',
        content: `Ci rimettemmo in movimento, scansando corpi nella pausa. Bruno camminava veloce, si girava ogni tanto. La strada si restringeva in un budello tra due palazzi. Poi sentimmo la miccia ripartire in lontananza. Quel crepitio inconfondibile che si avvicinava. Bruno si voltò, già tirato dalla folla che ricominciava a spingere. Disse qualcosa in dialetto.\n\n«C' vdim au' fnel.»\n\nNon capii. Non c'era tempo per chiedere. La marea di corpi ci separò in un secondo, lui da una parte, io dall'altra, ed ero di nuovo solo in mezzo alla ressa ed esplosioni, il fuoco che avanzava sopra la mia testa.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero5.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Il finale era dove la strada si stringeva, e lì la folla si comprimeva in una massa unica. Le esplosioni a grappolo, così vicine che sentivo il calore sulla nuca. Un bruciore sul braccio destro. Poi una mano dietro di me, non ho mai saputo di chi, mi batté due colpi decisi sulla spalla per spegnere qualcosa.`
      },
      {
        type: 'text',
        content: `L'ultima esplosione fu la più forte. Un boato che rimbombava nello stomaco, il filo di ferro che vibrava sopra le nostre teste, poi silenzio. Il fumo bianco così denso che per qualche secondo non si vedeva più niente. Quando si diradò, la strada era un tappeto di carta bruciata e bossoli fumanti. La gente esplose in un urlo collettivo. Un uomo con la maglietta a brandelli, il torace coperto di puntini rossi, saltava gridando verso un balcone dove qualcuno sventolava una bandiera bruciacchiata. Ritrovai Bruno.`
      },
      {
        type: 'text',
        content: `Quella notte, in albergo, mi soffiai il naso e il fazzoletto diventò nero. La felpa crivellata di buchi. Sul braccio destro un segno rosso che ancora bruciava. Lo zaino aveva tre buchi netti, come di sigaretta. E quelle quattro sillabe, c' vdim au' fnel, mi tornavano in testa senza significato.\n\nPrima di cedere al sonno, ripensai a quello che ci avevano detto durante il giorno: questo è l'antipasto. Domani è la festa vera.`
      },
      {
        type: 'text',
        content: `Il giorno prima, il venerdì mattina, Michele Sales ci aveva presi in albergo alle nove. Guidava un'utilitaria grigia con i sedili posteriori pieni di copie della «Gazzetta di San Severo», il suo giornale. Al centro della prima pagina aveva stampato il nostro arrivo.\n\nMichele parlava muovendo poco le labbra, la voce troppo alta. «Vedete questa?», disse toccandosi l'orecchio destro. «2007. Una miccia fatta male. Mi è caduta sulla spalla, mi ha bucato la spalla e mi ha spaccato il timpano. Due operazioni. Mi hanno preso membrana dall'occipite e dalla tempia e ricostruito il timpano. Ho perso il cinquanta per cento dell'udito. Ma corr tutt l'ann.» Corro tutti gli anni.\n\nGli chiesi perché. Mi guardò dallo specchietto retrovisore, e in quell'attimo i suoi occhi cambiarono. Pieni di luce, non guardavano più la strada, ma qualcosa di interno. «Adrenalina», disse.`
      },
      {
        type: 'text',
        content: `Ci portò alla Nuova Pirodaunia. L'odore di zolfo e polvere pirica arrivava prima dell'edificio. Dentro, un operaio anziano con le mani nere e secche, unghie consumate, dita sottili, preparava le cariche arrotolando strisce di vecchi calendari intorno a cilindri di polvere compressa. Il proprietario, Michele Altrui, ci raccontò della giuria che fino al 2017 sceglieva il fuoco più forte. «Poi una ragazza si è fatta male. Il braccio. Spappolato. E hanno smesso.»`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero2.webp',
          alt: 'Preparazione delle cariche, San Severo',
        }
      },
      {
        type: 'text',
        content: `Più tardi, da Umberto Presutto alla fabbrica San Pio, sentimmo la stessa storia: niente transenne prima del 2017, poi le barriere, la gente che le buttava giù, le transenne rinforzate. «Ogni volta che arriva un prefetto nuovo, un questore, un commissario, gente che non è del posto, prova a limitare. E ogni volta nascono proteste.» Negli anni Sessanta il vescovo Valentino Velati non voleva far sparare. A metà degli anni Ottanta un commissario bloccò tutto: la gente si sedette in strada, ore di trattativa, e alla fine le batterie vennero montate in fretta e si sparò lo stesso. Nel 2002 un altro tentativo. Tutti seduti, la Madonna non usciva, due ore dopo cambiarono le ordinanze.`
      },
      {
        type: 'text',
        content: `Nel pomeriggio incontrammo Raffaele Florio, presidente della Pro Loco. Uomo che faceva mille cose nello stesso momento, telefono nella mano destra, telefono fisso sulla scrivania, gente che entrava e usciva dall'ufficio ogni diciassette secondi. In uno di quegli intervalli trovò il tempo di dirmi: «Il più reprimi, più alimenti. Dal 2017 i ragazzi sono aumentati. Più gli dici che è pericoloso, più ci vogliono correre sotto.»`
      },
      {
        type: 'text',
        content: `Poi si alzò, mise via entrambi i telefoni e ci portò in giro per la città. E fu lì che capimmo chi era Raffaele Florio. In mezz'ora di cammino avremo contato quaranta interazioni. "Ciao doctor", "Mi manchi", "Ehi Raffaele, tutto pronto?" due baci sulla guancia, uno e due, strette di mano che duravano minuti. Ogni volta si fermava, presentava, spiegava chi eravamo. «Sono due fotografi, vengono a raccontare la festa» e la reazione era sempre la stessa: un sorriso largo, un «benvenuti, vedrete che roba».`
      },
      {
        type: 'text',
        content: `Passammo davanti alla cattedrale, gente vestita bene, anziani a braccetto, e poi in una chiesa laterale dove Raffaele indicò lo stemma della confraternita. «Memento mori. Ricordati che devi morire.»\n\nQuella sera mangiammo il primo panino col torcinello. Una nube di fumo bianco saliva da una griglia improvvisata sul marciapiede. Fegato e interiora di maiale, melanzane sott'olio, pomodori secchi, infilato in una ciabatta che si inzuppava del grasso della carne. Sedie di plastica bianca, quelle da gelateria. La piazza del Luna Park era già piena del doppio della gente del pomeriggio. In lontananza, botti.`
      },
      {
        type: 'text',
        content: `Domenica mattina piovigginava. Alle sette la città era bagnata e silenziosa, ma già tutta addobbata. I castelletti penzolavano sulle strade deserte con un rumore di carta secca. In un bar prendemmo un caffè. Il barista asciugava tazzine: «Poi smette. Alle nove smette sempre.» E alle nove smise.`
      },
      {
        type: 'text',
        content: `La vestizione dei portatori avveniva in una sala dietro la chiesa principale. Li vedemmo mettersi il mantello azzurro, il collare con il simbolo della Madonna del Soccorso. Poi venne il momento dell'estrazione. I bambini tenevano in mano coppole di stoffa grigio scuro con dentro i biglietti dei gruppi. Il primo biglietto estratto fu il numero tre. La squadra numero tre fu la prima sorteggiata: a loro sarebbe toccata l'uscita dalla cattedrale. Il gruppo si spostò verso l'altare, e uno di loro, un uomo sulla quarantina, si mise le mani sul viso e scoppiò a piangere. Disse qualcosa che non sentii, ma vidi le sue spalle scuotersi. «È un'emozione forte», disse a mezza voce. Lo stesso uomo lo avrei rivisto lunedì sera, in lacrime, con la statua sulla spalla.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero10.webp',
          alt: 'Vestizione dei portatori, San Severo',
        }
      },
      {
        type: 'text',
        content: `La Madonna uscì alle undici. L'anno prima alle dieci, ma la pioggia aveva ritardato tutto. La statua era bizantina, nera e dorata, patrona della città e della diocesi. La gente si sporgeva per toccarla, baciarla. Accanto a me un signore mi diede un colpo di gomito, indicandola col mento: «Vedi quant'è bella.» Lo dicevano tutti, ogni volta che ce la mostravano in quei giorni. La portarono fuori in spalla, e la folla esplose in un applauso. Da quel momento, la festa cominciò.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero8.webp',
          alt: 'La Madonna del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Il primo fuoco della domenica mi colse in mezzo alla strada, insieme ai fujenti che aspettavano. L'aria cambiò venti secondi prima che arrivasse il rumore: la gente si fece frizzante, i corpi si tesero, qualcuno si alzò sulle punte. Poi il primo botto, come un tuono. Il cuore mi partì in gola. Mi misi gli occhiali, i tappi, serrai la macchina fotografica. La fiumana partì da dietro e mi travolse. Di nuovo corpi che spingevano, di nuovo il braccio incastrato, le scintille sulla nuca. Un bruciore al braccio, poi sul collo. Mi girai e un ragazzo che non avevo mai visto mi stava già battendo una mano sulla spalla per spegnere un fuoco che mi era caduto addosso. Alzai il mento per ringraziarlo, e lui era già sparito.`
      },
      {
        type: 'text',
        content: `Undici rioni, undici batterie, dalla mattina al pomeriggio, in senso antiorario la domenica, in senso orario il lunedì. La città era un cerchio di fuochi, e noi ci spostavamo da un rione all'altro seguendo la massa. In un altro rione, dopo il fuoco, vidi una scarpa appesa a uno dei fili di ferro che avevano retto i petardi, legata lassù da qualcuno perché il proprietario la ritrovasse. Penzolava in mezzo alla strada, e un ragazzo saltava su una gamba sola per riprenderla.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero7.webp',
          alt: 'I fujenti, Festa del Soccorso',
        }
      },
      {
        type: 'text',
        content: `Tra un fuoco e l'altro sfrecciavano i TMax, scooteroni con a bordo padre, madre e figlio, tutti senza casco, passavano davanti alle macchine delle forze dell'ordine tagliando la folla per arrivare primi al fuoco successivo.\n\nI fujenti — quelli che fuggono — indossavano strati di maglie, due o tre o quattro, tutte crivellate di buchi dei fuochi precedenti. Più la maglietta era bucata, più eri valoroso. Su ogni maglietta uno sponsor: il frantoio, la ferramenta, la gastronomia locale, Pasta fresca da Ciro stampato sul petto di un ragazzo che correva con le braccia alzate. E poi c'erano le magliette con le foto dei morti. Un ragazzo portava stampata sul petto la foto di un amico, con una scritta in dialetto. Un altro aveva la foto di un figlio, e sotto la foto la scritta: Non ti vedo ma ti sento accanto. Quando glielo chiesi, indicò la scritta col dito. Si voltò e corse verso il fuoco successivo.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero6.webp',
          alt: 'Le magliette dei fujenti, San Severo',
        }
      },
      {
        type: 'pullquote',
        content: `«Due cose so' sicure ind'a vita: a mort' e a fest' d'u succors.»`
      },
      {
        type: 'text',
        content: `Durante una pausa sentii un fujente gridare a un altro, in dialetto: «Due cose so' sicure ind'a vita: a mort' e a fest' d'u succors.» L'altro rise, gli diede una pacca sulla spalla. Più tardi, un altro, appoggiato a un muro con la maglietta fumante: «L'agg ditt o capomi: a térz sttman d magg' so' ccà. O è feri o è malattì, vid tu.» Io l'ho detto al mio capo: la terza settimana di maggio sono qui. O è ferie o è malattia, vedi tu. Lavorava a Torino, era tornato.`
      },
      {
        type: 'text',
        content: `Lunedì ritrovai Bruno. Era appoggiato a un muro sotto i fuochi di Porta Lucera, il trench beige, una bruciatura sul collo. Aveva il telefono in mano e le cuffie nelle orecchie, lo schermo illuminato. Mi vide, mi fece un cenno col mento, «scusa un attimo, sono in riunione di lavoro», e rise. Poi la miccia partì in lontananza. Bruno si staccò dal muro, si sistemò il colletto. Mi guardò. Disse: «C' vdim au' fnel.»\n\nQuesta volta capii.`
      },
      {
        type: 'text',
        content: `Prima dell'ultimo fuoco, mentre mangiavo un panino col torcinello, un uomo sulla quarantina rideva con la famiglia, tatuaggi ovunque. Aveva un braccialetto elettronico alla caviglia, domiciliari, evidentemente sospesi per la giornata. Per quei tre giorni, a San Severo, le leggi si fermavano insieme al traffico.\n\nPoco distante, una signora con una maglietta stampata con la foto di un ragazzo e una data: 2024. Suo figlio, morto in un incidente stradale. «Lui correva tutti gli anni. E io corro per lui.»`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero4.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Lunedì sera la Madonna rientrò al Santuario del Soccorso. La chiesa era piccola, forse cinquanta posti, ma dentro eravamo in quattrocento, stipati come sotto i fuochi, tutti sudati e bruciacchiati, ma in silenzio. Un laico della confraternita stava all'ingresso e decideva chi entrava. Fuori, la folla premeva.\n\nDentro, due ore di rosario. Il diacono guidava l'Ave Maria, e tutti rispondevano in un'unica voce bassa, stanca, due ore di preghiera mentre fuori gli ultimi fuochi scoppiavano e la Madonna finiva il giro della città.`
      },
      {
        type: 'text',
        content: `Poi la statua arrivò. La portarono dentro in spalla, nera e dorata, e la chiesa scoppiò in un pianto collettivo. Davanti a me un uomo grosso con il collo tatuato piangeva senza fare rumore, le mani giunte e le lacrime che gli sparivano nella barba. Il ragazzo che avevo visto piangere all'estrazione era in prima fila, il mantello azzurro sporco di fuliggine. E piangeva.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero9.webp',
          alt: 'Il rientro della Madonna, San Severo',
        }
      },
      {
        type: 'text',
        content: `La statua venne adagiata nella sua nicchia. La gente si spinse per toccarla un'ultima volta.\n\nQuando uscii dal Santuario, la città era silenziosa, coperta di carta bruciata. In albergo mi soffiai il naso: nero. Lo zaino bucato. I segni sul braccio sinistro, sul braccio destro, sul collo. L'obiettivo della macchina fotografica aveva una bruciatura che non sarebbe più andata via.`
      },
      {
        type: 'pullquote',
        content: `Non era un'istruzione. Era l'unica cosa certa, in quei giorni in cui tutto il resto veniva sospeso.`
      },
      {
        type: 'text',
        content: `Prima di addormentarmi, ripensai alla frase. Non avevo più bisogno di tradurla.\n\nC' vdim au' fnel.\n\nNon era un'istruzione. Era l'unica cosa certa, in quei giorni in cui tutto il resto, le leggi, il lavoro, il lutto, la paura, veniva sospeso. Ci si perdeva nella ressa, nel fuoco, nel pianto. E poi ci si ritrovava. Alla fine del fuoco, alla fine della festa, davanti alla Madonna rientrata nella sua nicchia. Al finale.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero11.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      }
    ],
    sectionsEn: [
      {
        type: 'text',
        content: `It was Saturday night and above our heads hung the <em>castelletti</em>, garlands of iron wire strung from one side of the street to the other, loaded with gray cylinders tied at regular intervals. Old newspaper wrapped each charge. Seen from below, backlit against the streetlamps, they could have passed for the decorations of a village fair, but the dry paper and the smell of sulfur said otherwise.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero3.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Bruno held me by the right arm. Tall, solid, dark wavy hair combed back, a beige trench coat over his shirt. Dress trousers, polished shoes. Nothing to suggest that thirty seconds later we'd be running through explosions going off in midair. He had the calm expression of a man who has done this many times and now only has to walk someone else through it for the first time.`
      },
      {
        type: 'text',
        content: `The street was packed, a dense crush, shoulder to shoulder. Clusters of young guys calling to each other across the sidewalks, families with children in their arms, old people leaning against the walls. Everyone was looking in the same direction. The air already tasted of sulfur.`
      },
      {
        type: 'text',
        content: `From far off came the first blast. My heart leapt into my throat. The crowd tightened, a ripple ran through the street.\n\nBruno gripped my arm. "No, wait," he said. "Wait… wait… wait…"\n\nTwo more blasts, spaced apart. Then the fast volley. Behind us someone started to push, the pressure surged all at once.\n\nBruno tightened his grip. "Okay. Let's go."`
      },
      {
        type: 'text',
        content: `And then we were running. But it wasn't a run you chose: the street itself began to move, a human wave that started from behind and took you from the back, compressed you. We were packed so tight I couldn't lift my elbow. Left arm wedged against my ribs, right hand clenched around the camera pressed to my chest, and all around me, only bodies. Bodies pushing and shouting, bodies that every so often lifted you off your feet with no way to resist.`
      },
      {
        type: 'text',
        content: `The fireworks above us went off in sequence along the iron wire, just a little faster than the crowd. You heard them coming first with your ears, crackles getting closer and closer, then you saw them: white and orange flashes at head height, sparks raining down on shoulders, on arms, into hair. A boy in front of me tripped, fell forward, and before he even hit the ground four hands grabbed him by the armpits and set him back on his feet. Nobody stopped running for that boy.`
      },
      {
        type: 'text',
        content: `Then the volley stopped. Two seconds of silence in which all you could hear was breathing and the ringing in your ears. A single blast. A pause. Another blast. The fire was catching its breath.\n\nBruno stopped. His face was flushed and there was a fresh burn on his collar, but his eyes were calm.\n\n"We have to decide," he said. "If we stay back here, we take it easy. If you want to see the finale, we have to go up now, before it starts again. But up front it gets tight, it's a mess."\n\n"Let's go up," I said.`
      },
      {
        type: 'text',
        content: `We started moving again, dodging bodies in the lull. Bruno walked fast, glancing back every so often. The street narrowed into a gut between two buildings. Then we heard the fuse start up again in the distance. That unmistakable crackle, coming closer. Bruno turned, already pulled by the crowd that was beginning to push again. He said something in dialect.\n\n"<em>C' vdim au' fnel.</em>"\n\nI didn't understand. There was no time to ask. The tide of bodies separated us in a second, him one way, me the other, and I was alone again in the middle of the crush and the explosions, the fire advancing over my head.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero5.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `The finale was where the street narrowed, and there the crowd compressed into a single mass. The explosions came in clusters, so close I could feel the heat on the back of my neck. A burning on my right arm. Then a hand behind me, I never knew whose, struck me twice, hard, on the shoulder, to put something out.`
      },
      {
        type: 'text',
        content: `The last explosion was the loudest. A roar that boomed in your stomach, the iron wire shuddering above our heads, then silence. The white smoke so thick that for a few seconds you couldn't see anything at all. When it cleared, the street was a carpet of burned paper and smoking casings. The crowd erupted in a single collective shout. A man in a shredded shirt, his chest covered in little red dots, jumped and shouted toward a balcony where someone was waving a scorched flag. I found Bruno again.`
      },
      {
        type: 'text',
        content: `That night, at the hotel, I blew my nose and the tissue came away black. My sweatshirt riddled with holes. On my right arm a red mark that still burned. My backpack had three clean holes, like cigarette burns. And those four syllables, <em>c' vdim au' fnel</em>, kept coming back to me with no meaning attached.\n\nBefore I gave in to sleep, I thought back to what they'd told us during the day: this is the appetizer. Tomorrow is the real feast.`
      },
      {
        type: 'text',
        content: `The day before, Friday morning, Michele Sales had picked us up at the hotel at nine. He drove a little gray hatchback with the back seats full of copies of the <em>Gazzetta di San Severo</em>, his newspaper. He'd printed our arrival in the center of the front page.\n\nMichele talked barely moving his lips, his voice too loud. "See this?" he said, touching his right ear. "2007. A badly made fuse. It fell on my shoulder, went through my shoulder and burst my eardrum. Two operations. They took membrane from the back of my head and from my temple and rebuilt the eardrum. I lost fifty percent of my hearing. <em>Ma corr tutt l'ann.</em>" I run every year.\n\nI asked him why. He looked at me in the rearview mirror, and in that instant his eyes changed. Full of light, no longer watching the road but something inside. "Adrenaline," he said.`
      },
      {
        type: 'text',
        content: `He took us to the Nuova Pirodaunia. The smell of sulfur and gunpowder reached you before the building did. Inside, an old workman with black, dried-out hands, worn-down nails, thin fingers, was preparing the charges, rolling strips of old calendars around cylinders of compressed powder. The owner, Michele Altrui, told us about the jury that until 2017 used to choose the loudest fire. "Then a girl got hurt. Her arm. Pulped. And they stopped."`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero2.webp',
          alt: 'Preparazione delle cariche, San Severo',
        }
      },
      {
        type: 'text',
        content: `Later, at Umberto Presutto's, at the San Pio factory, we heard the same story: no barriers before 2017, then the barricades, people knocking them down, the barriers reinforced. "Every time a new prefect arrives, a police chief, a commissioner, people who aren't from here, they try to rein it in. And every time, protests break out." In the sixties, Bishop Valentino Velati didn't want the fires set off. In the mid-eighties a commissioner shut it all down: people sat down in the street, hours of negotiation, and in the end the batteries were mounted in a hurry and they fired anyway. In 2002, another attempt. Everyone sat down, the Madonna wouldn't come out, two hours later they changed the ordinances.`
      },
      {
        type: 'text',
        content: `In the afternoon we met Raffaele Florio, president of the Pro Loco. A man doing a thousand things at once, cell phone in his right hand, landline on the desk, people coming in and out of the office every seventeen seconds. In one of those gaps he found the time to tell me: "The more you repress it, the more you feed it. Since 2017 the kids have multiplied. The more you tell them it's dangerous, the more they want to run under it."`
      },
      {
        type: 'text',
        content: `Then he stood up, put both phones away, and took us around town. And that was when we understood who Raffaele Florio was. In half an hour of walking we must have counted forty interactions. "Ciao dottò," "I've missed you," "Hey Raffaele, all set?" two kisses on the cheek, one and two, handshakes that lasted minutes. Every time he stopped, introduced us, explained who we were. "They're two photographers, they've come to tell the story of the feast," and the reaction was always the same: a wide smile, a "welcome, you'll see what this is."`
      },
      {
        type: 'text',
        content: `We passed in front of the cathedral, people dressed up, old folks arm in arm, and then into a side chapel where Raffaele pointed out the crest of the confraternity. "Memento mori. Remember that you must die."\n\nThat evening we ate our first <em>torcinello</em> sandwich. A cloud of white smoke rose from a makeshift grill on the sidewalk. Pork liver and offal, eggplant in oil, sun-dried tomatoes, stuffed into a ciabatta that soaked up the fat of the meat. White plastic chairs, the kind from a gelateria. The Luna Park square was already filled with twice the people of the afternoon. In the distance, blasts.`
      },
      {
        type: 'text',
        content: `Sunday morning it was drizzling. At seven the town was wet and silent, but already all decked out. The <em>castelletti</em> dangled over the empty streets with a sound of dry paper. In a bar we had a coffee. The barman was drying cups: "It'll stop. At nine it always stops." And at nine it stopped.`
      },
      {
        type: 'text',
        content: `The robing of the bearers took place in a hall behind the main church. We watched them put on the light-blue mantle, the collar with the symbol of the Madonna del Soccorso. Then came the moment of the draw. Children held dark gray cloth caps with the groups' tickets inside. The first ticket drawn was number three. Team number three was the first to be picked: they would be the ones to carry her out of the cathedral. The group moved toward the altar, and one of them, a man in his forties, put his hands over his face and burst into tears. He said something I didn't catch, but I saw his shoulders shaking. "It's a powerful feeling," he said under his breath. The same man I would see again Monday evening, in tears, with the statue on his shoulder.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero10.webp',
          alt: 'Vestizione dei portatori, San Severo',
        }
      },
      {
        type: 'text',
        content: `The Madonna came out at eleven. The year before, at ten, but the rain had delayed everything. The statue was Byzantine, black and gold, patron of the city and the diocese. People leaned in to touch her, to kiss her. Next to me a man elbowed me, nodding at her with his chin: "See how beautiful she is." Everyone said it, every time they showed her to us in those days. They carried her out on their shoulders, and the crowd erupted in applause. From that moment, the feast began.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero8.webp',
          alt: 'La Madonna del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `The first fire of Sunday caught me in the middle of the street, together with the <em>fujenti</em> who were waiting. The air changed twenty seconds before the noise arrived: people went electric, bodies tensed, some rose onto their toes. Then the first blast, like thunder. My heart leapt into my throat. I put on the goggles, the earplugs, gripped the camera. The torrent started from behind and swept over me. Again bodies pushing, again my arm wedged, sparks on the back of my neck. A burning on my arm, then on my neck. I turned and a boy I'd never seen was already patting a hand on my shoulder to put out a fire that had landed on me. I lifted my chin to thank him, and he was already gone.`
      },
      {
        type: 'text',
        content: `Eleven districts, eleven batteries, from morning to afternoon, counterclockwise on Sunday, clockwise on Monday. The town was a ring of fires, and we moved from one district to the next following the mass. In another district, after the fire, I saw a shoe hanging from one of the iron wires that had held the firecrackers, tied up there by someone so its owner could find it again. It dangled in the middle of the street, and a boy hopped on one leg to get it back.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero7.webp',
          alt: 'I fujenti, Festa del Soccorso',
        }
      },
      {
        type: 'text',
        content: `Between one fire and the next the TMaxes shot past, big scooters carrying father, mother, and son, all without helmets, passing right in front of the police cars, cutting through the crowd to reach the next fire first.\n\nThe <em>fujenti</em> — the ones who flee — wore layers of shirts, two or three or four, all riddled with holes from earlier fires. The more holes in your shirt, the braver you were. On every shirt a sponsor: the oil press, the hardware store, the local deli, <em>Pasta fresca da Ciro</em> printed on the chest of a boy running with his arms raised. And then there were the shirts with photos of the dead. One boy wore the photo of a friend printed on his chest, with a line of dialect under it. Another had the photo of a son, and beneath the photo the words: <em>I don't see you but I feel you beside me</em>. When I asked him about it, he pointed at the words with his finger. He turned and ran toward the next fire.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero6.webp',
          alt: 'Le magliette dei fujenti, San Severo',
        }
      },
      {
        type: 'pullquote',
        content: `"Due cose so' sicure ind'a vita: a mort' e a fest' d'u succors."`
      },
      {
        type: 'text',
        content: `During a lull I heard one <em>fujente</em> shout to another, in dialect: "<em>Due cose so' sicure ind'a vita: a mort' e a fest' d'u succors.</em>" Two things in life are certain: death and the Feast of the Soccorso. The other laughed, gave him a slap on the shoulder. Later, another man, leaning against a wall with his shirt still smoking: "<em>L'agg ditt o capomi: a térz sttman d magg' so' ccà. O è feri o è malattì, vid tu.</em>" I told my boss: the third week of May, I'm here. Either it's vacation or it's sick leave, you figure it out. He worked in Turin. He'd come back.`
      },
      {
        type: 'text',
        content: `On Monday I found Bruno again. He was leaning against a wall under the fires of Porta Lucera, the beige trench coat, a burn on his neck. He had his phone in his hand and earbuds in, the screen lit up. He saw me, gave me a nod with his chin, "sorry, one second, I'm in a work meeting," and laughed. Then the fuse started up in the distance. Bruno pushed off the wall, straightened his collar. He looked at me. He said: "<em>C' vdim au' fnel.</em>"\n\nThis time I understood.`
      },
      {
        type: 'text',
        content: `Before the last fire, while I was eating a <em>torcinello</em> sandwich, a man in his forties was laughing with his family, tattoos everywhere. He had an ankle monitor, house arrest, evidently suspended for the day. For those three days, in San Severo, the laws stopped along with the traffic.\n\nA little way off, a woman in a shirt printed with the photo of a young man and a date: 2024. Her son, killed in a car accident. "He ran every year. And I run for him."`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero4.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Monday evening the Madonna returned to the Sanctuary of the Soccorso. The church was small, maybe fifty seats, but inside there were four hundred of us, packed like under the fires, all sweating and singed, but silent. A layman of the confraternity stood at the entrance and decided who came in. Outside, the crowd pressed.\n\nInside, two hours of rosary. The deacon led the Ave Maria, and everyone answered in a single low, tired voice, two hours of prayer while outside the last fires went off and the Madonna finished her round of the city.`
      },
      {
        type: 'text',
        content: `Then the statue arrived. They carried her in on their shoulders, black and gold, and the church erupted into collective weeping. In front of me a big man with a tattooed neck was crying without making a sound, his hands clasped and the tears disappearing into his beard. The boy I'd seen crying at the draw was in the front row, the light-blue mantle dirty with soot. And he was crying.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero9.webp',
          alt: 'Il rientro della Madonna, San Severo',
        }
      },
      {
        type: 'text',
        content: `The statue was laid in its niche. People pushed to touch her one last time.\n\nWhen I came out of the Sanctuary, the town was silent, covered in burned paper. At the hotel I blew my nose: black. The backpack full of holes. The marks on my left arm, on my right arm, on my neck. The camera lens had a burn that would never come off.`
      },
      {
        type: 'pullquote',
        content: `It was the only certain thing, in those days when everything else was suspended.`
      },
      {
        type: 'text',
        content: `Before I fell asleep, I thought back to the phrase. I no longer needed to translate it.\n\n<em>C' vdim au' fnel.</em>\n\nIt was the only certain thing, in those days when everything else — the laws, the work, the grief, the fear — was suspended. You lost yourself in the crush, in the fire, in the weeping. And then you found yourself again. At the end of the fire, at the end of the feast, before the Madonna returned to her niche. At the finale.`
      },
      {
        type: 'image-full',
        image: {
          src: '/assets/images/sansevero11.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      }
    ]
  }
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find(s => s.slug === slug);
}

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
    credit: 'A <a href="https://sacratos.com" target="_blank" rel="noopener noreferrer">Sacratos.com</a> project. Photographs by Mattia Astori and Daniele Colucci.',
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
          src: '/assets/images-optimized/sanjuanito2.webp',
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
          src: '/assets/images-optimized/sanjuanito3.webp',
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
          src: '/assets/images-optimized/sanjuanito4.webp',
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
          src: '/assets/images-optimized/sanjuanito5.webp',
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
          src: '/assets/images-optimized/sanjuanito6.webp',
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
          src: '/assets/images-optimized/sanjuanito7.webp',
          alt: 'San Juan de la Vega',
        }
      },
      // sanjuanito8 + sanjuanito9
      {
        type: 'image-pair',
        images: [
          {
            src: '/assets/images-optimized/sanjuanito8.webp',
            alt: 'San Juan de la Vega',
          },
          {
            src: '/assets/images-optimized/sanjuanito9.webp',
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
            src: '/assets/images-optimized/sanjuanito10.webp',
            alt: 'San Juan de la Vega',
          },
          {
            src: '/assets/images-optimized/sanjuanito11.webp',
            alt: 'San Juan de la Vega',
          }
        ]
      },
      // sanjuanito12
      {
        type: 'image-full',
        image: {
          src: '/assets/images-optimized/sanjuanito12.webp',
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
          src: '/assets/images-optimized/sanjuanito13.webp',
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
    location: 'San Severo, Italia',
    date: '2026',
    year: '2026',
    heroImage: '/assets/images/aufnel.webp',
    heroAlt: 'Festa del Soccorso, San Severo',
    excerpt: "Ogni anno a San Severo, nella terza settimana di maggio, migliaia di persone corrono sotto esplosioni a mezz'aria in onore della Madonna del Soccorso. Tre giorni in cui le leggi, il lavoro e il lutto vengono sospesi.",
    author: 'By Mattia Astori',
    credit: 'A <a href="https://sacratos.com" target="_blank" rel="noopener noreferrer">Sacratos.com</a> project. Photographs by Mattia Astori and Daniele Colucci.',
    sections: [
      {
        type: 'image-full',
        image: {
          src: '/assets/images/aufnel1.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      },
      {
        type: 'text',
        content: `Era sabato sera e sopra le nostre teste pendevano i castelletti, ghirlande di filo di ferro tese da un lato all'altro della strada, cariche di cilindri grigi legati a intervalli regolari. La carta dei giornali vecchi avvolgeva ogni carica. A guardarle da sotto, controluce contro i lampioni, facevano pensare a una festa di paese, ma quella carta secca e l'odore di zolfo dicevano altro.`
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
          src: '/assets/images/aufnel2.webp',
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
          src: '/assets/images/aufnel3.webp',
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
          src: '/assets/images/aufnel4.webp',
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
          src: '/assets/images/aufnel5.webp',
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
          src: '/assets/images/aufnel6.webp',
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
          src: '/assets/images/aufnel7.webp',
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
          src: '/assets/images/aufnel8.webp',
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
          src: '/assets/images/aufnel9.webp',
          alt: 'Festa del Soccorso, San Severo',
        }
      }
    ]
  }
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find(s => s.slug === slug);
}

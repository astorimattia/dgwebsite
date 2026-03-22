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
    date: '2025',
    year: '2025',
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
        content: `The word I heard more than any other during my time in San Juan de la Vega was adrenalina. I heard it from a man in his forties, shirtless, showing me scars on his forearms. I heard it from teenagers leaning against trucks in the afternoon heat. But I understood it best watching Josu\u00e9.`
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
];

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find(s => s.slug === slug);
}
